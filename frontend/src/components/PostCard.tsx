import { Post } from '@/types/posts'
import { useNavigate } from 'react-router-dom'
import { CategoriesList } from './CategoriesList'
import { format } from 'date-fns'

export const PostCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate()
  const { title, content, createdAt, id, user, categories } = post
  const date = format(new Date(createdAt), 'MMM dd, yyy  • h:mm a')
  return (
    <>
      <div
        className="dark:border-border-darkTheme flex cursor-pointer flex-col border-2"
        onClick={() => navigate(`/posts/${id}`)}
      >
        <div className="dark:border-border-darkTheme flex flex-col gap-2 border-b p-3">
          <div className="grow text-lg font-bold md:text-2xl">{title}</div>
          <div className="flex justify-between">
            {categories && <CategoriesList categories={categories} />}
            <div className="text-md hidden font-semibold sm:block md:text-lg">
              Posted by: <span className="font-thin">{user.username}</span>
            </div>
          </div>
        </div>
        <div className="dark:text-text-muted-darkTheme text-text-muted grow p-3">
          {content}
        </div>
        <div className="hidden flex-col justify-between p-3 text-end font-mono font-thin sm:flex">
          <div className="flex justify-end gap-2">
            <span className="text-lg font-semibold">Posted At: </span>
            <div className="mt-[1px] self-center">{date}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCard
