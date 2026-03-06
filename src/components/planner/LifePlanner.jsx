import { useState } from 'react'
import { Plus } from 'lucide-react'
import { CATEGORIES } from '../../data/prompts'
import GoalPrompt from './GoalPrompt'
import GoalCard from './GoalCard'

export default function LifePlanner({ goals, ratings, onAddGoal, onUpdateGoal, onUpdateRatings }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [filter, setFilter] = useState('all')
  const [editingRatings, setEditingRatings] = useState(false)
  const [localRatings, setLocalRatings] = useState(ratings)

  const filtered = filter === 'all'
    ? goals
    : goals.filter(g => g.categoryId === filter || g.status === filter)

  function saveRatings() {
    onUpdateRatings(localRatings)
    setEditingRatings(false)
  }

  if (showPrompt) {
    return (
      <div className="page-enter">
        <GoalPrompt
          onSave={goal => { onAddGoal(goal); setShowPrompt(false) }}
          onCancel={() => setShowPrompt(false)}
        />
      </div>
    )
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="section-title">Life Planner</h1>
          <p className="section-subtitle">Set and manage your soul-powered goals.</p>
        </div>
        <button onClick={() => setShowPrompt(true)} className="btn-primary flex items-center gap-2 shrink-0">
          <Plus size={18} /> New Goal
        </button>
      </div>

      {/* Life Wheel card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Life Balance Wheel</h2>
          <button
            onClick={() => editingRatings ? saveRatings() : setEditingRatings(true)}
            className="text-sm text-brand-600 hover:underline font-medium"
          >
            {editingRatings ? '✓ Save' : 'Edit Scores'}
          </button>
        </div>
        <div className="space-y-4">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="flex items-center gap-3">
              <span className="w-6 text-lg">{cat.emoji}</span>
              <span className="w-32 text-sm font-medium text-gray-700 shrink-0">{cat.label}</span>
              {editingRatings ? (
                <input
                  type="range" min={1} max={10}
                  value={localRatings[cat.id] ?? 5}
                  onChange={e => setLocalRatings(r => ({ ...r, [cat.id]: Number(e.target.value) }))}
                  className="flex-1"
                  style={{ accentColor: cat.color }}
                />
              ) : (
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(ratings[cat.id] ?? 5) * 10}%`, backgroundColor: cat.color }}
                  />
                </div>
              )}
              <span
                className="text-sm font-bold w-8 text-right"
                style={{ color: cat.color }}
              >
                {editingRatings ? localRatings[cat.id] : ratings[cat.id] ?? 5}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All Goals' },
          { id: 'active', label: 'Active' },
          { id: 'completed', label: 'Completed' },
          ...CATEGORIES.map(c => ({ id: c.id, label: c.emoji + ' ' + c.label })),
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === f.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Goals grid */}
      {filtered.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-3xl mb-3">🎯</p>
          <p className="text-gray-500 mb-4">
            {filter === 'all' ? "No goals yet. Let's create your first one!" : 'No goals in this category.'}
          </p>
          {filter === 'all' && (
            <button onClick={() => setShowPrompt(true)} className="btn-primary">
              <Plus size={16} className="inline mr-1" /> Set a Goal
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={onUpdateGoal}
            />
          ))}
        </div>
      )}
    </div>
  )
}
