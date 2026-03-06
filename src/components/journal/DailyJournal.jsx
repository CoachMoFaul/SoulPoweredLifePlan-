import { useState } from 'react'
import { Sun, Moon, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { DAILY_INTENTION_PROMPTS, REFLECTION_PROMPTS } from '../../data/prompts'
import { formatDate, todayISO } from '../../utils/dateHelpers'

export default function DailyJournal({ entries, onSaveEntry }) {
  const today = todayISO()
  const todayEntry = entries.find(e => e.date === today) || {}

  const [mode, setMode] = useState('morning')
  const [morning, setMorning] = useState(todayEntry.morning || {})
  const [evening, setEvening] = useState(todayEntry.evening || {})
  const [gratitude, setGratitude] = useState(todayEntry.gratitude || '')
  const [saved, setSaved] = useState(false)
  const [showPast, setShowPast] = useState(false)

  function handleSave() {
    onSaveEntry({
      date: today,
      morning,
      evening,
      gratitude,
      savedAt: new Date().toISOString(),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const pastEntries = entries.filter(e => e.date !== today).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="section-title">Daily Check-in</h1>
        <p className="section-subtitle">{formatDate(new Date().toISOString())} — How are you showing up today?</p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          onClick={() => setMode('morning')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            mode === 'morning' ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500'
          }`}
        >
          <Sun size={16} /> Morning Intention
        </button>
        <button
          onClick={() => setMode('evening')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            mode === 'evening' ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500'
          }`}
        >
          <Moon size={16} /> Evening Reflection
        </button>
      </div>

      {/* Morning */}
      {mode === 'morning' && (
        <div className="card page-enter">
          <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <Sun size={18} className="text-amber-500" /> Set Your Morning Intentions
          </h2>
          <p className="text-sm text-gray-500 mb-5">Take 5 minutes to ground yourself and set your day's direction.</p>
          <div className="space-y-5">
            {DAILY_INTENTION_PROMPTS.map((q, i) => (
              <div key={i}>
                <label className="label">{q}</label>
                <textarea
                  className="textarea-field"
                  rows={2}
                  placeholder="Write your answer here…"
                  value={morning[i] || ''}
                  onChange={e => setMorning(m => ({ ...m, [i]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evening */}
      {mode === 'evening' && (
        <div className="card page-enter">
          <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <Moon size={18} className="text-indigo-500" /> Evening Reflection
          </h2>
          <p className="text-sm text-gray-500 mb-5">Celebrate your wins, learn from your challenges, and close the day with gratitude.</p>
          <div className="space-y-5">
            {REFLECTION_PROMPTS.map((q, i) => (
              <div key={i}>
                <label className="label">{q}</label>
                <textarea
                  className="textarea-field"
                  rows={2}
                  placeholder="Reflect honestly…"
                  value={evening[i] || ''}
                  onChange={e => setEvening(ev => ({ ...ev, [i]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gratitude */}
      <div className="card">
        <label className="font-bold text-gray-800 flex items-center gap-2 mb-3">
          💜 Gratitude for today
        </label>
        <textarea
          className="textarea-field"
          rows={3}
          placeholder="I am grateful for… (list 3 things)"
          value={gratitude}
          onChange={e => setGratitude(e.target.value)}
        />
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className={`btn-primary w-full flex items-center justify-center gap-2 transition-all ${
          saved ? 'bg-emerald-600 hover:bg-emerald-700' : ''
        }`}
      >
        {saved ? (
          <><Check size={18} /> Saved!</>
        ) : (
          'Save Today\'s Entry'
        )}
      </button>

      {/* Past entries */}
      {pastEntries.length > 0 && (
        <div className="card">
          <button
            onClick={() => setShowPast(p => !p)}
            className="w-full flex items-center justify-between font-bold text-gray-800"
          >
            <span>Past Journal Entries ({pastEntries.length})</span>
            {showPast ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {showPast && (
            <div className="mt-4 space-y-3">
              {pastEntries.slice(0, 10).map(e => (
                <div key={e.date} className="p-3 bg-gray-50 rounded-xl">
                  <p className="font-semibold text-sm text-gray-700 mb-2">{formatDate(e.date + 'T12:00:00')}</p>
                  {e.morning?.[0] && (
                    <div className="mb-1">
                      <span className="text-xs text-amber-500 font-medium">☀️ Intention: </span>
                      <span className="text-xs text-gray-600">{e.morning[0]}</span>
                    </div>
                  )}
                  {e.gratitude && (
                    <div>
                      <span className="text-xs text-purple-500 font-medium">💜 Grateful: </span>
                      <span className="text-xs text-gray-600 line-clamp-2">{e.gratitude}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
