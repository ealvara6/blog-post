import api from '@/api/axios'
import { Category } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export type GetPostsQuery = {
  page?: string
  search?: string
  categoryId?: string
}

export type CreatePostProps = {
  title: string
  content: string
  userId: number
  categories?: Category[]
}

export type EditPostProps = {
  id: number
  title: string
  content: string
  categories?: Category[]
  userId?: number
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

export const createPost = async (data: CreatePostProps) => {
  try {
    const response = await api.post('auth/posts', data)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const updatePost = async (data: EditPostProps) => {
  try {
    const response = await api.put(`/auth/posts/${data.id}`, data)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
