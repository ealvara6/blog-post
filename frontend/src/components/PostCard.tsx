import { Post } from '@/types/posts'

export const PostCard = ({ post }: { post: Post }) => {
  const { title, content, createdAt } = post
  const date = new Date(createdAt)
  return (
    <div className="flex cursor-pointer flex-col">
      <div className="border-b-border-dark border p-3 text-2xl font-bold">
        {title}
      </div>
      <div className="border-b-border-dark border border-t-transparent p-3">
        {content}
      </div>
      <div className="border border-t-transparent p-3 text-end font-mono font-thin">
        <span className="font-semibold">Posted At:</span>{' '}
        {date.toLocaleString()}
      </div>
    </div>
  )
}

export default PostCard
