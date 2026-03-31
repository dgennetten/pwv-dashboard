// ─── Time range ───────────────────────────────────────────────────────────────

export type TimeRange = '7d' | '1m' | '3m' | '1y' | 'all'

export type MemberContext = 'all' | number // 'all' = org-wide; number = PersonID

// ─── Current filter scope ─────────────────────────────────────────────────────

export interface DashboardScope {
  timeRange: TimeRange
  memberContext: MemberContext
}

// ─── Headline KPI summary ─────────────────────────────────────────────────────

export interface ActivitySummary {
  patrols: number
  /** Change vs. prior equivalent period (positive = increase) */
  patrolsDelta: number
  trailsCovered: number
  trailsCoveredDelta: number
  treesCleared: number
  treesClearedDelta: number
  hikersContacted: number
  hikersContactedDelta: number
  volunteerHours: number
  totalActiveMembers: number
  /** Human-readable date range label, e.g. "Mar 23 – Mar 30, 2026" */
  periodLabel: string
}

// ─── Patrol activity chart ─────────────────────────────────────────────────────

export interface PatrolActivityDay {
  date: string       // ISO 8601 date string
  dayLabel: string   // Short label for display, e.g. "Mon", "Mar 24"
  patrols: number
}

// ─── Trail coverage ────────────────────────────────────────────────────────────

export interface TrailCoverageRow {
  trailId: number
  trailName: string
  trailNumber: string
  area: string
  lengthMiles: number
  inWilderness: boolean
  patrols: number
  members: number
  hikersContacted: number
  lastPatrolDate: string | null  // ISO 8601 date; null if no patrols in period
}

export type TrailCoverageSortKey = 'trailName' | 'patrols' | 'hikersContacted' | 'area'

// ─── Violations ───────────────────────────────────────────────────────────────

export interface ViolationCategory {
  category: string
  count: number
  color: string
}

// ─── Trees cleared ────────────────────────────────────────────────────────────

export type TreeSizeClass = '< 8"' | '8" – 15"' | '16" – 23"' | '24" – 36"' | '> 36"'

export interface TreeSizeCount {
  sizeClass: TreeSizeClass
  label: string
  count: number
}

export interface TrailTreesCleared {
  trailName: string
  trailNumber: string
  trees: Array<{ sizeClass: TreeSizeClass; count: number }>
  total: number
}

export interface TreesCleared {
  aggregate: TreeSizeCount[]
  byTrail: TrailTreesCleared[]
}

// ─── Member selector ──────────────────────────────────────────────────────────

export interface MemberOption {
  personId: number
  firstName: string
  lastName: string
  fullName: string
  /** Total patrol count (all-time) — used to sort the dropdown */
  patrols: number
}

// ─── Component props ──────────────────────────────────────────────────────────

export interface ActivityDashboardProps {
  scope: DashboardScope
  summary: ActivitySummary
  patrolActivity: PatrolActivityDay[]
  trailCoverage: TrailCoverageRow[]
  violationsByCategory: ViolationCategory[]
  treesCleared: TreesCleared
  members: MemberOption[]
  /** PersonID of the logged-in user; enables the "Me" shortcut in the member selector. Omit for public/unauthenticated view. */
  currentUserId?: number

  /** Called when the user selects a different time range preset */
  onTimeRangeChange?: (range: TimeRange) => void

  /** Called when the user selects a member from the dropdown (or 'all' for org-wide) */
  onMemberChange?: (context: MemberContext) => void

  /** Called when the user clicks a trail row in the coverage list */
  onTrailSelect?: (trailId: number) => void

  /** Called when the trail coverage table sort column or direction changes */
  onTrailCoverageSortChange?: (key: TrailCoverageSortKey, direction: 'asc' | 'desc') => void
}
