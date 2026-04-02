# Test Specs: Leaderboards & Trends

## Public

- [ ] Trend charts render with data from `trends`
- [ ] Leaderboard tab/section shows **blurred or locked** content; **no** member full names or ranks readable
- [ ] UI still indicates presence of a leaderboard (tab label, structure) per design

## Authenticated

- [ ] Leaderboard shows podium for top 3 and list for rank 4+
- [ ] Metric tabs switch active metric and `onMetricChange` fires with correct key
- [ ] Time range control updates both boards and charts (`onTimeRangeChange`)
- [ ] **All contributors** vs **Active in range** toggle calls `onContributorFilterChange`
- [ ] Current user row is visually distinct or pinned when `currentUserId` is not in top 3

## Trends

- [ ] Patrol activity by week chart receives `patrolActivityByWeek`
- [ ] Violation multi-series chart uses `violationsByMonth`
- [ ] Trees-by-size stacked data uses `treesBySizeByMonth`
- [ ] Seasonal and year-over-year charts render without error when data present

## Edge cases

- [ ] Single member in list still shows podium/list gracefully
- [ ] Empty `members` array does not crash (define expected empty UI)
