import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useLocalStorage } from './hooks/useLocalStorage'

import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Welcome from './components/onboarding/Welcome'
import ClientForm from './components/onboarding/ClientForm'
import Dashboard from './components/dashboard/Dashboard'
import LifePlanner from './components/planner/LifePlanner'
import TimeTracker from './components/tracker/TimeTracker'
import DailyJournal from './components/journal/DailyJournal'
import GoalCard from './components/planner/GoalCard'
import Settings from './components/settings/Settings'

export default function App() {
  const [onboarded, setOnboarded]   = useLocalStorage('onboarded', false)
  const [clientData, setClientData] = useLocalStorage('clientData', null)
  const [goals, setGoals]           = useLocalStorage('goals', [])
  const [sessions, setSessions]     = useLocalStorage('sessions', [])
  const [journalEntries, setJournalEntries] = useLocalStorage('journal', [])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Onboarding flow
  if (!onboarded || !clientData) {
    return <OnboardingFlow onComplete={data => { setClientData(data); setOnboarded(true) }} />
  }

  // Goal CRUD
  function handleAddGoal(goal) {
    setGoals(prev => [goal, ...prev])
  }

  function handleUpdateGoal(updated) {
    setGoals(prev =>
      updated.status === 'deleted'
        ? prev.filter(g => g.id !== updated.id)
        : prev.map(g => g.id === updated.id ? updated : g)
    )
  }

  function handleUpdateRatings(newRatings) {
    setClientData(d => ({ ...d, ratings: newRatings }))
  }

  function handleUpdateProfile(newProfile) {
    setClientData(d => ({ ...d, profile: newProfile }))
  }

  function handleAddSession(session) {
    setSessions(prev => [session, ...prev])
  }

  function handleSaveJournalEntry(entry) {
    setJournalEntries(prev => {
      const filtered = prev.filter(e => e.date !== entry.date)
      return [entry, ...filtered]
    })
  }

  function handleReset() {
    setGoals([])
    setSessions([])
    setJournalEntries([])
    setClientData(null)
    setOnboarded(false)
  }

  const activeGoals = goals.filter(g => g.status !== 'deleted')

  return (
    <div className="min-h-screen">
      <Header
        clientName={clientData.profile?.firstName}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="pt-16 lg:pl-64">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  clientData={clientData}
                  goals={activeGoals}
                  sessions={sessions}
                />
              }
            />
            <Route
              path="/planner"
              element={
                <LifePlanner
                  goals={activeGoals}
                  ratings={clientData.ratings || {}}
                  onAddGoal={handleAddGoal}
                  onUpdateGoal={handleUpdateGoal}
                  onUpdateRatings={handleUpdateRatings}
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <TimeTracker
                  sessions={sessions}
                  onAddSession={handleAddSession}
                />
              }
            />
            <Route
              path="/journal"
              element={
                <DailyJournal
                  entries={journalEntries}
                  onSaveEntry={handleSaveJournalEntry}
                />
              }
            />
            <Route
              path="/goals"
              element={
                <GoalsPage
                  goals={activeGoals}
                  onUpdateGoal={handleUpdateGoal}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  clientData={clientData}
                  onUpdateProfile={handleUpdateProfile}
                  onReset={handleReset}
                />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

// Inline onboarding flow (Welcome → ClientForm)
function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState('welcome')
  return step === 'welcome'
    ? <Welcome onStart={() => setStep('form')} />
    : <ClientForm onComplete={onComplete} />
}

// Simple all-goals page
function GoalsPage({ goals, onUpdateGoal }) {
  const active    = goals.filter(g => g.status === 'active')
  const completed = goals.filter(g => g.status === 'completed')
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Goals</h1>
        <p className="text-gray-500 mt-1">All your goals in one place.</p>
      </div>
      {active.length > 0 && (
        <section>
          <h2 className="font-semibold text-gray-700 mb-3">Active ({active.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map(g => <GoalCard key={g.id} goal={g} onUpdate={onUpdateGoal} />)}
          </div>
        </section>
      )}
      {completed.length > 0 && (
        <section>
          <h2 className="font-semibold text-gray-700 mb-3">Completed 🎉 ({completed.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completed.map(g => <GoalCard key={g.id} goal={g} onUpdate={onUpdateGoal} />)}
          </div>
        </section>
      )}
      {goals.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">🎯</p>
          <p className="text-gray-500">No goals yet. Head to the Life Planner to set your first goal!</p>
        </div>
      )}
    </div>
  )
}
