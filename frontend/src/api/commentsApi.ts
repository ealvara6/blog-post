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
