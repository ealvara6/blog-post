import { GetPosts } from '@/components/GetPosts'
import { usePosts } from '@/hooks/usePosts'

export const Posts = () => {
  const { posts, loading } = usePosts()

  if (loading) return <p>Loading...</p>

  return (
    <>
      <GetPosts posts={posts} />
    </>
  )
}
