import { mockPosts } from '@/__mocks__/mockPosts'
import api from '@/api/axios'
import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useDeletePost } from './useDeletePost'
import handleErrors from '@/utils/handleErrors'

vi.mock('@/api/axios')
vi.mock('@/utils/handleErrors')
const MOCK_POST_ID = 1

const mockedAxiosDelete = api.delete as unknown as ReturnType<typeof vi.fn>
const mockedhandledErrors = handleErrors as unknown as ReturnType<typeof vi.fn>

describe('call blog post api delete', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('successfully deletes a post', async () => {
    mockedAxiosDelete.mockResolvedValue({
      data: { message: 'Post sucessfully deleted', data: mockPosts[0] },
    })

    const { result } = renderHook(() => useDeletePost())
    const deletedPost = await result.current(MOCK_POST_ID)

    expect(deletedPost).toEqual(mockPosts[0])
  })

  it('handles unexpected errors gracefully', async () => {
    mockedAxiosDelete.mockRejectedValue(new Error('unknown error'))
    mockedhandledErrors.mockImplementation(() => {
      throw 'Failed to delete post'
    })

    const { result } = renderHook(() => useDeletePost())

    expect(result.current(MOCK_POST_ID)).rejects.toBe('Failed to delete post')
  })
})
