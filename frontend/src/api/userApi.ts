import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'
import { EditUser } from '@/types/user'

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

export const updateUser = async (data: EditUser) => {
  try {
    console.log(data)
    const response = await api.put('/auth/users/me', data)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
