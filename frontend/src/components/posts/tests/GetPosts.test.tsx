import { customRender } from '@/utils/test-utils'
import { vi } from 'vitest'
import GetPosts from '../GetPosts'
import { mockPosts } from '@/__mocks__/mockPosts'
import { screen } from '@testing-library/react'

describe('get posts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    customRender(
      <GetPosts
        posts={mockPosts}
        pageInfo={{ currentPage: '1', total: 1, totalPage: 1 }}
      />,
    )
  })

  it('renders the retrieved posts', async () => {
    expect(await screen.findByText('mock_title')).toBeInTheDocument()
    expect(await screen.findByText('mock_title 2')).toBeInTheDocument()
  })
})
