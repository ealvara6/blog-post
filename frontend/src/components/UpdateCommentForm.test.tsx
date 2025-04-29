import { mockComments } from '@/__mocks__/mockComments'
import { customRender } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { UpdateCommentForm } from './UpdateCommentForm'
import { screen, waitFor } from '@testing-library/react'

const mockComment = mockComments[0]

vi.mock('@/api/axios', () => ({
  default: {
    put: vi.fn().mockResolvedValue({ data: { comment: mockComments[0] } }),
  },
}))

describe('update comment', () => {
  let contentInput: HTMLInputElement
  let saveButton: HTMLInputElement
  let cancelButton: HTMLInputElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    vi.clearAllMocks()

    customRender(
      <UpdateCommentForm
        content={mockComment.content}
        commentId={mockComment.id}
        toggleEdit={vi.fn()}
        setCurrentComments={vi.fn()}
      />,
    )
    user = userEvent.setup()
    contentInput = screen.getByRole('textbox')
    saveButton = screen.getByText(/save/i)
    cancelButton = screen.getByText(/cancel/i)
  })

  it('renders the update comment form', () => {
    expect(contentInput).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  it('renders the comment content as the default value in the input', () => {
    expect(contentInput).toHaveValue('mock_content')
  })

  it('disables the save button when no input is given', async () => {
    await user.click(contentInput)
    await user.clear(contentInput)

    await waitFor(() => {
      expect(saveButton).toBeDisabled()
    })
  })
})
