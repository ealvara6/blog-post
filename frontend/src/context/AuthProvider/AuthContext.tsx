import { createContext } from 'react'
import { SignUpInterface } from '@/components/Auth/Signup/Signup'

export type User = {
  id: number
  username: string
  email: string
} | null

interface AuthContextType {
  authUser: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (formData: SignUpInterface) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)
