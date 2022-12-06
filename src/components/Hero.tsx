import { Grid, Stack, Button, Box } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import HeroStepper from './HeroStepper'

const images = {
  0: '/PurchaseBanner.jpg',
  1: '/recordYourID.jpg',
  2: '/watchItGrow.jpg',
}

export default function Hero() {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0)
  const handleStep = (step: 0 | 1 | 2) => {
    setActiveStep(step)
  }

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
          className='rounded-md'
          src={images[activeStep]}
          alt='banner'
          fill
          style={{ objectFit: 'cover' }}
        />
      </Grid>
      <HeroStepper
        activeStep={activeStep}
        handleClick={handleStep}
      />
    </Grid>
  )
}
