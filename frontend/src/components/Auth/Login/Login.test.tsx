import { mockFormData } from '@/__mocks__/mockFormData'
import { customRender } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Login } from '../AuthButtons'
import { screen } from '@testing-library/react'

describe('Login', () => {
  let user: ReturnType<typeof userEvent.setup>
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement

  beforeEach(() => {
    vi.clearAllMocks()
    customRender(<Login />)
    user = userEvent.setup()
    emailInput = screen.getByPlaceholderText('email')
    passwordInput = screen.getByPlaceholderText('password')
  })

  it('renders the login form component', () => {
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByLabelText('Password:')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/signup')
  })

  it('accepts user input', async () => {
    await user.type(emailInput, mockFormData.email)
    await user.type(passwordInput, mockFormData.password)

    expect(emailInput).toHaveValue('mock@gmail.com')
    expect(passwordInput).toHaveValue('mock_password')
  })
})
