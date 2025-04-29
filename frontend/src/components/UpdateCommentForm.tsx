import { useForm } from 'react-hook-form'
import { Button } from './Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema } from '@/validations/commentValidation'
import { useUpdateComment } from '@/hooks/useUpdateComment'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Comment } from '@/types/posts'
import React from 'react'

export const UpdateCommentForm = ({
  content,
  commentId,
  toggleEdit,
  setCurrentComments,
}: {
  content: string
  commentId: number
  toggleEdit: () => void
  setCurrentComments: React.Dispatch<React.SetStateAction<Comment[]>>
}) => {
  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<{ content: string }>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content },
    mode: 'onChange',
  })
  const updateComment = useUpdateComment()

  const onSubmit = async (data: { content: string }) => {
    try {
      const updatedComment = await updateComment({ ...data, commentId })

      setCurrentComments((prev) =>
        prev.map((comment) =>
          comment.id === updatedComment.id
            ? { ...comment, ...updatedComment }
            : comment,
        ),
      )
    } catch (err) {
      parseErrorMessage(err)
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('content')}
        type="text"
        name="content"
        id="content"
        className="w-full rounded border p-2"
      />
      <div className="flex w-fit gap-3 self-end">
        <Button
          disabled={!isValid || isSubmitting}
          isActive={isValid && !isSubmitting}
          type="submit"
        >
          Save
        </Button>
        <Button variant="danger" type="button" onClick={() => toggleEdit()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
