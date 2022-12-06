import { Grid } from '@mui/material'

const locations = [
  {
    state: 'California',
    stores: [
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
    ],
  },
  {
    state: 'Idaho',
    stores: [
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
    ],
  },
  {
    state: 'Nebraska',
    stores: [
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
    ],
  },
  {
    state: 'Hawaii',
    stores: [
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
    ],
  },
  {
    state: 'Wisconsin',
    stores: [
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
    ],
  },
  {
    state: 'Virginia',
    stores: [
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
        phone: '802-635-2225',
      },
    ],
  },
]

export default function Stores() {
  return (
    <main className='p-4 rounded-md mt-4'>
      <p>
        <span
          className='Apple-style-span'
          style={{ fontSize: 16 }}
        >
          <b>
            The following stores are making a difference. Find Gift 'n Grow bags
            at these locations.
          </b>
        </span>
      </p>
      <p>&nbsp;</p>
      <Grid
        container
        gap={3}
      >
        {locations.map(({ state, stores }, idx) => {
          return (
            <Grid
              item
              xs
              key={idx}
            >
              <h2>{state}</h2>
              {stores.map((store, idx) => {
                return (
                  <div key={idx}>
                    <h3>{store.store}</h3>
                    <div>{store.address}</div>
                    <div>{store.email}</div>
                    <div>{store.phone}</div>
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
