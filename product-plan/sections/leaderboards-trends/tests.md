# Test Specs: Leaderboards & Trends

## Public

- [ ] Trend charts render with data from `trends` (`currentUserId` omitted)
- [ ] **Leaderboards** tab is **disabled**; tooltip / copy explains sign-in is required; **no** leaderboard list or names render
- [ ] **Trends** tab remains fully interactive

## Authenticated

- [ ] Leaderboard shows podium for top 3 and list for rank 4+
- [ ] Metric tabs switch active metric and `onMetricChange` fires with correct key
- [ ] Time range control updates both boards and charts (`onTimeRangeChange`)
- [ ] Current user row is visually distinct or pinned when `currentUserId` is not in top 3

## Trends

- [ ] **This Year** / **Year over Year** dropdown is to the left of the four chart-type pills; **All Time** grays it out and keeps “This Year” behavior
- [ ] Period line under the chart title reflects page `timeRange` and dropdown (YTD vs YoY copy)
- [ ] Patrol Activity: **This Year** uses `patrolActivityByWeek`; **Year over Year** uses `yearOverYear`
- [ ] Violations / Trees / Seasonal: **This Year** uses monthly (stacked for trees); **Year over Year** shows paired monthly bars when enabled
- [ ] Trees: YoY note clarifies totals vs size breakdown in This Year view

## Edge cases

- [ ] Single member in list still shows podium/list gracefully
- [ ] Empty `members` array does not crash (define expected empty UI)
