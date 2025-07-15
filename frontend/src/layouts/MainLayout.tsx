import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer'

const MainLayout = () => {
  return (
    <div className="dark:bg-background-darkTheme dark:text-text-primary-darkTheme flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-4 flex grow justify-center py-8 sm:mx-12 sm:py-20 md:px-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
