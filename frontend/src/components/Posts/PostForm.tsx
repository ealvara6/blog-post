import postSchema from '@/validations/postValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/Shared/Button'
import { Options } from '@/components/Posts/Options'
import { Error } from '@/components/Shared/Error'
import { useCategories } from '@/hooks/useCategories'

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

  const { data: categories, isLoading } = useCategories()

  const SkeletonCard = () => {
    const skeleton = [...Array(5)].map((_, i) => {
      return (
        <div
          key={i}
          className="h-12 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"
        />
      )
    })

    return <div className="flex gap-6">{skeleton}</div>
  }

  return (
    <form
      className="-mt-5 flex flex-col gap-5 py-5 sm:-mt-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pt-7 text-center text-xl font-bold tracking-wider sm:text-2xl md:text-3xl">
        {header}
      </div>
      <div className="dark:bg-card-darkTheme bg-card flex flex-col gap-5 rounded px-3 py-5 md:p-7">
        <div className="flex flex-col gap-2">
          {errors['title'] && <Error>{errors['title']?.message}</Error>}
          <input
            {...register('title')}
            className="rounded border p-2 text-base sm:text-lg md:text-xl"
            type="text"
            id="title"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col gap-2">
          {errors['content'] && <Error>{errors['content']?.message}</Error>}
          <textarea
            {...register('content')}
            className="h-[300px] w-full rounded border p-2 text-base sm:h-[500px] sm:text-lg md:text-xl"
            id="content"
            spellCheck={true}
            placeholder="Content"
          />
        </div>
        {isLoading ? (
          <SkeletonCard />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="text-base font-bold sm:text-lg md:text-xl">
              Category
            </div>
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
          isInactive={isSubmitting}
          className="w-full text-base font-bold tracking-wider sm:text-lg md:h-15 lg:text-xl"
        >
          {isSubmitting
            ? (submittingLabel ?? 'Submitting...')
            : (submitLabel ?? 'Submit')}
        </Button>
      </div>
    </form>
  )
}
