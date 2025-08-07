import PostItem from '@/components/Posts/PostItem'
import { useParams } from 'react-router-dom'

export const Post = () => {
  const { id } = useParams()

  return (
    <div className="w-full px-3 sm:max-w-7xl">
      <PostItem id={Number(id)} />
    </div>
  )
}

export default Post
