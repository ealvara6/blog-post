import { useAuth } from '../context/AuthProvider/useAuth'
import ThemeButton from './ThemeButton/ThemeButton'
import { Login, Logout } from './Auth/AuthButtons'

const Navbar = () => {
  const { authUser } = useAuth()
  return (
    <nav className="border-border-dark flex border border-solid p-2">
      <div className="grow">This is the navbar.</div>
      <div className="flex gap-3">
        {authUser ? (
          <>
            <div>Hello {authUser.username}</div>
            <Logout />
          </>
        ) : (
          <Login />
        )}
        <ThemeButton />
      </div>
    </nav>
  )
}

export default Navbar
