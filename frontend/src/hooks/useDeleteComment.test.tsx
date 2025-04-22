import { mockComment } from '@/__mocks__/mockComments'
import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useDeleteComment } from './useDeleteComment'

vi.mock('@/api/axios')
vi.mock('@/utils/handleErrors')
const MOCK_COMMENT_ID = 1

const mockedAxiosDelete = api.delete as unknown as ReturnType<typeof vi.fn>
const mockedHandledErrors = parseErrorMessage as unknown as ReturnType<
  typeof vi.fn
>
vi.mock('@/utils/parseErrorMessage', () => ({
  parseErrorMessage: vi.fn(),
}))

describe('call api comment delete', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('successfully deletes a comment', async () => {
    mockedAxiosDelete.mockResolvedValue({
      data: { message: 'Comment successfully deleted', data: mockComment[0] },
    })

    const { result } = renderHook(() => useDeleteComment())
    const deletedComment = await result.current(MOCK_COMMENT_ID)

    expect(deletedComment).toEqual(mockComment[0])
  })

  it('handles unexpected errors gracefully', async () => {
    mockedAxiosDelete.mockRejectedValue(new Error('unknown error'))
    mockedHandledErrors.mockImplementation(() => {
      throw 'Failed to delete comment'
    })

    const { result } = renderHook(() => useDeleteComment())

    expect(result.current(MOCK_COMMENT_ID)).rejects.toBe(
      'Failed to delete comment',
    )
  })
})
