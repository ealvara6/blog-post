import { getCommentsByPostId } from '@/api/commentsApi'
import { useQuery } from '@tanstack/react-query'

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsByPostId(postId),
    staleTime: 1000 * 60,
    enabled: !!postId,
  })
}
