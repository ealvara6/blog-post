import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import { ThemeProvider } from '@/context/ThemeProvider/ThemeProvider'
import { AuthProvider } from '@/context/AuthProvider/AuthProvider'
import Login from '@/components/Auth/Login/Login'
import Signup from '@/components/Auth/Signup/Signup'
import NotFound from '@/pages/NotFound'
import Profile from '@/pages/Profile'
import { Posts } from '@/pages/Posts'

const AppRoutes = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default AppRoutes
