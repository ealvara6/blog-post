import { customRender } from '@/utils/test-utils'
import { UserNameModal } from './UsernameModal'
import { vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('change username modal', () => {
  const mockSetIsOpen = vi.fn()
  let cancelButton: HTMLButtonElement
  let saveButton: HTMLButtonElement
  let userInput: HTMLInputElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    customRender(<UserNameModal setIsOpen={mockSetIsOpen} />)
    cancelButton = screen.getByText(/cancel/i)
    saveButton = screen.getByText(/save/i)
    userInput = screen.getByRole('textbox')
    user = userEvent.setup()
  })

  it('renders the username change modal', () => {
    expect(screen.getByText(/new username/i)).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
  })

  it('disables save button when no input is given', () => {
    expect(userInput).toHaveValue('')
    expect(saveButton).toBeDisabled()
  })

  it('enables save button when input is given', async () => {
    await user.type(userInput, 'newUsername')

    waitFor(() => {
      expect(saveButton).not.toBeDisabled()
    })
  })
})
