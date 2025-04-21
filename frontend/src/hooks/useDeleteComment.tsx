import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const useDeleteComment = () => {
  return async (id: number) => {
    try {
      const response = await api.delete(`auth/posts/comments/${id}`)
      console.log('comment successfully deleted', response.data.data)
      return response.data.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }
}
