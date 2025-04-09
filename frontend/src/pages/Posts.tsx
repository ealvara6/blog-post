import { GetPosts } from '@/components/GetPosts'
import { useGetPosts } from '@/hooks/useGetPosts'

export const Posts = () => {
  const { posts, loading } = useGetPosts()

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
