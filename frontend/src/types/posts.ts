export interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  published: boolean
  comments: Comment[]
  user: User
  userId: number
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  userId: number
}

export interface User {
  id: number
  username: string
}
