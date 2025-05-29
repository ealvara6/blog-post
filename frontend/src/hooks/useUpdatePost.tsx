import api from '@/api/axios'
import { Category } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

interface EditPost {
  id: number
  title: string
  content: string
  categories: Category[]
  userId: number | undefined
}

export const useUpdatePost = () => {
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
