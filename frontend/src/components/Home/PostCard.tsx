import { Comment } from '@/types/posts'
import { useNavigate } from 'react-router-dom'
import { Hearts } from '../Shared/Hearts'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'

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
      className="dark:border-border-darkTheme dark:bg-card-darkTheme bg-card flex h-[400px] w-full cursor-default flex-col gap-8 overflow-hidden rounded border px-3 py-5 transition-colors duration-250"
      onClick={() => navigate(`/posts/${id}`)}
    >
      <div className="text-xl font-semibold sm:text-2xl">{title}</div>
      <div className="dark:text-text-primary-darkTheme/80 text-text-primary/80 line-clamp-6 text-base sm:text-lg">
        {content}
      </div>
      <div className="dark:text-text-muted-darkTheme text-text-muted flex grow items-end justify-between gap-3 font-semibold tracking-wider sm:text-lg">
        <Hearts id={id} />
        <div className="flex gap-2 select-none">
          {comments?.length === 0 ? '0' : `${comments?.length}`}{' '}
          <span className="hidden sm:block">
            {comments?.length === 1 ? 'Comment' : 'Comments'}
          </span>{' '}
          <span className="block sm:hidden">
            <ChatBubbleBottomCenterIcon className="block w-7 sm:hidden" />
          </span>
        </div>
      </div>
    </div>
  )
}
