import api from '@/api/axios'
import { Post } from '@/types/posts'
import { useState, useEffect } from 'react'

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const result = await api.get('/posts')
      console.log(result.data.posts)
      setPosts(result.data.posts)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return { posts, loading }
}
