import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

interface EditUser {
  username: string | undefined
  email: string | undefined
  password: string | undefined
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
