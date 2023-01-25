import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Card, CardActionArea, CardContent, Chip } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Link from 'next/link'

const steps = [
  {
    label: 'Purchase',
    url: '/shop',
    description:
      'Eco-friendly, reusable gift bags and boxes. Made in USA from 100% recycled materials.',
  },
  {
    label: 'Register',
    url: '/tracking',
    description:
      'Enter the ID found inside of a gift bag or gift box to record when you receive or gift it.',
  },
  {
    label: 'Watch it Grow!',
    url: '#',
    description:
      'Follow the trail of your gift bag or gift box to see where it has been.',
  },
]

export default function HeroStepper({ activeStep }: { activeStep: number }) {
  return (
    <Box
      id='hero-stepper'
      className='flex flex-col justify-between mt-2 md:mt-0 pr-2'
      sx={{ maxHeight: '300px' }}
      gap={1}
    >
      {steps.map((step, index) => {
        const isActive = index == activeStep
        return (
          <Card
            key={step.label}
            className={`hero-card ${isActive ? 'hero-active' : ''}`}
            raised={true}
          >
            <CardActionArea
              LinkComponent={Link}
              href={step.url}
            >
              <CardContent className='flex flex-row items-center py-2'>
                {isActive ? (
                  <ArrowBackIosNewIcon className='mr-2' />
                ) : (
                  <Chip
                    className='mr-2'
                    label={index + 1}
                    variant='filled'
                    color='primary'
                  />
                )}
                <div>
                  <Typography
                    variant='h6'
                    color='secondary.main'
                  >
                    {step.label}
                  </Typography>
                  {step.description}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </Box>
  )
}
