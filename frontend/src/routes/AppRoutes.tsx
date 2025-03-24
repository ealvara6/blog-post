import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import { ThemeProvider } from '../context/ThemeProvider/ThemeProvider'
import { AuthProvider } from '../context/AuthProvider/AuthProvider'
import Profile from '../components/Profile/Profile'
import Login from '../components/Login'

const AppRoutes = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default AppRoutes
