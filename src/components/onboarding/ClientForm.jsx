import { useState } from 'react'
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react'
import { INTAKE_QUESTIONS, CATEGORIES } from '../../data/prompts'

const STEPS = ['Your Info', 'About You', 'Life Areas', 'Your Vision']

export default function ClientForm({ onComplete }) {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    coachName: '', startDate: new Date().toISOString().split('T')[0],
  })
  const [intake, setIntake] = useState({})
  const [ratings, setRatings] = useState(() =>
    Object.fromEntries(CATEGORIES.map(c => [c.id, 5]))
  )

  function updateProfile(field, val) {
    setProfile(p => ({ ...p, [field]: val }))
  }

  function updateIntake(field, val) {
    setIntake(i => ({ ...i, [field]: val }))
  }

  function canProceed() {
    if (step === 0) return profile.firstName.trim() && profile.lastName.trim()
    return true
  }

  function handleFinish() {
    onComplete({ profile, intake, ratings })
  }

  const progress = ((step) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 page-enter">
      <div className="w-full max-w-xl">
        {/* Step indicators */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Step {step + 1} of {STEPS.length}</span>
            <span>{STEPS[step]}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={`text-xs font-medium ${i <= step ? 'text-brand-600' : 'text-gray-400'}`}
              >
                {i < step ? '✓ ' : ''}{s}
              </span>
            ))}
          </div>
        </div>

        {/* Step 0: Basic Info */}
        {step === 0 && (
          <div className="card page-enter">
            <h2 className="section-title mb-1">Let's get started! 👋</h2>
            <p className="section-subtitle mb-6">Tell us a little about yourself.</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name *</label>
                  <input
                    className="input-field"
                    placeholder="Your first name"
                    value={profile.firstName}
                    onChange={e => updateProfile('firstName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Last Name *</label>
                  <input
                    className="input-field"
                    placeholder="Your last name"
                    value={profile.lastName}
                    onChange={e => updateProfile('lastName', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="label">Email Address</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="your@email.com"
                  value={profile.email}
                  onChange={e => updateProfile('email', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Phone (optional)</label>
                <input
                  className="input-field"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={profile.phone}
                  onChange={e => updateProfile('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Your Coach's Name (optional)</label>
                <input
                  className="input-field"
                  placeholder="e.g., Coach Sarah"
                  value={profile.coachName}
                  onChange={e => updateProfile('coachName', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Program Start Date</label>
                <input
                  className="input-field"
                  type="date"
                  value={profile.startDate}
                  onChange={e => updateProfile('startDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Intake Questions */}
        {step === 1 && (
          <div className="card page-enter">
            <h2 className="section-title mb-1">About You 💭</h2>
            <p className="section-subtitle mb-6">Take your time — there are no wrong answers here.</p>
            <div className="space-y-6">
              {INTAKE_QUESTIONS.map(q => (
                <div key={q.id}>
                  <label className="label text-base">{q.question}</label>
                  {q.type === 'textarea' ? (
                    <textarea
                      className="textarea-field"
                      rows={3}
                      placeholder={q.placeholder}
                      value={intake[q.id] || ''}
                      onChange={e => updateIntake(q.id, e.target.value)}
                    />
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={q.min}
                        max={q.max}
                        value={intake[q.id] || 7}
                        onChange={e => updateIntake(q.id, Number(e.target.value))}
                        className="w-full accent-brand-600"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1 — Not yet</span>
                        <span className="font-bold text-brand-600 text-lg">{intake[q.id] || 7}</span>
                        <span>10 — Fully ready</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Life Area Ratings */}
        {step === 2 && (
          <div className="card page-enter">
            <h2 className="section-title mb-1">Your Life Wheel 🎡</h2>
            <p className="section-subtitle mb-6">Rate your current satisfaction in each area (1 = very low, 10 = very high).</p>
            <div className="space-y-5">
              {CATEGORIES.map(cat => (
                <div key={cat.id}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold text-gray-700 flex items-center gap-2">
                      <span>{cat.emoji}</span> {cat.label}
                    </label>
                    <span
                      className="font-bold text-lg px-3 py-0.5 rounded-lg"
                      style={{ color: cat.color, backgroundColor: cat.bg }}
                    >
                      {ratings[cat.id]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={ratings[cat.id]}
                    onChange={e => setRatings(r => ({ ...r, [cat.id]: Number(e.target.value) }))}
                    className="w-full"
                    style={{ accentColor: cat.color }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Vision confirmation */}
        {step === 3 && (
          <div className="card page-enter text-center">
            <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-brand-600" />
            </div>
            <h2 className="section-title mb-2">You're all set, {profile.firstName}! 🌟</h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Your soul-powered journey begins now. Your dashboard is ready — let's turn your vision into reality, one intentional step at a time.
            </p>
            <div className="bg-brand-50 rounded-xl p-4 text-left mb-6">
              <p className="text-sm text-brand-800 font-medium mb-1">Your commitment score:</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-brand-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded-full"
                    style={{ width: `${((intake.commitment || 7) / 10) * 100}%` }}
                  />
                </div>
                <span className="font-bold text-brand-700">{intake.commitment || 7}/10</span>
              </div>
            </div>
            <button onClick={handleFinish} className="btn-primary w-full text-base">
              Go to My Dashboard →
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="btn-secondary disabled:opacity-30 flex items-center gap-2"
          >
            <ChevronLeft size={18} /> Back
          </button>
          {step < STEPS.length - 1 && (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="btn-primary flex items-center gap-2"
            >
              Continue <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
