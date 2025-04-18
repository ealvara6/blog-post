import postSchema from '@/validations/postValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './Button'

interface PostFormProps {
  defaultValues?: {
    title: string
    content: string
  }
  submittingLabel?: string
  submitLabel?: string
  onSubmit: (data: { title: string; content: string }) => Promise<void>
}
type FormData = z.infer<typeof postSchema>

export const PostForm = ({
  defaultValues,
  onSubmit,
  submittingLabel,
  submitLabel,
}: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(postSchema), defaultValues })

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="title">Title: </label>
        {errors['title'] && (
          <p className="text-red-500">{errors['title']?.message}</p>
        )}
        <input
          {...register('title')}
          className="rounded border"
          type="text"
          id="title"
          placeholder="Title"
        />
      </div>
      <div>
        {errors['content'] && (
          <p className="text-red-500">{errors['content']?.message}</p>
        )}
        <textarea
          {...register('content')}
          className="rounded border"
          id="content"
          spellCheck={true}
          rows={10}
          cols={60}
          placeholder="Content"
        />
      </div>
      <Button disabled={isSubmitting} isActive={!isSubmitting}>
        {isSubmitting
          ? (submittingLabel ?? 'Submitting...')
          : (submitLabel ?? 'Submit')}
      </Button>
    </form>
  )
}
