import { Button, Grid } from '@mui/material'
import Hero from '../components/Hero'
import { Divider } from '@mui/material'
import Image from 'next/image'

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
          columns={{ xs: 6, sm: 12 }}
        >
          <Grid
            item
            xs={5}
            className='callout'
          >
            <h1>What is a Gift 'n Grow Gift Bag, Gift Box or Gift Tag?</h1>
            <div className='bordered-image float-left mr-5 pb-2'>
              <Image
                alt=''
                src='/passiton.jpg'
                width={148}
                height={88}
              />
            </div>
            <p>
              <span style={{ fontSize: 16 }}>
                It's an eco-friendly, 100% recycled paper gift bag or recycled
                gift box that is made in the USA. As an added feature, you are
                able to track your bag or box's journey online. &nbsp;It's also
                a fun way to help the environment and to see the positive impact
                you can make by reducing paper waste. &nbsp;Inside every bag or
                box, you'll find &nbsp;an I.D. code. Use it to log into our
                website and participate in your bag's or box's journey. We now
                have gift tags that grow... wildflowers!!!!
              </span>
            </p>
            <div className='flex justify-center'>
              <Button
                variant='outlined'
                href='/passiton.aspx'
              >
                Learn more
              </Button>
            </div>
            <p>&nbsp;</p>
            <p>
              <span
                className='Apple-style-span'
                style={{ fontSize: 14 }}
              >
                <b>
                  <br />
                </b>
              </span>
            </p>
          </Grid>
          <Divider
            flexItem
            variant='middle'
            orientation='vertical'
            sx={{ display: { xs: 'none' } }}
          />
          <Grid
            item
            xs={5}
            className='callout'
          >
            <h1>10% of net profits donated to plant trees!</h1>
            <div className='float-left mr-5'>
              <Image
                alt=''
                src='/tree.jpg'
                width={148}
                height={88}
              />
            </div>
            <p>
              <span style={{ fontSize: 16 }}>
                Purchasing a 100% recycled Gift 'n Grow gift bag or recycled
                gift box saves trees, water, landfill space, oil and
                electricity. Passing it on helps even more.
              </span>
            </p>
            <p>
              <span style={{ fontSize: 16 }}>
                Gift 'n Grow takes it another step further and makes your gift
                grow by donating a full 10% of net profits to forestry
                organizations for new tree plantings. The recycled gift bags and
                recycled gift boxes that keep on giving.
              </span>
            </p>
            <div className='flex justify-center'>
              <Button
                variant='outlined'
                href='/PlantingTrees.aspx'
              >
                Learn more
              </Button>
            </div>
            <p style={{ marginBottom: 10 }}>
              <strong>Wholesale Opportunities:</strong>
            </p>
            <p style={{ marginBottom: 10 }}>
              You too can encourage your customer to purchase with a pupose, by
              offering our recycled gift bags and recycled gift boxes and gift
              tags that grow! More people are looking for ways to "Go Green" and
              "Gift 'n Grow" does that with our eco-friendly gift bags,
              eco-friendly gift boxes and tags. All made in the USA. Your
              customers will also enjoy tracking their gift bag's or gift box's
              journey online as it makes its way around the neighborhood, city,
              state, or country. They are available in a variety of sizes and
              designs and are perfect for any occasion.&nbsp;
            </p>
          </Grid>
        </Grid>
      </main>
    </>
  )
}