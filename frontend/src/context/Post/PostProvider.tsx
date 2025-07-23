import { ReactNode, useEffect, useState, useCallback } from 'react'
import { PostContext, PostMap } from './PostContext'
import { useGetPosts } from '@/hooks/useGetPosts'

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const getPosts = useGetPosts()
  const [postsByCategory, setPostsByCategory] = useState<PostMap>({})

  const fetchPostsByCategory = useCallback(async (categoryId: string) => {
    const posts = await getPosts({ categoryId })
    setPostsByCategory((prev) => ({
      ...prev,
      [categoryId]: posts.posts,
    }))
  }, [])

  useEffect(() => {
    fetchPostsByCategory('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PostContext.Provider value={{ postsByCategory, fetchPostsByCategory }}>
      {children}
    </PostContext.Provider>
  )
}
