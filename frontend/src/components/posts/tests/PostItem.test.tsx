import { customRender } from '@/utils/test-utils'
import PostItem from './posts/PostItem'
import { vi } from 'vitest'
import { mockPosts, postNoComments } from '@/__mocks__/mockPosts'
import { screen } from '@testing-library/react'

vi.mock('@/utils/handleErrors', () => ({
  default: vi.fn(),
}))

describe('get one post', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    customRender(<PostItem {...mockPosts[0]} />)
  })

  it('renders the retrieved post', async () => {
    expect(await screen.findByText(/mock_title/i)).toBeInTheDocument()
  })

  it('renders the comments of a post if there are any', async () => {
    expect(await screen.findByText(/mock_comment_content/i)).toBeInTheDocument()
  })

  it('return a "no comments found" if there are no comments on a post', async () => {
    customRender(<PostItem {...postNoComments} />)
    expect(await screen.findByText(/no comments found/i)).toBeInTheDocument()
  })
})
