import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'
import toast from 'react-hot-toast'

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
  return await toast.promise(
    api
      .post(`/auth/posts/${data.postId}/comments`, data)
      .then((res) => res.data),
    {
      loading: 'Creating Comment...',
      success: 'Comment Successfully Created!',
      error: 'Failed to create comment',
    },
  )
}

export const deleteComment = async (id: number) => {
  return await toast.promise(
    api.delete(`/auth/comments/${id}`).then((res) => res.data),
    {
      loading: 'Deleting Comment...',
      success: 'Comment Successfully Deleted!',
      error: 'Failed to delete comment',
    },
  )
}

export const updateComment = async (data: {
  commentId: number
  content: string
}) => {
  return await toast.promise(
    api
      .put(`/auth/comments/${data.commentId}`, { content: data.content })
      .then((res) => res.data),
    {
      loading: 'Updating Comment...',
      success: 'Comment successfully updated!',
      error: 'failed to updated comment',
    },
  )
}
