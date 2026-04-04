import { useState, useMemo, useCallback, useEffect } from 'react'
import type {
  LeaderboardsTrendsProps,
  TimeRange,
  LeaderboardMetric,
  LeaderboardCategory,
} from '@/../product/sections/leaderboards-trends/types'
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

const CATEGORY_OPTIONS: { value: LeaderboardCategory; label: string }[] = [
  { value: 'days',   label: 'Days' },
  { value: 'work',   label: 'Work' },
  { value: 'trails', label: 'Trails' },
  { value: 'hours',  label: 'Hours' },
]

const METRICS_BY_CATEGORY: Record<
  LeaderboardCategory,
  { value: LeaderboardMetric; label: string; unit: string }[]
> = {
  days: [
    { value: 'patrolDays',     label: 'Patrol',     unit: 'days' },
    { value: 'hikeDays',       label: 'Hike',       unit: 'days' },
    { value: 'stockDays',      label: 'Stock',      unit: 'days' },
    { value: 'trailworkDays',  label: 'Trailwork',  unit: 'days' },
    { value: 'wildernessDays', label: 'Wilderness', unit: 'days' },
  ],
  work: [
    { value: 'contacts',     label: 'Contacts',   unit: 'contacts' },
    { value: 'treesCleared', label: 'Trees',      unit: 'trees' },
    { value: 'brushing',     label: 'Brushing',   unit: 'hrs' },
    { value: 'fireRings',    label: 'Fire rings', unit: 'rings' },
    { value: 'trash',        label: 'Trash',      unit: 'bags' },
  ],
  trails: [
    { value: 'milesCovered', label: 'Miles',   unit: 'mi' },
    { value: 'trailCount',   label: '#Trails', unit: 'trails' },
    { value: 'trailTypes',   label: 'Types',   unit: 'types' },
  ],
  hours: [
    { value: 'totalHours',    label: 'Total',     unit: 'hrs' },
    { value: 'patrolHours',   label: 'Patrol',    unit: 'hrs' },
    { value: 'nonPatrolHours', label: 'Non-patrol', unit: 'hrs' },
  ],
}

const DEFAULT_CATEGORY: LeaderboardCategory = 'work'
const DEFAULT_METRIC: LeaderboardMetric = 'contacts'

/** Persists the user’s leaderboard category + metric tab across sessions (browser localStorage). */
const LEADERBOARD_UI_STORAGE_KEY = 'pwv-leaderboards-category-metric-v1'

function metricBelongsToCategory(metric: LeaderboardMetric, category: LeaderboardCategory): boolean {
  return METRICS_BY_CATEGORY[category].some(m => m.value === metric)
}

function firstMetricForCategory(category: LeaderboardCategory): LeaderboardMetric {
  return METRICS_BY_CATEGORY[category][0]!.value
}

function readPersistedLeaderboardUI(): { category: LeaderboardCategory; metric: LeaderboardMetric } | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(LEADERBOARD_UI_STORAGE_KEY)
    if (!raw) return null
    const o = JSON.parse(raw) as { category?: unknown; metric?: unknown }
    if (typeof o.category !== 'string' || !CATEGORY_OPTIONS.some(c => c.value === o.category)) return null
    const category = o.category as LeaderboardCategory
    if (typeof o.metric !== 'string' || !metricBelongsToCategory(o.metric as LeaderboardMetric, category)) {
      return { category, metric: firstMetricForCategory(category) }
    }
    return { category, metric: o.metric as LeaderboardMetric }
  } catch {
    return null
  }
}

function writePersistedLeaderboardUI(category: LeaderboardCategory, metric: LeaderboardMetric) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(LEADERBOARD_UI_STORAGE_KEY, JSON.stringify({ category, metric }))
  } catch {
    /* quota / private mode */
  }
}

/** Resolve props into a consistent initial category + metric (no localStorage). */
function initialCategoryAndMetric(
  defaultLeaderboardCategory: LeaderboardCategory | undefined,
  defaultMetric: LeaderboardMetric | undefined
): { category: LeaderboardCategory; metric: LeaderboardMetric } {
  const cat = defaultLeaderboardCategory ?? DEFAULT_CATEGORY
  const met = defaultMetric ?? DEFAULT_METRIC
  if (metricBelongsToCategory(met, cat)) return { category: cat, metric: met }
  for (const { value } of CATEGORY_OPTIONS) {
    if (metricBelongsToCategory(met, value)) return { category: value, metric: met }
  }
  return { category: DEFAULT_CATEGORY, metric: DEFAULT_METRIC }
}

/** Prefer saved UI; otherwise props / defaults (Work → Contacts). */
function resolveInitialLeaderboardUI(
  defaultLeaderboardCategory: LeaderboardCategory | undefined,
  defaultMetric: LeaderboardMetric | undefined
): { category: LeaderboardCategory; metric: LeaderboardMetric } {
  const persisted = readPersistedLeaderboardUI()
  if (persisted) return persisted
  return initialCategoryAndMetric(defaultLeaderboardCategory, defaultMetric)
}

type ActiveView = 'leaderboards' | 'trends'

// ── Main component ───────────────────────────────────────────────────────────

export function LeaderboardsTrends({
  members,
  trends,
  currentUserId,
  defaultTimeRange = 'year',
  defaultLeaderboardCategory = DEFAULT_CATEGORY,
  defaultMetric = DEFAULT_METRIC,
  onTimeRangeChange,
  onLeaderboardCategoryChange,
  onMetricChange,
}: LeaderboardsTrendsProps) {
  const [view, setView] = useState<ActiveView>('leaderboards')
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange)
  const [leaderboardCategory, setLeaderboardCategory] = useState<LeaderboardCategory>(() =>
    resolveInitialLeaderboardUI(defaultLeaderboardCategory, defaultMetric).category
  )
  const [metric, setMetric] = useState<LeaderboardMetric>(() =>
    resolveInitialLeaderboardUI(defaultLeaderboardCategory, defaultMetric).metric
  )

  useEffect(() => {
    writePersistedLeaderboardUI(leaderboardCategory, metric)
  }, [leaderboardCategory, metric])

  const handleTimeRange = (range: TimeRange) => {
    setTimeRange(range)
    onTimeRangeChange?.(range)
  }

  const handleCategory = useCallback(
    (category: LeaderboardCategory) => {
      setLeaderboardCategory(category)
      const next = firstMetricForCategory(category)
      setMetric(next)
      onLeaderboardCategoryChange?.(category)
      onMetricChange?.(next)
    },
    [onLeaderboardCategoryChange, onMetricChange]
  )

  const handleMetric = (m: LeaderboardMetric) => {
    setMetric(m)
    onMetricChange?.(m)
  }

  const categoryMetrics = METRICS_BY_CATEGORY[leaderboardCategory]

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
              type="button"
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
            type="button"
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
          leaderboardCategory={leaderboardCategory}
          categoryOptions={CATEGORY_OPTIONS}
          metrics={categoryMetrics}
          onLeaderboardCategoryChange={handleCategory}
          onMetricChange={handleMetric}
        />
      ) : (
        <TrendCharts trends={trends} />
      )}
    </div>
  )
}
