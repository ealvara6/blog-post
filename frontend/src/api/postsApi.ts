import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export interface GetPostsQuery {
  page?: string
  search?: string
  categoryId?: string
}

export const getPosts = async (query?: GetPostsQuery) => {
  try {
    const params = new URLSearchParams()
    if (query?.page) params.set('page', query.page)
    if (query?.search) params.set('search', query.search)
    if (query?.categoryId) params.set('categoryId', query.categoryId)

    const response = await api.get(`/posts?${params.toString()}`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getPostById = async (postId: number) => {
  try {
    const response = await api.get(`/posts/${postId}`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
