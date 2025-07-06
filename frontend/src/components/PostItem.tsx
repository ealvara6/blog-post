import { useAuth } from '@/context/AuthProvider/useAuth'
import { Post, Comment } from '@/types/posts'
import { CommentForm } from './CommentForm'
import { useEffect, useState } from 'react'
import { CommentItem } from './CommentItem'
import PostCard from './PostCard'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'
import { DeletePostModal } from './DeletePostModal'

export const PostItem = (post: Post) => {
  const { id, categories, content, userId, title } = post
  const [isOpen, setIsOpen] = useState<string | null>(null)
  let { comments } = post
  if (!comments) comments = []
  const { authUser } = useAuth()
  const [currentComments, setCurrentComments] = useState<Comment[]>(comments)
  const navigate = useNavigate()

  useEffect(() => {}, [currentComments])

  const handleEdit = () => {
    const categoryIds = categories?.map((category) => category.id)
    navigate(`/posts/${id}/edit`, {
      state: { title, content, userId, id, categoryIds },
    })
  }

  const handleDelete = async () => {
    try {
      setIsOpen('open')
    } catch (err: unknown) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    if (authUser?.id !== userId) return null

    return (
      <div className="flex gap-4 self-end">
        <Button variant="transparent" onClick={() => handleEdit()}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete()}>
          Delete
        </Button>
      </div>
    )
  }

  const GetComments = () => {
    if (!currentComments) return ''
    if (currentComments.length === 0)
      return <div className="text-center">No comments found</div>
    return currentComments.map((comment, index) => {
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

  return (
    <div className="flex flex-col gap-8">
      <PostCard post={post} />
      <AuthButtons />
      <div className="flex flex-col gap-3">
        <div className="text-4xl font-bold">Comments</div>
        {authUser ? (
          <CommentForm postId={id} setCurrentComments={setCurrentComments} />
        ) : (
          ''
        )}
        <GetComments />
        {isOpen && <DeletePostModal setIsOpen={setIsOpen} id={id} />}
      </div>
    </div>
  )
}

export default PostItem
