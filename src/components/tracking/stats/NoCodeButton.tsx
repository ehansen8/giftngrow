import { Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

export function NoCodeButton({ setSearching }: { setSearching: () => void }) {
  return (
    <Tooltip
      title='Search Tracking Code'
      arrow
    >
      <Button
        className='rounded-full mb-3 border-solid border-2 justify-center'
        sx={{
          textTransform: 'none',
          display: 'flex',
          maxWidth: 'fit-content',
          margin: 'auto',
        }}
        onClick={setSearching}
      >
        <Typography
          marginX={2}
          variant='h6'
          color='black'
        >
          All Tracking Codes
        </Typography>
        <SearchIcon
          color='primary'
          sx={{ height: '32px', width: '32px' }}
        />
      </Button>
    </Tooltip>
  )
}
