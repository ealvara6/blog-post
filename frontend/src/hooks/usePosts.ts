import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createPost,
  createPostQuery,
  getPostById,
  getPosts,
  GetPostsQuery,
} from '@/api/postsApi'
import { Post } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useNavigate } from 'react-router'

type PostsResponse = {
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

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: createPostQuery) => createPost(data),
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      console.log(newPost)
      navigate({ pathname: `/posts/${newPost.data.id}` }, { replace: true })
    },
    onError: (err) => {
      throw parseErrorMessage(err)
    },
  })
}
