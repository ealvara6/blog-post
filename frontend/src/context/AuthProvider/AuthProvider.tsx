import React, { useCallback, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { User } from './AuthContext'
import api from '../../api/axios'
import { jwtDecode } from 'jwt-decode'
import { SignUpInterface } from '../../components/Signup'

const LOCAL_STORAGE_KEY = 'user'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setAuthUser(null)
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
    const response = await api.post('/auth/login', { email, password })
    if (!response.data.error) {
      console.log(response.data.payload)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(response.data.payload),
      )
      setAuthUser(response.data.payload)
    }
  }, [])

  const signup = async ({
    username,
    email,
    password,
    confirmPassword,
  }: SignUpInterface) => {
    const response = await api.post('/register', {
      username,
      email,
      password,
      confirmPassword,
    })
    if (!response.data.error) {
      console.log(response.data)
      login(email, password)
    }
  }

  if (loading) return null

  return (
    <AuthContext.Provider value={{ authUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}
