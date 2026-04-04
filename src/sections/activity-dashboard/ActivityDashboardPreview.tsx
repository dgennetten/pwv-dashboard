import { useState } from 'react'
import data from '@/../product/sections/activity-dashboard/data.json'
import { ActivityDashboard } from './components/ActivityDashboard'
import type {
  DashboardScope,
  TimeRange,
  MemberContext,
  TreesCleared,
  MemberAgeGroup,
  CoveragePatrolRow,
} from '@/../product/sections/activity-dashboard/types'

const PERIOD_LABELS: Record<string, string> = {
  '7d':  'Mar 23 – Mar 30, 2026',
  '1m':  'Mar 1 – Mar 30, 2026',
  '3m':  'Jan 1 – Mar 30, 2026',
  '1y':  'Apr 2025 – Mar 2026',
  'all': 'All Time',
}

export default function ActivityDashboardPreview() {
  const [scope, setScope] = useState<DashboardScope>(
    data.currentScope as DashboardScope
  )

  const handleTimeRangeChange = (range: TimeRange) => {
    setScope(prev => ({ ...prev, timeRange: range }))
  }

  const handleMemberChange = (context: MemberContext) => {
    setScope(prev => ({ ...prev, memberContext: context }))
  }

  const summary = {
    ...data.summary,
    periodLabel: PERIOD_LABELS[scope.timeRange] ?? data.summary.periodLabel,
  }

  // Small page size so the 8 sample trails exercise “Load more” in preview (prod uses admin setting / default 50).
  return (
    <ActivityDashboard
      scope={scope}
      summary={summary}
      patrolActivity={data.patrolActivity}
      trailCoverage={data.trailCoverage}
      violationsByCategory={data.violationsByCategory}
      treesCleared={data.treesCleared as unknown as TreesCleared}
      membersByAge={data.membersByAge as MemberAgeGroup[]}
      members={data.members}
      patrolsByTrailId={data.patrolsByTrailId as Record<number, CoveragePatrolRow[]>}
      currentUserId={data.currentUserId}
      onTimeRangeChange={handleTimeRangeChange}
      onMemberChange={handleMemberChange}
      onTrailSelect={(id) => console.log('Trail selected:', id)}
      onTrailCoverageBack={() => console.log('Back from trail coverage detail')}
      onTrailCoverageSortChange={(key, dir) => console.log('Sort:', key, dir)}
      trailCoveragePageSize={4}
    />
  )
}
