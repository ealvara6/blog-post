import PostCard from './PostCard'
import { Post } from '@/types/posts'

interface PageInfoProps {
  currentPage: string
  total: number
  totalPage: number
}

export const GetPosts = ({
  posts,
}: {
  posts: Post[]
  pageInfo: PageInfoProps | undefined
}) => {
  return (
    <div className="flex w-full flex-col gap-5">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />
      })}
    </div>
  )
}

export default GetPosts
