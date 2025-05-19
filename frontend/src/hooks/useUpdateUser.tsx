import api from '@/api/axios'

export interface EditUser {
  username?: string
  email?: string
  password?: string
}

export const useUpdateUser = () => {
  return async (id: number | undefined, data: EditUser) => {
    const response = await api.put(`auth/users/${id}`, data)
    console.log('user successfully updated!', response.data)
    return response.data.updatedUser
  }
}
