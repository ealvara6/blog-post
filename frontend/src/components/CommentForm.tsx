import React, { useState } from 'react'
import { Button } from './Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema } from '@/validations/commentValidation'
import { useCreateComment } from '@/hooks/useCreateComment'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Comment } from '@/types/posts'
import { useAuth } from '@/context/AuthProvider/useAuth'

export const CommentForm = ({
  postId,
  setCurrentComments,
}: {
  postId: number
  setCurrentComments: React.Dispatch<React.SetStateAction<Comment[]>>
}) => {
  const { authUser } = useAuth()
  const userId = authUser?.id
  const [toggleButtons, setToggleButtons] = useState(false)
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
      const createdComment = await createComment({ ...data, postId, userId })
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
          <Button className="px-3" type="button" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            disabled={!isValid || isSubmitting}
            isActive={isValid && !isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : 'Comment'}
          </Button>
        </div>
      )}
    </form>
  )
}
