import { useState } from 'react'
import { Play, Pause, Square, Clock, Plus } from 'lucide-react'
import { CATEGORIES } from '../../data/prompts'
import { useTimer } from '../../hooks/useTimer'
import { formatTimer, formatDuration, formatDate, formatTime, isToday } from '../../utils/dateHelpers'

export default function TimeTracker({ sessions, onAddSession }) {
  const { seconds, running, start, pause, stop } = useTimer()
  const [categoryId, setCategoryId] = useState('health')
  const [notes, setNotes] = useState('')
  const [startTime, setStartTime] = useState(null)

  const cat = CATEGORIES.find(c => c.id === categoryId)
  const todaySessions = sessions.filter(s => isToday(s.startTime))
  const todayMinutes = todaySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0)

  function handleStart() {
    setStartTime(new Date().toISOString())
    start()
  }

  function handleStop() {
    const elapsed = stop()
    if (elapsed < 10) { setStartTime(null); return }
    const durationMinutes = Math.round(elapsed / 60) || 1
    onAddSession({
      id: Date.now().toString(),
      categoryId,
      startTime: startTime || new Date().toISOString(),
      endTime: new Date().toISOString(),
      durationMinutes,
      notes: notes.trim(),
    })
    setNotes('')
    setStartTime(null)
  }

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="section-title">Time Tracker</h1>
        <p className="section-subtitle">Track how you spend your time and stay on task.</p>
      </div>

      {/* Timer card */}
      <div className="card text-center">
        {/* Category selector */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => !running && setCategoryId(c.id)}
              disabled={running}
              className={`p-2 rounded-xl border-2 transition-all text-center disabled:cursor-not-allowed
                ${categoryId === c.id
                  ? 'border-brand-500 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
              style={categoryId === c.id ? { backgroundColor: c.bg } : {}}
            >
              <span className="text-xl block">{c.emoji}</span>
              <span className="text-xs font-medium text-gray-600 leading-tight block">{c.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active category badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span
            className="px-4 py-1.5 rounded-full font-semibold text-sm"
            style={{ color: cat?.color, backgroundColor: cat?.bg }}
          >
            {cat?.emoji} {cat?.label}
          </span>
          {running && (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              LIVE
            </span>
          )}
        </div>

        {/* Timer display */}
        <div className="relative inline-block mb-8">
          <div
            className={`text-6xl sm:text-7xl font-mono font-bold tracking-tight transition-colors ${
              running ? 'text-brand-700' : 'text-gray-700'
            }`}
          >
            {formatTimer(seconds)}
          </div>
        </div>

        {/* Notes input */}
        <div className="mb-6">
          <input
            className="input-field text-center"
            placeholder="What are you working on? (optional)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            disabled={false}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!running ? (
            <button
              onClick={handleStart}
              className="w-16 h-16 bg-brand-600 hover:bg-brand-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all"
            >
              <Play size={26} fill="white" />
            </button>
          ) : (
            <>
              <button
                onClick={pause}
                className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
              >
                <Pause size={22} fill="white" />
              </button>
              <button
                onClick={handleStop}
                className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
              >
                <Square size={20} fill="white" />
              </button>
            </>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          {running ? 'Tap the red button to stop and save your session' : 'Select a category and press play to begin'}
        </p>
      </div>

      {/* Today summary */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Clock size={18} className="text-brand-600" /> Today's Sessions
          </h2>
          <span className="text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Total: {formatDuration(todayMinutes)}
          </span>
        </div>

        {todaySessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Clock size={32} className="mx-auto mb-2 opacity-30" />
            <p>No sessions tracked today yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...todaySessions].reverse().map(s => {
              const c = CATEGORIES.find(x => x.id === s.categoryId)
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl shrink-0">{c?.emoji || '⏱'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm">{c?.label || s.categoryId}</p>
                    {s.notes && <p className="text-xs text-gray-500 truncate">{s.notes}</p>}
                    <p className="text-xs text-gray-400 mt-0.5">{formatTime(s.startTime)}</p>
                  </div>
                  <span
                    className="font-bold text-sm px-2.5 py-1 rounded-lg shrink-0"
                    style={{ color: c?.color, backgroundColor: c?.bg }}
                  >
                    {formatDuration(s.durationMinutes)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Category breakdown */}
      {todaySessions.length > 0 && (
        <div className="card">
          <h2 className="font-bold text-gray-800 mb-4">Today's Breakdown</h2>
          <div className="space-y-3">
            {CATEGORIES.map(c => {
              const catMins = todaySessions
                .filter(s => s.categoryId === c.id)
                .reduce((acc, s) => acc + s.durationMinutes, 0)
              if (catMins === 0) return null
              const pct = todayMinutes > 0 ? Math.round((catMins / todayMinutes) * 100) : 0
              return (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="text-base w-6">{c.emoji}</span>
                  <span className="text-sm text-gray-600 w-28 shrink-0">{c.label}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: c.color }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 w-16 text-right">
                    {formatDuration(catMins)} ({pct}%)
                  </span>
                </div>
              )
            }).filter(Boolean)}
          </div>
        </div>
      )}
    </div>
  )
}
