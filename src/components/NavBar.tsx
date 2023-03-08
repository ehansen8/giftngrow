import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  SxProps,
} from '@mui/material'
import { Dancing_Script } from '@next/font/google'
import Link from 'next/link'
import { useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { NextRouter, useRouter } from 'next/router'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

const ds = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
})

const pages = [
  { label: 'Home', url: 'https://giftngrow.square.site/' },
  { label: 'Admin', url: '/admin' },
  { label: 'Track Codes', url: '/tracking' },
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

export default function NavBar({
  childNav,
}: {
  childNav: JSX.Element | undefined
}) {
  const { status } = useSession()
  const router = useRouter()
  const activeLink = (url: string) => (router.pathname === url ? 'active' : '')
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const navRef = useRef<HTMLButtonElement | null>(null)
  const handleOpenNavMenu = () => {
    setAnchorElNav(navRef.current)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

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
        <Image
          src='/gng_logo.svg'
          alt='giftngrow logo'
          width={80}
          height={80}
        />
        {/* <Typography
          variant='h3'
          component='div'
          sx={{ flexGrow: 1, color: colors.primary }}
          //className='logo' //ds.className
          className={ds.className}
        >
          Gift 'n Grow
        </Typography> */}

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
