import data from '@/../product/sections/leaderboards-trends/data.json'
import { LeaderboardsTrends } from './components/LeaderboardsTrends'
import type { TimeRange, LeaderboardMetric } from '@/../product/sections/leaderboards-trends/types'

export default function LeaderboardsTrendsPreview() {
  return (
    <LeaderboardsTrends
      members={data.members}
      trends={data.trends}
      currentUserId={data.currentUserId}
      defaultTimeRange={data.defaultTimeRange as TimeRange}
      defaultMetric={data.defaultMetric as LeaderboardMetric}
      onTimeRangeChange={(range) => console.log('Time range:', range)}
      onMetricChange={(metric) => console.log('Metric:', metric)}
    />
  )
}
