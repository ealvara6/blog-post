import { ReactNode, useState } from 'react'
import { LoginModalContext } from './LoginModalContext'

export const LoginModalProvider = ({ children }: { children: ReactNode }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const openLoginModal = () => setShowLoginModal(true)
  const closeLoginModal = () => setShowLoginModal(false)

  return (
    <LoginModalContext.Provider
      value={{ showLoginModal, openLoginModal, closeLoginModal }}
    >
      {children}
    </LoginModalContext.Provider>
  )
}
