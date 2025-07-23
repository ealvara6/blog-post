import { Category } from '@/types/posts'
import { createContext } from 'react'

export const CategoryContext = createContext<{
  categories: Category[]
  fetchCategories: () => Promise<void>
} | null>(null)
