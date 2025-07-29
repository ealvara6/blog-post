import { useAuth } from '@/context/AuthProvider/useAuth'
import { Comment } from '@/types/posts'
import { useState } from 'react'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { UpdateCommentForm } from '@/components/comment/UpdateCommentForm'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from '@headlessui/react'
import { EllipsisHorizontalIcon, HeartIcon } from '@heroicons/react/24/solid'
import {
  useCommentLikes,
  useToggleCommentLike,
  useUserLikedComment,
} from '@/hooks/useLikes'
import { useLoginModal } from '@/context/LoginModalProvider/LoginModalContext'

export const CommentItem = ({
  comment,
  index,
  date,
  setCurrentComments,
}: {
  comment: Comment
  index: number
  date: Date
  setCurrentComments?: React.Dispatch<React.SetStateAction<Comment[]>>
}) => {
  const { id } = comment
  const { authUser } = useAuth()
  const { openLoginModal } = useLoginModal()
  const deleteComment = useDeleteComment()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { data: likeData, isLoading: isLoadingLikes } = useCommentLikes(id)
  const { data: likedData } = useUserLikedComment(id)
  const toggleLike = useToggleCommentLike(id, likedData?.liked)

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const deletedComment = await deleteComment(id)
      if (!setCurrentComments) return
      setCurrentComments((prev) =>
        prev.filter((comment) => comment.id !== deletedComment.id),
      )
    } catch (err) {
      parseErrorMessage(err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleEdit = async () => {
    setIsEditing(!isEditing)
  }

  const handleHeartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    if (!authUser) {
      openLoginModal()
      return
    }
    toggleLike.mutate()
  }

  const Auth = () => {
    if (comment.userId !== authUser?.id) return ''
    return (
      <Menu>
        <MenuButton>
          <EllipsisHorizontalIcon
            className={`w-8 cursor-pointer ${isEditing ? 'hidden' : 'block'}`}
          />
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className='dark:text-text-primary-darkTheme text-text-primary dark:border-border-darkTheme dark:bg-background-darkTheme bg-background sm:w-(--button-width)" w-30 rounded border p-2 text-center text-lg'
        >
          <MenuItem>
            <button onClick={() => setIsEditing(true)} className="h-12">
              Edit
            </button>
          </MenuItem>
          <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
          <MenuItem>
            <button onClick={() => onDelete()} className="h-12">
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    )
  }

  return (
    <div
      className="border-border-darkTheme dark:bg-card-darkTheme bg-card flex flex-col gap-4 rounded border p-3"
      key={index}
    >
      <div className="flex justify-between">
        <div className="text-lg font-bold tracking-wider sm:text-xl">
          {comment.user.username}
        </div>
        <Auth />
      </div>
      {isEditing ? (
        <UpdateCommentForm
          content={comment.content}
          commentId={id}
          toggleEdit={toggleEdit}
          setCurrentComments={setCurrentComments}
        />
      ) : (
        <>
          <div>{comment.content}</div>
          <div className="dark:text-text-muted-darkTheme text-text-muted flex gap-2 self-end font-mono font-thin select-none">
            {isLoadingLikes ? '0' : <div>{likeData.likeCount}</div>}
            <HeartIcon
              className={`w-6 ${likedData?.liked && 'dark:text-error-darkTheme text-error'}`}
              onClick={(e) => handleHeartClick(e)}
            />
          </div>
        </>
      )}
    </div>
  )
}
