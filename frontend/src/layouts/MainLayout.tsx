import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="dark:bg-background-dark dark:text-text-dark flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-1 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
