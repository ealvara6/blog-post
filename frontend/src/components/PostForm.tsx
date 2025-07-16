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
  header: string
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
  header,
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
    <form
      className="flex flex-col gap-5 py-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pt-7 text-center text-3xl font-bold tracking-wider">
        {header}
      </div>
      <div className="flex flex-col gap-2">
        {errors['title'] && <Error>{errors['title']?.message}</Error>}
        <input
          {...register('title')}
          className="rounded border p-2 text-lg"
          type="text"
          id="title"
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col gap-2">
        {errors['content'] && <Error>{errors['content']?.message}</Error>}
        <textarea
          {...register('content')}
          className="h-[300px] w-full rounded border p-2 text-lg sm:h-[500px]"
          id="content"
          spellCheck={true}
          placeholder="Content"
        />
      </div>
      {loading ? (
        'Loading Categories...'
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="text-xl font-bold">Category</div>
          <div className="grid w-full grid-cols-2 justify-items-center gap-5 sm:flex sm:justify-around">
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
      <Button
        disabled={isSubmitting}
        isActive={!isSubmitting}
        className="text-xl font-bold tracking-wider md:h-15"
      >
        {isSubmitting
          ? (submittingLabel ?? 'Submitting...')
          : (submitLabel ?? 'Submit')}
      </Button>
    </form>
  )
}
