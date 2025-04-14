import { useEffect, useState } from 'react'
import { Post } from '@/types/posts'
import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const useGetPost = (id: string | undefined) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await api.get(`posts/${id}`)
        setPost(result.data.post)
      } catch (err) {
        parseErrorMessage(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  return { post, loading }
}
