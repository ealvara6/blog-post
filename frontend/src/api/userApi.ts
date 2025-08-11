import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'
import { EditUser } from '@/types/user'

export const getUser = async () => {
  try {
    const response = await api.get(`/auth/users/me`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

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

export const getLikedPosts = async (pageParam: string | null) => {
  try {
    const response = await api.get(`/auth/users/likes/posts/me`, {
      params: { page: pageParam, limit: 5 },
    })
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getLikedComments = async (pageParam: string | null) => {
  try {
    const response = await api.get(`/auth/users/likes/comments/me`, {
      params: { page: pageParam, limit: 5 },
    })
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const updateAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  try {
    const response = await api.post(`/auth/users/avatar`, formData, {
      headers: { 'Content-Type': undefined },
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
