import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  Button,
  Badge,
  Divider,
  MenuItem,
  Menu,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { colors } from '../colors'
import { useState, useRef } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import PublicIcon from '@mui/icons-material/Public'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { UseQueryResult } from 'react-query'
import { TrackingCode } from '../lib/entities/trackingCode.entity'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function TrackingAppBar({
  codesQuery,
  handleMenuClick,
}: {
  codesQuery: UseQueryResult<TrackingCode[], AxiosError>
  handleMenuClick: (code: string) => void
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
          className='flex justify-start gap-4'
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
              Code History
              <ExpandMoreIcon />
            </Button>
          </Badge>
        </Box>
        <Menu
          open={!!anchorEl}
          onClose={handleCloseDropdown}
          anchorEl={anchorEl}
          //keepMounted={true}
        >
          {/** //TODO- center buttons  */}
          <MenuItem className='m-auto'>
            <Typography
              textAlign='center'
              width='100%'
            >
              Add Code
            </Typography>
          </MenuItem>
          <Divider variant='middle' />
          <CodeList
            codesQuery={codesQuery}
            handleClick={handleMenuClick}
          />
        </Menu>
        <Typography
          sx={{ flex: '1 1 0' }}
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
  if (!data) {
    return <></>
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
