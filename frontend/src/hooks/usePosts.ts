import api from '@/api/axios'
import { Post } from '@/types/posts'
import handleErrors from '@/utils/handleErrors'
import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await api.get('/posts')
        setPosts(result.data.posts)
      } catch (err: unknown) {
        const error = err as AxiosError<{ errors: string }>
        handleErrors(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return { posts, loading }
}
