import { loginMock } from '../../__mocks__/useAuth'
import { screen } from '@testing-library/react'
import Login from './Login'
import { it, expect, describe, vi } from 'vitest'
import { customRender } from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'

describe('Login', () => {
  let user: ReturnType<typeof userEvent.setup>
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let loginButton: HTMLButtonElement

  beforeEach(() => {
    vi.clearAllMocks()
    customRender(<Login />)
    user = userEvent.setup()
    emailInput = screen.getByPlaceholderText('email')
    passwordInput = screen.getByPlaceholderText('password')
    loginButton = screen.getByRole('button')
  })

  it('renders the login form component', () => {
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByLabelText('Password:')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/signup')
  })

  it('accepts user input', async () => {
    await user.type(emailInput, 'myemail@gmail.com')
    await user.type(passwordInput, 'mypassword')

    expect(emailInput).toHaveValue('myemail@gmail.com')
    expect(passwordInput).toHaveValue('mypassword')
  })

  it('returns mocked username when valid credentails are submitted', async () => {
    await user.type(emailInput, 'mock@gmail.com')
    await user.type(passwordInput, 'mock_password')
    await user.click(loginButton)

    expect(loginMock).toHaveBeenCalled()
  })
})
