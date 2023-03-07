import {
  Typography,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  Box,
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
      className='rounded-md mt-4 flex flex-row'
      style={{ backgroundColor: 'white' }}
    >
      <Box
        className='w-1/2 rounded-l-md p-5'
        sx={{ bgcolor: '#006a68' }}
      >
        <Typography
          marginBottom={2}
          variant='h4'
          color='white'
          textAlign='center'
        >
          Track Your Wrap
        </Typography>
        <Typography
          color='white'
          variant='body1'
          component='div'
        >
          <p>
            At <span className='font-ds text-xl'>Gift 'n Grow</span> we are
            passionate about helping the environment and bringing people
            together, one wrap and bag at a time!
          </p>
          <p>
            Imagine the special moments and fond memories accumulated in each
            wrap or bag as it fulfills a special purpose time and time again.
            Log in, write a message and watch to see how far your Gift will
            Grow! Simply enter the code found on the inside of your wrap or bag
            to see the message, its history and follow its journey. You may
            write a thank you to the original gift giver.
          </p>
        </Typography>
        Signup Here
        <Typography
          marginBottom={2}
          variant='h6'
          color='white'
          textAlign='center'
        >
          Why create an account?
        </Typography>
        <Typography>
          Creating your own account will enable you to receive emails to track
          your wrap or bags journey. Each time the item is passed on you will
          receive an e-mail notification that it has traveled. You will be able
          to click on a link and see the log of its journey. We will not sell or
          share your email. Please see the privacy policy.
        </Typography>
        <Typography>Your Codes</Typography>
        <Typography>
          Note: If you do not have an account, this page is designed to use
          "cookies" to remember the code(s) you registered on your computer.
          Some browsers and software may delete the cookie used to store this
          information, so writing your bag codes down helps ensure you're able
          to follow their trail.
        </Typography>
        <Typography>
          When you have an account, any codes previously entered will no longer
          appear below until you sign in. Please remember to sign in before you
          register a wrap or bag or pass it on, so it gets recorded on your
          account. Here's a list of codes already registered on this computer:
          Please write down your bag code(s) so you can check back to track
          their progress.
        </Typography>
      </Box>
      <div
        className='flex flex-wrap flex-col gap-3 content-center mx-auto p-4'
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
