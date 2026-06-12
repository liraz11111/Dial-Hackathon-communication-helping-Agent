import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Backdrop from './components/Backdrop.jsx'
import Landing from './components/Landing.jsx'
import Onboarding from './components/Onboarding.jsx'
import AppShell from './components/AppShell.jsx'
import Chat from './components/Chat.jsx'
import Archive from './components/Archive.jsx'
import Settings from './components/Settings.jsx'

export default function App() {
  const location = useLocation()
  // Animate page transitions on the top-level segment so navigating between
  // chats (which share /app) doesn't re-fade the whole shell.
  const key = location.pathname.split('/').slice(0, 2).join('/') || '/'

  return (
    <>
      <Backdrop />
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/app" element={<AppShell />}>
              <Route index element={<Navigate to="chats" replace />} />
              <Route path="chats" element={<Chat />} />
              <Route path="chats/:id" element={<Chat />} />
              <Route path="archive" element={<Archive />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
