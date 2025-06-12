import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useCallback } from 'react'

export const useGetPosts = () => {
  return useCallback(async (page: string) => {
    try {
      const response = await api.get(`/posts?page=${page}`)
      return response.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }, [])
}
