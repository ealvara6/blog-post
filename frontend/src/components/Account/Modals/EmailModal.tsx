import { Button } from '@/components/Shared/Button'
import { Input } from '@/components/Shared/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { handleUserUpdate } from '@/utils/handleUserUpdate'
import { emailSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Error } from '@/components/Shared/Error'

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
    <form
      className="flex w-full flex-col gap-4 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="email" className="text-lg font-semibold sm:text-xl">
        New Email:
      </label>
      <div className="flex flex-col gap-2">
        <Input
          defaultValue={authUser?.email}
          className="border-border-darkTheme text-text-primary-darkTheme rounded border p-2"
          {...register('email')}
        />
        {errors['email'] && <Error>{errors['email']?.message}</Error>}
      </div>
      {serverError && <Error>{serverError}</Error>}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="transparent"
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
