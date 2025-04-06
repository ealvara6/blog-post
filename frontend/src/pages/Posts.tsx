import { GetPosts } from '@/components/GetPosts'
import { usePosts } from '@/hooks/usePosts'

export const Posts = () => {
  const { posts, loading } = usePosts()

  if (loading) return <p>Loading...</p>

  return (
    <>
      {posts.length !== 0 ? (
        <GetPosts posts={posts} />
      ) : (
        <div>No posts found</div>
      )}
    </>
  )
}
