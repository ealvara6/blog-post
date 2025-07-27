import {
  getCommentLikes,
  getUserLikedComment,
  likeComment,
  unlikeComment,
} from '@/api/likeApi'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCommentLikes = (id: number) => {
  return useQuery({
    queryKey: ['commentLikes', id],
    queryFn: () => getCommentLikes(id),
    staleTime: 1000 * 60,
    enabled: !!id,
  })
}

export const useUserLikedComment = (id: number) => {
  const { authUser } = useAuth()
  return useQuery({
    queryKey: ['userLikedComment', id],
    queryFn: () => getUserLikedComment(id),
    staleTime: 1000 * 60,
    enabled: !!id && !!authUser,
  })
}

export const useToggleCommentLike = (id: number, liked: boolean) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => (liked ? unlikeComment(id) : likeComment(id)),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['commentLikes', id] })

      const previousLikes = queryClient.getQueryData(['commentLikes', id])
      const previousUserLiked = queryClient.getQueryData([
        'userLikedComment',
        id,
      ])

      queryClient.setQueryData(
        ['commentLikes', id],
        (prev: { likeCount: number } | undefined) => ({
          likeCount: (prev?.likeCount ?? 0) + (liked ? -1 : 1),
        }),
      )
      queryClient.setQueryData(['userLikedComment', id], { liked: !liked })

      return { previousLikes, previousUserLiked }
    },
    onError: (_err, _var, context) => {
      console.error('Failed to toggle like', _err)
      if (context?.previousLikes)
        queryClient.setQueryData(['commentLikes', id], context.previousLikes)
      if (context?.previousUserLiked)
        queryClient.setQueryData(
          ['userLikedComment', id],
          context.previousUserLiked,
        )
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['commentLikes', id] })
      queryClient.invalidateQueries({ queryKey: ['userLikedComment', id] })
    },
  })
}
