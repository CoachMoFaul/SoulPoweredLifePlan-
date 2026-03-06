import { Sparkles, Menu, X } from 'lucide-react'

export default function Header({ clientName, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-100 shadow-sm">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-brand-800 text-lg hidden sm:block">Soul Powered Life Plan</span>
          <span className="font-bold text-brand-800 text-base sm:hidden">SPLP</span>
        </div>

        {/* Greeting */}
        {clientName && (
          <p className="text-sm text-gray-500 hidden md:block">
            Welcome back, <span className="font-semibold text-brand-700">{clientName}</span> ✨
          </p>
        )}

        {/* Mobile menu toggle */}
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="p-2 rounded-lg hover:bg-brand-50 text-gray-600 lg:hidden"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
