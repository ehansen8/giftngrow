import { Typography, Button } from '@mui/material'
import Alert from '@mui/material/Alert'

export function NoBagsView({ handleClick }: { handleClick: () => void }) {
  return (
    <div className='flex flex-col items-center gap-3 mt-3'>
      <Alert
        severity='info'
        variant='outlined'
      >
        Looks like you have no registered tracking codes. To get started, click
        the button below!
      </Alert>

      <Button
        variant='outlined'
        onClick={handleClick}
      >
        <Typography
          variant='button'
          fontSize={15}
        >
          Enter Code
        </Typography>
      </Button>
    </div>
  )
}
