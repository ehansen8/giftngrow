import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'
import { Dancing_Script } from '@next/font/google'

const ds = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
})

const pages = ['Home', 'Shop', 'Wholesale', 'Stores', 'Blog', 'Press']

export default function NavBar() {
  return (
    <header>
      <AppBar
        position='sticky'
        sx={{ backgroundColor: 'green' }}
      >
        <Toolbar disableGutters={false}>
          <Typography
            variant='h3'
            component='div'
            sx={{ flexGrow: 1 }}
            className={ds.className}
          >
            Gift 'n Grow
          </Typography>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ color: 'white' }}
            >
              {page}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </header>
  )
}
