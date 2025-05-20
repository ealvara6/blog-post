import { useAuth } from '@/context/AuthProvider/useAuth'
import { useGetUserComments } from '@/hooks/useGetUserComments'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useEffect, useState } from 'react'
import { CommentItem } from '../CommentItem'
import { Comment } from '@/types/posts'
import { useNavigate } from 'react-router-dom'

export const AccountComments = () => {
  const { authUser } = useAuth()
  const [comments, setComments] = useState<Comment[]>()
  const [loading, setLoading] = useState(true)
  const getUserComments = useGetUserComments()
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!authUser) return
        const fetchedComments = await getUserComments(authUser.id)
        setComments(fetchedComments)
      } catch (err) {
        setServerError(parseErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [authUser, getUserComments])

  const fetchComments = () => {
    if (comments === undefined || Object.keys(comments).length === 0)
      return <div>No Comments found</div>

    const commentItems = comments.map((comment, index) => {
      const date = new Date(comment.createdAt)
      return (
        <div onClick={() => navigate(`/posts/${comment.postId}`)}>
          <CommentItem comment={comment} index={index} date={date} />
        </div>
      )
    })

    return commentItems
  }

  if (loading) return <div>Loading...</div>
  if (serverError) return <div>{serverError}</div>
  if (!comments || comments.length === 0) return <div>No Comments found</div>

  return <div>{fetchComments()}</div>
}
