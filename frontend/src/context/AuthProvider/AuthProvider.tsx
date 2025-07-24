import api from '@/api/axios'
import { SignUpInterface } from '@/components/Auth/Signup/Signup'
import { jwtDecode } from 'jwt-decode'
import { useState, useCallback, useEffect } from 'react'
import { User, AuthContext } from './AuthContext'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useQueryClient } from '@tanstack/react-query'

const LOCAL_STORAGE_KEY = 'user'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const queryClient = useQueryClient()

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setAuthUser(null)
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY)
    const token = localStorage.getItem('token')
    if (token && storedUser) {
      const decoded: { exp: number } = jwtDecode(token)
      if (decoded.exp * 1000 > Date.now()) {
        setAuthUser(JSON.parse(storedUser))
      } else {
        logout()
      }
    }
    setLoading(false)
  }, [logout])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(response.data.payload),
      )
      setAuthUser(response.data.payload)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    } catch (err) {
      const message = parseErrorMessage(err)
      throw message
    }
  }, [])

  const signup = async ({
    username,
    email,
    password,
    confirmPassword,
  }: SignUpInterface) => {
    try {
      await api.post('/register', {
        username,
        email,
        password,
        confirmPassword,
      })
      await login(email, password)
    } catch (err) {
      const message = parseErrorMessage(err)
      throw message
    }
  }

  if (loading) return null

  return (
    <AuthContext.Provider
      value={{ authUser, login, logout, signup, setAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
