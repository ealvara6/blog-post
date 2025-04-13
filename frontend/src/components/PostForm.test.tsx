import { customRender } from '@/utils/test-utils'
import { vi } from 'vitest'
import PostForm from './PostForm'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

vi.mock('/api/axios', () => ({
  defualt: {
    post: vi.fn().mockResolvedValue({ data: { post: { id: 1 } } }),
  },
}))
const MOCK_POST_TITLE = 'mock_title'
const MOCK_POST_CONTENT = 'mock_content'

describe('create post', () => {
  let titleInput: HTMLInputElement
  let bodyInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    vi.clearAllMocks()
    customRender(<PostForm />)
    user = userEvent.setup()
    titleInput = screen.getByPlaceholderText(/title/i)
    bodyInput = screen.getByPlaceholderText(/content/i)
    submitButton = screen.getByRole('button', { name: /create post/i })
  })

  it('renders the post form component', () => {
    expect(titleInput).toBeInTheDocument()
    expect(bodyInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    await user.type(titleInput, MOCK_POST_TITLE)
    await user.type(bodyInput, MOCK_POST_CONTENT)

    expect(titleInput).toHaveValue('mock_title')
    expect(bodyInput).toHaveValue('mock_content')
  })

  it('renders a title error when no title is given when submitted', async () => {
    await user.type(bodyInput, MOCK_POST_CONTENT)
    await user.click(submitButton)

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument()
  })

  it('renders a body error when no body content is given when submitted', async () => {
    await user.type(titleInput, MOCK_POST_TITLE)
    await user.click(submitButton)

    expect(
      await screen.findByText(/please enter a body content/i),
    ).toBeInTheDocument()
  })
})
