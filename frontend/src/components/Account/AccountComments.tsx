import { useAuth } from '@/context/AuthProvider/useAuth'
import { Comment } from '@/types/posts'
import { CommentItem } from '@/components/Comment/CommentItem'
import { useNavigate } from 'react-router-dom'
import { Error } from '../Shared/Error'
import { useUserComments } from '@/hooks/useUser'

export const AccountComments = () => {
  const { authUser } = useAuth()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useUserComments(authUser?.id)
  console.log(data)

  const fetchComments = () => {
    if (data.comments === undefined || Object.keys(data.comments).length === 0)
      return <div className="text-center">No data.comments found</div>

    const commentItems = data.comments.map(
      (comment: Comment, index: number) => {
        const date = new Date(comment.createdAt)
        return (
          <div key={index} onClick={() => navigate(`/posts/${comment.postId}`)}>
            <CommentItem comment={comment} index={index} date={date} />
          </div>
        )
      },
    )

    return commentItems
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <Error>{isError}</Error>
  if (!data.comments || data.comments.length === 0)
    return <div className="text-center">No data.comments found</div>

  return <div className="flex flex-col gap-8">{fetchComments()}</div>
}
