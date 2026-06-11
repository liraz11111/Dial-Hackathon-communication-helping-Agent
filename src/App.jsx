import { AnimatePresence, motion } from 'framer-motion'
import Landing from './components/Landing.jsx'
import Onboarding from './components/Onboarding.jsx'
import AppShell from './components/AppShell.jsx'
import { useStore } from './store.jsx'

export default function App() {
  const { screen } = useStore()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {screen === 'landing' && <Landing />}
        {screen === 'onboarding' && <Onboarding />}
        {screen === 'app' && <AppShell />}
      </motion.div>
    </AnimatePresence>
  )
}
