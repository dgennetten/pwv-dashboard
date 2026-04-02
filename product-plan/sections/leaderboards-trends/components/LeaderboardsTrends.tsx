import { useState, useMemo } from 'react'
import type {
  LeaderboardsTrendsProps,
  TimeRange,
  LeaderboardMetric,
  ContributorFilter,
} from '../types'
import { Leaderboard } from './Leaderboard'
import { TrendCharts } from './TrendCharts'

// ── Config ───────────────────────────────────────────────────────────────────

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: 'week',    label: 'Week to Date' },
  { value: 'month',   label: 'Month to Date' },
  { value: 'quarter', label: 'Quarter to Date' },
  { value: 'year',    label: 'Year to Date' },
  { value: 'all',     label: 'All Time' },
]

const METRICS: { value: LeaderboardMetric; label: string; unit: string }[] = [
  { value: 'patrolCount',    label: 'Patrol Count',    unit: 'patrols' },
  { value: 'volunteerHours', label: 'Volunteer Hours', unit: 'hrs' },
  { value: 'milesCovered',   label: 'Miles Covered',   unit: 'mi' },
  { value: 'treesCleared',   label: 'Trees Cleared',   unit: 'trees' },
  { value: 'overnights',     label: 'Overnights',      unit: 'nights' },
  { value: 'stockPatrols',   label: 'Stock Patrols',   unit: 'patrols' },
]

type ActiveView = 'leaderboards' | 'trends'

// ── Main component ───────────────────────────────────────────────────────────

export function LeaderboardsTrends({
  members,
  trends,
  currentUserId,
  defaultTimeRange = 'year',
  defaultMetric = 'patrolCount',
  onTimeRangeChange,
  onMetricChange,
  onContributorFilterChange,
}: LeaderboardsTrendsProps) {
  const [view, setView] = useState<ActiveView>('leaderboards')
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange)
  const [metric, setMetric] = useState<LeaderboardMetric>(defaultMetric)
  const [contributorFilter, setContributorFilter] = useState<ContributorFilter>('all')

  const handleTimeRange = (range: TimeRange) => {
    setTimeRange(range)
    onTimeRangeChange?.(range)
  }

  const handleMetric = (m: LeaderboardMetric) => {
    setMetric(m)
    onMetricChange?.(m)
  }

  const handleContributorFilter = (f: ContributorFilter) => {
    setContributorFilter(f)
    onContributorFilterChange?.(f)
  }

  const sortedMembers = useMemo(
    () => [...members].sort((a, b) => b[metric] - a[metric]),
    [members, metric]
  )

  return (
    <div className="min-h-full bg-stone-50 dark:bg-stone-950 p-4 md:p-6 lg:p-8">

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          Leaderboards & Trends
        </h2>

        {/* Time range pill group */}
        <div className="flex flex-wrap bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-0.5 gap-0.5 self-start">
          {TIME_RANGES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleTimeRange(value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeRange === value
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* View tabs */}
      <div className="flex gap-0 border-b border-stone-200 dark:border-stone-800 mb-6">
        {(['leaderboards', 'trends'] as ActiveView[]).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-5 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors capitalize ${
              view === v
                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
            }`}
          >
            {v === 'leaderboards' ? 'Leaderboards' : 'Trends'}
          </button>
        ))}
      </div>

      {/* Active view */}
      {view === 'leaderboards' ? (
        <Leaderboard
          members={sortedMembers}
          currentUserId={currentUserId}
          metric={metric}
          metrics={METRICS}
          contributorFilter={contributorFilter}
          onMetricChange={handleMetric}
          onContributorFilterChange={handleContributorFilter}
        />
      ) : (
        <TrendCharts trends={trends} />
      )}
    </div>
  )
}
