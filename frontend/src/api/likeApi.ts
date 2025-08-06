import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'

export const getPostLikes = async (postId: number) => {
  try {
    const response = await api.get(`/posts/${postId}/likes`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getUserLikedPost = async (postId: number) => {
  try {
    const response = await api.get(`/auth/posts/${postId}/like/me`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const unlikePost = async (postId: number) => {
  try {
    const response = await api.delete(`/auth/posts/${postId}/like`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const likePost = async (postId: number) => {
  try {
    const response = await api.post(`/auth/posts/${postId}/like`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const likeComment = async (commentId: number) => {
  try {
    const response = await api.post(`/auth/comments/${commentId}/like`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const unlikeComment = async (commentId: number) => {
  try {
    const response = await api.delete(`/auth/comments/${commentId}/like`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getCommentLikes = async (commentId: number) => {
  try {
    const response = await api.get(`/comments/${commentId}/likes`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getUserLikedComment = async (commentId: number) => {
  try {
    const response = await api.get(`/auth/comments/${commentId}/like/me`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
