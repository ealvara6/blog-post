import { mockPosts } from '@/__mocks__/mockPosts'
import api from '@/api/axios'
import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { useGetPost } from './useGetPost'

vi.mock('@/api/axios')
vi.mock('@/utils/handleErrors')

const mockedAxiosGet = api.get as unknown as ReturnType<typeof vi.fn>
const MOCK_POST_ID = '1'

describe('call blog post api by id', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retrives blog post by id', async () => {
    mockedAxiosGet.mockResolvedValue({ data: { post: mockPosts[0] } })

    const { result } = renderHook(() => useGetPost(MOCK_POST_ID))

    await waitFor(() => {
      expect(result.current.post).toEqual(mockPosts[0])
    })
  })

  it('handles loading state correctly', async () => {
    mockedAxiosGet.mockResolvedValue({ data: { post: mockPosts[0] } })

    const { result } = renderHook(() => useGetPost(MOCK_POST_ID))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
  })

  it('handles unexpected errors gracefully', async () => {
    mockedAxiosGet.mockRejectedValue(new Error('unknown error'))

    const { result } = renderHook(() => useGetPost(MOCK_POST_ID))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.post).toEqual(null)
  })
})
