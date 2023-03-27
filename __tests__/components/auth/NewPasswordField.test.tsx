import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewPasswordField from '../../../src/components/auth/NewPasswordField'
import { passwordChecks } from '../../../src/components/auth/NewPasswordField'

describe('NewPasswordField', () => {
  it('should render password field and all password checks', () => {
    render(
      <NewPasswordField
        password=''
        setPassword={jest.fn()}
        setIsValid={jest.fn()}
      />,
    )

    const passwordField = screen.getByLabelText(/password/i)
    const checks = screen.getAllByRole('listitem')
    expect(passwordField).toBeInTheDocument()
    expect(checks.length).toBe(passwordChecks.length)
  })

  it('should render correct typed in value', async () => {
    const password = 'invalid'
    render(
      <NewPasswordField
        password=''
        setPassword={jest.fn()}
        setIsValid={jest.fn()}
      />,
    )

    // Test invalid password
    const passwordField = screen.getByLabelText<HTMLInputElement>(/password/i)
    await userEvent.type(passwordField, password)
    expect(passwordField.value).toBe(password)
  })

  it('should call setPassword and setIsValid when password is changed', async () => {
    const setPasswordMock = jest.fn()
    const setIsValidMock = jest.fn()
    const password = 'Valid1234$'

    render(
      <NewPasswordField
        password=''
        setPassword={setPasswordMock}
        setIsValid={setIsValidMock}
      />,
    )

    await userEvent.type(screen.getByLabelText(/password/i), password)

    expect(setPasswordMock).toHaveBeenCalledWith(password)
    expect(setIsValidMock).toHaveBeenCalledWith(true)
  })
})
