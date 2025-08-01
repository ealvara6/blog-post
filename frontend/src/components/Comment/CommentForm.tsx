import React, { useState } from 'react'
import { Button } from '../Shared/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema } from '@/validations/commentValidation'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Comment } from '@/types/posts'
import clsx from 'clsx'
import { useCreateComment } from '@/hooks/useComments'

type CommentFormProps = {
  postId: number
  setCurrentComments: React.Dispatch<React.SetStateAction<Comment[]>>
} & React.FormHTMLAttributes<HTMLFormElement>

export const CommentForm = ({
  postId,
  setCurrentComments,
  className,
}: CommentFormProps) => {
  const { mutateAsync: createComment } = useCreateComment()
  const [toggleButtons, setToggleButtons] = useState(false)
  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(commentSchema) })

  const onFocus = () => {
    setToggleButtons(true)
  }

  const onCancel = () => {
    setToggleButtons(false)
    reset()
  }

  const onSubmit = async (data: { content: string }) => {
    try {
      const createdComment = await createComment({ ...data, postId })
      reset()
      setToggleButtons(false)
      setCurrentComments((prev) => [...prev, createdComment])
    } catch (err) {
      console.log(parseErrorMessage(err))
    }
  }

  return (
    <form
      className={clsx('flex w-full flex-col gap-4 self-center', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('content')}
        className="border-border-darkTheme focus:border-border w-full rounded border p-3"
        type="text"
        name="content"
        id="content"
        placeholder="Add a comment..."
        onFocus={() => onFocus()}
      />
      {toggleButtons && (
        <div className="flex gap-2 self-end">
          <Button
            variant="transparent"
            className="border-border-darkTheme"
            type="button"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            disabled={!isValid || isSubmitting}
            isActive={isValid && !isSubmitting}
            type="submit"
            className="font-bold"
          >
            {isSubmitting ? 'Submitting...' : 'Comment'}
          </Button>
        </div>
      )}
    </form>
  )
}
