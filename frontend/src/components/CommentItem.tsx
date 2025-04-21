import { useAuth } from '@/context/AuthProvider/useAuth'
import { Comment } from '@/types/posts'
import { Button } from './Button'
import React, { useState } from 'react'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const CommentItem = ({
  comment,
  index,
  date,
  setCurrentComments,
}: {
  comment: Comment
  index: number
  date: Date
  setCurrentComments: React.Dispatch<React.SetStateAction<Comment[]>>
}) => {
  const { id } = comment
  const { authUser } = useAuth()
  const deleteComment = useDeleteComment()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const deletedComment = await deleteComment(id)
      setCurrentComments((prev) =>
        prev.filter((comment) => comment.id !== deletedComment.id),
      )
    } catch (err) {
      parseErrorMessage(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col rounded border p-3" key={index}>
      <div className="text-xl font-bold">{comment.user.username}</div>
      <div>{comment.content}</div>
      <div className="self-end font-mono font-thin">
        <span className="font-bold">created at: </span>
        {date.toLocaleString()}
      </div>
      {comment.userId === authUser?.id && (
        <Button
          variant="danger"
          className="w-fit self-end"
          onClick={() => onDelete()}
          isActive={!isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      )}
    </div>
  )
}
