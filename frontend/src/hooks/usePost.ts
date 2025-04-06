import { useEffect, useState } from 'react'
import { Post } from '@/types/posts'
import api from '@/api/axios'
import { AxiosError } from 'axios'
import handleErrors from '@/utils/handleErrors'

export const usePost = (id: string | undefined) => {
  const [post, setPost] = useState<Post>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await api.get(`posts/${id}`)
        setPost(result.data.post)
      } catch (err: unknown) {
        const error = err as AxiosError<{ errors: string }>
        handleErrors(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  return { post, loading }
}

export default usePost
