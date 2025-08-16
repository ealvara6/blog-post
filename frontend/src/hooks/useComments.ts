import {
  createComment,
  deleteComment,
  getCommentsByPostId,
  updateComment,
} from '@/api/commentsApi'
import { Comment } from '@/types/posts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type CreateDataFn = {
  content: string
  postId: number
  username?: string
}

type DeleteDataFn = {
  commentId: number
  postId?: number
}

type UpdateDataFn = {
  content: string
  commentId: number
  postId?: number
  username?: string
}

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsByPostId(postId),
    staleTime: 1000 * 60,
    enabled: !!postId,
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateDataFn) => createComment(data),

    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: ['comments', newComment.postId],
      })

      const previousComments = queryClient.getQueryData([
        'comments',
        newComment.postId,
      ])
      queryClient.setQueryData<{ comments: Comment[] }>(
        ['comments', newComment.postId],
        (old) => ({
          comments: [
            ...(old?.comments ?? []),
            {
              id: Math.random(),
              content: newComment.content,
              postId: newComment.postId,
              userId: Math.random(),
              user: {
                id: Math.random(),
                username: newComment.username ?? 'You',
              },
              createdAt: new Date().toISOString(),
            },
          ],
        }),
      )

      return { previousComments }
    },

    onError: (_err, newComment, context) => {
      queryClient.setQueryData(
        ['comments', newComment.postId],
        context?.previousComments,
      )
    },

    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.postId],
      })
      queryClient.invalidateQueries({
        queryKey: ['userProfile'],
      })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DeleteDataFn) => deleteComment(data.commentId),

    onMutate: async (deletedComment) => {
      await queryClient.cancelQueries({
        queryKey: ['comments', deletedComment.postId],
      })

      const previousComments = queryClient.getQueryData([
        'comments',
        deletedComment.postId,
      ])

      queryClient.setQueryData<{ comments: Comment[] }>(
        ['comments', deletedComment.postId],
        (old) => ({
          comments: (old?.comments ?? []).filter(
            (comment: Comment) => comment.id !== deletedComment.commentId,
          ),
        }),
      )

      return { previousComments }
    },
    onError: (_err, newComment, context) => {
      queryClient.setQueryData(
        ['comments', newComment.postId],
        context?.previousComments,
      )
    },

    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.postId],
      })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateDataFn) =>
      updateComment({ commentId: data.commentId, content: data.content }),

    onMutate: async (updatedComment) => {
      await queryClient.cancelQueries({
        queryKey: ['comments', updatedComment.postId],
      })

      const previousComments = queryClient.getQueryData([
        'comments',
        updatedComment.postId,
      ])

      queryClient.setQueryData<{ comments: Comment[] }>(
        ['comments', updatedComment.postId],
        (old) => ({
          comments: (old?.comments ?? []).map((comment) =>
            comment.id === updatedComment.commentId
              ? { ...comment, content: updatedComment.content }
              : comment,
          ),
        }),
      )

      return { previousComments }
    },

    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.postId],
      })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
  })
}
