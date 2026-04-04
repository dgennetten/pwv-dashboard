# Leaderboards & Trends Specification

## Overview
A single-page section showing gamified contribution rankings alongside long-range trend charts. Leaderboards rank all org members using a **category dropdown** (Days, Work, Trails, Hours; **Work** is the default for new users, and the last-used category + metric persist per browser). Each category exposes its own **metric tabs** to the right (e.g. Days: Patrol, Hike, Stock, Trailwork, Wilderness). Rankings are filterable by time range. Trend charts display org-wide activity patterns over time including patrol volume, violation rates by category, trees cleared by size class, seasonal usage, and year-over-year comparisons.

## User Flows
- Select a time range (week to date, month to date, quarter to date, year to date, all-time) to filter both leaderboards and trend charts simultaneously
- Choose a leaderboard **category** from the dropdown: Days, Work, Trails, or Hours (default **Work** for new users); then switch **metric tabs** beside it (Days → Patrol, Hike, Stock, Trailwork, Wilderness; Work → Contacts, Trees, Brushing, Fire rings, Trash; Trails → Miles, #Trails, Types; Hours → Total, Patrol, Non-patrol). The app **remembers** the last category and metric tab per browser (e.g. `localStorage`) so returning users keep their selection.
- Top 3 ranked members are displayed in a podium treatment (rank 1 center and elevated, ranks 2 and 3 flanking)
- Remaining ranked members appear in a numbered list below the podium
- The logged-in member's rank is always visible — highlighted inline if in the top 3, or pinned as a "You" row below the list if they fall outside it
- Scroll down to trend charts: org-wide patrol activity over time, violation rates by category by month, trees cleared by size class by month, seasonal trail usage by calendar month, and year-over-year comparison of patrol volume

## UI Requirements
- Time range selector at the top of the page: pill/tab group (Week to Date, Month to Date, Quarter to Date, Year to Date, All-Time) — consistent with Activity Dashboard
- Leaderboard controls: **category dropdown** (Days | Work | Trails | Hours) on the left and **metric tabs** for the active category to its right (horizontal scroll on narrow widths). Default category for first-time visitors: **Work** (first tab: Contacts). Persist **category + active metric** in browser storage so returning users resume where they left off. The leaderboard always includes **all contributors** for the selected time range (no secondary filter).
- Toggle control to switch between "All Contributors" and "Active in Range"
- Podium treatment for top 3: rank 1 centered and elevated, ranks 2 and 3 flanking at equal height, each showing member initials/avatar and metric value
- Ranked list below the podium for all other members (rank 4 onward): numbered rows with member initials/avatar, name, and metric value
- Logged-in member row highlighted and/or pinned so they can always find their own rank
- Trend charts below, full width: org-wide patrol activity (bar or line chart), violation rate trend by category (line chart, monthly), trees cleared by size class (stacked bar, monthly), seasonal patrol volume by calendar month (bar chart), year-over-year comparison chart
- Leaderboard is always org-wide — no geographic area filter
- No navigation to individual member profiles
- No data export functionality
- Responsive: all elements stack vertically on mobile

## Auth Modes
- **Public (not logged in):** Shows the Trends tab only — all five trend charts are fully visible. The Leaderboards tab is visible in the UI but its content is blurred with a "Sign in to view" prompt. No member names or rankings are exposed.
- **Logged in:** Full access to both tabs. Leaderboards show real member names and rankings, with the current user's row highlighted and pinned.
- Gating UI: Leaderboard content is blurred/locked with a "Sign in to view" prompt for unauthenticated users.

## Configuration
- shell: true
