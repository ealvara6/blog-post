import { Button } from '@/components/Button'
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
    <div className="flex flex-col gap-4">
      <div className="text-center text-xl font-bold">
        Are you sure you want to delete your account?
      </div>
      {serverError && (
        <div className="text-center text-red-500">{serverError}</div>
      )}
      <div className="flex justify-end gap-4">
        <Button onClick={() => setIsOpen(null)}>Cancel</Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}
