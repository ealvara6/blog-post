import Login from '../Auth/Login/Login'
import { Bars3Icon, XCircleIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { MenuMobile } from './MenuMobile'
import { Menu } from './Menu'
import { Modal } from '../Modal'
import { useNavigate } from 'react-router-dom'
import { Account } from './Account'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { Link } from '../Link'

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
        <div className="flex justify-end">
          <XCircleIcon
            className="w-8 cursor-pointer"
            onClick={() => setIsOpenModal(null)}
          />
        </div>
        <Login className="border-none" setIsOpenModal={setIsOpenModal} />
      </Modal>
    )
  }

  return (
    <nav className="dark:border-border-darkTheme dark:text-text-primary-darkTheme border-border text-text-primary h-16 border-b border-solid p-2 text-lg">
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
        <div className="flex gap-3 text-lg font-bold">
          <div
            className={`self-center rounded-md border ${authUser ? 'block' : 'hidden'} sm:hidden`}
            onClick={() => navigate({ pathname: '/posts/create' })}
          >
            <PlusIcon className="w-8 p-0.5" />
          </div>
          <Link
            className="hidden self-center sm:block"
            onClick={() => navigate({ pathname: '/posts/create' })}
          >
            Create Post
          </Link>
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
