export interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  published: boolean
  categories?: Category[]
  comments?: Comment[]
  user: User
  userId: number
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  userId: number
  user: User
  postId?: number
}

export interface User {
  profilePictureUrl?: string
  id: number
  username: string
}

export interface Category {
  id: number
  name: string
}
