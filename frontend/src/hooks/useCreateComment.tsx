import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const useCreateComment = () => {
  return async (data: { content: string; postId: number | undefined }) => {
    try {
      const response = await api.post(
        `/auth/posts/${data.postId}/comments`,
        data,
      )
      return response.data.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }
}
