import api from '@/api/axios'
import handleErrors from '@/utils/handleErrors'
import { AxiosError } from 'axios'

export const useDeletePost = () => {
  return async (id: number) => {
    try {
      const response = await api.delete(`auth/posts/${id}`)
      console.log('post successfully deleted!', response.data.data)
      return response.data.data
    } catch (err: unknown) {
      const error = err as AxiosError<{ errors: string }>
      handleErrors(error)
    }
  }
}
