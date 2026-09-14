# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Gift 'n Grow tracking site (`track.giftngrow.com`). Physical gift wraps carry a printed 6-character code and QR link. Anyone who gives or receives a wrap scans the code and adds an *entry* (giver, recipient, city, occasion). Users, signed in or not, can *track* codes to see a wrap's timeline on a map and get email updates when new entries land. An admin page generates new code batches as a printable PDF.

Next.js 13 pages router, TypeScript, MUI + Tailwind, single-table DynamoDB, deployed on AWS Amplify Hosting.

## Commands

```bash
npm run dev            # http://localhost:3000
npm run build          # next build (also type-checks)
npm run lint           # next lint (next/core-web-vitals)
npm test               # jest, all suites
npx jest __tests__/components/tracking/stats/StatsCard.test.tsx   # one file
npx jest -t 'renders card'                                         # by test name
```

Tests live in `__tests__/` mirroring `src/`, use Testing Library with jsdom, and cover components only. `@/` maps to `src/` in Jest but the codebase uses relative imports.

`.env.local` (gitignored) must define every key in `additional.d.ts`. Amplify injects them at build time by writing `.env.production` in `amplify.yml`. Google Maps and Logflare keys are `NEXT_PUBLIC_`.

## Branches and environments

Three long-lived branches, each an Amplify environment: `dev` -> `test` -> `prod`. Merge forward across them. `AWS_BRANCH` / `NEXT_PUBLIC_BRANCH` equal the branch name, and code branches on `=== 'prod'` for: the yellow test-site banner (`TestSiteAlert`), NextAuth debug logging, and the downloaded PDF filename. All three environments share one AWS account and region (`us-east-2`) but have separate DynamoDB tables via `TABLE_NAME`.

## Architecture

### Data layer: single-table DynamoDB with a home-grown entity mapper

Everything lives in one table with `PK`/`SK` and one GSI (`GSI1PK`/`GSI1SK`). `src/lib/entityManager.ts` is the only thing that talks to the table (plus a couple of legacy raw queries in API routes marked `TODO`). Entities in `src/lib/entities/` extend `Model` (`abcModel.ts`) and declare their keys as templates in the constructor:

```ts
this.metadata = {
  name: 'entry',
  PK: 'ITEM#{{code}}',       // {{attr}} is interpolated from the instance
  SK: 'ENTRY#{{regDate}}',
  partialSK: 'ENTRY#',       // begins_with() prefix used by find()
  index: { name: 'GSI1', PK: 'ENTRY#', SK: 'ENTRY#{{regDate}}', partialSK: 'ENTRY#' },
}
```

Fields are opted in with decorators from `src/utils/`: `@Attribute` (persisted), `@AutoEpoch` (set to unix seconds on write if empty), `@PK`. Only `@Attribute` fields reach the table; `getDBObject()` builds the item. Decorators require `experimentalDecorators` and an `import 'reflect-metadata'` at the top of each entity file.

Key layout:

| Entity | PK | SK | GSI1 |
|---|---|---|---|
| `Item` (a code) | `ITEM#<code>` | `CREATED#<epoch>` | none |
| `Entry` | `ITEM#<code>` | `ENTRY#<epoch>` | `ENTRY#` / `ENTRY#<epoch>` (all entries) |
| `TrackingCode` (user follows code) | `ITEM#<code>` | `USER#<email>` | `USER#<email>` / `ITEM#<code>` (codes per user) |
| `User` | `USER#<email>` | `USER#<email>` | `USER#` / `USER#<email>` (all users) |
| `IndexCounter` | `INDEX#` | `INDEX#` | singleton, last generated code |
| `Stats` | `STATS#` | `STATS#` | singleton, updated with `ADD` sets |

So one `ITEM#<code>` partition holds the item, its entries, and its subscribers. `entityManager.find(entity)` queries `PK` + `begins_with(SK, partialSK)`. Pass `{ useIndex: true }` to query the GSI instead.

### Code generation

`src/lib/codeGenerator.ts` is a linear congruential generator over base-19 (`CHAR_SET`, ambiguous characters removed) producing 6-character codes with no repeats for 2^25 draws. Sequence position is persisted in `IndexCounter`. `GET /api/items/generate?pages=N` reads the counter with a consistent read, batch-writes 25 items per page, advances the counter after each page, and streams a PDF of QR labels (5x5 per letter page). If a batch throws on throughput, it still returns a PDF for the pages that saved. `number_gen_script.py` is the standalone proof of the LCG period and mirrors the constants; keep them in sync if you change one.

### Auth

NextAuth (`src/pages/api/auth/[...nextauth].ts`) with two `CredentialsProvider`s, not the built-in OAuth providers:

- `google`: client gets an ID token from Google Identity Services (`GoogleButton`, `OneTap`) and posts it as a credential. Server decodes the JWT without verification.
- `cognito`: email/password via `AdminInitiateAuth`. Signup, confirm, and password-recovery flows are separate API routes under `src/pages/api/cognito/` wrapping `src/lib/cognitoManager.ts`.

The `jwt` callback upserts a `User` row on first sign-in. Admin access (`src/pages/admin.tsx`) is a hardcoded email allowlist checked client-side only. `src/middleware.ts` is an empty stub.

### Anonymous vs signed-in tracking

`src/apis/UserAPI.ts` is the seam: with an email it hits `/api/users/[user]/codes`, without one it reads and writes a `codes` array in `localStorage`. Use it through `useUserAPI()` so it re-instantiates when the session changes. React Query keys include the email for the same reason.

### Client data flow

Pages -> `src/queries/*` (React Query hooks) -> `src/apis/*` or `src/services/*` (axios) -> `src/pages/api/*` -> `entityManager`. The active code being viewed is global Zustand state in `src/stores/trackingStore.ts`, seeded from `?code=` in `getServerSideProps` on the index page. `src/lib/axiosInstance.ts` wraps axios so failures resolve to `{ ok: false, error }` instead of throwing.

### Adding an entry (the main write path)

`POST /api/item/add`: verify the parent `Item` exists, put the `Entry`, fire-and-forget `updateStats`, then look up `TrackingCode` subscribers for that code, drop the sender, and send an SES bulk templated email (`TrackingTemplateV2`, 50 per batch) via `src/lib/emailManager.ts`. The client then subscribes the current user to the code. The SES template itself lives in AWS, not in this repo.

### UI layout

`_app.tsx` wraps everything in SessionProvider, MUI ThemeProvider (`injectFirst` so Tailwind can override), and React Query. Pages can export `getLayout` to supply their own `Layout` with a `childNav` slot, which the index page uses for the `TrackingAppBar`. Styling is Tailwind utilities plus MUI `sx`; the palette is in `src/colors.tsx`. Prettier settings in `.vscode/settings.json`: single quotes, no semicolons, JSX single quotes.

## Gotchas

- Cognito `UserPoolId` is hardcoded in `cognitoManager.ts` despite `COGNITO_USER_POOL_ID` existing in the env.
- `Stats.getStats()` subtracts 1 from set sizes because `updateStats` adds `''` for missing cities/states.
- Empty strings are not converted to null on marshall (`convertEmptyValues: false`), but undefined values are dropped.
- `pino-logflare` ships browser logs to Logflare with public keys. `logger.fatal` is used for unrecoverable data issues (unprocessed batch items).
- `tsconfig.json` includes `additonal.d.ts` (typo). The real file is `additional.d.ts` and is picked up by the `**/*.ts` glob anyway.
