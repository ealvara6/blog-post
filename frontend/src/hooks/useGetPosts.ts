import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useCallback } from 'react'

export const useGetPosts = () => {
  return useCallback(async () => {
    try {
      const response = await api.get('/posts')
      return response.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }, [])
}
