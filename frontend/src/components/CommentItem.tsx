import { useAuth } from '@/context/AuthProvider/useAuth'
import { Comment } from '@/types/posts'
import { Button } from './Button'
import React, { useState } from 'react'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { UpdateCommentForm } from './UpdateCommentForm'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

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
  const deleteComment = useDeleteComment()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

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
          anchor="bottom"
          className='dark:text-text-primary-darkTheme text-text-primary dark:border-border-darkTheme dark:bg-background-darkTheme bg-background sm:w-(--button-width)" w-30 rounded border p-2 text-center'
        >
          <MenuItem>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </MenuItem>
          <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
          <MenuItem>
            <button onClick={() => onDelete()}>Delete</button>
          </MenuItem>
        </MenuItems>
      </Menu>
    )
  }

  return (
    <div
      className="border-border-darkTheme flex flex-col gap-4 rounded border p-3"
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
          <div className="flex flex-col gap-2 font-mono font-thin">
            <div>
              <span className="font-bold">created: </span>
              <span className="dark:text-text-muted-darkTheme">
                {date.toLocaleString()}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
