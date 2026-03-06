# Soul Powered Life Plan — CLAUDE.md

This file provides guidance for AI assistants (Claude Code and others) working in this repository.

## Project Overview

**Soul Powered Life Plan** is an interactive web application designed for life coaching clients. It provides a structured, guided experience for:

- Client onboarding and profile creation
- Life planning across core life categories (Health, Career, Relationships, Finances, Spiritual, Personal Growth)
- Prompted goal-setting using SMART goal methodology
- Session and activity time tracking
- Progress visualization and check-ins

The app runs entirely in the browser using React + Vite and stores all data in `localStorage` — no backend required.

---

## Repository Structure

```
SoulPoweredLifePlan-/
├── CLAUDE.md                  # This file
├── index.html                 # Vite entry HTML
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Root app component + routing
│   ├── index.css              # Global styles (Tailwind imports)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx     # Top navigation bar
│   │   │   └── Sidebar.jsx    # Navigation sidebar
│   │   ├── onboarding/
│   │   │   ├── Welcome.jsx    # Welcome screen
│   │   │   └── ClientForm.jsx # Client info intake form
│   │   ├── planner/
│   │   │   ├── LifeWheel.jsx  # Life wheel visualization
│   │   │   ├── GoalPrompt.jsx # Prompted goal-setting flow
│   │   │   └── GoalCard.jsx   # Individual goal display card
│   │   ├── tracker/
│   │   │   ├── TimeTracker.jsx     # Active timer component
│   │   │   ├── SessionLog.jsx      # Session history
│   │   │   └── DailySchedule.jsx   # Daily time planner
│   │   └── dashboard/
│   │       ├── Dashboard.jsx  # Main dashboard overview
│   │       └── ProgressChart.jsx   # Progress visualization
│   ├── hooks/
│   │   ├── useLocalStorage.js # Persistent state hook
│   │   └── useTimer.js        # Timer hook for time tracking
│   ├── utils/
│   │   ├── storage.js         # localStorage read/write helpers
│   │   └── dateHelpers.js     # Date formatting utilities
│   └── data/
│       └── prompts.js         # Life planning question prompts
```

---

## Technology Stack

| Layer       | Technology         |
|-------------|-------------------|
| Framework   | React 18          |
| Build Tool  | Vite 5            |
| Styling     | Tailwind CSS 3    |
| Icons       | Lucide React      |
| State       | React useState/useReducer + localStorage |
| Charts      | Recharts          |
| Routing     | React Router v6   |

---

## Development Workflows

### Setup
```bash
npm install
npm run dev        # Start dev server at http://localhost:5173
```

### Build
```bash
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

### No backend, no database
All data is persisted in the browser's `localStorage` under the key prefix `splp_`. If you need to reset the app state during development, run `localStorage.clear()` in the browser console.

---

## Key Conventions

### Component Conventions
- All React components use **functional components with hooks** — no class components.
- Component files use **PascalCase** (e.g., `GoalCard.jsx`).
- Each component has a single default export.
- Props are destructured at the function signature level.

### State Management
- App-level state lives in `App.jsx` and is passed down via props or context.
- Persistent data (client profile, goals, sessions) is saved to localStorage via the `useLocalStorage` hook.
- The `storage.js` utility wraps localStorage with JSON serialization/deserialization.

### Styling
- Use **Tailwind utility classes** for all styling — no separate CSS files per component.
- Color palette centers on purple/indigo tones (brand colors for Soul Powered).
- Responsive design is required: use `sm:`, `md:`, `lg:` breakpoints.

### Data Flow
- `App.jsx` holds the top-level `clientProfile`, `goals`, and `sessions` state.
- Child components receive data and setter functions via props.
- The onboarding flow must be completed before the main app is accessible.

### Life Categories
The app uses these fixed 6 life categories (do not rename them):
```js
['Health', 'Career', 'Relationships', 'Finances', 'Spiritual', 'Personal Growth']
```

### Prompts
All guided prompts for clients are defined in `src/data/prompts.js`. When adding new coaching questions, add them there — not inline in components.

### Time Tracking
- Sessions are stored as objects: `{ id, category, startTime, endTime, durationMinutes, notes }`.
- The `useTimer` hook manages the active timer state (start, pause, stop).
- All times are stored as ISO strings.

---

## Important Notes for AI Assistants

1. **Do not add a backend** unless explicitly requested — the app is intentionally client-only.
2. **Do not modify the 6 life categories** — they are referenced by key throughout the app.
3. **Keep prompts in `src/data/prompts.js`** — do not hardcode coaching questions in components.
4. **localStorage keys** all use the `splp_` prefix to avoid collisions.
5. **Test in browser** after changes — there are no automated tests currently.
6. When adding new features, follow the existing folder structure (layout, onboarding, planner, tracker, dashboard).
7. The target audience is **non-technical life coaching clients** — keep UX simple, warm, and encouraging.
