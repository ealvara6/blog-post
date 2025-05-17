import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { handleUserUpdate } from '@/utils/handleUserUpdate'
import { usernameSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const UserNameModal = () => {
  const { authUser, setAuthUser } = useAuth()
  const {
    register,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(usernameSchema) })
  const updateUser = useUpdateUser()

  const onSubmit = async (data: { username: string }) => {
    if (!authUser?.id) return
    const updatedUser = { ...authUser, ...data }
    handleUserUpdate(updatedUser, setAuthUser, updateUser)
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">New Username: </label>
      <Input {...register('username')} />
      {errors['username'] && (
        <div className="text-red-500">{errors['username']?.message}</div>
      )}
      <div className="flex gap-3 self-end">
        <Button size="sm" type="button">
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
