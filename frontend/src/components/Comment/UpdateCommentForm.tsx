import { useForm } from 'react-hook-form'
import { Button } from '@/components/Shared/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema } from '@/validations/commentValidation'
import { Comment } from '@/types/posts'
import { Input } from '@/components/Shared/Input'
import { useUpdateComment } from '@/hooks/useComments'

export const UpdateCommentForm = ({
  content,
  comment,
  toggleEdit,
}: {
  content: string
  comment: Comment
  toggleEdit: () => void
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
  const { mutateAsync: updateComment } = useUpdateComment()

  const onSubmit = async (data: { content: string }) => {
    updateComment({
      ...data,
      commentId: comment.id,
      postId: comment.postId,
      username: comment.user.username,
    })
    toggleEdit()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="border-border-darkTheme dark:text-text-primary-darkTheme text-text-primary border p-3 sm:text-lg"
        {...register('content')}
      />
      <div className="flex w-fit gap-3 self-end">
        <Button variant="danger" type="button" onClick={() => toggleEdit()}>
          Cancel
        </Button>
        <Button
          disabled={!isValid || isSubmitting}
          isInactive={!isValid || isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
