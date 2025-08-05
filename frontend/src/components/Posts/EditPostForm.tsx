import { useEffect } from 'react'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { PostForm } from './PostForm'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import postSchema from '@/validations/postValidations'
import { Error } from '../Shared/Error'
import { useUpdatePost } from '@/hooks/usePosts'
import { useCategories } from '@/hooks/useCategories'

type FormData = z.infer<typeof postSchema>

export const EditPostForm = ({
  title,
  content,
  id,
  userId,
  categoryIds,
}: {
  title: string
  content: string
  id: number
  userId: number
  categoryIds: number[]
}) => {
  if (!categoryIds) categoryIds = []
  const navigate = useNavigate()
  const { authUser } = useAuth()
  const { mutate: updatePost, isError, error } = useUpdatePost()
  const { data: allCategories } = useCategories()

  useEffect(() => {
    if (authUser?.id !== userId) navigate('/posts')
  }, [userId, authUser?.id, navigate])

  const onSubmit = async (data: FormData) => {
    const categories = allCategories?.filter((category) =>
      data.categoryIds.includes(category.id),
    )
    updatePost({
      title: data.title,
      content: data.content,
      categories: categories,
      userId: authUser?.id,
      id,
    })
  }

  return (
    <div className="mx-3 flex w-full max-w-4xl flex-col gap-2 rounded px-2 sm:px-6">
      <PostForm
        onSubmit={onSubmit}
        header="Edit Post"
        defaultValues={{ title, content, categoryIds }}
      />
      {isError && <Error>{error.message}</Error>}
    </div>
  )
}
