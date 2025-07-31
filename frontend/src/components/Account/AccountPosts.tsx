import { useAuth } from '@/context/AuthProvider/useAuth'
import PostCard from '@/components/Posts/PostCard'
import { useUserPosts } from '@/hooks/useUser'
import { Post } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Error } from '../Shared/Error'

export const AccountPosts = () => {
  const { authUser } = useAuth()
  const { data, isLoading, isError, error } = useUserPosts(authUser?.id)

  const fetchPosts = () => {
    if (data.posts === undefined || Object.keys(data.posts).length === 0)
      return <div className="text-center">No data.posts found</div>

    const postItems = data.posts.map((post: Post, index: number) => {
      return <PostCard post={post} key={index} handleNavigate />
    })

    return <div className="flex flex-col gap-8">{postItems}</div>
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <Error>{parseErrorMessage(error)}</Error>
  if (!data.posts || data.posts.length === 0)
    return <div className="text-center">No posts found</div>

  return <div>{fetchPosts()}</div>
}
