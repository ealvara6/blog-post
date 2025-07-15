import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useCallback } from 'react'

interface QueryProps {
  page?: string
  search?: string
  categoryId?: string
}

export const useGetPosts = () => {
  return useCallback(async (query?: QueryProps) => {
    try {
      if (!query) {
        const response = await api.get('/posts')
        return response.data
      }
      const params = new URLSearchParams(location.search)
      if (query.page) params.set('page', query.page)
      if (query.search) params.set('search', query.search)
      if (query.categoryId) params.set('categoryId', query.categoryId)

      const queryString = params.toString()
      const response = await api.get(`/posts?${queryString}`)
      return response.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }, [])
}
