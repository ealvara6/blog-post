import api from '@/api/axios'
import { useCallback } from 'react'

export const useGetUserPosts = () => {
  return useCallback(async (id: number) => {
    const response = await api.get(`auth/users/${id}/posts`)
    console.log(response)
    return response.data.data
  }, [])
}
