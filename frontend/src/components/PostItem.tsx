import { useAuth } from '@/context/AuthProvider/useAuth'
import { Post, Comment } from '@/types/posts'
import { CommentForm } from './CommentForm'
import { useEffect, useState } from 'react'
import { CommentItem } from './CommentItem'
import PostCard from './PostCard'
import { DeletePostModal } from './DeletePostModal'

export const PostItem = (post: Post) => {
  const { id } = post
  const [isOpen, setIsOpen] = useState<string | null>(null)
  let { comments } = post
  if (!comments) comments = []
  const { authUser } = useAuth()
  const [currentComments, setCurrentComments] = useState<Comment[]>(comments)

  useEffect(() => {}, [currentComments])

  const GetComments = () => {
    if (!currentComments) return ''
    if (currentComments.length === 0)
      return (
        <div className="text-center tracking-wide">
          Be the first to Comment!
        </div>
      )
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
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold">Comments</div>
        {authUser ? (
          <CommentForm
            postId={id}
            setCurrentComments={setCurrentComments}
            className="dark:border-border-darkTheme border-b pb-5"
          />
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
