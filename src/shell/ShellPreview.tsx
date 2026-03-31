import { useState } from 'react'
import { AppShell } from './components/AppShell'

const DEMO_USER = {
  name: 'Sarah Mitchell',
  email: 'smitchell@pwv.org',
}

const CONTENT_SAMPLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Activity Dashboard',
    subtitle: 'Last 7 days · All Members',
  },
  '/trails': {
    title: 'Trail Health',
    subtitle: '56 trails · Canyon Lakes RD',
  },
  '/leaderboards': {
    title: 'Leaderboards & Trends',
    subtitle: 'All time · All Members',
  },
  '/admin': {
    title: 'Admin',
    subtitle: 'Data visualization tools',
  },
  '/settings': {
    title: 'Settings',
    subtitle: 'Account & preferences',
  },
  '/help': {
    title: 'Help & About',
    subtitle: 'PWV Insights documentation',
  },
}

export default function ShellPreview() {
  const [activeHref, setActiveHref] = useState('/dashboard')
  const content = CONTENT_SAMPLES[activeHref] ?? CONTENT_SAMPLES['/dashboard']

  return (
    <AppShell
      activeHref={activeHref}
      user={DEMO_USER}
      onNavigate={setActiveHref}
      onLogout={() => console.log('logout')}
    >
      <div className="p-6 lg:p-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            {content.title}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {content.subtitle}
          </p>
        </div>

        {/* Placeholder stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {['Patrols', 'Trails Covered', 'Trees Cleared', 'Hikers Contacted'].map((label) => (
            <div
              key={label}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4"
            >
              <div className="text-xs text-stone-500 dark:text-stone-400 mb-1">{label}</div>
              <div className="h-7 w-16 bg-stone-100 dark:bg-stone-800 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Placeholder chart area */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
          <div className="h-4 w-32 bg-stone-100 dark:bg-stone-800 rounded mb-4 animate-pulse" />
          <div className="h-48 bg-stone-50 dark:bg-stone-800/50 rounded-lg flex items-center justify-center">
            <span className="text-sm text-stone-400 dark:text-stone-600">
              Chart content renders here
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
