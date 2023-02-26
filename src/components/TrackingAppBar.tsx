import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  Button,
  Badge,
  MenuItem,
  Menu,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { colors } from '../colors'
import { useState, useRef } from 'react'
import PublicIcon from '@mui/icons-material/Public'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { UseQueryResult } from 'react-query'
import { TrackingCode } from '../lib/entities/trackingCode.entity'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function TrackingAppBar({
  codesQuery,
  handleMenuClick,
  handleAddCode,
}: {
  codesQuery: UseQueryResult<TrackingCode[], AxiosError>
  handleMenuClick: (code: string) => void
  handleAddCode: () => void
}) {
  const { data: session } = useSession()
  const user = session?.user
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const handleOpenDropdown = () => {
    setAnchorEl(anchorRef.current)
  }

  const handleCloseDropdown = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      component='div'
      position='static'
    >
      <Toolbar>
        <Box
          className='flex justify-start gap-2'
          sx={{ flex: '1 1 0' }}
        >
          <Badge
            className=''
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            badgeContent={codesQuery.data?.length}
            slotProps={{
              badge: {
                //@ts-ignore For some reason it doesn't like these properties
                sx: { color: colors.darkGreen, backgroundColor: 'white' },
              },
            }}
          >
            <Button
              className='border-black px-1'
              ref={anchorRef}
              onClick={handleOpenDropdown}
              variant='outlined'
              aria-haspopup='true'
              sx={{
                textTransform: 'none',
                color: 'black',
                borderColor: 'black',
                '&:hover': { borderColor: 'black' },
              }}
            >
              <PublicIcon className='mr-1' />
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                Code History
              </Box>
              <ExpandMoreIcon />
            </Button>
          </Badge>
          <Button
            className='border-black'
            onClick={handleAddCode}
            variant='outlined'
            sx={{
              textTransform: 'none',
              color: 'black',
              borderColor: 'black',
              '&:hover': { borderColor: 'black' },
            }}
          >
            <AddIcon className='mr-1' />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>Enter Code</Box>
          </Button>
          <Menu
            open={!!anchorEl}
            onClose={handleCloseDropdown}
            anchorEl={anchorEl}
            //keepMounted={true}
          >
            <CodeList
              codesQuery={codesQuery}
              handleClick={handleMenuClick}
            />
          </Menu>
        </Box>

        <Typography
          sx={{ flex: '1 1 0', display: { xs: 'none', sm: 'block' } }}
          variant='h6'
          noWrap
          component='div'
          textAlign='center'
        >
          {user ? `Welcome, ${user?.name}` : '{No User Message}'}
        </Typography>
        <Box
          className='flex justify-end'
          sx={{ flex: '1 1 0' }}
        >
          {user ? <AccountButton /> : <LoginButton />}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const buttonStyle = {
  fontSize: 15,
  backgroundColor: colors.greenLightGreen,
  '&:hover': {
    backgroundColor: colors.light,
  },
}

const LoginButton = () => (
  <Button
    className='rounded-full'
    variant='contained'
    LinkComponent={Link}
    href={'/auth/login'}
    sx={buttonStyle}
  >
    Login
  </Button>
)

const AccountButton = () => (
  <IconButton
    size='large'
    edge='end'
    aria-label='account settings'
    aria-haspopup='true'
    color='inherit'
  >
    <AccountCircle />
  </IconButton>
)

function CodeList({
  codesQuery,
  handleClick,
}: {
  codesQuery: UseQueryResult<TrackingCode[], AxiosError>
  handleClick: (code: string) => void
}) {
  const { data, isLoading, isError, error } = codesQuery
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  if (!data || data.length == 0) {
    return (
      <span
        className='text-center'
        style={{ width: '100px', display: 'block' }}
      >
        No Codes
      </span>
    )
  }

  return (
    <>
      {data.map(({ code }) => (
        <MenuItem
          key={code}
          onClick={() => handleClick(code)}
        >
          {code}
        </MenuItem>
      ))}
    </>
  )
}
