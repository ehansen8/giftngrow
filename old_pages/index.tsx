import { Button, Grid } from '@mui/material'
import Hero from '../src/components/Hero'
import { Divider } from '@mui/material'
import Image from 'next/image'
import Typography from '@mui/material/Typography'

export default function Home() {
  return (
    <>
      <Hero />
      <main className='rounded-md'>
        <Grid
          container
          className='content'
          justifyContent='space-evenly'
          maxWidth='1000px'
          sx={{ margin: 'auto' }}
          columns={{ xs: 6, sm: 6 }}
          gap={2}
        >
          <Grid
            item
            xs={5}
            className='callout'
          >
            <h2>What is a Gift 'n Grow Wrap?</h2>
            <div className='bordered-image float-left mr-5 pb-2'>
              <Image
                alt=''
                src='/passiton.jpg'
                width={148}
                height={88}
              />
            </div>
            <Typography
              variant='body2'
              paragraph
            >
              It is repurposed, upcycled fabric that is made into reusable gift
              wrap. As an added feature, you are able to track your wraps
              journey online. It's also a fun way to help the environment and to
              see the positive impact you can make by reducing paper waste.
              Inside every wrap, you'll find an ID code. Use it to log into our
              website and participate in your wrap's journey.
            </Typography>
            <Typography
              variant='body2'
              paragraph
            >
              People are looking for ways to "Go Green" and help protect the
              environment. Gift 'n Grow does this!
            </Typography>
            <Typography
              variant='body2'
              paragraph
            >
              By purchasing and passing on Gift 'n Grow reusable gift wrap, you
              can help the environment by...
            </Typography>
            <Typography
              variant='body2'
              paragraph
            >
              <ul className='flex flex-col gap-2'>
                <li>
                  <strong>It saves trees!</strong> Imagine how many trees will
                  be saved by using and passing on sustainable gift wrap.
                </li>
                <li>
                  <strong>It saves energy and resources!</strong> Reusing
                  repurposed gift wrap uses less energy and helps preserve our
                  forests.
                </li>
                <li>
                  <strong>It reduces waste!</strong> It keeps paper from going
                  into the landfills and reduces pollution from manufacturing.
                  <Typography
                    variant='caption'
                    display='block'
                  >
                    It is estimated that approximately 4.6 million lbs. of
                    wrapping paper is produced in the U.S. each year, and that
                    about{' '}
                    <strong className='text-black'>2.3 million pounds</strong>{' '}
                    ends its life in landfills.
                  </Typography>
                </li>
              </ul>
              <strong>So, Pass it on!!!</strong>
            </Typography>

            <div className='flex justify-center'>
              <Button
                variant='outlined'
                href='/passiton.aspx'
              >
                Learn more
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={5}
            className='callout'
          >
            <h2>Wholesale Opportunities</h2>
            <Typography
              variant='body2'
              paragraph
            >
              You too can encourage your customer to purchase with a purpose, by
              offering our gift wraps. More people are looking for ways to make
              a difference and "Gift 'n Grow" does that with our gift wraps.
              Your customers will also enjoy tracking their gift wraps journey
              online as it makes its way around the neighborhood, city, state,
              or country. They are available in a variety of sizes and designs.
            </Typography>
          </Grid>
        </Grid>
      </main>
    </>
  )
}
