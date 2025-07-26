import { getCommentLikes } from '@/api/likeApi'
import { useQuery } from '@tanstack/react-query'

export const useCommentLikes = (id: number) => {
  return useQuery({
    queryKey: ['commentLikes', id],
    queryFn: () => getCommentLikes(id),
    staleTime: 1000 * 60,
  })
}
