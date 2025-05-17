import { User } from '@/context/AuthProvider/AuthContext'
import { EditUser } from '@/hooks/useUpdateUser'
import { parseErrorMessage } from './parseErrorMessage'
import React from 'react'

export const handleUserUpdate = async (
  updatedUser: User,
  setAuthUser: React.Dispatch<React.SetStateAction<User>>,
  updateUser: (id: number | undefined, data: EditUser) => Promise<User>,
) => {
  try {
    if (!updatedUser) return

    await updateUser(updatedUser.id, updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setAuthUser(updatedUser)
  } catch (err) {
    parseErrorMessage(err)
  }
}
