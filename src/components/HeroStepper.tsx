import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Icon,
  StepButton,
  StepIcon,
  useTheme,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { colors } from '../pages/_app'

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
  activeStep: 0 | 1 | 2
  handleClick: (idx: 0 | 1 | 2) => void
}) {
  return (
    <Box
      className='flex flex-col justify-between'
      sx={{ maxHeight: '300px' }}
    >
      {steps.map((step, index) => {
        const isActive = index == activeStep
        return (
          <Card
            key={step.label}
            className={isActive ? 'hero-active' : ''}
            sx={{
              backgroundColor: colors.light,
              borderRadius: 6,
              width: '335px',
            }}
            raised={true}
          >
            <CardActionArea onClick={() => handleClick(index as 0 | 1 | 2)}>
              <CardContent className='h-full flex flex-row items-center space-x-2 py-2'>
                {isActive ? (
                  <ArrowBackIosNewIcon />
                ) : (
                  <Chip
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
