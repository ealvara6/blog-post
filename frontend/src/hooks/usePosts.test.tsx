import { renderHook, waitFor } from '@testing-library/react'
import { describe, vi } from 'vitest'
import { usePosts } from './usePosts'
import mockPosts from '@/__mocks__/mockPosts'
import api from '@/api/axios'

vi.mock('@/api/axios')
vi.mock('@/utils/handleErrors', () => ({
  default: vi.fn(),
}))

const mockedAxiosGet = api.get as unknown as ReturnType<typeof vi.fn>

describe('blog posts api call', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('successfully retrieves blog posts', async () => {
    mockedAxiosGet.mockResolvedValue({ data: { posts: mockPosts } })

    const { result } = renderHook(() => usePosts())

    await waitFor(() => {
      expect(result.current.posts).toEqual(mockPosts)
    })
  })

  it('handles loading state correctly', async () => {
    mockedAxiosGet.mockResolvedValue({ data: { posts: mockPosts } })

    const { result } = renderHook(() => usePosts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
  })

  it('handles unexpected errors gracefully', async () => {
    mockedAxiosGet.mockRejectedValue(new Error('unknown error'))

    const { result } = renderHook(() => usePosts())

    await waitFor(() => {
      expect(result.current.posts).toEqual([])
      expect(result.current.loading).toBe(false)
    })
  })
})
