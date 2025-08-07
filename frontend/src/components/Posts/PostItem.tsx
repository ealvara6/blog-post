import { useAuth } from '@/context/AuthProvider/useAuth'
import { Comment } from '@/types/posts'
import { CommentForm } from '../Comment/CommentForm'
import { useState } from 'react'
import { CommentItem } from '@/components/Comment/CommentItem'
import PostCard from '@/components/Posts/PostCard'
import { DeletePostModal } from './DeletePostModal'
import { useComments } from '@/hooks/useComments'
import { CommentSkeleton } from '../Comment/CommentSkeleton'
import { usePost } from '@/hooks/usePosts'
import { PostCardSkeleton } from './PostCardSkeleton'

export const PostItem = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState<string | null>(null)
  const { authUser } = useAuth()
  const { data: post, isPending } = usePost(id)
  const { data } = useComments(id)

  const GetComments = () => {
    if (!data) {
      return (
        <>
          {[...Array(3)].map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </>
      )
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

  if (isPending)
    return (
      <div className="flex flex-col gap-12">
        <PostCardSkeleton />
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      </div>
    )

  return (
    <div className="flex flex-col gap-8">
      <PostCard post={post.post} />
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
