import { Link } from 'react-router-dom'
import { Target, Timer, Sun, TrendingUp, Plus, CheckCircle2 } from 'lucide-react'
import { CATEGORIES } from '../../data/prompts'
import { formatDate, formatDuration, isToday } from '../../utils/dateHelpers'

export default function Dashboard({ clientData, goals, sessions }) {
  const { profile, ratings } = clientData
  const todaySessions = sessions.filter(s => isToday(s.startTime))
  const todayMinutes = todaySessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0)
  const activeGoals = goals.filter(g => g.status === 'active')
  const completedGoals = goals.filter(g => g.status === 'completed')

  const avgRating = ratings
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1)
    : '—'

  const QUICK_ACTIONS = [
    { to: '/tracker',  icon: Timer,   color: 'bg-emerald-500', label: 'Start Timer',   sub: 'Track your session' },
    { to: '/planner',  icon: Target,  color: 'bg-brand-600',   label: 'Add a Goal',    sub: 'Set your next target' },
    { to: '/journal',  icon: Sun,     color: 'bg-amber-500',   label: 'Daily Check-in', sub: 'Reflect & intend' },
  ]

  return (
    <div className="page-enter space-y-6">
      {/* Hero greeting */}
      <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl p-6 text-white">
        <p className="text-brand-200 text-sm font-medium mb-1">
          {formatDate(new Date().toISOString())}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">
          Good {getTimeOfDay()}, {profile.firstName}! ✨
        </h1>
        <p className="text-brand-200 text-sm">
          {activeGoals.length > 0
            ? `You have ${activeGoals.length} active goal${activeGoals.length > 1 ? 's' : ''}. Keep going!`
            : "Ready to set your first goal? Let's do this!"}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Goals',   value: activeGoals.length,           icon: Target,    color: 'text-brand-600',   bg: 'bg-brand-50' },
          { label: 'Goals Done',     value: completedGoals.length,        icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "Today's Time",   value: formatDuration(todayMinutes) || '0m', icon: Timer, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Life Score',     value: `${avgRating}/10`,            icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card flex items-center gap-3">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
              <Icon size={18} className={color} />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map(({ to, icon: Icon, color, label, sub }) => (
            <Link
              key={to}
              to={to}
              className="card hover:shadow-md transition-all flex items-center gap-4 group"
            >
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{label}</p>
                <p className="text-sm text-gray-500">{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Two column: goals + life wheel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Goals */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Active Goals</h2>
            <Link to="/goals" className="text-sm text-brand-600 hover:underline font-medium">View all</Link>
          </div>
          {activeGoals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-3">No goals yet — let's change that!</p>
              <Link to="/planner" className="btn-primary text-sm py-2 px-4">
                <Plus size={14} className="inline mr-1" /> Set a Goal
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeGoals.slice(0, 4).map(goal => (
                <GoalRow key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </div>

        {/* Life Area Ratings */}
        <div className="card">
          <h2 className="font-bold text-gray-800 mb-4">Life Balance</h2>
          <div className="space-y-3">
            {CATEGORIES.map(cat => {
              const score = ratings?.[cat.id] ?? 5
              return (
                <div key={cat.id} className="flex items-center gap-3">
                  <span className="text-base w-6">{cat.emoji}</span>
                  <span className="text-sm text-gray-600 w-28 shrink-0">{cat.label}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${score * 10}%`, backgroundColor: cat.color }}
                    />
                  </div>
                  <span className="text-sm font-bold w-6 text-right" style={{ color: cat.color }}>
                    {score}
                  </span>
                </div>
              )
            })}
          </div>
          <Link to="/planner" className="btn-ghost text-sm mt-4 block text-center">
            Update Life Wheel →
          </Link>
        </div>
      </div>

      {/* Today's sessions */}
      {todaySessions.length > 0 && (
        <div className="card">
          <h2 className="font-bold text-gray-800 mb-4">Today's Sessions</h2>
          <div className="space-y-2">
            {todaySessions.map(s => {
              const cat = CATEGORIES.find(c => c.id === s.categoryId)
              return (
                <div key={s.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-lg">{cat?.emoji || '⏱'}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{cat?.label || s.categoryId}</p>
                    {s.notes && <p className="text-xs text-gray-500 truncate">{s.notes}</p>}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                    {formatDuration(s.durationMinutes)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function GoalRow({ goal }) {
  const cat = CATEGORIES.find(c => c.id === goal.categoryId)
  const progress = goal.progress || 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-base shrink-0">{cat?.emoji || '🎯'}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 text-sm truncate">{goal.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, backgroundColor: cat?.color || '#8b5cf6' }}
            />
          </div>
          <span className="text-xs text-gray-400">{progress}%</span>
        </div>
      </div>
    </div>
  )
}

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
