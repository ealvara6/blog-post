import { Outlet } from 'react-router-dom'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/shared/Footer'
import Login from '@/components/auth/Login/Login'
import { Modal } from '@/components/shared/Modal'
import { XCircleIcon } from '@heroicons/react/16/solid'
import { useLoginModal } from '@/context/LoginModalProvider/LoginModalContext'

const LoginModal = () => {
  const { closeLoginModal } = useLoginModal()
  return (
    <Modal onClose={closeLoginModal}>
      <div className="self-end">
        <XCircleIcon
          className="w-8 cursor-pointer"
          onClick={() => closeLoginModal()}
        />
      </div>
      <Login className="border-none" />
    </Modal>
  )
}

const MainLayout = () => {
  const { showLoginModal } = useLoginModal()
  return (
    <div className="dark:bg-background-darkTheme dark:text-text-primary-darkTheme flex min-h-screen flex-col">
      {showLoginModal && <LoginModal />}
      <Navbar />
      <main className="flex grow justify-center pt-4 pb-8 sm:py-20">
        <div className="flex w-full justify-center">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
