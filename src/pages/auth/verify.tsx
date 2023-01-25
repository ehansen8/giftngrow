import { Typography, Button, TextField, Snackbar } from '@mui/material'
import dynamic from 'next/dynamic'
import { FormEvent, useState } from 'react'
import { confirmUser } from '../../services/confirmUser'
import { useRouter } from 'next/router'
import { sendCofirmationCode } from '../../services/sendConfirmationCode'
import { Alert } from '@mui/lab'

function Verify() {
  const buttonWidth = '250'
  const router = useRouter()
  const defaultEmail = router.query.email as string | undefined
  const [email, setEmail] = useState(defaultEmail ?? '')
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )
  const [open, setOpen] = useState(!!defaultEmail)

  async function handleNewCode() {
    const error = verifyNewCode(email)
    setErrorMessage(error)
    if (!error) {
      const res = await sendCofirmationCode({ email: email })
      if (res.ok) {
        // Display success toast
        setOpen(true)
      }
      setErrorMessage(res.error)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const error = verifySubmission(email, code)
    setErrorMessage(error)
    if (!error) {
      const res = await confirmUser({
        email: email,
        code: code,
      })
      if (res.ok) {
        router.push('/login')
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
          Confirm Account
        </Typography>
        <Typography fontSize={12}>
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
            label='Confirmation Code'
            type='text'
            autoComplete='one-time-code'
            onInput={(e) => setCode((e.target as HTMLInputElement).value)}
          ></TextField>
          <Button
            className='rounded-full'
            variant='contained'
            color='info'
            onClick={handleNewCode}
          >
            Get New Code
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
            {`New confirmation code sent to ${email}`}
          </Alert>
        </Snackbar>
      </div>
    </main>
  )
}

function verifySubmission(email: string, code: string) {
  if (!email) {
    return 'Missing Email'
  }

  if (!code) {
    return 'Missing Code'
  }
}

function verifyNewCode(email: string) {
  if (!email) {
    return 'Missing Email'
  }
}

export default dynamic(() => Promise.resolve(Verify), {
  ssr: false,
})
