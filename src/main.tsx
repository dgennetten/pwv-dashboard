import { Component, type ErrorInfo, type ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/lib/router'

/** Surfaces render errors instead of a blank page (e.g. after bad dependency updates). */
class RootErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-stone-100 dark:bg-stone-950 p-8 text-stone-900 dark:text-stone-100">
          <h1 className="text-lg font-semibold mb-2">Something went wrong</h1>
          <pre className="text-sm whitespace-pre-wrap bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-4">
            {this.state.error.message}
          </pre>
          <p className="mt-4 text-sm text-stone-600 dark:text-stone-400">See the browser console for the full stack.</p>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <RouterProvider router={router} />
    </RootErrorBoundary>
  </StrictMode>,
)
