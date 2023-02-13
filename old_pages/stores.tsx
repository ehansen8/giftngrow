import { Grid, Typography } from '@mui/material'
type store = {
  store: string
  street?: string
  address?: string
  website?: string
  email?: string
  phone?: string
}

type location = {
  state: string
  stores: store[]
}
const locations: location[] = [
  {
    state: 'Wisconsin',
    stores: [
      {
        store: 'Lake County Boutique',
        street: '630 Milwaukee St.',
        address: 'Delafield, WI 53018',
      },
    ],
  },
]

export default function Stores() {
  return (
    <main className='p-4 rounded-md mt-4'>
      <Typography
        variant='h6'
        textAlign='center'
      >
        The following stores are making a difference. Find Gift 'n Grow bags at
        these locations.
      </Typography>
      <Grid
        container
        justifyContent='center'
        gap={3}
      >
        {locations.map(({ state, stores }, idx) => {
          return (
            <Grid
              item
              xs={3}
              key={idx}
            >
              <h2>{state}</h2>
              {stores.map(({ store, ...other }, idx) => {
                const entries = Object.entries(other)
                return (
                  <div key={idx}>
                    <h3 className='mb-1'>{store}</h3>
                    {entries.map(([_, value]) => (
                      <div key={value}>{value}</div>
                    ))}
                  </div>
                )
              })}
            </Grid>
          )
        })}
      </Grid>
    </main>
  )
}
