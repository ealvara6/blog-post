import { useAuth } from '@/context/AuthProvider/useAuth'
import { Post, Comment } from '@/types/posts'
import { Button } from './Button'
import { useDeletePost } from '@/hooks/useDeletePost'
import { useNavigate } from 'react-router-dom'
import { CommentForm } from './CommentForm'
import { useEffect, useState } from 'react'
import { CommentItem } from './CommentItem'

export const PostItem = ({
  title,
  content,
  createdAt,
  comments,
  id,
  userId,
  categories,
  user,
}: Post) => {
  if (!comments) comments = []
  const { authUser } = useAuth()
  const deletePost = useDeletePost()
  const navigate = useNavigate()
  const date = new Date(createdAt)
  const [currentcomments, setCurrentComments] = useState<Comment[]>(comments)

  useEffect(() => {}, [currentcomments])

  const handleDelete = async () => {
    try {
      console.log('deleting post...')
      await deletePost(id)
      console.log('post deleted')
      navigate('/posts')
    } catch (err: unknown) {
      console.log(err)
    }
  }

  const GetComments = () => {
    if (!currentcomments) return ''
    if (currentcomments.length === 0)
      return <div className="text-center">No comments found</div>
    return currentcomments.map((comment, index) => {
      const date = new Date(comment.createdAt)
      return (
        <div key={index}>
          <CommentItem
            comment={comment}
            index={index}
            date={date}
            setCurrentComments={setCurrentComments}
          />
        </div>
      )
    })
  }

  const handleEdit = () => {
    const categoryIds = categories?.map((category) => category.id)
    navigate(`/posts/${id}/edit`, {
      state: { title, content, userId, id, categoryIds },
    })
  }

  const AuthButtons = () => {
    if (authUser?.id !== userId) return null

    return (
      <div className="flex gap-4 self-end">
        <Button onClick={() => handleEdit()}>Edit</Button>
        <Button variant="danger" onClick={() => handleDelete()}>
          Delete
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="border-b-border-dark flex border p-3 text-2xl font-bold">
          <div className="grow">{title}</div>
          <div>Posted by: {user.username}</div>
        </div>
        <div className="border-b-border-dark border border-t-transparent p-3">
          {content}
        </div>
        <div className="border border-t-transparent p-3 text-end font-mono font-thin">
          <span className="font-semibold">Posted At:</span>{' '}
          {date.toLocaleString()}
        </div>
        <AuthButtons />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-4xl font-bold">Comments</div>
        {authUser ? (
          <CommentForm postId={id} setCurrentComments={setCurrentComments} />
        ) : (
          ''
        )}
        <GetComments />
      </div>
    </div>
  )
}

export default PostItem
