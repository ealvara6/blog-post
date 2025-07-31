import { useDeletePost } from '@/hooks/useDeletePost'
import { Button } from './Shared/Button'
import { Modal } from './Shared/Modal'
import { useState } from 'react'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Error } from './Shared/Error'
import { useNavigate } from 'react-router-dom'

export const DeletePostModal = ({
  setIsOpen,
  id,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
  id: number
}) => {
  const deletePost = useDeletePost()
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await deletePost(id)
      navigate({ pathname: '/posts' }, { replace: true })
    } catch (err) {
      setServerError(parseErrorMessage(err))
    }
  }

  return (
    <Modal onClose={() => setIsOpen(null)}>
      <div className="flex flex-col justify-center gap-6 p-5">
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-bold tracking-wide">Delete Post?</div>
          <div className="text-lg font-thin">
            Are you sure you want to delete this post?
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            variant="transparent"
            className="dark:border-border-darkTheme border-border"
            onClick={() => setIsOpen(null)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete
          </Button>
        </div>
        {serverError && <Error>{serverError}</Error>}
      </div>
    </Modal>
  )
}
