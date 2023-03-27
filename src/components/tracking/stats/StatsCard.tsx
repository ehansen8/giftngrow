import { Typography, Card, CardContent } from '@mui/material'

export interface StatsCardProps {
  card: { value: number; body: string }
}

export function StatsCard({ card }: StatsCardProps): JSX.Element {
  return (
    <Card
      sx={{
        backgroundColor: '#4a607b',
        aspectRatio: '1/1',
        height: '100%',
        color: 'white',
      }}
      elevation={4}
      className='rounded-full'
    >
      <CardContent className='!p-2 h-full rounded-full'>
        <div className='flex flex-col items-center h-full justify-center'>
          <Typography
            fontSize={18}
            variant='h6'
            className=''
          >
            {card.value}
          </Typography>
          <Typography
            variant='body1'
            textAlign='center'
            noWrap
            className='mb-4'
          >
            {card.body}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}
