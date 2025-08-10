import { useLikedComments } from '@/hooks/useUser'
import { Comment } from '@/types/posts'
import { CommentSkeleton } from './CommentSkeleton'
import { CommentItem } from './CommentItem'
import { Button } from '../Shared/Button'

export const LikedComments = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useLikedComments()

  const comments: Comment[] =
    data?.pages.flatMap((p) =>
      p.comments.map((like: { comment: Comment }) => like.comment),
    ) ?? []

  if (status === 'pending')
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </>
    )

  if (status === 'error') return <div>No Liked Comments</div>

  return (
    <div className="flex flex-col gap-10">
      {comments.map((comment) => (
        <CommentItem comment={comment} index={comment.id} />
      ))}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          isInactive={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading More...' : 'Load More'}
        </Button>
      )}
    </div>
  )
}
