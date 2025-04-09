import mockPosts from '@/__mocks__/mockPosts'
import api from '@/api/axios'
import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useCreatePost } from './useCreatePost'
import handleErrors from '@/utils/handleErrors'

vi.mock('@/api/axios')
vi.mock('@/utils/handleErrors')

const mockFormdata = {
  title: 'mock_title',
  content: 'mock_content',
  userId: 1,
}

const mockedAxiosCreate = api.post as unknown as ReturnType<typeof vi.fn>
const mockedhandleErrors = handleErrors as unknown as ReturnType<typeof vi.fn>

describe('call blog post api create', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('successfully creates a post', async () => {
    mockedAxiosCreate.mockResolvedValue({ data: { data: mockPosts[0] } })
    const { result } = renderHook(() => useCreatePost())

    const createdPost = await result.current(mockFormdata)
    console.log(createdPost)

    expect(createdPost).toEqual(mockPosts[0])
  })

  it('handles unexpected errors gracefully', async () => {
    mockedAxiosCreate.mockRejectedValue(new Error('unknown error'))
    mockedhandleErrors.mockImplementation(() => {
      throw 'Failed to create post'
    })

    const { result } = renderHook(() => useCreatePost())

    await expect(result.current(mockFormdata)).rejects.toBe(
      'Failed to create post',
    )
  })
})
