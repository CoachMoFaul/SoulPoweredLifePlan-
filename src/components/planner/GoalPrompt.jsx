import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react'
import { CATEGORIES, SMART_GOAL_PROMPTS, CATEGORY_PROMPTS } from '../../data/prompts'

export default function GoalPrompt({ onSave, onCancel }) {
  const [phase, setPhase] = useState('category')  // category | reflect | smart | confirm
  const [categoryId, setCategoryId] = useState(null)
  const [reflections, setReflections] = useState({})
  const [smart, setSmart] = useState({})
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  const category = CATEGORIES.find(c => c.id === categoryId)
  const prompts = categoryId ? CATEGORY_PROMPTS[categoryId] : []

  function handleSave() {
    const goal = {
      id: Date.now().toString(),
      title: title || smart.specific || 'New Goal',
      categoryId,
      smart,
      reflections,
      dueDate,
      progress: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    }
    onSave(goal)
  }

  return (
    <div className="card max-w-2xl mx-auto page-enter">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          {['Choose Area', 'Reflect', 'Set SMART Goal', 'Confirm'].map((s, i) => {
            const phases = ['category', 'reflect', 'smart', 'confirm']
            const done = phases.indexOf(phase) > i
            const active = phases.indexOf(phase) === i
            return (
              <span key={s} className={`${active ? 'text-brand-600 font-semibold' : done ? 'text-emerald-500' : ''}`}>
                {done ? '✓ ' : ''}{s}
              </span>
            )
          })}
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-500"
            style={{ width: `${(['category', 'reflect', 'smart', 'confirm'].indexOf(phase) + 1) * 25}%` }}
          />
        </div>
      </div>

      {/* Phase: Choose Category */}
      {phase === 'category' && (
        <div>
          <h2 className="section-title mb-1">Where do you want to grow? 🌱</h2>
          <p className="section-subtitle mb-6">Choose the life area for your new goal.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryId(cat.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all hover:scale-105
                  ${categoryId === cat.id
                    ? 'border-brand-500 shadow-md'
                    : 'border-gray-200 hover:border-brand-300'
                  }`}
                style={categoryId === cat.id ? { backgroundColor: cat.bg } : {}}
              >
                <span className="text-2xl block mb-2">{cat.emoji}</span>
                <span className="text-sm font-semibold text-gray-800 block">{cat.label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setPhase('reflect')}
              disabled={!categoryId}
              className="btn-primary flex items-center gap-2"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Phase: Reflect */}
      {phase === 'reflect' && (
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{category?.emoji}</span>
            <h2 className="section-title">{category?.label}</h2>
          </div>
          <p className="section-subtitle mb-6">Answer a few coaching questions to clarify your thinking.</p>
          <div className="space-y-5">
            {prompts.slice(0, 3).map((q, i) => (
              <div key={i}>
                <label className="label">{q}</label>
                <textarea
                  className="textarea-field"
                  rows={2}
                  placeholder="Share your thoughts…"
                  value={reflections[i] || ''}
                  onChange={e => setReflections(r => ({ ...r, [i]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setPhase('category')} className="btn-secondary flex items-center gap-2">
              <ChevronLeft size={18} /> Back
            </button>
            <button onClick={() => setPhase('smart')} className="btn-primary flex items-center gap-2">
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Phase: SMART Goal */}
      {phase === 'smart' && (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={20} className="text-brand-600" />
            <h2 className="section-title">Build Your SMART Goal</h2>
          </div>
          <p className="section-subtitle mb-6">A well-crafted goal has a much higher chance of success.</p>
          <div className="mb-4">
            <label className="label">Goal Title (short name)</label>
            <input
              className="input-field"
              placeholder="e.g., Run my first 5K"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            {SMART_GOAL_PROMPTS.map(p => (
              <div key={p.id}>
                <label className="label">
                  <span className="inline-block w-24 font-bold text-brand-700">{p.label}</span>
                  <span className="text-gray-600 font-normal ml-1">{p.question}</span>
                </label>
                <textarea
                  className="textarea-field"
                  rows={2}
                  placeholder={p.placeholder}
                  value={smart[p.id] || ''}
                  onChange={e => setSmart(s => ({ ...s, [p.id]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="label">Target Completion Date</label>
            <input
              type="date"
              className="input-field"
              value={dueDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setPhase('reflect')} className="btn-secondary flex items-center gap-2">
              <ChevronLeft size={18} /> Back
            </button>
            <button
              onClick={() => setPhase('confirm')}
              disabled={!title.trim()}
              className="btn-primary flex items-center gap-2"
            >
              Review <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Phase: Confirm */}
      {phase === 'confirm' && (
        <div>
          <h2 className="section-title mb-1">Your Goal Summary 🎯</h2>
          <p className="section-subtitle mb-6">Review your goal before saving.</p>
          <div
            className="rounded-xl p-5 mb-5 border-2"
            style={{ backgroundColor: category?.bg, borderColor: category?.color + '40' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{category?.emoji}</span>
              <div>
                <p className="font-bold text-lg text-gray-900">{title}</p>
                <p className="text-sm" style={{ color: category?.color }}>{category?.label}</p>
              </div>
            </div>
            {dueDate && (
              <p className="text-sm text-gray-600 mb-3">
                📅 Target: {new Date(dueDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
            <div className="space-y-2">
              {SMART_GOAL_PROMPTS.filter(p => smart[p.id]).map(p => (
                <div key={p.id} className="bg-white/70 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{p.label}</p>
                  <p className="text-sm text-gray-800 mt-0.5">{smart[p.id]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setPhase('smart')} className="btn-secondary flex-1">
              Edit
            </button>
            <button onClick={handleSave} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Check size={18} /> Save Goal
            </button>
          </div>
        </div>
      )}

      {/* Cancel */}
      <button onClick={onCancel} className="btn-ghost w-full mt-3 text-gray-400 text-sm">
        Cancel
      </button>
    </div>
  )
}
