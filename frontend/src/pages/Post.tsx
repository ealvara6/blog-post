import PostItem from '@/components/Posts/PostItem'
import { usePost } from '@/hooks/usePosts'
import { useParams } from 'react-router-dom'

export const Post = () => {
  const { id } = useParams()
  const { data, isLoading } = usePost(Number(id))
  if (isLoading) return <p>Loading...</p>

  return (
    <div className="w-full px-3 sm:max-w-7xl">
      {data.post ? <PostItem {...data.post} /> : <div>No post found</div>}
    </div>
  )
}

export default Post
