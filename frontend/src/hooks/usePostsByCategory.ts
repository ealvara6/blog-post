import { useQuery } from '@tanstack/react-query'
import { useGetPosts } from './useGetPosts'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { Post } from '@/types/posts'

export const usePostsByCategory = (categoryId: string) => {
  const { authUser } = useAuth()
  const getPosts = useGetPosts()

  return useQuery<Post[]>({
    queryKey: ['posts', categoryId, authUser?.id],
    queryFn: () => getPosts({ categoryId }).then((res) => res.posts),
    staleTime: 1000 * 60 * 5,
  })
}
