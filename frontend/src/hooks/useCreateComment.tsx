import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const useCreateComment = () => {
  return async (data: { content: string; userId: number; postId: number }) => {
    try {
      const response = await api.post(
        `/auth/posts/${data.postId}/comments`,
        data,
      )
      console.log(response.data)
      console.log('comment succesfully added!', response.data.data)
      return response.data.data
    } catch (err) {
      console.log(err)
      parseErrorMessage(err)
    }
  }
}
