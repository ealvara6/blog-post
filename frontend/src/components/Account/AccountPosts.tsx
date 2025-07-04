import { useAuth } from '@/context/AuthProvider/useAuth'
import { useGetUserPosts } from '@/hooks/useGetUserPosts'
import { Post } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useEffect, useState } from 'react'
import PostCard from '../PostCard'

export const AccountPosts = () => {
  const { authUser } = useAuth()
  const [posts, setPosts] = useState<Post[]>()
  const [loading, setLoading] = useState(true)
  const getUserPosts = useGetUserPosts()
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!authUser) return
        const fetchedPosts = await getUserPosts(authUser.id)
        setPosts(fetchedPosts)
      } catch (err) {
        setServerError(parseErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [authUser, getUserPosts])

  const fetchPosts = () => {
    if (posts === undefined || Object.keys(posts).length === 0)
      return <div>No posts found</div>

    const postItems = posts.map((post, index) => {
      return <PostCard post={post} key={index} />
    })

    return <div>{postItems}</div>
  }

  if (loading) return <div>Loading...</div>
  if (serverError) return <div>{serverError}</div>
  if (!posts || posts.length === 0) return <div>No posts found</div>

  return <div>{fetchPosts()}</div>
}
