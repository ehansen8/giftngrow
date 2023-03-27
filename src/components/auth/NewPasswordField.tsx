import {
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

export const passwordChecks = [
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
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPassword = e.target.value
    setPassword(newPassword)
    const isPasswordValid = checkPasswordValidity(newPassword)
    setIsValid(isPasswordValid)
  }

  const checkPasswordValidity = (password: string) => {
    return passwordChecks.every((check) => check.test(password))
  }
  return (
    <>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label={label ?? 'Password'}
        type='password'
        autoComplete='new-password'
        onInput={handlePasswordChange}
      />
      <List>
        {passwordChecks.map((check, idx) => {
          const color = check.test(password) ? 'success' : 'error'

          return (
            <ListItem
              key={idx}
              disablePadding
            >
              <ListItemIcon className='min-w-0 mr-3'>
                {color == 'error' ? (
                  <CloseIcon color={color} />
                ) : (
                  <CheckIcon color={color} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={check.label}
                color='error'
                primaryTypographyProps={{ color: color }}
              />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
