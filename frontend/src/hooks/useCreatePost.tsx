import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

interface CreatePost {
  title: string
  content: string
  userId: number
}

export const useCreatePost = () => {
  return async (data: CreatePost) => {
    try {
      const response = await api.post('auth/posts', data)
      console.log('post succesfully created!', response.data.data)
      return response.data.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }
}
