import { useState } from 'react'
import data from '@/../product/sections/leaderboards-trends/data.json'
import { LeaderboardsTrends } from './components/LeaderboardsTrends'
import type {
  TimeRange,
  LeaderboardMetric,
  LeaderboardCategory,
} from '@/../product/sections/leaderboards-trends/types'

export default function LeaderboardsTrendsPreview() {
  const [signedIn, setSignedIn] = useState(true)

  return (
    <div className="space-y-3">
      <label className="inline-flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={signedIn}
          onChange={e => setSignedIn(e.target.checked)}
          className="rounded border-stone-300 dark:border-stone-600"
        />
        Preview as signed in (uncheck for public: Leaderboards disabled)
      </label>
      <LeaderboardsTrends
        members={data.members}
        trends={data.trends}
        currentUserId={signedIn ? data.currentUserId : undefined}
        defaultTimeRange={data.defaultTimeRange as TimeRange}
        defaultLeaderboardCategory={data.defaultLeaderboardCategory as LeaderboardCategory}
        defaultMetric={data.defaultMetric as LeaderboardMetric}
        onTimeRangeChange={(range) => console.log('Time range:', range)}
        onLeaderboardCategoryChange={(c) => console.log('Leaderboard category:', c)}
        onMetricChange={(metric) => console.log('Metric:', metric)}
        onSignInPrompt={() => console.log('Sign in prompt')}
      />
    </div>
  )
}
