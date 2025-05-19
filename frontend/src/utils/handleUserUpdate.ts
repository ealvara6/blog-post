import { User } from '@/context/AuthProvider/AuthContext'
import { EditUser } from '@/hooks/useUpdateUser'
import React from 'react'
import { parseErrorMessage } from './parseErrorMessage'

export const handleUserUpdate = async (
  updatedUser: Partial<User>,
  setAuthUser: React.Dispatch<React.SetStateAction<User>>,
  updateUser: (id: number | undefined, data: EditUser) => Promise<User>,
  setServerError: React.Dispatch<React.SetStateAction<string>>,
) => {
  try {
    if (!updatedUser) return

    const newUser = await updateUser(updatedUser.id, updatedUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    setAuthUser(newUser)
  } catch (err) {
    setServerError(parseErrorMessage(err))
  }
}
