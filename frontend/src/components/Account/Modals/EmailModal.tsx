import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { handleUserUpdate } from '@/utils/handleUserUpdate'
import { emailSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const EmailModal = () => {
  const { authUser, setAuthUser } = useAuth()
  const updateUser = useUpdateUser()
  const {
    register,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(emailSchema) })

  const onSubmit = async (data: { email: string }) => {
    if (!authUser?.id) return
    const updatedUser = { ...authUser, ...data }
    handleUserUpdate(updatedUser, setAuthUser, updateUser)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">New Email:</label>
        <Input {...register('email')} />
        {errors['email'] && (
          <div className="text-red-500">{errors['email']?.message}</div>
        )}
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button">Cancel</Button>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          isActive={isValid && !isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
