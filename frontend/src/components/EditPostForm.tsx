import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { PostForm } from './PostForm'
import { useUpdatePost } from '@/hooks/useUpdatePost'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import postSchema from '@/validations/postValidations'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

type FormData = z.infer<typeof postSchema>

export const EditPostForm = ({
  title,
  content,
  id,
  userId,
}: {
  title: string
  content: string
  id: number
  userId: number
}) => {
  const navigate = useNavigate()
  const { authUser } = useAuth()
  const editPost = useUpdatePost()
  const [serverError, setServerError] = useState({ msg: '' })

  useEffect(() => {
    if (authUser?.id !== userId) navigate('/posts')
  }, [userId, authUser?.id, navigate])

  const onSubmit = async (data: FormData) => {
    try {
      await editPost({ ...data, userId: authUser?.id, id })
      navigate(`/posts/${id}`)
    } catch (err) {
      setServerError({ msg: parseErrorMessage(err) })
    }
  }

  return (
    <div>
      <PostForm onSubmit={onSubmit} defaultValues={{ title, content }} />
      {serverError && <div className="text-red-500">{serverError.msg}</div>}
    </div>
  )
}
