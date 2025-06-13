import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useCallback } from 'react'

interface QueryProps {
  page: string
  search: string
}

export const useGetPosts = () => {
  return useCallback(async (query: QueryProps) => {
    try {
      const queryString =
        query.page &&
        `page=${query.page}`.concat(query.search && `&search=${query.search}`)
      const response = await api.get(`/posts?${queryString}`)
      return response.data
    } catch (err) {
      parseErrorMessage(err)
    }
  }, [])
}
