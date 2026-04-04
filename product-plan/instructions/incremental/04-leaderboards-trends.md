# Milestone 4: Leaderboards & Trends

> **Provide alongside:** `product-overview.md`  
> **Prerequisites:** Milestones 1–3

---

## About This Handoff

**What you're receiving:** Finished UI designs (React + Tailwind), product requirements, design tokens, sample data shapes, and UI test specs.

**Your job:** Integrate into your app, wire callbacks to routing and auth, replace sample data with real APIs, add loading/error/empty states. Components are props-based.

---

## Goal

**Leaderboards** (category dropdown: Days / Work / Trails / Hours, metric tabs per category, podium + list, highlight current user) and **trend charts** (patrol activity, violations, trees by size, seasonal, YoY).

## Key Functionality

- Time range: week / month / quarter / year / all-time
- Metric tabs: patrol count, hours, miles, trees, overnights, stock patrols
- Contributors: all vs active in range
- **Public:** trend charts visible; **leaderboard area blurred** — no names/ranks exposed
- **Authenticated:** full leaderboards + pin/highlight `currentUserId`

## Components

- `LeaderboardsTrends.tsx`
- `Leaderboard.tsx`, `TrendCharts.tsx`

## Props (`LeaderboardsTrendsProps`)

**Data:** `members`, `trends`, `currentUserId`, optional defaults

**Callbacks:** `onTimeRangeChange`, `onLeaderboardCategoryChange`, `onMetricChange`

## Files to Reference

- `sections/leaderboards-trends/README.md`
- `sections/leaderboards-trends/tests.md`
- `sample-data.json`

## Done When

- [ ] Public vs authenticated gating matches spec
- [ ] Current user always findable on leaderboard when logged in
- [ ] All charts receive data from your pipeline
- [ ] Mobile stacking acceptable
