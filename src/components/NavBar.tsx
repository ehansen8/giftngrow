import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  SxProps,
} from '@mui/material'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { NextRouter, useRouter } from 'next/router'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

const pages = [
  { label: 'Home', url: 'https://giftngrow.square.site/' },
  { label: 'Track Codes', url: '/' },
]

const buttonStyle: SxProps = {
  fontSize: 15,
  borderRadius: '0px',
  '&.active': {
    borderBottom: '2px solid!important',
  },
}

const menuButtonStyle: SxProps = {
  fontWeight: 'bold',
  '&.active': {
    border: '1px solid',
  },
}

const validUsers = [
  'ehansen8@wisc.edu',
  'evanjhans@gmail.com',
  'cmtsmartin@hotmail.com',
  'team@giftngrow.com',
  'ecmtsmartin5@gmail.com',
]

export default function NavBar({
  childNav,
}: {
  childNav: JSX.Element | undefined
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const activeLink = (url: string) => (router.pathname === url ? 'active' : '')
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const navRef = useRef<HTMLButtonElement | null>(null)

  const [isAdmin, setIsAdmin] = useState(false)

  const handleOpenNavMenu = () => {
    setAnchorElNav(navRef.current)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  useEffect(() => {
    if (validUsers.includes(session?.user?.email as string)) {
      setIsAdmin(true)
    }
  }, [setIsAdmin, session?.user?.email])

  return (
    <AppBar
      elevation={6}
      position='sticky'
      sx={{ backgroundColor: 'white' }} //'#355823'
    >
      <Toolbar
        disableGutters={false}
        className='flex flex-row justify-between'
      >
        <a
          href='https://giftngrow.square.site/'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            src='/gng_logo.svg'
            alt='giftngrow logo'
            width={80}
            height={80}
          />
        </a>

        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            ref={navRef}
            size='large'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='primary'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <div
              className='flex flex-col'
              style={{
                height: '100%',
              }}
            >
              {pages.map((page) => (
                <Button
                  className={activeLink(page.url)}
                  key={page.url}
                  onClick={handleCloseNavMenu}
                  LinkComponent={Link}
                  href={page.url}
                  sx={menuButtonStyle}
                  target={page.label == 'Home' ? '_blank' : ''}
                >
                  {page.label}
                </Button>
              ))}
            </div>
          </Menu>
        </Box>
        <Box
          className='test'
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {pages.map((page) => (
            <Button
              className={activeLink(page.url)}
              key={page.url}
              href={page.url}
              sx={buttonStyle}
              LinkComponent={Link}
              color='primary'
              target={page.label == 'Home' ? '_blank' : ''}
            >
              {page.label}
            </Button>
          ))}
          {isAdmin && (
            <Button
              className={activeLink('/admin')}
              key='admin'
              href='/admin'
              sx={buttonStyle}
              LinkComponent={Link}
              color='primary'
            >
              Admin
            </Button>
          )}
          <AuthButton
            router={router}
            status={status}
            activeClass={activeLink('/auth/login')}
          />
        </Box>
      </Toolbar>
      {childNav}
    </AppBar>
  )
}

const AuthButton = ({
  router,
  status,
  activeClass,
}: {
  router: NextRouter
  status: string
  activeClass: string
}) => {
  if (status === 'authenticated') {
    return (
      <Button
        className={activeClass}
        sx={buttonStyle}
        color='primary'
        onClick={async () => {
          const { url } = await signOut({
            callbackUrl: '/auth/login',
            redirect: false,
          })
          router.push(url)
        }}
      >
        Logout
      </Button>
    )
  }

  return (
    <Button
      className={activeClass}
      href={'/auth/login'}
      sx={buttonStyle}
      LinkComponent={Link}
      color='primary'
    >
      Login
    </Button>
  )
}
