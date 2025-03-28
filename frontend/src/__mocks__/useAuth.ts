import { vi } from 'vitest'
import { SignUpInterface } from '../components/Signup'

export const mockAuthUser = {
  id: 1,
  username: 'mock_username',
  email: 'mock@gmail.com',
  password: 'mock_password',
  createdAt: Date.now(),
  blogAuth: true,
}

const formDataMock = {
  username: 'mock_username',
  email: 'mock@gmail.com',
  password: 'mock_password',
  confirmPassword: 'mock_password',
}

export const loginMock = vi.fn(async (email: string, password: string) => {
  try {
    console.log('loginMock was called.')
    if (email === 'mock@gmail.com' && password === 'mock_password') {
      return
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (err) {
    const message = [{ msg: err }]

    throw message
  }
})

export const signupMock = ({
  username,
  email,
  password,
  confirmPassword,
}: SignUpInterface) => {
  if (password !== confirmPassword || !username || !email) {
    throw new Error('Invalid credentials')
  } else {
    return null
  }
}

export const useAuthMock = vi.fn(() => ({
  authUser: mockAuthUser,
  login: loginMock,
  signup: signupMock(formDataMock),
  logout: vi.fn(),
}))

vi.mock('../context/AuthProvider/useAuth.ts', () => ({
  useAuth: useAuthMock,
}))
