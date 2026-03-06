import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Target, Timer, BookOpen,
  Sun, Settings, ChevronRight
} from 'lucide-react'

const NAV = [
  { to: '/dashboard',  label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/planner',    label: 'Life Planner',  icon: Target },
  { to: '/tracker',    label: 'Time Tracker',  icon: Timer },
  { to: '/journal',    label: 'Daily Check-in',icon: Sun },
  { to: '/goals',      label: 'My Goals',      icon: BookOpen },
  { to: '/settings',   label: 'Settings',      icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-100 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:shadow-none
      `}>
        <nav className="py-6 px-3 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 group
                ${isActive
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-brand-50 hover:text-brand-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {label}
                  </div>
                  {isActive && <ChevronRight size={14} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-3 right-3">
          <div className="bg-brand-50 rounded-xl p-4 text-center">
            <p className="text-xs text-brand-700 font-medium">💜 You are capable of</p>
            <p className="text-xs text-brand-700 font-medium">extraordinary things.</p>
          </div>
        </div>
      </aside>
    </>
  )
}
