import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Shared/Footer'
import Login from '@/components/Auth/Login/Login'
import { Modal } from '@/components/Shared/Modal'
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
