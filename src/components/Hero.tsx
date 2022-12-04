import { Grid, Stack, Button } from '@mui/material'
export default function Hero() {
  return (
    <Grid
      container
      id='hero'
      sx={{
        width: '100%',
        height: '200px',
        backgroundColor: 'red',
      }}
    >
      <Grid
        xs={7}
        sx={{ height: '100%', backgroundColor: 'blue' }}
      >
        Hello
      </Grid>
      <Grid
        xs
        sx={{ backgroundColor: 'green' }}
      >
        <div className='w-full h-full flex flex-col-reverse justify-between'>
          <Button
            color='primary'
            variant='contained'
            className='justify-self-center'
          >
            A
          </Button>
          <Button
            color='primary'
            variant='contained'
          >
            B
          </Button>
          <Button
            color='primary'
            variant='contained'
          >
            C
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}
/**<ul>
        <li className='active'>
          <a href='https://www.giftngrow.com/Catalog/ViewCatalog.aspx'>
            <span style={{ color: 'rgb(138, 192, 186)' }}>1</span>
            <h2>Purchase</h2>
            <p>
              Eco-friendly, reusable gift bags and boxes. Made in USA from 100%
              recycled materials.
            </p>
          </a>
          <div style={{ display: 'block' }} />
        </li>
        <li className=''>
          <a href='https://www.giftngrow.com/BagRegistration.aspx'>
            <span style={{ color: 'rgb(171, 213, 160)' }}>2</span>
            <h2>Log in I.D.</h2>
            <p>
              Enter the I.D. found inside of a gift bag or gift box to record
              when you receive or give it.
            </p>
          </a>
          <div style={{ display: 'none' }} />
        </li>
        <li className=''>
          <a href='https://www.giftngrow.com/EnterCode.aspx'>
            <span style={{ color: 'rgb(171, 213, 160)' }}>3</span>
            <h2>Watch it Grow!</h2>
            <p>
              Follow the trail of your gift bag or gift box to see where it has
              been.
            </p>
          </a>
          <div style={{ display: 'none' }} />
        </li>
      </ul> */
