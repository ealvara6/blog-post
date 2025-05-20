import api from '@/api/axios'
import { useCallback } from 'react'

export const useGetUserComments = () => {
  return useCallback(async (id: number) => {
    const response = await api.get(`auth/users/${id}/comments`)
    return response.data.data
  }, [])
}
