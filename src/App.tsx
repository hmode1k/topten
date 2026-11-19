import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Categories from './pages/Categories'
import Topics from './pages/Topics'
import Questions from './pages/Questions'
import Game from './pages/Game'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/ComingSoon'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:cat" element={<Topics />} />
      <Route path="/categories/:cat/:topic" element={<Questions />} />
      <Route path="/play/:questionId" element={<Game />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Not designed yet: Results, Leaderboard and SignIn wait for the owner's approval */}
      <Route path="/leaderboard" element={<ComingSoon title="المتصدرون" />} />
      <Route path="/signin" element={<ComingSoon title="تسجيل الدخول" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
