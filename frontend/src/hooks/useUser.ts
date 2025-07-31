import { getUserComments, getUserPosts } from '@/api/userApi'
import { useQuery } from '@tanstack/react-query'

export const useUserComments = (userId?: number) => {
  return useQuery({
    queryKey: ['userComments', userId],
    queryFn: () => getUserComments(),
    staleTime: 1000 * 60,
    enabled: !!userId,
  })
}

export const useUserPosts = (userId?: number) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(),
    staleTime: 1000 * 60,
    enabled: !!userId,
  })
}
