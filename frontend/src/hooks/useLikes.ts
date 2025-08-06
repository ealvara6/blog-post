import {
  getCommentLikes,
  getPostLikes,
  getUserLikedComment,
  getUserLikedPost,
  likeComment,
  likePost,
  unlikeComment,
  unlikePost,
} from '@/api/likeApi'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const usePostLikes = (postId: number) => {
  return useQuery({
    queryKey: ['postLikes', postId],
    queryFn: () => getPostLikes(postId),
    staleTime: 1000 * 60,
    enabled: !!postId,
  })
}

export const useUserLikedPost = (postId: number) => {
  const { authUser } = useAuth()
  return useQuery({
    queryKey: ['userLikedPost', postId],
    queryFn: () => getUserLikedPost(postId),
    staleTime: 1000 * 60,
    enabled: !!postId && !!authUser,
  })
}

export const useTogglePostLike = (postId: number, liked: boolean) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => (liked ? unlikePost(postId) : likePost(postId)),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['postLikes', postId] })

      const previousLikes = queryClient.getQueryData(['postLikes', postId])
      const previousUserLiked = queryClient.getQueryData([
        'userLikedPost',
        postId,
      ])

      queryClient.setQueryData(
        ['postLikes', postId],
        (prev: { likeCount: number } | undefined) => ({
          likeCount: (prev?.likeCount ?? 0) + (liked ? -1 : 1),
        }),
      )

      queryClient.setQueryData(['userLikedPost', postId], { liked: !liked })

      return { previousLikes, previousUserLiked }
    },

    onError: (_err, _var, context) => {
      console.log('Failed to toggle like', _err)
      if (context?.previousLikes)
        queryClient.setQueryData(['postLikes', postId], context.previousLikes)
      if (context?.previousUserLiked)
        queryClient.setQueryData(
          ['userLikedPost', postId],
          context.previousUserLiked,
        )
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['postLikes', postId] })
      queryClient.invalidateQueries({ queryKey: ['userLikedPost', postId] })
    },
  })
}

export const useCommentLikes = (commentId: number) => {
  return useQuery({
    queryKey: ['commentLikes', commentId],
    queryFn: () => getCommentLikes(commentId),
    staleTime: 1000 * 60,
    enabled: !!commentId,
  })
}

export const useUserLikedComment = (commentId: number) => {
  const { authUser } = useAuth()
  return useQuery({
    queryKey: ['userLikedComment', commentId],
    queryFn: () => getUserLikedComment(commentId),
    staleTime: 1000 * 60,
    enabled: !!commentId && !!authUser,
  })
}

export const useToggleCommentLike = (commentId: number, liked: boolean) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
      liked ? unlikeComment(commentId) : likeComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['commentLikes', commentId] })

      const previousLikes = queryClient.getQueryData([
        'commentLikes',
        commentId,
      ])
      const previousUserLiked = queryClient.getQueryData([
        'userLikedComment',
        commentId,
      ])

      queryClient.setQueryData(
        ['commentLikes', commentId],
        (prev: { likeCount: number } | undefined) => ({
          likeCount: (prev?.likeCount ?? 0) + (liked ? -1 : 1),
        }),
      )
      queryClient.setQueryData(['userLikedComment', commentId], {
        liked: !liked,
      })

      return { previousLikes, previousUserLiked }
    },
    onError: (_err, _var, context) => {
      console.error('Failed to toggle like', _err)
      if (context?.previousLikes)
        queryClient.setQueryData(
          ['commentLikes', commentId],
          context.previousLikes,
        )
      if (context?.previousUserLiked)
        queryClient.setQueryData(
          ['userLikedComment', commentId],
          context.previousUserLiked,
        )
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['commentLikes', commentId] })
      queryClient.invalidateQueries({
        queryKey: ['userLikedComment', commentId],
      })
    },
  })
}
