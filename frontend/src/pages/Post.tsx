import PostItem from '@/components/PostItem'
import { useGetPost } from '@/hooks/useGetPost'
import { useParams } from 'react-router-dom'

export const Post = () => {
  const { id } = useParams()
  const { post, loading } = useGetPost(id)
  if (loading) return <p>Loading...</p>

  return (
    <div className="w-full">
      {post ? <PostItem {...post} /> : <div>No post found</div>}
    </div>
  )
}

export default Post
