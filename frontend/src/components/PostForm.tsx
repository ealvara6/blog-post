import postSchema from '@/validations/postValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './Button'
import { useEffect, useState } from 'react'
import { Category } from '@/types/posts'
import { useGetCategories } from '@/hooks/useGetCategories'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Options } from './Options'
import { Error } from './Error'

interface PostFormProps {
  defaultValues?: {
    title: string
    content: string
    categoryIds: number[]
  }
  submittingLabel?: string
  submitLabel?: string
  onSubmit: (data: {
    title: string
    content: string
    categoryIds: number[]
  }) => Promise<void>
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(postSchema), defaultValues })
  const getCategories = useGetCategories()

  const [categories, setCategories] = useState<Category[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories: Category[] = await getCategories()
        setCategories(fetchedCategories)
      } catch (err) {
        parseErrorMessage(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [getCategories])

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="title">Title: </label>
        {errors['title'] && <Error>{errors['title']?.message}</Error>}
        <input
          {...register('title')}
          className="rounded border"
          type="text"
          id="title"
          placeholder="Title"
        />
      </div>
      <div>
        {errors['content'] && <Error>{errors['content']?.message}</Error>}
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
      {loading ? (
        'Loading Categories...'
      ) : (
        <div className="flex flex-col gap-2.5">
          <div className="text-lg font-bold">Category</div>
          <div className="flex justify-around">
            <Controller
              name="categoryIds"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <Options
                  options={categories}
                  selected={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          {errors['categoryIds'] && (
            <Error>{errors['categoryIds'].message}</Error>
          )}
        </div>
      )}
      <Button disabled={isSubmitting} isActive={!isSubmitting}>
        {isSubmitting
          ? (submittingLabel ?? 'Submitting...')
          : (submitLabel ?? 'Submit')}
      </Button>
    </form>
  )
}
