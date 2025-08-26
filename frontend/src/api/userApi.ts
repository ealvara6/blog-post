import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'
import { EditUser } from '@/types/user'
import toast from 'react-hot-toast'

export const getUser = async () => {
  try {
    const response = await api.get(`/auth/users/me`)
    return response.data
  } catch (err) {
    throw parseErrorMessage(err)
  }
}

export const getUserProfile = async (username?: string) => {
  try {
    const response = await api.get(`/users/${username}`)
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
  return await toast.promise(
    api.put(`/auth/users/me`, data).then((res) => res.data),
    {
      loading: `Updating ${data.name}`,
      success: `${data.name} Successfully Updated! `,
      error: `Failed to update ${data.name}`,
    },
  )
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

  return await toast.promise(
    api
      .post(`/auth/users/avatar`, formData, {
        headers: { 'Content-Type': undefined },
      })
      .then((res) => res.data),
    {
      loading: 'Updating Avatar...',
      success: 'Avatar Successfully Updated',
      error: 'Failed to update avatar',
    },
  )
}
