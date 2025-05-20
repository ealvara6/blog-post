import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { handleUserUpdate } from '@/utils/handleUserUpdate'
import { usernameSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const UserNameModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const { authUser, setAuthUser } = useAuth()
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(usernameSchema) })
  const [serverError, setServerError] = useState('')
  const updateUser = useUpdateUser()

  const onSubmit = async (updateData: { username: string }) => {
    if (!authUser?.id) return
    handleUserUpdate(
      { ...updateData, id: authUser.id },
      setAuthUser,
      updateUser,
      setServerError,
    )
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">New Username: </label>
      <Input {...register('username')} />
      {errors['username'] && (
        <div className="text-red-500">{errors['username']?.message}</div>
      )}
      {serverError && <div className="text-red-500">{serverError}</div>}
      <div className="flex gap-3 self-end">
        <Button size="sm" type="button" onClick={() => setIsOpen(null)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} size="sm">
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
