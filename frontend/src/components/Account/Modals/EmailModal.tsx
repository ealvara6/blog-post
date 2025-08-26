import { Button } from '@/components/Shared/Button'
import { Input } from '@/components/Shared/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { emailSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Error } from '@/components/Shared/Error'
import { useUpdateUser } from '@/hooks/useUser'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const EmailModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const { authUser, setAuthUser } = useAuth()
  const { mutateAsync: updateUser, isError, error, isPending } = useUpdateUser()

  const {
    register,
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
  } = useForm({ resolver: zodResolver(emailSchema), mode: 'onChange' })

  const onSubmit = async (updateData: { email: string }) => {
    if (!authUser?.id) return
    const { updatedUser } = await updateUser({
      data: updateData,
      name: 'Email',
    })
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setAuthUser(updatedUser)
  }

  return (
    <form
      className="flex w-full flex-col gap-4 p-3 py-4 sm:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="email" className="text-lg font-semibold sm:text-xl">
        New Email:
      </label>
      <div className="flex flex-col gap-2">
        <Input
          defaultValue={authUser?.email}
          className="border-border-darkTheme rounded border p-3"
          {...register('email')}
        />
        {errors['email'] && <Error>{errors['email']?.message}</Error>}
      </div>
      {isError && <Error>{parseErrorMessage(error)}</Error>}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="dangerTransparent"
          onClick={() => setIsOpen(null)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid || isPending}
          isInactive={!isValid || isSubmitting || isPending}
        >
          {isSubmitting || isPending ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
