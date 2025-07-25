import { useQuery } from '@tanstack/react-query'
import { getPosts, GetPostsQuery } from '@/api/getPosts'
import { Post } from '@/types/posts'

interface PostsResponse {
  posts: Post[]
  pageInfo: {
    total: number
    currentPage: number
    totalPage: number
  }
}

export const usePosts = (query?: GetPostsQuery) => {
  return useQuery<PostsResponse>({
    queryKey: ['posts', query],
    queryFn: () => getPosts(query),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  })
}
