import { Typography, IconButton } from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import CloseIcon from '@mui/icons-material/Close'
import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { useTrackingStore } from '../../../stores/trackingStore'
import { useGetCodesQuery } from '../../../queries/getCodesQuery'
import { useUserAPI } from '../../../hooks/useUserAPI'

export function ActiveCodeButton({
  setSearching,
}: {
  setSearching: () => void
}) {
  const { activeCode, setActiveCode } = useTrackingStore()
  const { data: codes, refetch: refetchCodes } = useGetCodesQuery()
  const userAPI = useUserAPI()

  const isSaved = codes?.some(({ code }) => code === activeCode)
  async function handleSaveCode() {
    if (isSaved) {
      await userAPI.deleteTrackingCode(activeCode)
    } else {
      await userAPI.addTrackingCode(activeCode)
    }
    refetchCodes()
  }

  return (
    <Box
      className='rounded-full mb-3 border-solid border-2 justify-center'
      textAlign='center'
      sx={{
        borderColor: 'primary.main',
        backgroundColor: 'inherit',
        margin: 'auto',
        display: 'flex',
        maxWidth: 'fit-content',
        width: '100%',
      }}
    >
      <IconButton onClick={handleSaveCode}>
        {isSaved ? (
          <Tooltip
            title='Remove from Saved Codes'
            arrow
          >
            <StarIcon color='primary' />
          </Tooltip>
        ) : (
          <Tooltip
            title='Save This Code'
            arrow
          >
            <StarOutlineIcon color='primary' />
          </Tooltip>
        )}
      </IconButton>
      <Typography
        variant='h6'
        margin='auto'
        color='black'
      >
        Tracking Code:
      </Typography>
      <Button
        variant='text'
        onClick={setSearching}
      >
        <Typography
          sx={{ textDecoration: 'underline' }}
          variant='h6'
          margin='auto'
          color='black'
        >
          {activeCode}
        </Typography>
      </Button>
      <IconButton
        className='ml-4'
        onClick={() => setActiveCode('')}
      >
        <Tooltip
          title='Clear Code'
          arrow
        >
          <CloseIcon sx={{ color: 'black' }} />
        </Tooltip>
      </IconButton>
    </Box>
  )
}
