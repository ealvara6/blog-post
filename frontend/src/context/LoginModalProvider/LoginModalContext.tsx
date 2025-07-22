import { createContext, useContext } from 'react'

export const LoginModalContext = createContext({
  showLoginModal: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
})

export const useLoginModal = () => useContext(LoginModalContext)
