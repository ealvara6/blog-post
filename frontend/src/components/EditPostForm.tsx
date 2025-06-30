import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { PostForm } from './PostForm'
import { useUpdatePost } from '@/hooks/useUpdatePost'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import postSchema from '@/validations/postValidations'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useGetCategories } from '@/hooks/useGetCategories'
import { Category } from '@/types/posts'
import { Error } from './Error'

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
  const editPost = useUpdatePost()
  const getCategories = useGetCategories()
  const [serverError, setServerError] = useState({ msg: '' })

  useEffect(() => {
    if (authUser?.id !== userId) navigate('/posts')
  }, [userId, authUser?.id, navigate])

  const onSubmit = async (data: FormData) => {
    try {
      const allCategories: Category[] = await getCategories()
      const categories = allCategories.filter((category) =>
        data.categoryIds.includes(category.id),
      )
      await editPost({
        title: data.title,
        content: data.content,
        categories: categories,
        userId: authUser?.id,
        id,
      })
      navigate(`/posts/${id}`)
    } catch (err) {
      setServerError({ msg: parseErrorMessage(err) })
    }
  }

  return (
    <div>
      <PostForm
        onSubmit={onSubmit}
        defaultValues={{ title, content, categoryIds }}
      />
      {<Error>{serverError.msg}</Error>}
    </div>
  )
}
