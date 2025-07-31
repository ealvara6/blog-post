import { customRender } from '@/utils/test-utils'
import { UserNameModal } from '@/components/Account/Modals/UsernameModal'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

describe('change username modal', () => {
  let cancelButton: HTMLButtonElement
  let saveButton: HTMLButtonElement
  let userInput: HTMLInputElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    customRender(<UserNameModal setIsOpen={vi.fn()} />)
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

  it('accepts user input', async () => {
    await user.type(userInput, 'mock_username')

    await waitFor(() => {
      expect(userInput).toHaveValue('mock_username')
    })
  })
})
