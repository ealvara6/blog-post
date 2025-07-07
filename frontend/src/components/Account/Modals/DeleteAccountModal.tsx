import { Button } from '@/components/Button'
import { Error } from '@/components/Error'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useDeleteUser } from '@/hooks/useDeleteUser'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import React, { useState } from 'react'

export const DeleteAccountModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const { authUser, logout } = useAuth()
  const deleteUser = useDeleteUser()
  const [serverError, setServerError] = useState('')

  const onDelete = async () => {
    if (!authUser) return

    try {
      await deleteUser(authUser.id)
      logout()
    } catch (err) {
      setServerError(parseErrorMessage(err))
    }
  }

  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="text-center text-xl font-bold">
        Are you sure you want to delete your account?
      </div>
      {serverError && <Error>{serverError}</Error>}
      <div className="flex justify-end gap-4">
        <Button variant="transparent" onClick={() => setIsOpen(null)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          className="dark:bg-error-darkTheme bg-error"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
