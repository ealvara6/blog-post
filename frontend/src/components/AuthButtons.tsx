import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider/useAuth'

export const Login = () => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/login')}
      className="bg-primary-light dark:bg-primary-dark text-text-dark w-auto cursor-pointer rounded-md p-2 px-5"
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
      className="bg-primary-light dark:bg-primary-dark text-text-dark w-auto cursor-pointer rounded-md p-2 px-5"
    >
      Logout
    </button>
  )
}
