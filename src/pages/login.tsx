import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { colors } from '../colors'
import { useState } from 'react'
import { User } from '../lib/entities/user.entity'
import { GoogleButton } from '../components/GoogleButton'
import dynamic from 'next/dynamic'

function Login() {
  const buttonWidth = '250'
  return (
    <main
      className='p-4 rounded-md mt-4'
      style={{ backgroundColor: 'white' }}
    >
      <div
        className='flex flex-wrap flex-col gap-2 content-center m-auto'
        style={{ maxWidth: buttonWidth + 'px' }}
      >
        <Typography
          variant='h5'
          textAlign='center'
          color='primary'
        >
          Login
        </Typography>
        <GoogleButton width={buttonWidth} />
        <Button
          className='rounded-full'
          variant='outlined'
        >
          Continue with Facebook
        </Button>
        <Divider>or</Divider>
        <TextField
          InputProps={{ className: 'rounded-full' }}
          size='small'
          label='Email address'
        ></TextField>
        <div className='flex justify-between'>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={<Typography fontSize={12}>Remember Me</Typography>}
          />
          <Button
            sx={{ textTransform: 'none' }}
            variant='text'
          >
            <Typography variant='caption'>Forgot Password?</Typography>
          </Button>
        </div>
        <Button
          className='rounded-full'
          variant='contained'
        >
          Continue
        </Button>

        <Link
          className='mt-5'
          fontSize={14}
          fontStyle='italic'
          color='primary'
          href='#'
          textAlign='center'
        >
          Register Bag without login
        </Link>
      </div>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Login), {
  ssr: false,
})
