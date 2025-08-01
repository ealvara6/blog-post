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
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const deleteComment = async (id: number) => {
  try {
    const response = await api.delete(`/auth/comments/${id}`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const updateComment = async (data: {
  commentId: number
  content: string
}) => {
  try {
    const response = await api.put(`auth/comments/${data.commentId}`, {
      content: data.content,
    })
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
