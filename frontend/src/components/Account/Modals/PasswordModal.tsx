import { Button } from '@/components/Shared/Button'
import { Error } from '@/components/Shared/Error'
import { Input } from '@/components/Shared/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUser'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { passwordSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const PasswordModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const { authUser, setAuthUser } = useAuth()
  const { mutateAsync: updateUser, isError, error } = useUpdateUser()
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(passwordSchema) })

  const onSubmit = async (data: { password: string }) => {
    if (!authUser?.id) return
    const { updatedUser } = await updateUser({ password: data.password })
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setAuthUser(updatedUser)
  }

  return (
    <form
      className="flex w-full flex-col gap-4 p-2 sm:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="password" className="text-lg font-semibold sm:text-xl">
        New Password:{' '}
      </label>
      <div className="flex flex-col gap-2">
        <Input
          {...register('password')}
          className="border-border-darkTheme rounded border p-2"
          type="password"
          name="password"
          id="password"
        />
        {errors['password'] && <Error>{errors['password']?.message}</Error>}
      </div>
      <label
        htmlFor="confirmPassword"
        className="text-lg font-semibold sm:text-xl"
      >
        Confirm Password:{' '}
      </label>
      <div className="flex flex-col gap-2">
        <Input
          {...register('confirmPassword')}
          className="border-border-darkTheme rounded border p-2"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
        {errors['confirmPassword'] && (
          <Error>{errors['confirmPassword']?.message}</Error>
        )}
      </div>
      {isError && <div>{parseErrorMessage(error)}</div>}
      <div className="flex justify-end gap-3">
        <Button variant="dangerTransparent" onClick={() => setIsOpen(null)}>
          Cancel
        </Button>
        <Button type="submit" size="md" disabled={isSubmitting}>
          {isSubmitting ? 'Saving....' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
