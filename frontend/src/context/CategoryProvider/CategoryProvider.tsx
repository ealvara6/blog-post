import { useGetCategories } from '@/hooks/useGetCategories'
import { Category } from '@/types/posts'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { CategoryContext } from './CategoryContext'

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const getCategories = useGetCategories()

  const fetchCategories = useCallback(async () => {
    const categories = await getCategories()
    setCategories(categories)
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <CategoryContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}
