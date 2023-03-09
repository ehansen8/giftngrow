This is a [Next.js](https://nextjs.org/) project.

## Config

This project relies on the following to be configured:
- AWS
    - DynamoDB (noSQL Database)
    - SES (Automated Emails)
    - Cognito (OAuth Identity Provider)
- Google OAuth Credentials (Sign-in with Google)
- Logflare (logging)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about the tech stack, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [NextAuth.js](https://next-auth.js.org/) - authentication library built for Next.js
- [AWS SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html) - AWS SDK for JavaScript v3 documentation
- [React Query](https://react-query-v3.tanstack.com/) - data fetching hooks for React
- [Tailwind.css](https://tailwindcss.com/) - utility CSS framework
- [Material UI](https://mui.com/) - React component library following Google's Material design system
- [Maizzle](https://maizzle.com/) - framework for building HTML emails