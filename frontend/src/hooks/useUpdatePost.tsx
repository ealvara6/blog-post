import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

interface EditPost {
  id: number
  title: string
  content: string
  userId: number | undefined
}

export const useEditPost = () => {
  return async (data: EditPost) => {
    try {
      const response = await api.put(`auth/posts/${data.id}`, data)
      console.log('post succesfully edited!', response.data.data)
      return response.data.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }
}
