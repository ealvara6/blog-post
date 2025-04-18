import React, { useState } from 'react'
import { Button } from './Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema } from '@/validations/commentValidation'
import { useCreateComment } from '@/hooks/useCreateComment'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { Comment } from '@/types/posts'

export const CommentForm = ({
  postId,
  setCurrentComments,
}: {
  postId: number
  setCurrentComments: React.Dispatch<React.SetStateAction<Comment[]>>
}) => {
  const [toggleButtons, setToggleButtons] = useState(false)
  const { authUser } = useAuth()
  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(commentSchema) })
  const createComment = useCreateComment()

  const onFocus = () => {
    setToggleButtons(true)
  }

  const onCancel = () => {
    setToggleButtons(false)
    reset()
  }

  const onSubmit = async (data: { content: string }) => {
    try {
      const userId = authUser?.id
      const createdComment = await createComment({ ...data, userId, postId })
      reset()
      setToggleButtons(false)
      setCurrentComments((prev) => [...prev, createdComment])
    } catch (err) {
      console.log(parseErrorMessage(err))
    }
  }

  return (
    <form
      className="flex w-full flex-col self-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('content')}
        className="w-full border-b"
        type="text"
        name="content"
        id="content"
        placeholder="Add a comment..."
        onFocus={() => onFocus()}
      />
      {toggleButtons && (
        <div className="flex gap-2 self-end">
          <Button className="px-3" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            disabled={!isValid || isSubmitting}
            isActive={isValid && !isSubmitting}
          >
            {isSubmitting ? 'Submiting...' : 'Comment'}
          </Button>
        </div>
      )}
    </form>
  )
}
