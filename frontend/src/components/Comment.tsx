import { Comment } from '@/types/posts'

export const CommentItem = ({
  comment,
  index,
  date,
}: {
  comment: Comment
  index: number
  date: Date
}) => {
  return (
    <div className="flex flex-col rounded border p-3" key={index}>
      <div className="text-xl font-bold">{comment.user.username}</div>
      <div>{comment.content}</div>
      <div className="self-end font-mono font-thin">
        <span className="font-bold">created at: </span>
        {date.toLocaleString()}
      </div>
    </div>
  )
}
