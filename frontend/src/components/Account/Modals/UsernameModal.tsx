import { Button } from '@/components/Shared/Button'
import { Error } from '@/components/Shared/Error'
import { Input } from '@/components/Shared/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { handleUserUpdate } from '@/utils/handleUserUpdate'
import { usernameSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
    <form
      className="flex w-full flex-col gap-4 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="username" className="text-lg font-semibold sm:text-xl">
        New Username:{' '}
      </label>
      <div className="flex flex-col gap-2">
        <Input
          className="border-border-darkTheme rounded border p-2 text-white"
          value={authUser?.username}
          {...register('username')}
        />
        {errors['username'] && <Error>{errors['username']?.message}</Error>}
      </div>
      {serverError && <Error>{serverError}</Error>}
      <div className="flex gap-3 self-end">
        <Button
          type="button"
          variant="transparent"
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
