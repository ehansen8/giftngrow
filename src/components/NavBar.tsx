import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
} from '@mui/material'
import { Dancing_Script } from '@next/font/google'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { colors } from '../colors'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'

const ds = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
})

const pages = [
  { label: 'Home', url: '/' },
  { label: 'Shop', url: '/shop' },
  { label: 'Wholesale', url: '/wholesale' },
  { label: 'Stores', url: '/stores' },
  { label: 'Track Codes', url: '/tracking' },
]

const buttonStyle = {
  color: colors.greenLightGreen,
  fontSize: 15,
  '&.active': {
    color: 'white',
  },
}

const menuStyle = {
  color: colors.green,
  fontWeight: 'bold',
  '&.active': {
    backgroundColor: colors.lightGreen,
  },
}

export default function NavBar() {
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
      sx={{ backgroundColor: '#355823' }}
    >
      <Toolbar disableGutters={false}>
        <Typography
          variant='h3'
          component='div'
          sx={{ flexGrow: 1, color: colors.light }}
          //className='logo' //ds.className
          className={ds.className}
        >
          Gift 'n Grow
        </Typography>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            ref={navRef}
            size='large'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            sx={{ color: colors.greenLightGreen }}
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
                  sx={menuStyle}
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
            >
              {page.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
