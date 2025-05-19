import api from '@/api/axios'

export const useDeleteUser = () => {
  return async (id: number) => {
    const response = await api.delete(`auth/users/${id}`)
    console.log('user successfully deleted', response.data.data)
    return response.data
  }
}
