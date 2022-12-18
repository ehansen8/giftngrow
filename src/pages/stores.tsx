import { Grid } from '@mui/material'
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
    state: 'California',
    stores: [
      {
        store: 'Natural Eco Gifts',
        address: 'Santa Cruz, CA 95060',
        email: 'naturalecogifts@gmail.com',
      },
      {
        store: 'Riverside Art Studios',
        street: '10060 Donner Pass Rd.',
        address: 'Truckee, CA 96161',
      },
    ],
  },
  {
    state: 'Colorado',
    stores: [
      {
        store: 'Art and Wellness Collective',
        street: '133 East 4th Street',
        address: 'Loveland, CO 80537',
        website: 'Artandwellness.com',
      },
    ],
  },
  {
    state: 'Vermont',
    stores: [
      {
        store: 'Butternut Mountain Farm',
        street: '31 Main St.',
        address: 'Johnson, VT 05656',
        phone: '802-635-2329',
      },
    ],
  },
  {
    state: 'Wisconsin',
    stores: [
      {
        store: 'Papa Bears North Woods Store',
        street: 'S3949 Business Hwy 12',
        address: 'Baraboo, WI',
      },
      {
        store: 'Earth Choice Goods',
        street: 'E3919 Hwy 14',
        address: 'Spring Green, WI 53588',
      },
      {
        store: 'The Elegant Farmer',
        street: '1545 Main Street',
        address: 'Mukwonago, WI',
      },
      {
        store: 'Books & Company',
        street: '1039 Summit Ave',
        address: 'Oconomowoc, WI',
      },
    ],
  },
  {
    state: 'Pennsylvania',
    stores: [
      {
        store: "O'Flaherty's Dingeldein House",
        street: '23 Cottage Ave.',
        address: 'Lancaster, PA 17602',
      },
    ],
  },
  {
    state: 'Florida',
    stores: [
      {
        store: 'Biscayne Nature Center',
        street: '6767 Crandon Blvd',
        address: 'Key Biscayne, FL  33149',
      },
    ],
  },
  {
    state: 'Idaho',
    stores: [
      {
        store: "Pilgrim's Market",
        street: '1316 N. 4th Street',
        address: 'Coeurd Alene, ID 83814',
      },
    ],
  },
  {
    state: 'Nebraska',
    stores: [
      {
        store: 'Gratitude Cafe Bakery',
        street: '1551 N. Cotner Blvd.',
        address: 'Lincoln, NE 68505',
      },
    ],
  },
  {
    state: 'New Jersey',
    stores: [
      {
        store: 'Gardenias Floral',
        street: '297 Main Street',
        address: 'Metuchen, NJ 08840',
      },
    ],
  },
  {
    state: 'New York',
    stores: [
      {
        store: 'Posman Books',
        street: '9 Grand Central Terminal',
        address: 'New York, NY 10017',
      },
    ],
  },
  {
    state: 'Virginia',
    stores: [
      {
        store: 'Fallon Florist',
        street: '23 Church St.',
        address: 'Roanoke, VA',
      },
      {
        store: 'Over The Moon Bookstore & Artisan Gallery',
        street: "5798 Three Notch'd Road",
        address: 'Crozet, VA  22932',
        phone: '608 - 355 - 9488',
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
                    <h3>{store}</h3>
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
