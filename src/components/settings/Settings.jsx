import { useState } from 'react'
import { Save, AlertTriangle, User, Palette } from 'lucide-react'
import { CATEGORIES } from '../../data/prompts'

export default function Settings({ clientData, onUpdateProfile, onReset }) {
  const { profile, ratings } = clientData
  const [form, setForm] = useState({ ...profile })
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  function handleSave() {
    onUpdateProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset() {
    if (confirmReset) {
      onReset()
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 5000)
    }
  }

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="section-title">Settings</h1>
        <p className="section-subtitle">Manage your profile and preferences.</p>
      </div>

      {/* Profile */}
      <div className="card">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-5">
          <User size={18} className="text-brand-600" /> Your Profile
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: 'firstName', label: 'First Name', type: 'text' },
            { key: 'lastName',  label: 'Last Name',  type: 'text' },
            { key: 'email',     label: 'Email',      type: 'email' },
            { key: 'phone',     label: 'Phone',      type: 'tel' },
            { key: 'coachName', label: "Coach's Name", type: 'text' },
            { key: 'startDate', label: 'Start Date', type: 'date' },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                className="input-field"
                type={type}
                value={form[key] || ''}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className={`btn-primary mt-5 flex items-center gap-2 ${saved ? 'bg-emerald-600' : ''}`}
        >
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Current life scores */}
      <div className="card">
        <h2 className="font-bold text-gray-800 mb-1">Current Life Scores</h2>
        <p className="text-sm text-gray-500 mb-4">Update these in the Life Planner page.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className="flex items-center gap-2 p-3 rounded-xl border border-gray-100"
              style={{ backgroundColor: cat.bg }}
            >
              <span className="text-lg">{cat.emoji}</span>
              <div>
                <p className="text-xs text-gray-600 font-medium">{cat.label}</p>
                <p className="font-bold" style={{ color: cat.color }}>{ratings?.[cat.id] ?? 5}/10</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="card border-2 border-red-100">
        <h2 className="font-bold text-red-700 flex items-center gap-2 mb-3">
          <AlertTriangle size={18} /> Reset App Data
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          This will permanently delete all your goals, sessions, journal entries, and profile data. This action cannot be undone.
        </p>
        <button
          onClick={handleReset}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            confirmReset
              ? 'bg-red-600 text-white animate-pulse'
              : 'border-2 border-red-300 text-red-600 hover:bg-red-50'
          }`}
        >
          {confirmReset ? 'Click again to confirm reset' : 'Reset All Data'}
        </button>
      </div>
    </div>
  )
}
