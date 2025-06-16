import { Post } from '@/types/posts'
import { useNavigate } from 'react-router-dom'
import { CategoriesList } from './CategoriesList'

export const PostCard = ({ post }: { post: Post }) => {
  const Navigate = useNavigate()
  const { title, content, createdAt, id, user, categories } = post
  const date = new Date(createdAt)
  return (
    <div
      className="flex cursor-pointer flex-col"
      onClick={() => Navigate(`/posts/${id}`)}
    >
      <div className="border-b-border-dark flex border p-3 text-2xl font-bold">
        <div className="grow">{title}</div>
        <div>Posted by: {user.username}</div>
      </div>
      <div className="border-b-border-dark border border-t-transparent p-3">
        {content}
      </div>
      <div className="flex justify-between border border-t-transparent p-3 text-end font-mono font-thin">
        {categories && <CategoriesList categories={categories} />}
        <div>
          <span className="font-semibold">Posted At: </span>
          {date.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default PostCard
