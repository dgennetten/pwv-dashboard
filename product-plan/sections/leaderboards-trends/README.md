# Leaderboards & Trends

## Overview

Single page: **leaderboards** (six metrics, podium + ranked list) and **org-wide trend charts** (patrol activity, violations, trees by size, seasonal, year-over-year).

## User Flows

- Change time range (applies to boards + trends)
- Switch metric tab; toggle all contributors vs active in range
- Scroll to trend charts

## Auth

- **Public:** **Trends** fully visible; **Leaderboards** tab content **blurred** (no names/ranks)
- **Logged in:** Full leaderboards; highlight/pin `currentUserId`

## Components

| File | Role |
|------|------|
| `LeaderboardsTrends.tsx` | Tabs, filters, layout |
| `Leaderboard.tsx` | Podium + list |
| `TrendCharts.tsx` | Chart grid |

## Callback props

| Callback | When |
|----------|------|
| `onTimeRangeChange` | Time preset changes |
| `onMetricChange` | Leaderboard metric tab changes |
| `onContributorFilterChange` | All vs active in range |

## Data

See `types.ts` and `sample-data.json`.
