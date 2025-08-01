import { createComment, getCommentsByPostId } from '@/api/commentsApi'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type CreateDataFn = {
  content: string
  postId: number
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['post', variables.postId],
      })
    },
    onError: (err) => {
      throw parseErrorMessage(err)
    },
  })
}
