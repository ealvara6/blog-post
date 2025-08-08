import { useLikedPosts } from '@/hooks/useUser'
import { Post } from '@/types/posts'
import PostCard from './PostCard'
import { Button } from '../Shared/Button'
import { PostCardSkeleton } from './PostCardSkeleton'

export const LikedPosts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useLikedPosts()

  const posts: Post[] =
    data?.pages.flatMap((p) =>
      p.posts.map((like: { post: Post }) => like.post),
    ) ?? []

  if (status === 'pending')
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </>
    )

  if (status === 'error') return <div>No Liked Posts</div>

  return (
    <div className="flex flex-col gap-10">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} handleNavigate />
      ))}

      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          isInactive={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading More...' : 'Load more'}
        </Button>
      )}
    </div>
  )
}
