import PostCard from './PostCard'
import { Post } from '@/types/posts'

export const GetPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="flex w-full flex-col gap-5">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            handleNavigate={true}
            currentComments={post.comments}
          />
        )
      })}
    </div>
  )
}

export default GetPosts
