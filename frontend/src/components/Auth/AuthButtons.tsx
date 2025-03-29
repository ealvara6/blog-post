import { useAuth } from '@/context/AuthProvider/useAuth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/login')}
      className="bg-primary-light dark:bg-primary-dark text-text-dark cursor-pointer rounded-md px-5 py-2"
    >
      Login
    </button>
  )
}

export const Logout = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <button
      onClick={() => handleLogout()}
      className="bg-primary-light dark:bg-primary-dark text-text-dark cursor-pointer rounded-md px-5 py-2"
    >
      Logout
    </button>
  )
}
