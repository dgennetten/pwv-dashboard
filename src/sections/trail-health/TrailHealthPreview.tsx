import data from '@/../product/sections/trail-health/data.json'
import type { Trail } from '@/../product/sections/trail-health/types'
import { TrailHealth } from './components/TrailHealth'

export default function TrailHealthPreview() {
  return (
    <TrailHealth
      trails={data.trails as Trail[]}
      isAuthenticated={true}
      onSelectTrail={(id) => console.log('Trail selected:', id)}
      onBackToList={() => console.log('Back to trail list')}
      onSignInPrompt={() => console.log('Sign in prompt triggered')}
    />
  )
}
