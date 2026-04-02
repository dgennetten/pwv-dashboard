export type TimeRange = 'week' | 'month' | 'quarter' | 'year' | 'all';

export type LeaderboardMetric =
  | 'patrolCount'
  | 'volunteerHours'
  | 'milesCovered'
  | 'treesCleared'
  | 'overnights'
  | 'stockPatrols';

export type ContributorFilter = 'all' | 'activeInRange';

export interface Member {
  id: string;
  name: string;
  initials: string;
  patrolCount: number;
  volunteerHours: number;
  milesCovered: number;
  treesCleared: number;
  overnights: number;
  stockPatrols: number;
}

/** A weekly data point for the patrol activity trend chart. */
export interface PatrolActivityPoint {
  label: string;   // e.g. "Mar W2"
  count: number;
}

/** A monthly data point for the violation rate trend chart, broken down by category. */
export interface ViolationRatePoint {
  month: string;   // e.g. "Mar"
  offLeashDog: number;
  campfire: number;
  nonDesignatedCamping: number;
  other: number;
}

/** A monthly data point for trees cleared broken down by diameter size class. */
export interface TreesBySizePoint {
  month: string;   // e.g. "Mar"
  under8in: number;
  eightTo15in: number;
  sixteenTo23in: number;
  twentyFourTo36in: number;
  over36in: number;
}

/** A calendar-month data point for the seasonal usage pattern chart. */
export interface SeasonalUsagePoint {
  month: string;   // e.g. "Mar"
  patrols: number;
}

/** A monthly data point comparing patrol counts across two consecutive years. */
export interface YearOverYearPoint {
  month: string;   // e.g. "Mar"
  previousYear: number;
  currentYear: number;
}

export interface Trends {
  patrolActivityByWeek: PatrolActivityPoint[];
  violationsByMonth: ViolationRatePoint[];
  treesBySizeByMonth: TreesBySizePoint[];
  seasonalPatrolsByMonth: SeasonalUsagePoint[];
  yearOverYear: YearOverYearPoint[];
}

export interface LeaderboardsTrendsProps {
  members: Member[];
  trends: Trends;
  /** The ID of the currently logged-in member, used to highlight/pin their row. */
  currentUserId: string;
  defaultTimeRange?: TimeRange;
  defaultMetric?: LeaderboardMetric;
  /** Called when the user changes the active time range. */
  onTimeRangeChange?: (range: TimeRange) => void;
  /** Called when the user switches the active leaderboard metric. */
  onMetricChange?: (metric: LeaderboardMetric) => void;
  /** Called when the user toggles between all contributors and active-in-range. */
  onContributorFilterChange?: (filter: ContributorFilter) => void;
}
