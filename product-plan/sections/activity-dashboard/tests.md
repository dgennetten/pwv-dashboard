# Test Specs: Activity Dashboard

Framework-agnostic UI behavior checks. Adapt to Vitest, RTL, Playwright, etc.

## Public (unauthenticated)

- [ ] Member selector is **not** visible
- [ ] All widgets show **org-wide** data only
- [ ] Time range control changes visible data when `onTimeRangeChange` fires (or integrated data updates)

## Authenticated

- [ ] Member selector visible; default scope is **Me** when `currentUserId` matches data
- [ ] Switching to **All Members** updates charts/table to org aggregates
- [ ] **Other member** path (if enabled) selects a different `MemberContext` and data reflects that member
- [ ] KPI cards show labels: Patrols, Trails Covered, Trees Cleared, Hikers Contacted and numeric values + delta text
- [ ] Trail coverage table sorts when user changes column (`onTrailCoverageSortChange`)
- [ ] Row activation calls `onTrailSelect` with expected `trailId`

## Responsive

- [ ] On narrow viewports, stat cards stack 2×2; charts stack vertically without horizontal clipping

## Edge cases

- [ ] Empty `patrolActivity` or `trailCoverage` still renders without crash; empty states acceptable
- [ ] `periodLabel` visible when provided in `summary`
