import Login from '../Auth/Login/Login'
import { Bars3Icon, XCircleIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { MenuMobile } from './MenuMobile'
import { Menu } from './Menu'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Modal } from '../Modal'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { Account } from './Account'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<string | null>(null)
  const navigate = useNavigate()
  const { authUser } = useAuth()

  const menuToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const LoginModal = () => {
    return (
      <Modal setIsOpen={setIsOpenModal}>
        <div className="flex">
          <div className="flex-1 px-2 text-xl font-semibold">Sign In</div>
          <XCircleIcon
            className="w-8 cursor-pointer"
            onClick={() => setIsOpenModal(null)}
          />
        </div>
        <Login className="border-none" setIsOpenModal={setIsOpenModal} />
      </Modal>
    )
  }

  const NavigateUserIcon = () => {
    if (!authUser) {
      return (
        <UserCircleIcon
          className="w-8"
          onClick={() => setIsOpenModal('open')}
        />
      )
    } else {
      return (
        <UserCircleIcon
          className="w-8"
          onClick={() => navigate({ pathname: '/account' }, { replace: true })}
        />
      )
    }
  }

  return (
    <nav className="dark:border-border-darkTheme dark:text-text-primary-darkTheme border-border text-text-primary- h-16 border-b border-solid p-2 text-lg">
      <div className="flex h-full items-center justify-between">
        <div className="block sm:hidden">
          <Bars3Icon className="w-10" onClick={() => menuToggle()} />
        </div>
        <div className="hidden sm:block">
          <Menu />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 cursor-pointer self-center text-2xl font-bold"
          onClick={() => navigate({ pathname: '/' }, { replace: true })}
        >
          LOGO
        </div>
        <div className="flex text-lg font-bold">
          <Account setIsOpenModal={setIsOpenModal} />
        </div>
      </div>
      <div className="block sm:hidden">
        <MenuMobile
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          menuToggle={menuToggle}
        />
      </div>
      {isOpenModal && <LoginModal />}
    </nav>
  )
}

export default Navbar
