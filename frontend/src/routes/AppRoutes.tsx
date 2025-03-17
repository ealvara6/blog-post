import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import { ThemeProvider } from '../context/ThemeProvider/ThemeProvider'

const AppRoutes = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default AppRoutes
