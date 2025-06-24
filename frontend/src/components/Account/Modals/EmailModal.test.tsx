import { customRender } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { EmailModal } from './EmailModal'
import { screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

describe('change email modal', () => {
  let cancelButton: HTMLButtonElement
  let saveButton: HTMLButtonElement
  let userInput: HTMLInputElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    customRender(<EmailModal setIsOpen={vi.fn()} />)
    cancelButton = screen.getByText(/cancel/i)
    saveButton = screen.getByText(/save/i)
    userInput = screen.getByRole('textbox')
    user = userEvent.setup()
  })

  it('renders the email change modal', () => {
    expect(screen.getByText(/new email/i)).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    await user.type(userInput, 'mock_email@email.com')

    await waitFor(() => {
      expect(userInput).toHaveValue('mock_email@email.com')
    })
  })
})
