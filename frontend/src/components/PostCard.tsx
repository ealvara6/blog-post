import { Post } from '@/types/posts'
import { useNavigate } from 'react-router-dom'

export const PostCard = ({ post }: { post: Post }) => {
  const Navigate = useNavigate()
  const { title, content, createdAt, id } = post
  const date = new Date(createdAt)
  return (
    <div className="flex flex-col" onClick={() => Navigate(`/posts/${id}`)}>
      <div className="border-b-border-dark border p-3 text-2xl font-bold">
        {title}
      </div>
      <div className="border-b-border-dark border border-t-transparent p-3">
        {content}
      </div>
      <div className="border border-t-transparent p-3 text-end font-mono font-thin">
        <span className="font-semibold">Posted At: </span>
        {date.toLocaleString()}
      </div>
    </div>
  )
}

export default PostCard
