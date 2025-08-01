import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'

export const getCommentsByPostId = async (postId: number) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const createComment = async (data: {
  content: string
  postId: number
}) => {
  try {
    const response = await api.post(`/auth/posts/${data.postId}/comments`, data)
    console.log(response.data)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
