import {
  Typography,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  Box,
  Grid,
} from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CheckIcon from '@mui/icons-material/Check'
import dynamic from 'next/dynamic'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { GoogleButton } from '../../components/GoogleButton'
import { useRouter } from 'next/router'
import { sendRecoveryCode } from '../../services/sendRecoveryCode'
import { sendCofirmationCode } from '../../services/sendConfirmationCode'

const bullets = [
  "Never miss a beat: Each time your item is passed on, you'll receive an email notification that it's traveled.",
  "Keep tabs on its journey: With a simple click on a link, you can view a detailed log of your item's journey.",
  'Stay organized: Keep all your tracked items in one convenient location by creating an account.',
]

function Login() {
  const buttonWidth = '250'
  return (
    <main
      className='rounded-md mt-4 flex flex-row box-border'
      style={{ backgroundColor: 'white' }}
    >
      <Grid container>
        <Grid
          item
          className='rounded-l-md p-5'
          sx={{ bgcolor: '#006a68' }}
          xs={12}
          sm={6}
        >
          <Typography
            marginBottom={2}
            variant='h5'
            color='white'
            textAlign='center'
          >
            Why create an account?
          </Typography>
          <List>
            {bullets.map((text, idx) => {
              return (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <CheckIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    color='primary'
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
              )
            })}
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          alignContent='center'
          display='flex'
          flexDirection='column'
          className='flex-wrap gap-3 p-4'
        >
          <Typography
            variant='h5'
            textAlign='center'
            color='primary'
          >
            Login
          </Typography>
          <GoogleButton width={buttonWidth} />
          <Divider>or</Divider>
          <LoginForm />
          <div className='text-center'>
            Need an account?
            <Link
              className='ml-3 no-underline'
              fontSize={14}
              color='primary'
              href='/auth/signup'
            >
              Sign Up
            </Link>
          </div>
        </Grid>
      </Grid>
    </main>
  )
}

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const error = verifyLoginForm(email, password)
    setErrorMessage(error)
    if (!error) {
      const res = await signIn('cognito', {
        email: email,
        password: password,
        redirect: false,
      })
      if (!res?.error) {
        router.push('/')
        return
      }
      if (res?.error === 'User is not confirmed.') {
        sendCofirmationCode({ email: email })
        router.push(
          { pathname: '/auth/verify', query: { email: email } },
          '/auth/verify',
        )
        return
      }
      if (res?.error === 'Password reset required for the user') {
        sendRecoveryCode({ email: email })
        router.push(
          {
            pathname: '/auth/recover',
            query: { email: email, isMigrated: true },
          },
          '/auth/verify',
        )
        return
      }
      setErrorMessage(res?.error)
    }
  }
  return (
    <form
      className='flex flex-wrap flex-col gap-3 content-center'
      onSubmit={handleSubmit}
    >
      <Typography
        color='error'
        fontSize={12}
        textAlign='center'
      >
        {errorMessage}
      </Typography>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='Email'
        type='email'
        autoComplete='email'
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
      />
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='Password'
        type='password'
        autoComplete='current-password'
        onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
      />
      <div className='flex justify-between'>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label={<Typography fontSize={12}>Remember Me</Typography>}
        />
        <Link
          fontSize={14}
          color='primary'
          href='/auth/recover'
          className='m-auto no-underline'
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        className='rounded-full'
        variant='contained'
        type='submit'
      >
        Continue
      </Button>
    </form>
  )
}

function verifyLoginForm(email: string, password: string) {
  if (!email) {
    return 'Missing Email'
  }

  if (!password) {
    return 'Missing Password'
  }
}

export default dynamic(() => Promise.resolve(Login), {
  ssr: false,
})
