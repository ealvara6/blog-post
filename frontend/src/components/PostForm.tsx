import postSchema from '@/validations/postValidations'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { FormErrors } from '@/types/errors'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useCreatePost } from '@/hooks/useCreatePost'
import { isFormError } from '@/utils/isFormErrors'
import { Button } from './Button'

type FormData = z.infer<typeof postSchema>

export const PostForm = () => {
  const navigate = useNavigate()
  const { authUser } = useAuth()
  const createPost = useCreatePost()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(postSchema) })
  const [serverErrors, setServerErrors] = useState<FormErrors[]>([])

  useEffect(() => {
    if (!authUser) navigate('/login')
  }, [authUser, navigate])

  const onSubmit = async (data: FormData) => {
    try {
      if (!authUser) return navigate('/login')
      const post = await createPost({ ...data, userId: authUser.id })
      navigate(`/posts/${post.id}`)
    } catch (err: unknown) {
      if (isFormError(err)) {
        setServerErrors(err)
      } else {
        setServerErrors([{ msg: 'An unexpected error occurred' }])
      }
    }
  }

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
      {serverErrors.length !== 0 && (
        <div className="text-red-500">
          {serverErrors.map((error, key) => (
            <div key={key}>{error.msg}</div>
          ))}
        </div>
      )}
      <Button isActive={isSubmitting} disabled={isSubmitting}>
        {isSubmitting ? 'Creating post...' : 'Create Post'}
      </Button>
    </form>
  )
}

export default PostForm
