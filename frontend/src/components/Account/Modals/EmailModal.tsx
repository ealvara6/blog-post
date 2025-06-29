import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { handleUserUpdate } from '@/utils/handleUserUpdate'
import { emailSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const EmailModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const { authUser, setAuthUser } = useAuth()
  const updateUser = useUpdateUser()
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(emailSchema) })
  const [serverError, setServerError] = useState('')

  const onSubmit = async (updateData: { email: string }) => {
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
      <label htmlFor="email" className="text-xl font-semibold">
        New Email:
      </label>
      <div className="flex flex-col gap-2">
        <Input {...register('email')} />
        {errors['email'] && (
          <div className="dark:text-error-darkTheme text-error">
            {errors['email']?.message}
          </div>
        )}
      </div>
      {serverError && (
        <div className="dark:text-error-darkTheme text-error">
          {serverError}
        </div>
      )}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          size="md"
          className="dark:bg-text-muted-darkTheme bg-text-muted"
          onClick={() => setIsOpen(null)}
        >
          Cancel
        </Button>
        <Button type="submit" size="md" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
