import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer'

const MainLayout = () => {
  return (
    <div className="dark:bg-background-darkTheme dark:text-text-primary-darkTheme flex min-h-screen flex-col">
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
