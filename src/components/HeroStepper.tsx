import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Card, CardActionArea, CardContent, Chip } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const steps = [
  {
    label: 'Purchase',
    description:
      'Eco-friendly, reusable gift bags and boxes. Made in USA from 100% recycled materials.',
  },
  {
    label: 'Register',
    description:
      'Enter the ID found inside of a gift bag or gift box to record when you receive or gift it.',
  },
  {
    label: 'Watch it Grow!',
    description:
      'Follow the trail of your gift bag or gift box to see where it has been.',
  },
]

export default function HeroStepper({
  activeStep,
  handleClick,
}: {
  activeStep: number
  handleClick: (idx: number) => void
}) {
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
            <CardActionArea onClick={() => handleClick(index)}>
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
