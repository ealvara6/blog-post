import { mockComment } from '@/__mocks__/mockComments'
import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useCreateComment } from './useCreateComment'

vi.mock('@/api/axios')
vi.mock('@/utils/handleErrors')
const mockFormData = {
  content: 'mock_content',
  userId: 1,
  postId: 2,
}

const mockedAxiosCreate = api.post as unknown as ReturnType<typeof vi.fn>
const mockedHandleErrors = parseErrorMessage as unknown as ReturnType<
  typeof vi.fn
>

vi.mock('@/utils/parseErrorMessage', () => ({
  parseErrorMessage: vi.fn(),
}))

describe('call comment api create', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('successfully creates a comment', async () => {
    mockedAxiosCreate.mockResolvedValue({ data: { data: mockComment[0] } })
    const { result } = renderHook(() => useCreateComment())

    const createdComment = await result.current(mockFormData)

    expect(createdComment).toEqual(mockComment[0])
  })

  it('handles unexpected errors gracefully', async () => {
    mockedAxiosCreate.mockRejectedValue(new Error('unknown error'))
    mockedHandleErrors.mockImplementation(() => {
      throw 'Failed to create comment'
    })

    const { result } = renderHook(() => useCreateComment())

    await expect(result.current(mockFormData)).rejects.toBe(
      'Failed to create comment',
    )
  })
})
