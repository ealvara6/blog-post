import { vi } from 'vitest'
import { SignUpInterface } from '@/components/Auth/Signup/Signup'

export const mockAuthUser = {
  id: 1,
  username: 'mock_username',
  email: 'mock@gmail.com',
  password: 'mock_password',
  createdAt: Date.now(),
  blogAuth: true,
}

export const loginMock = vi.fn(async (email: string, password: string) => {
  try {
    await new Promise((r) => setTimeout(r, 100))
    if (email === 'mock@gmail.com' && password === 'mock_password') {
      return
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (err) {
    return { msg: err }
  }
})

export const signupMock = vi.fn(
  async ({ username, email, password, confirmPassword }: SignUpInterface) => {
    try {
      await new Promise((r) => setTimeout(r, 100))
      if (password !== confirmPassword || !username || !email) {
        throw new Error('Invalid input')
      } else {
        return null
      }
    } catch (err) {
      const message = [{ msg: (err as Error).message }]

      throw message
    }
  },
)

export const useAuthMock = vi.fn(() => ({
  authUser: mockAuthUser,
  login: loginMock,
  signup: signupMock,
  logout: vi.fn(),
}))

vi.mock('@/context/AuthProvider/useAuth', () => ({
  useAuth: useAuthMock,
}))
