import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { usernameSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

export const UserNameModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const { authUser, setAuthUser } = useAuth()
  const {
    register,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(usernameSchema) })
  const updateUser = useUpdateUser()

  const onSubmit = async (data: { username: string }) => {
    try {
      if (!authUser) return
      await updateUser(authUser?.id, {
        ...data,
        email: authUser.email,
        password: authUser.password,
      })
      const updatedUser = { ...authUser, username: data.username }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setAuthUser(updatedUser)

      setIsOpen(null)
    } catch (err) {
      parseErrorMessage(err)
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">New Username: </label>
      <Input {...register('username')} />
      {errors['username'] && (
        <div className="text-red-500">{errors['username']?.message}</div>
      )}
      <div className="flex gap-3 self-end">
        <Button size="sm" type="button" onClick={() => setIsOpen(null)}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          isActive={isValid && !isSubmitting}
          size="sm"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
