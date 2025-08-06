import postSchema from '@/validations/postValidations'
import { useEffect } from 'react'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { PostForm } from '@/components/Posts/PostForm'
import { Error } from '@/components/Shared/Error'
import { useCreatePost } from '@/hooks/usePosts'
import { useCategories } from '@/hooks/useCategories'

type FormData = z.infer<typeof postSchema>

export const CreatePostForm = () => {
  const navigate = useNavigate()
  const { authUser } = useAuth()
  const { mutate: createPost, isError, error } = useCreatePost()
  const { data: allCategories } = useCategories()

  useEffect(() => {
    if (!authUser) navigate('/login')
  }, [authUser, navigate])

  const onSubmit = async (data: FormData) => {
    if (!authUser) return navigate('/login')

    const categories = allCategories?.filter((category) =>
      data.categoryIds.includes(category.id),
    )

    createPost({
      title: data.title,
      content: data.content,
      categories: categories,
      userId: authUser.id,
    })
  }

  return (
    <div className="mx-3 flex w-full max-w-4xl flex-col gap-2 rounded px-2 sm:px-6">
      <PostForm
        onSubmit={onSubmit}
        header="New Post"
        submitLabel="Create Post"
        submittingLabel="Creating..."
        defaultValues={{ title: '', content: '', categoryIds: [] }}
      />
      {isError && <Error>{error.message}</Error>}
    </div>
  )
}
