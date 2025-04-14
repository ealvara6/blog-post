import postSchema from '@/validations/postValidations'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useCreatePost } from '@/hooks/useCreatePost'
import { PostForm } from './PostForm'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

type FormData = z.infer<typeof postSchema>

export const CreatePostForm = () => {
  const navigate = useNavigate()
  const { authUser } = useAuth()
  const createPost = useCreatePost()
  const [serverError, setServerError] = useState({ msg: '' })

  useEffect(() => {
    if (!authUser) navigate('/login')
  }, [authUser, navigate])

  const onSubmit = async (data: FormData) => {
    try {
      if (!authUser) return navigate('/login')
      const post = await createPost({ ...data, userId: authUser.id })
      navigate(`/posts/${post.id}`)
    } catch (err) {
      setServerError({ msg: parseErrorMessage(err) })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <PostForm
        onSubmit={onSubmit}
        submitLabel="Create Post"
        submittingLabel="Creating..."
      />
      {serverError && (
        <div className="text-center text-red-500">{serverError.msg}</div>
      )}
    </div>
  )
}
