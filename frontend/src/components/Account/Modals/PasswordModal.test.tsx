import { customRender } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { PasswordModal } from './PasswordModal'
import { screen, waitFor } from '@testing-library/react'

describe('Change password modal', () => {
  let cancelButton: HTMLButtonElement
  let saveButton: HTMLButtonElement
  let passwordInput: HTMLInputElement
  let confirmPasswordInput: HTMLInputElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    customRender(<PasswordModal />)
    cancelButton = screen.getByText(/cancel/i)
    saveButton = screen.getByText(/save/i)
    passwordInput = screen.getByLabelText(/new password/i)
    confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    user = userEvent.setup()
  })

  it('renders the password change modal', () => {
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
  })

  it('accepts password user input', async () => {
    await user.type(passwordInput, 'mock_password')

    await waitFor(() => {
      expect(passwordInput).toHaveValue('mock_password')
    })
  })

  it('accepts confirm password user input', async () => {
    await user.type(confirmPasswordInput, 'mock_password')

    await waitFor(() => {
      expect(confirmPasswordInput).toHaveValue('mock_password')
    })
  })
})
