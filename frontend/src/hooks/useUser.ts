import { getUserComments } from '@/api/userApi'
import { useQuery } from '@tanstack/react-query'

export const useUserComments = (userId?: number) => {
  return useQuery({
    queryKey: ['userComments', userId],
    queryFn: () => getUserComments(),
    staleTime: 1000 * 60,
    enabled: !!userId,
  })
}
