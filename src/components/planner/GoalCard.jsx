import { useState } from 'react'
import { CheckCircle2, Calendar, ChevronDown, ChevronUp, Edit3, Trash2 } from 'lucide-react'
import { CATEGORIES, SMART_GOAL_PROMPTS } from '../../data/prompts'
import { formatDate } from '../../utils/dateHelpers'

export default function GoalCard({ goal, onUpdate }) {
  const [expanded, setExpanded] = useState(false)
  const [editProgress, setEditProgress] = useState(false)
  const [progress, setProgress] = useState(goal.progress || 0)

  const cat = CATEGORIES.find(c => c.id === goal.categoryId)
  const isComplete = goal.status === 'completed'

  function saveProgress() {
    onUpdate({ ...goal, progress })
    setEditProgress(false)
  }

  function toggleComplete() {
    onUpdate({
      ...goal,
      status: isComplete ? 'active' : 'completed',
      completedAt: isComplete ? null : new Date().toISOString(),
      progress: isComplete ? goal.progress : 100,
    })
  }

  function handleDelete() {
    if (confirm('Delete this goal? This cannot be undone.')) {
      onUpdate({ ...goal, status: 'deleted' })
    }
  }

  return (
    <div
      className={`card border-l-4 transition-all hover:shadow-md ${isComplete ? 'opacity-70' : ''}`}
      style={{ borderLeftColor: cat?.color || '#8b5cf6' }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <button
          onClick={toggleComplete}
          className="mt-0.5 shrink-0 hover:scale-110 transition-transform"
          title={isComplete ? 'Mark as active' : 'Mark as complete'}
        >
          <CheckCircle2
            size={22}
            className={isComplete ? 'text-emerald-500' : 'text-gray-300 hover:text-emerald-400'}
            fill={isComplete ? 'currentColor' : 'none'}
          />
        </button>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-gray-900 ${isComplete ? 'line-through text-gray-400' : ''}`}>
            {goal.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ color: cat?.color, backgroundColor: cat?.bg }}
            >
              {cat?.emoji} {cat?.label}
            </span>
            {goal.dueDate && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(goal.dueDate + 'T00:00:00')}
              </span>
            )}
          </div>
        </div>
        <button onClick={() => setExpanded(e => !e)} className="text-gray-400 hover:text-gray-600 shrink-0">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span className="font-semibold">{goal.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${goal.progress}%`, backgroundColor: cat?.color }}
          />
        </div>
      </div>

      {/* Edit progress */}
      {!isComplete && (
        editProgress ? (
          <div className="mt-3 p-3 bg-gray-50 rounded-xl">
            <label className="text-xs font-medium text-gray-600 block mb-1">Update Progress: {progress}%</label>
            <input
              type="range" min={0} max={100}
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              className="w-full mb-2"
              style={{ accentColor: cat?.color }}
            />
            <div className="flex gap-2">
              <button onClick={saveProgress} className="btn-primary text-xs py-1.5 px-3">Save</button>
              <button onClick={() => setEditProgress(false)} className="btn-secondary text-xs py-1.5 px-3">Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditProgress(true)}
            className="text-xs text-brand-600 hover:underline flex items-center gap-1 mt-1"
          >
            <Edit3 size={11} /> Update progress
          </button>
        )
      )}

      {/* Expanded SMART details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          {SMART_GOAL_PROMPTS.filter(p => goal.smart?.[p.id]).map(p => (
            <div key={p.id}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{p.label}</p>
              <p className="text-sm text-gray-700 mt-0.5">{goal.smart[p.id]}</p>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              onClick={handleDelete}
              className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 size={12} /> Delete goal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
