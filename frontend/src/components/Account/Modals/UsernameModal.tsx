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
    <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username" className="text-xl font-semibold">
        New Username:{' '}
      </label>
      <div className="flex flex-col gap-2">
        <Input {...register('username')} />
        {errors['username'] && (
          <div className="dark:text-error-darkTheme text-error">
            {errors['username']?.message}
          </div>
        )}
      </div>
      {serverError && (
        <div className="dark:text-error-darkTheme text-error">
          {serverError}
        </div>
      )}
      <div className="flex gap-3 self-end">
        <Button
          size="md"
          type="button"
          className="dark:bg-text-muted-darkTheme bg-text-muted"
          onClick={() => setIsOpen(null)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} size="md">
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
