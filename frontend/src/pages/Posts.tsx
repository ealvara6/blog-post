import { GetPosts } from '@/components/GetPosts'
import { useGetPosts } from '@/hooks/useGetPosts'
import { Post } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useEffect, useState } from 'react'

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>()
  const [pageInfo, setPageInfo] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const getPosts = useGetPosts()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts()
        setPosts(response.posts)
        setPageInfo(response.pageInfo)
      } catch (err) {
        setError(parseErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [getPosts])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      {posts ? (
        <GetPosts posts={posts} pageInfo={pageInfo} />
      ) : (
        <div>No posts found</div>
      )}
    </>
  )
}
