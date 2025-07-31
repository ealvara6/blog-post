import { Button } from '@/components/Shared/Button'
import { Error } from '@/components/Shared/Error'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useDeleteUser } from '@/hooks/useUser'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const DeleteAccountModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const { authUser, logout } = useAuth()
  const {
    mutateAsync: deleteUser,
    isPending,
    isError,
    error,
  } = useDeleteUser(authUser?.id)

  const onDelete = async () => {
    if (!authUser) return
    await deleteUser()
    logout()
  }

  return (
    <div className="flex w-full flex-col gap-10 p-4">
      <div className="text-center text-xl font-bold">
        Are you sure you want to delete your account?
      </div>
      {isError && <Error>{parseErrorMessage(error)}</Error>}
      <div className="flex justify-end gap-4">
        <Button variant="transparent" onClick={() => setIsOpen(null)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          className="dark:bg-error-darkTheme bg-error"
          onClick={onDelete}
          disabled={isPending}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  )
}
