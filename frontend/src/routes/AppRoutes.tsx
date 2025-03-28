import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import { ThemeProvider } from '../context/ThemeProvider/ThemeProvider'
import { AuthProvider } from '../context/AuthProvider/AuthProvider'
import Login from '../components/Auth/Login/Login'
import Signup from '../components/Auth/Signup'

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
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default AppRoutes
