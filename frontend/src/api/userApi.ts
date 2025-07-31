import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'

export const getUserComments = async () => {
  try {
    const response = await api.get('/auth/users/comments/me')
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getUserPosts = async () => {
  try {
    const response = await api.get('/auth/users/posts/me')
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const deleteUser = async () => {
  try {
    const response = await api.delete('/auth/users/me')
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
