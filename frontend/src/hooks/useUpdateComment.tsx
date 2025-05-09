import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const useUpdateComment = () => {
  return async ({
    content,
    commentId,
  }: {
    content: string
    commentId: number
  }) => {
    try {
      const response = await api.put(`/auth/posts/comments/${commentId}`, {
        content: content,
      })
      return response.data.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }
}
