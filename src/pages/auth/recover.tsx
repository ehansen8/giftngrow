import { Typography, Button, TextField, Alert, Snackbar } from '@mui/material'
import dynamic from 'next/dynamic'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { sendRecoveryCode } from '../../services/sendRecoveryCode'
import { confirmForgotPassword } from '../../services/confirmForgotPassword'
import NewPasswordField from '../../components/auth/NewPasswordField'

function Recover() {
  const buttonWidth = '250'
  const router = useRouter()
  const defaultEmail = router.query.email as string | undefined
  const isMigrated = router.query.isMigrated as boolean | undefined
  const [email, setEmail] = useState(defaultEmail ?? '')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )
  //On a redirect here, The code will have already been triggered only if email is populated
  const [open, setOpen] = useState(!!defaultEmail)

  async function handleNewCode() {
    const error = verifyNewCode(email)
    setErrorMessage(error)
    if (!error) {
      const res = await sendRecoveryCode({ email: email })
      if (res.ok) {
        // Display success toast
        setOpen(true)
      }
      setErrorMessage(res.error)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const error = verifySubmission(email, code, password, isValid)
    setErrorMessage(error)
    if (!error) {
      const res = await confirmForgotPassword({
        email: email,
        code: code,
        password: password,
      })
      if (res.ok) {
        router.push('/auth/login')
      }
      setErrorMessage(res.error)
    }
  }
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
          Reset Password
        </Typography>
        <Typography
          fontSize={12}
          textAlign='center'
        >
          {isMigrated && 'Your account requires a password reset. '}
          Please enter the code sent to your email.
        </Typography>
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
            defaultValue={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          ></TextField>
          <TextField
            InputProps={{ className: 'rounded-full' }}
            size='small'
            label='Recovery Code'
            type='text'
            autoComplete='one-time-code'
            onInput={(e) => setCode((e.target as HTMLInputElement).value)}
          ></TextField>
          <NewPasswordField
            label='New Password'
            password={password}
            setPassword={setPassword}
            setIsValid={setIsValid}
          />
          <Button
            className='rounded-full'
            variant='contained'
            color='secondary'
            onClick={handleNewCode}
          >
            Get Code
          </Button>
          <Button
            className='rounded-full'
            variant='contained'
            type='submit'
          >
            Continue
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity='info'
          >
            {`New recovery code sent to ${email}`}
          </Alert>
        </Snackbar>
      </div>
    </main>
  )
}

function verifySubmission(
  email: string,
  code: string,
  password: string,
  isValid: boolean,
) {
  if (!email) {
    return 'Missing Email'
  }

  if (!code) {
    return 'Missing Code'
  }

  if (!password) {
    return 'Missing Password'
  }

  if (!isValid) {
    return 'Password Criteria Not Met'
  }
}

function verifyNewCode(email: string) {
  if (!email) {
    return 'Missing Email'
  }
}

export default dynamic(() => Promise.resolve(Recover), {
  ssr: false,
})
