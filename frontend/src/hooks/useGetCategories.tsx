import api from '@/api/axios'
import { useCallback } from 'react'

export const useGetCategories = () => {
  return useCallback(async () => {
    const response = await api.get('/categories')
    return response.data.categories
  }, [])
}
