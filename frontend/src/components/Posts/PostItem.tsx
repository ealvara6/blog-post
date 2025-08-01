import { useAuth } from '@/context/AuthProvider/useAuth'
import { Post, Comment } from '@/types/posts'
import { CommentForm } from '../Comment/CommentForm'
import { useState } from 'react'
import { CommentItem } from '@/components/Comment/CommentItem'
import PostCard from '@/components/Posts/PostCard'
import { DeletePostModal } from '../DeletePostModal'
import { useComments } from '@/hooks/useComments'

export const PostItem = (post: Post) => {
  const { id } = post
  const [isOpen, setIsOpen] = useState<string | null>(null)
  const { authUser } = useAuth()
  const { data } = useComments(id)

  const GetComments = () => {
    if (!data) {
      return <div>Loading comments...</div>
    }
    if (data.comments.length === 0)
      return (
        <div className="text-center font-semibold tracking-wide sm:text-xl">
          Be the first to Comment!
        </div>
      )
    return data.comments.map((comment: Comment, index: number) => {
      const date = new Date(comment.createdAt)
      return (
        <div key={index}>
          <CommentItem comment={comment} index={index} date={date} />
        </div>
      )
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <PostCard post={post} />
      <div className="flex flex-col gap-4 md:mx-6">
        <div className="text-2xl font-bold">Comments</div>
        {authUser ? <CommentForm postId={id} className="pb-5" /> : ''}
        <GetComments />
        {isOpen && <DeletePostModal setIsOpen={setIsOpen} id={id} />}
      </div>
    </div>
  )
}

export default PostItem
