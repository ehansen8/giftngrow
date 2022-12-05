import { Grid, Stack, Button, Box } from '@mui/material'
import { Container } from '@mui/system'
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
    <Container className='flex my-4 items-stretch space-x-2 justify-center'>
      <Image
        className='rounded-md'
        src={images[activeStep]}
        alt='banner'
        width={560}
        height={300}
      />
      <HeroStepper
        activeStep={activeStep}
        handleClick={handleStep}
      />
    </Container>
  )
}
