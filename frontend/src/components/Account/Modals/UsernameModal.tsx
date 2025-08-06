import { Button } from '@/components/Shared/Button'
import { Error } from '@/components/Shared/Error'
import { Input } from '@/components/Shared/Input'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useUpdateUser } from '@/hooks/useUser'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { usernameSchema } from '@/validations/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const UserNameModal = ({
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
  } = useForm({ resolver: zodResolver(usernameSchema) })

  const onSubmit = async (updateData: { username: string }) => {
    if (!authUser?.id) return
    const { updatedUser } = await updateUser(updateData)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setAuthUser(updatedUser)
  }

  return (
    <form
      className="flex w-full flex-col gap-4 p-3 py-6 sm:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="username" className="text-lg font-semibold sm:text-xl">
        New Username:{' '}
      </label>
      <div className="flex flex-col gap-2">
        <Input
          className="border-border-darkTheme rounded border p-2 py-4 text-white"
          defaultValue={authUser?.username}
          {...register('username')}
        />
        {errors['username'] && <Error>{errors['username']?.message}</Error>}
      </div>
      {isError && <Error>{parseErrorMessage(error)}</Error>}
      <div className="flex gap-3 self-end">
        <Button
          type="button"
          variant="dangerTransparent"
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
