import useUser from '@/hooks/useUser'
import { Post, Comment } from '@/types/posts'

const getComments = (comments: Comment[] | undefined) => {
  if (!comments) return <div>No comments found</div>
  return comments.map((comment, key) => {
    const { user } = useUser(comment.userId.toString())
    const date = new Date(comment.createdAt)
    return (
      <div className="flex flex-col rounded border p-3" key={key}>
        <div className="text-xl font-bold">{user?.username}</div>
        <div>{comment.content}</div>
        <div className="self-end font-mono font-thin">
          <span className="font-bold">created at: </span>
          {date.toLocaleString()}
        </div>
      </div>
    )
  })
}

export const PostItem = (post: Post) => {
  const { title, content, createdAt, comments } = post
  const date = new Date(createdAt)
  return (
    <div className="flex flex-col gap-8">
      <div>
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
      <div className="flex flex-col gap-3">
        <div className="text-4xl font-bold">Comments</div>
        {getComments(comments)}
      </div>
    </div>
  )
}

export default PostItem
