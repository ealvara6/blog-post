import { mockFormData } from '@/__mocks__/mockFormData'
import { signupMock } from '@/__mocks__/useAuth'
import { customRender } from '@/utils/test-utils'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Signup from './Signup'
import { screen } from '@testing-library/react'

describe('Sign up form integration', () => {
  let user: ReturnType<typeof userEvent.setup>
  let usernameInput: HTMLInputElement
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let passwordConfirmInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  beforeEach(() => {
    vi.clearAllMocks()
    customRender(<Signup />)
    user = userEvent.setup()
    usernameInput = screen.getByPlaceholderText('username')
    emailInput = screen.getByPlaceholderText('email')
    passwordInput = screen.getByPlaceholderText('password')
    passwordConfirmInput = screen.getByPlaceholderText('Confirm Password')
    submitButton = screen.getByRole('button', { name: /Sign up/i })
  })

  it('successfully signs up a user', async () => {
    await user.type(usernameInput, mockFormData.username)
    await user.type(emailInput, mockFormData.email)
    await user.type(passwordInput, mockFormData.password)
    await user.type(passwordConfirmInput, 'mock_password')
    await user.click(submitButton)

    expect(signupMock).toHaveBeenCalled()
  })

  it('returns an error when user enters invalid inputs', async () => {
    await user.type(usernameInput, mockFormData.username)
    await user.type(emailInput, mockFormData.email)
    await user.type(passwordInput, mockFormData.password)
    await user.type(passwordConfirmInput, 'incorrect_password')
    await user.click(submitButton)
    expect(signupMock).toHaveBeenCalled()
    expect(await screen.findByText(/Invalid input/i))
  })

  it('disables and re-enables sign up button while sign up is being proccessed', async () => {
    await user.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/signing up.../i)).toBeInTheDocument()

    waitFor(() => {
      expect(submitButton).not.toBeDisabled()
      expect(screen.getByText(/sign up/i)).toBeInTheDocument()
    })
  })

  it('should handle unexpected errors gracefully', async () => {
    signupMock.mockRejectedValue(new Error('Unexpected error'))
    await user.type(usernameInput, mockFormData.username)
    await user.type(emailInput, mockFormData.email)
    await user.type(passwordInput, mockFormData.password)
    await user.type(passwordConfirmInput, 'mock_password')

    await user.click(submitButton)

    expect(await screen.findByText(/Unexpected error/i)).toBeInTheDocument()
  })
})
