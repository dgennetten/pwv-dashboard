import data from '@/../product/sections/leaderboards-trends/data.json'
import { LeaderboardsTrends } from './components/LeaderboardsTrends'
import type {
  TimeRange,
  LeaderboardMetric,
  LeaderboardCategory,
} from '@/../product/sections/leaderboards-trends/types'

export default function LeaderboardsTrendsPreview() {
  return (
    <LeaderboardsTrends
      members={data.members}
      trends={data.trends}
      currentUserId={data.currentUserId}
      defaultTimeRange={data.defaultTimeRange as TimeRange}
      defaultLeaderboardCategory={data.defaultLeaderboardCategory as LeaderboardCategory}
      defaultMetric={data.defaultMetric as LeaderboardMetric}
      onTimeRangeChange={(range) => console.log('Time range:', range)}
      onLeaderboardCategoryChange={(c) => console.log('Leaderboard category:', c)}
      onMetricChange={(metric) => console.log('Metric:', metric)}
    />
  )
}
