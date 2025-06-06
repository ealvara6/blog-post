import PostCard from './PostCard'
import { Post } from '@/types/posts'

interface PageInfoProps {
  currentPage: string
  total: number
  totalPage: number
}

export const GetPosts = ({
  posts,
  pageInfo,
}: {
  posts: Post[]
  pageInfo: PageInfoProps | undefined
}) => {
  return (
    <div className="flex w-full cursor-pointer flex-col gap-5">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />
      })}
      <div className="self-center">
        showing page {pageInfo?.currentPage} out of {pageInfo?.totalPage}{' '}
      </div>
    </div>
  )
}

export default GetPosts
