import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { customRender } from '../../../utils/test-utils'
import Signup from './Signup'
import userEvent from '@testing-library/user-event'
import { mockFormData } from '../../../__mocks__/mockFormData'

describe('sign up', () => {
  let usernameInput: HTMLInputElement
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let confirmPasswordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    vi.clearAllMocks()
    customRender(<Signup />)
    user = userEvent.setup()
    usernameInput = screen.getByPlaceholderText('username')
    emailInput = screen.getByPlaceholderText('email')
    passwordInput = screen.getByPlaceholderText('password')
    confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    submitButton = screen.getByRole('button', { name: /sign up/i })
  })

  it('renders the sign up form component', () => {
    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    await user.type(usernameInput, mockFormData.username)
    await user.type(emailInput, 'mock@gmail.com')
    await user.type(passwordInput, mockFormData.password)
    await user.type(confirmPasswordInput, 'mock_password')

    expect(usernameInput).toHaveValue('mock_username')
    expect(emailInput).toHaveValue('mock@gmail.com')
    expect(passwordInput).toHaveValue('mock_password')
    expect(confirmPasswordInput).toHaveValue('mock_password')
  })
})
