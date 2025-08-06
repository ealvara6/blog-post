import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createPost,
  CreatePostProps,
  deletePost,
  EditPostProps,
  getPostById,
  getPosts,
  GetPostsQuery,
  updatePost,
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
    mutationFn: (data: CreatePostProps) => createPost(data),
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate({ pathname: `/posts/${newPost.data.id}` }, { replace: true })
    },
    onError: (err) => {
      throw parseErrorMessage(err)
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: EditPostProps) => updatePost(data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['post', updatedPost.data.id] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate({ pathname: `/posts/${updatedPost.data.id}` }, { replace: true })
    },
    onError: (err) => {
      throw parseErrorMessage(err)
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (err) => {
      throw parseErrorMessage(err)
    },
  })
}
