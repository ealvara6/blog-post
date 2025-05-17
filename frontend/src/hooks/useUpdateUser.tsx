import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export interface EditUser {
  username: string
  email: string
  password: string
}

export const useUpdateUser = () => {
  return async (id: number | undefined, data: EditUser) => {
    try {
      const response = await api.put(`auth/users/${id}`, data)
      console.log('user successfully updated!', response.data)
      return response.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }
}
