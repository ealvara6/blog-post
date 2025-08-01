import React, { useState } from 'react'
import { Button } from '../Shared/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema } from '@/validations/commentValidation'
import clsx from 'clsx'
import { useCreateComment } from '@/hooks/useComments'
import { useAuth } from '@/context/AuthProvider/useAuth'

type CommentFormProps = {
  postId: number
} & React.FormHTMLAttributes<HTMLFormElement>

export const CommentForm = ({ postId, className }: CommentFormProps) => {
  const { mutateAsync: createComment } = useCreateComment()
  const [toggleButtons, setToggleButtons] = useState(false)
  const { authUser } = useAuth()
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
    const username = authUser?.username
    const createdComment = await createComment({ ...data, postId, username })
    console.log(createdComment)
    reset()
    setToggleButtons(false)
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
