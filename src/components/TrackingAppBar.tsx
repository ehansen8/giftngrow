import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  Button,
  Badge,
  Menu,
  Divider,
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
import { CodeList } from './tracking/CodeList'

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
    <>
      {/* <Divider
        variant='fullWidth'
        //sx={{ bgcolor: 'primary.main' }}
      /> */}
      <AppBar
        className='tracking-bar'
        position='static'
        color='secondary'
      >
        <Toolbar>
          <Box
            className='flex justify-start gap-3'
            sx={{ flex: '1 1 0' }}
          >
            <Badge
              className=''
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={codesQuery.data?.length}
              slotProps={{
                badge: {
                  //@ts-ignore For some reason it doesn't like these properties
                  sx: { color: 'black', backgroundColor: 'white' },
                },
              }}
            >
              <Button
                className='border-black px-1'
                ref={anchorRef}
                onClick={handleOpenDropdown}
                variant='contained'
                aria-haspopup='true'
                sx={{
                  bgcolor: 'primary.light',
                  textTransform: 'none',
                  color: 'black',
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
              className='border-teal-500'
              onClick={handleAddCode}
              variant='contained'
              sx={{
                bgcolor: 'primary.light',
                textTransform: 'none',
                color: 'black',
              }}
            >
              <AddIcon className='mr-1' />
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                Enter Code
              </Box>
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
            //color='primary'
          >
            {user ? `Welcome, ${user?.name}` : 'You are not logged in'}
          </Typography>
          <Box
            className='flex justify-end'
            sx={{ flex: '1 1 0' }}
          >
            {user ? <AccountButton /> : <LoginButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </>
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
