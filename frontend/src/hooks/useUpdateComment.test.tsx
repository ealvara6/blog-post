import { mockComments } from '@/__mocks__/mockComments'
import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useUpdateComment } from './useUpdateComment'

vi.mock('@/api/axios')

const mockedAxiosUpdate = api.put as unknown as ReturnType<typeof vi.fn>
const mockedHandleErrors = parseErrorMessage as unknown as ReturnType<
  typeof vi.fn
>

vi.mock('@/utils/parseErrorMessage', () => ({
  parseErrorMessage: vi.fn(),
}))

describe('call comment api update', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('successfully updates a comment', async () => {
    mockedAxiosUpdate.mockResolvedValue({
      data: { data: { ...mockComments[0], content: 'updated content' } },
    })

    const { result } = renderHook(() => useUpdateComment())

    const updatedComment = await result.current({
      content: 'updated content',
      commentId: 101,
    })

    expect(updatedComment).toEqual({
      ...mockComments[0],
      content: 'updated content',
    })
  })

  it('handles unexpected errors gracefully', async () => {
    mockedAxiosUpdate.mockRejectedValue(new Error('unknown error'))
    mockedHandleErrors.mockImplementation(() => {
      throw 'failed to update comment'
    })

    const { result } = renderHook(() => useUpdateComment())

    await expect(
      result.current({ content: 'updated content', commentId: 1 }),
    ).rejects.toBe('failed to update comment')
  })
})
