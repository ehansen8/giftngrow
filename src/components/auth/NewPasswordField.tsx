import { Typography, TextField } from '@mui/material'

const passwordChecks = [
  {
    test: (p: string) => p.toUpperCase() != p,
    label: 'Password must contain a lower case letter',
  },
  {
    test: (p: string) => p.toLowerCase() != p,
    label: 'Password must contain an upper case letter',
  },
  {
    test: (p: string) => /\d/.test(p),
    label: 'Password must contain a number',
  },
  {
    test: (p: string) => p.length >= 8,
    label: 'Password must contain at least 8 characters',
  },
  {
    test: (p: string) => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(p),
    label: 'Password must contain a special character',
  },
  {
    test: (p: string) => p.trim() === p,
    label: 'Password must not contain a leading or trailing space',
  },
]

export default function NewPasswordField({
  label,
  password,
  setPassword,
  setIsValid,
}: {
  label?: string
  password: string
  setPassword: (pw: string) => void
  setIsValid: (b: boolean) => void
}) {
  setIsValid(true)
  return (
    <>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label={label ?? 'Password'}
        type='password'
        autoComplete='new-password'
        onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
      ></TextField>
      {passwordChecks.map((check, idx) => {
        const pass = check.test(password)
        if (!pass) {
          setIsValid(false)
        }
        return (
          <Typography
            key={idx}
            color={pass ? 'success' : 'error'}
            fontSize={12}
          >
            {check.label}
          </Typography>
        )
      })}
    </>
  )
}
