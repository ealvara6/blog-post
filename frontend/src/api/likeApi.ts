import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'

export const likeComment = async (id: number) => {
  try {
    const response = await api.post(`/auth/comments/${id}/like`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const unlikeComment = async (id: number) => {
  try {
    const response = await api.delete(`/auth/comments/${id}/like`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getCommentLikes = async (id: number) => {
  try {
    const response = await api.get(`/comments/${id}/likes`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getUserLikedComment = async (id: number) => {
  try {
    const response = await api.get(`/auth/comments/${id}/like/me`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
