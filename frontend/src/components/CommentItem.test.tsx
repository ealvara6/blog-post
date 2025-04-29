import { customRender } from '@/utils/test-utils'
import { vi } from 'vitest'
import { CommentItem } from './CommentItem'
import { mockComments } from '@/__mocks__/mockComments'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const MOCK_INDEX = 1
const MOCK_DATE = new Date()
const MOCK_SET_CURRENT_COMMENTS = vi.fn()

vi.mock('@/api/axios', () => ({
  default: {
    delete: vi.fn(),
  },
}))

describe('Comment Item Component', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    vi.clearAllMocks()
    user = userEvent.setup()
  })

  it('renders the comment item component', () => {
    customRender(
      <CommentItem
        comment={mockComments[0]}
        index={MOCK_INDEX}
        date={MOCK_DATE}
        setCurrentComments={MOCK_SET_CURRENT_COMMENTS}
      />,
    )
    expect(screen.getByText(/mock_username/i)).toBeInTheDocument()
    expect(screen.getByText(/mock_content/i)).toBeInTheDocument()
    expect(screen.getByText(/created at:/i)).toBeInTheDocument()
  })

  it('does not render the update or delete button when the user is not authorized to modify the comment', () => {
    customRender(
      <CommentItem
        comment={mockComments[2]}
        index={MOCK_INDEX}
        date={MOCK_DATE}
        setCurrentComments={MOCK_SET_CURRENT_COMMENTS}
      />,
    )
    waitFor(() => {
      expect(screen.getByText(/edit/i)).not.toBeInTheDocument()
      expect(screen.getByText(/delete/i)).not.toBeInTheDocument()
    })
  })

  it('delete the comment when the user clicks on the delete button', async () => {
    customRender(
      <CommentItem
        comment={mockComments[0]}
        index={MOCK_INDEX}
        date={MOCK_DATE}
        setCurrentComments={MOCK_SET_CURRENT_COMMENTS}
      />,
    )
    await user.click(screen.getByText(/delete/i))

    waitFor(() => {
      expect(screen.getByText(/mock_username/i)).not.toBeInTheDocument()
    })
  })

  it('opens the edit form when user clicks on the edit button', async () => {
    customRender(
      <CommentItem
        comment={mockComments[0]}
        index={MOCK_INDEX}
        date={MOCK_DATE}
        setCurrentComments={MOCK_SET_CURRENT_COMMENTS}
      />,
    )
    await user.click(screen.getByText(/edit/i))

    waitFor(() => {
      expect(screen.getByPlaceholderText(/mock_content/i)).toBeInTheDocument()
      expect(screen.getByText(/save/i)).toBeInTheDocument()
    })
  })
})
