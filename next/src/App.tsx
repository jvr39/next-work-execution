import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { MorningPage } from '@/pages/MorningPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { TaskPage } from '@/pages/TaskPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/morning" element={<MorningPage />} />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
