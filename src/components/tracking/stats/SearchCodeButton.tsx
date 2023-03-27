import { Typography, IconButton, Snackbar, Alert } from '@mui/material'
import { useState } from 'react'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import Tooltip from '@mui/material/Tooltip'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useTrackingStore } from '../../../stores/trackingStore'
import { ClickAwayListener } from '@mui/base'
import fetchItem from '../../../services/fetchItem'

export function SearchCodeButton({
  setSearching,
}: {
  setSearching: () => void
}) {
  const { activeCode, setActiveCode } = useTrackingStore()
  const [code, setCode] = useState(activeCode)
  const [errorMessage, setErrorMessage] = useState('')
  const [openToast, setOpenToast] = useState(false)

  function handleInput(value: string) {
    setCode(value.toUpperCase())
  }

  function handleEnter(key: string) {
    if (key === 'Enter') {
      handleSearch()
    }
  }

  async function handleSearch() {
    const err = await validateCode(code)
    if (err) {
      setErrorMessage(err)
      setOpenToast(true)
      return
    }
    setActiveCode(code)
    setSearching()
  }

  return (
    <ClickAwayListener onClickAway={setSearching}>
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
        <Typography
          className='ml-3'
          variant='h6'
          margin='auto'
          color='black'
        >
          Tracking Code:
        </Typography>
        <MuiOtpInput
          mx={2}
          value={code}
          length={6}
          gap='2px'
          sx={{ width: '200px' }}
          onChange={handleInput}
          TextFieldsProps={{
            autoComplete: 'off',
            InputProps: { sx: { height: '35px' } },
            inputProps: { className: 'p-0' },
          }}
          onKeyDown={({ key }) => handleEnter(key)}
        />
        <IconButton onClick={handleSearch}>
          <Tooltip
            title='Search'
            arrow
          >
            <SearchIcon
              color='primary'
              sx={{ height: '32px', width: '32px' }}
            />
          </Tooltip>
        </IconButton>
        <Snackbar
          open={openToast}
          autoHideDuration={4000}
          onClose={() => setOpenToast(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setOpenToast(false)}
            severity='error'
            variant='filled'
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ClickAwayListener>
  )
}

export async function validateCode(code: string) {
  if (!code) {
    return 'Missing Code'
  }
  if (code.length != 6) {
    return 'Code Must Be 6 Characters'
  }

  const res = await fetchItem(code)
  if (res.error) {
    return res.error
  }

  if (!res.data) {
    return 'Invalid Code'
  }

  return ''
}
