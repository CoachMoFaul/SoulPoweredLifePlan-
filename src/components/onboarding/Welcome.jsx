import { Sparkles, Heart, Target, Clock } from 'lucide-react'

const FEATURES = [
  { icon: Heart,    color: 'text-pink-500',   bg: 'bg-pink-50',   title: 'Know Yourself', desc: 'Reflect on where you are in every area of life' },
  { icon: Target,   color: 'text-brand-600',  bg: 'bg-brand-50',  title: 'Set Powerful Goals', desc: 'Create SMART goals guided by coaching prompts' },
  { icon: Clock,    color: 'text-emerald-600', bg: 'bg-emerald-50', title: 'Track Your Time', desc: 'Stay accountable with a built-in session timer' },
]

export default function Welcome({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 page-enter">
      {/* Hero */}
      <div className="text-center max-w-xl mb-12">
        <div className="w-20 h-20 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Sparkles size={36} className="text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Soul Powered<br />
          <span className="text-brand-600">Life Plan</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Your personal coaching companion. Set intentions, plan your goals, and track your progress — all in one beautifully simple place.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-12">
        {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
          <div key={title} className="card text-center hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Icon size={22} className={color} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button onClick={onStart} className="btn-primary text-lg px-10 py-4">
        Begin Your Journey ✨
      </button>
      <p className="text-sm text-gray-400 mt-4">Takes about 5 minutes to set up</p>
    </div>
  )
}
