import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import { ThemeProvider } from '@/context/ThemeProvider/ThemeProvider'
import { AuthProvider } from '@/context/AuthProvider/AuthProvider'
import Login from '@/components/Auth/Login/Login'
import Signup from '@/components/Auth/Signup/Signup'
import NotFound from '@/pages/NotFound'
import { Account } from '@/pages/Account'
import { Posts } from '@/pages/Posts'
import Post from '@/pages/Post'
import CreatePost from '@/pages/Createpost'
import { EditPost } from '@/pages/EditPost'
import { Browse } from '@/pages/Browse'
import { LoginModalProvider } from '@/context/LoginModalProvider/LoginModalProvider'
import { History } from '@/pages/History'
import { ScrollToTop } from '@/components/Shared/ScrollToTop'

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <LoginModalProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/history" element={<History />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/posts/:id/edit" element={<EditPost />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </LoginModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default AppRoutes
