import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { handleUserUpdate } from '@/utils/handleUserUpdate'
import { passwordSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const PasswordModal = ({
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
  } = useForm({ resolver: zodResolver(passwordSchema) })
  const [serverError, setServerError] = useState('')

  const onSubmit = async (data: {
    password: string
    confirmPassword: string
  }) => {
    if (!authUser?.id) return
    const { confirmPassword: _, ...rest } = data
    handleUserUpdate(
      { ...rest, id: authUser.id },
      setAuthUser,
      updateUser,
      setServerError,
    )
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">New Password: </label>
        <Input
          {...register('password')}
          type="password"
          name="password"
          id="password"
        />
        {errors['password'] && (
          <div className="text-red-500">{errors['password']?.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <Input
          {...register('confirmPassword')}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
        {errors['confirmPassword'] && (
          <div className="text-red-500">
            {errors['confirmPassword']?.message}
          </div>
        )}
      </div>
      {serverError && <div>{serverError}</div>}
      <div className="flex justify-end gap-3">
        <Button type="button" onClick={() => setIsOpen(null)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving....' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
