# Milestone 2: Activity Dashboard

> **Provide alongside:** `product-overview.md`  
> **Prerequisites:** Milestone 1 (Shell)

---

## About This Handoff

**What you're receiving:** Finished UI designs (React + Tailwind), product requirements, design tokens, sample data shapes, and UI test specs.

**Your job:** Integrate into your app, wire callbacks to routing and auth, replace sample data with real APIs, add loading/error/empty states. Components are props-based.

---

## Goal

Primary **patrol activity snapshot** — org-wide or per-member, with time range presets, KPIs, and four chart/list areas.

## Key Functionality

- Time range: 7d / 1m / 3m / 1y / all
- Member scope: All / Me / Other member (admin) — **hidden entirely** when not authenticated (public = org aggregates only)
- KPI cards: patrols, trails covered, trees cleared, hikers contacted (+ deltas)
- Patrol activity chart; trail coverage sortable table; violations by category; trees cleared (aggregate vs by trail); optional members-by-age chart

## Components

From `product-plan/sections/activity-dashboard/components/`:

- `ActivityDashboard.tsx` — composition + scope controls
- `PatrolActivityChart`, `TrailCoverageList`, `TrailCoveragePatrolDetail`, `ViolationsChart`, `TreesClearedChart`, `MembersByAgeChart`

## Props (`ActivityDashboardProps`)

**Data:** `scope`, `summary`, `patrolActivity`, `trailCoverage`, `patrolsByTrailId`, `violationsByCategory`, `treesCleared`, `members`, `membersByAge`, optional `currentUserId`

**Callbacks:** `onTimeRangeChange`, `onMemberChange`, `onTrailSelect`, `onTrailCoverageSortChange`

See `types.ts` for full definitions.

## Files to Reference

- `sections/activity-dashboard/README.md`
- `sections/activity-dashboard/tests.md`
- `sample-data.json`

## Done When

- [ ] Public: no member selector; all data org-wide
- [ ] Authenticated: member selector defaults to Me; callbacks update data
- [ ] Responsive layout matches design
- [ ] Tests in `tests.md` covered or adapted
