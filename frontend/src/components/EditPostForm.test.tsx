import { customRender } from '@/utils/test-utils'
import { vi } from 'vitest'
import { EditPostForm } from './EditPostForm'
import { mockPosts } from '@/__mocks__/mockPosts'
import { screen } from '@testing-library/react'

const mockPost = mockPosts[0]

describe('edit post', () => {
  let titleInput: HTMLElement
  let contentInput: HTMLElement
  let saveButton: HTMLButtonElement

  beforeEach(() => {
    vi.clearAllMocks()
    customRender(
      <EditPostForm
        title={mockPost.title}
        content={mockPost.content}
        id={mockPost.id}
        userId={mockPost.userId}
        categoryIds={[2, 3]}
      />,
    )
    titleInput = screen.getByLabelText(/title:/i)
    contentInput = screen.getByPlaceholderText(/content/i)
    saveButton = screen.getByText(/submit/i)
  })

  it('renders the edit post form component', () => {
    expect(titleInput).toBeInTheDocument()
    expect(contentInput).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
  })

  it('displays the original values of the post in the input fields', () => {
    expect(titleInput).toHaveValue('mock_title')
    expect(contentInput).toHaveValue('mock_content')
  })
})
