import { Comment } from '@/types/posts'
import { useNavigate } from 'react-router-dom'
import { Hearts } from '../Hearts'

export const PostCard = ({
  title,
  content,
  id,
  comments,
}: {
  title: string
  content: string
  id: number
  comments: Comment[] | undefined
}) => {
  const navigate = useNavigate()

  return (
    <div
      className="dark:border-border-darkTheme dark:bg-card-darkTheme bg-card flex h-[400px] w-full flex-col gap-8 overflow-hidden rounded border px-3 py-5"
      onClick={() => navigate(`/posts/${id}`)}
    >
      <div className="text-2xl md:text-3xl">{title}</div>
      <div className="dark:text-text-primary-darkTheme/80 text-text-primary/80 line-clamp-6 text-lg">
        {content}
      </div>
      <div className="dark:text-text-muted-darkTheme text-text-muted flex grow items-end justify-between gap-3 font-semibold tracking-wider sm:text-lg">
        <Hearts id={id} />
        <div>
          {comments?.length === 0 ? '0' : `${comments?.length}`} Comments
        </div>
      </div>
    </div>
  )
}
