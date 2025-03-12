import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'

const AppRoutes = () => {
  return (
    <div className="dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default AppRoutes
