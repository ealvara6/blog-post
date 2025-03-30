import { mockFormData } from '@/__mocks__/mockFormData'
import { mockedNavigate } from '@/__mocks__/react-router-dom'
import { loginMock } from '@/__mocks__/useAuth'
import { customRender } from '@/utils/test-utils'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Login from '@/components/Auth/Login/Login'
import { screen } from '@testing-library/react'

describe('Login form integration', () => {
  let user: ReturnType<typeof userEvent.setup>
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  beforeEach(() => {
    vi.clearAllMocks()
    customRender(<Login />)
    user = userEvent.setup()
    emailInput = screen.getByPlaceholderText(/email/i)
    passwordInput = screen.getByPlaceholderText(/password/i)
    submitButton = screen.getByRole('button', { name: /login/i })
  })

  it('successfully logs in user with valid credentials', async () => {
    await user.type(emailInput, mockFormData.email)
    await user.type(passwordInput, mockFormData.password)
    await user.click(submitButton)

    expect(loginMock).toHaveBeenCalledWith('mock@gmail.com', 'mock_password')
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/'))
  })

  it('returns an error when user tries to log in with invalid credentials', async () => {
    await user.type(emailInput, 'incorrect@gmail.com')
    await user.type(passwordInput, 'incorrect_password')
    await user.click(submitButton)

    expect(loginMock).toHaveBeenCalledWith(
      'incorrect@gmail.com',
      'incorrect_password',
    )
    expect(mockedNavigate).not.toHaveBeenCalled()
    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument()
  })

  it('submit button to be disables and re-enabled after submit request has finished', async () => {
    await user.type(emailInput, mockFormData.email)
    await user.type(passwordInput, mockFormData.password)
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/logging in.../i)).toBeInTheDocument()
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
      expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
  })

  it('should handle unexpected errors gracefully', async () => {
    loginMock.mockRejectedValueOnce(new Error('Unexpected error'))
    await user.type(emailInput, mockFormData.email)
    await user.type(passwordInput, mockFormData.password)
    await user.click(submitButton)

    expect(
      await screen.findByText(/An unexpected error occurred/i),
    ).toBeInTheDocument()
  })

  it('shows validation errors when fields are empty', async () => {
    await user.click(submitButton)

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument()
  })
})
