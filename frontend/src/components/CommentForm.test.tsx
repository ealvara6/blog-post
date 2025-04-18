import { customRender } from '@/utils/test-utils'
import { vi } from 'vitest'
import { CommentForm } from './CommentForm'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('create comment', () => {
  const mockSetCurrentComments = vi.fn()
  let contentInput: HTMLInputElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    vi.clearAllMocks()
    customRender(
      <CommentForm postId={1} setCurrentComments={mockSetCurrentComments} />,
    )
    contentInput = screen.getByPlaceholderText(/add a comment/i)
    user = userEvent.setup()
  })

  it('renders the comment form component', () => {
    expect(contentInput).toBeInTheDocument()
  })

  it('displays the cancel and submit button when the content input is focused', async () => {
    await user.click(contentInput)

    expect(await screen.findByText(/cancel/i))
    expect(await screen.findByText(/comment/i))
  })

  it('add user input into the content input field', async () => {
    await user.type(contentInput, 'mock comment')

    expect(contentInput.value).toEqual('mock comment')
  })

  it('disables the submit button when no input is given', async () => {
    await user.click(contentInput)
    expect(screen.getByText(/comment/i)).toBeDisabled()
  })

  it('enables the submit button when user input is given', async () => {
    await user.type(contentInput, 'mock comment')

    expect(screen.getByText(/comment/i)).not.toBeDisabled()
  })
})
