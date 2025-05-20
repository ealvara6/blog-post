import { useAuth } from '@/context/AuthProvider/useAuth'
import { Comment } from '@/types/posts'
import { Button } from './Button'
import React, { useState } from 'react'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { UpdateCommentForm } from './UpdateCommentForm'

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

  const AuthButtons = () => {
    if (comment.userId !== authUser?.id) return ''
    return (
      <div className="flex w-fit gap-3 self-end">
        {!isEditing && (
          <>
            <Button onClick={() => toggleEdit()}>Edit</Button>
            <Button
              variant="danger"
              onClick={() => onDelete()}
              isActive={!isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded border p-3" key={index}>
      <div className="text-xl font-bold">{comment.user.username}</div>
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
          <div className="self-end font-mono font-thin">
            <span className="font-bold">created at: </span>
            {date.toLocaleString()}
          </div>
        </>
      )}
      <AuthButtons />
    </div>
  )
}
