import { Post } from '@/types/posts'
import { createContext } from 'react'

export type PostMap = {
  [categoryId: string]: Post[]
}

export const PostContext = createContext<{
  postsByCategory: PostMap
  fetchPostsByCategory: (categoryId: string) => Promise<void>
} | null>(null)
