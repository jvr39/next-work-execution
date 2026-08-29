import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DemoBar, InterruptModal } from '@/components/Chrome'
import { NextProvider } from '@/lib/next-store'
import { HomePage } from '@/pages/HomePage'
import { LandingPage } from '@/pages/LandingPage'
import { MemoryPage } from '@/pages/MemoryPage'
import { MorningPage } from '@/pages/MorningPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { RolePage } from '@/pages/RolePage'
import { TaskPage } from '@/pages/TaskPage'

export default function App() {
  return (
    <NextProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/morning" element={<MorningPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/role" element={<RolePage />} />
          <Route path="/memory" element={<MemoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <DemoBar />
        <InterruptModal />
      </HashRouter>
    </NextProvider>
  )
}
