import { Grid, Stack, Button, Box } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import HeroStepper from './HeroStepper'

const images = ['/PurchaseBanner.jpg', '/recordYourID.jpg', '/watchItGrow.jpg']

export default function Hero() {
  const [activeStep, setActiveStep] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveStep((s) => (s + 1) % 3)
    }, 8000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Grid
      container
      className='hero flex py-4 items-stretch space-x-2 justify-center'
    >
      <Grid
        item
        xs={12}
        md={5}
        className='relative mx-2'
        style={{
          aspectRatio: 560 / 300,
          maxWidth: '560px',
          maxHeight: '300px',
        }}
      >
        <Image
          key={activeStep}
          className='rounded-md toggleIn'
          src={images[activeStep]}
          alt='banner'
          fill
          priority={true}
          style={{ objectFit: 'cover' }}
        />
      </Grid>
      <HeroStepper activeStep={activeStep} />
    </Grid>
  )
}
