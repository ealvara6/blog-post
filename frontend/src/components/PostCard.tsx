import { Post } from '@/types/posts'
import { useNavigate } from 'react-router-dom'
import { CategoriesList } from './CategoriesList'
import { format } from 'date-fns'

export const PostCard = ({ post }: { post: Post }) => {
  const Navigate = useNavigate()
  const { title, content, createdAt, id, user, categories } = post
  const date = format(new Date(createdAt), 'MMM dd, yyy  • h:mm a')
  return (
    <div
      className="dark:border-border-darkTheme flex cursor-pointer flex-col border-2"
      onClick={() => Navigate(`/posts/${id}`)}
    >
      <div className="flex flex-col gap-2 border-b p-3 md:flex-row">
        <div className="grow text-lg font-bold md:text-2xl">{title}</div>
        <div className="text-md font-semibold md:text-lg">
          Posted by: <span className="font-thin">{user.username}</span>
        </div>
      </div>
      <div className="grow border-b p-3">{content}</div>
      <div className="flex flex-col justify-between p-3 text-end font-mono font-thin">
        {categories && <CategoriesList categories={categories} />}
        <div>
          <span className="font-semibold">Posted At: </span>
          <div>{date}</div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
