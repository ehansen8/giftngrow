import {
  Typography,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material'
import dynamic from 'next/dynamic'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { GoogleButton } from '../../components/GoogleButton'
import { useRouter } from 'next/router'
import { sendRecoveryCode } from '../../services/sendRecoveryCode'
import { sendCofirmationCode } from '../../services/sendConfirmationCode'

function Login() {
  const buttonWidth = '250'
  return (
    <main
      className='p-4 rounded-md mt-4'
      style={{ backgroundColor: 'white' }}
    >
      <div
        className='flex flex-wrap flex-col gap-3 content-center m-auto'
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
      </div>
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
    //TODO: if error -> display error and retry
    // Else: redirect to tracking or home page or wherever

    const error = verifyLoginForm(email, password)
    setErrorMessage(error)
    if (!error) {
      const res = await signIn('cognito', {
        email: email,
        password: password,
        redirect: false,
      })
      if (!res?.error) {
        router.push('/tracking')
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
      className='flex flex-wrap flex-col gap-3 content-center m-auto'
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
