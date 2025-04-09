import api from '@/api/axios'
import handleErrors from '@/utils/handleErrors'
import { AxiosError } from 'axios'

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
    } catch (err: unknown) {
      const error = err as AxiosError<{ errors: string }>
      handleErrors(error)
    }
  }
}
