import { getCategories } from '@/api/getCategories'
import { Category } from '@/types/posts'
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 10,
  })
}
