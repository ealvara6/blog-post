import api from '@/api/axios'
import { Post } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useState, useEffect } from 'react'

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await api.get('/posts')
        setPosts(result.data.posts)
      } catch (err) {
        parseErrorMessage(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return { posts, loading }
}
