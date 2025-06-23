import Login from '../Auth/Login/Login'
import { Bars3Icon, XCircleIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { MenuMobile } from './MenuMobile'
import { Menu } from './Menu'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Modal } from '../Modal'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<string | null>(null)

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
        <Login className="border-none" />
      </Modal>
    )
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
        <div className="absolute left-1/2 -translate-x-1/2 self-center text-2xl font-bold">
          LOGO
        </div>
        <div className="block sm:hidden">
          <UserCircleIcon
            className="w-8"
            onClick={() => setIsOpenModal('open')}
          />
        </div>
        <div
          className="hidden cursor-pointer gap-1 text-center text-lg font-bold select-none sm:flex"
          onClick={() => setIsOpenModal('open')}
        >
          <UserCircleIcon className="w-8" />
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
      {isOpenModal && <LoginModal />}
    </nav>
  )
}

export default Navbar
