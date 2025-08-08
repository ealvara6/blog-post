import { Button } from '../Shared/Button'
import { Modal } from '../Shared/Modal'
import { Error } from '../Shared/Error'
import { useNavigate } from 'react-router-dom'
import { useDeletePost } from '@/hooks/usePosts'

export const DeletePostModal = ({
  setIsOpen,
  id,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
  id: number
}) => {
  const { mutate: deletePost, isError, error, isPending } = useDeletePost()
  const navigate = useNavigate()

  const handleDelete = async () => {
    deletePost(id)
    navigate({ pathname: '/posts' }, { replace: true })
  }

  return (
    <Modal onClose={() => setIsOpen(null)}>
      <div className="flex w-full flex-col justify-center gap-6 p-5">
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
          <Button
            variant="danger"
            onClick={() => handleDelete()}
            disabled={isPending}
            isInactive={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
        {isError && <Error>{error.message}</Error>}
      </div>
    </Modal>
  )
}
