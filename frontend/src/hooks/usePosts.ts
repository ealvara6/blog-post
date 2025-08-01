import { useQuery } from '@tanstack/react-query'
import { getPostById, getPosts, GetPostsQuery } from '@/api/postsApi'
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

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    staleTime: 1000 * 60 * 5,
  })
}
