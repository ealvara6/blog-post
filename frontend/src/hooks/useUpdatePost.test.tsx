import { mockPosts } from '@/__mocks__/mockPosts'
import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useUpdatePost } from './useUpdatePost'

vi.mock('@/api/axios')

const mockedAxiosUpdate = api.put as unknown as ReturnType<typeof vi.fn>
const mockedHandleErrors = parseErrorMessage as unknown as ReturnType<
  typeof vi.fn
>
const mockUpdateData = {
  id: 1,
  title: 'mock_title',
  content: 'mock_content',
  userId: 1,
}

vi.mock('@/utils/parseErrorMessage', () => ({
  parseErrorMessage: vi.fn(),
}))

describe('call post api update', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('successfully updates a post', async () => {
    mockedAxiosUpdate.mockResolvedValue({
      data: { data: { ...mockPosts[0], title: 'updated title' } },
    })
    const { result } = renderHook(() => useUpdatePost())

    const updatedPost = await result.current({
      ...mockUpdateData,
      title: 'updated title',
    })

    expect(updatedPost).toEqual({ ...mockPosts[0], title: 'updated title' })
  })

  it('handles unexpected errors gracefully', async () => {
    mockedAxiosUpdate.mockRejectedValue(new Error('unknown error'))
    mockedHandleErrors.mockImplementation(() => {
      throw 'failed to update post'
    })

    const { result } = renderHook(() => useUpdatePost())

    await expect(result.current(mockUpdateData)).rejects.toBe(
      'failed to update post',
    )
  })
})
