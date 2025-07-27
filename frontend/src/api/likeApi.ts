import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'

export const getCommentLikes = async (id: number) => {
  try {
    const response = await api.get(`/comments/${id}/likes`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
