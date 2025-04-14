import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const useDeletePost = () => {
  return async (id: number) => {
    try {
      const response = await api.delete(`auth/posts/${id}`)
      console.log('post successfully deleted!', response.data.data)
      return response.data.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }
}
