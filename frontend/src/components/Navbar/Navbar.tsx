import { useAuth } from '@/context/AuthProvider/useAuth'
// import { Logout, Login } from '../Auth/AuthButtons'
import Login from '../Auth/Login/Login'
import { Bars3Icon } from '@heroicons/react/16/solid'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuMobile } from './MenuMobile'
import { Menu } from './Menu'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Modal } from '../Modal'

const Navbar = () => {
  const { authUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<string | null>(null)
  const navigate = useNavigate()

  const menuToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <nav className="dark:border-border-darkTheme dark:text-text-primary-darkTheme border-border-lightTheme text-text-primary-lightTheme h-16 border-b border-solid p-2 text-lg">
      <div className="flex h-full items-center justify-between">
        <div className="block sm:hidden">
          <Bars3Icon className="w-10" onClick={() => menuToggle()} />
        </div>
        <div className="hidden sm:block">
          <Menu />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 self-center text-2xl font-bold">
          LOGO
        </div>
        <div className="block sm:hidden">
          <UserCircleIcon
            className="w-8"
            onClick={() => setIsOpenModal('open')}
          />
        </div>
        <div className="hidden gap-1 text-center text-lg font-bold sm:flex">
          <UserCircleIcon
            className="w-8"
            onClick={() => setIsOpenModal('open')}
          />
          Sign In
        </div>
      </div>
      <div className="block sm:hidden">
        <MenuMobile
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          menuToggle={menuToggle}
        />
      </div>
      {isOpenModal && (
        <Modal setIsOpen={setIsOpenModal}>
          <Login />
        </Modal>
      )}
    </nav>
  )
}

export default Navbar
