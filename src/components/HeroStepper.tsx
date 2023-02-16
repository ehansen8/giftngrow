import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Card, CardActionArea, CardContent, Chip } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Link from 'next/link'

const steps = [
  {
    label: 'Purchase',
    url: '/shop',
    description: 'Repurposed/upcycled, reusable gift wraps.',
  },
  {
    label: 'Register Gift Wrap',
    url: '/tracking',
    description:
      'Enter the ID found inside of a gift wrap to record when you receive or give it.',
  },
  {
    label: 'Videos',
    url: '#',
    description: 'View ways of wrapping with Gift ‘n Grow wrap.',
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
