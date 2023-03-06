import {
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material'
import dynamic from 'next/dynamic'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { createUser } from '../../services/createUser'
import NewPasswordField from '../../components/auth/NewPasswordField'

function SignUp() {
  const buttonWidth = '300'
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
          Sign Up
        </Typography>
        <SignUpForm />
      </div>
    </main>
  )
}

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [given_name, setGivenName] = useState('')
  const [family_name, setFamilyName] = useState('')
  const [agreement, setAgreement] = useState(false)
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const error = verifySignupForm(
      email,
      given_name,
      password,
      isValid,
      agreement,
    )
    setErrorMessage(error)
    if (!error) {
      const res = await createUser({
        email: email,
        password: password,
        given_name: given_name,
        family_name: family_name,
      })
      if (res.ok) {
        router.push(
          { pathname: '/auth/verify', query: { email: email } },
          '/auth/verify',
        )
      }
      setErrorMessage(res.error)
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
      ></TextField>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='First Name'
        type='text'
        autoComplete='given-name'
        onInput={(e) => setGivenName((e.target as HTMLInputElement).value)}
      ></TextField>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='Last Name'
        type='text'
        autoComplete='family-name'
        onInput={(e) => setFamilyName((e.target as HTMLInputElement).value)}
      ></TextField>
      <NewPasswordField
        password={password}
        setPassword={setPassword}
        setIsValid={setIsValid}
      />
      <FormControlLabel
        name='Terms'
        onInput={(e) => setAgreement((e.target as HTMLInputElement).checked)}
        control={<Checkbox />}
        label={
          <Typography fontSize={12}>
            I am 13 years of age or older and agree to the{' '}
            <Link href='https://giftngrow.square.site/privacy-policy'>
              privacy policy
            </Link>{' '}
            and{' '}
            <Link href='https://giftngrow.square.site/privacy-policy'>
              terms of use
            </Link>
          </Typography>
        }
      />

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

function verifySignupForm(
  email: string,
  given_name: string,
  password: string,
  isValid: boolean,
  agreement: boolean,
) {
  if (!email) {
    return 'Missing Email'
  }
  if (!given_name) {
    return 'Missing First Name'
  }

  if (!password) {
    return 'Missing Password'
  }

  if (!isValid) {
    return 'Password Criteria Not Met'
  }

  if (!agreement) {
    return 'Terms and Conditions Must Be Accepted'
  }
}

export default dynamic(() => Promise.resolve(SignUp), {
  ssr: false,
})
