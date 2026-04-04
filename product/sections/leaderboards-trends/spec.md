# Leaderboards & Trends Specification

## Overview
A single-page section showing gamified contribution rankings alongside long-range trend charts. Leaderboards rank all org members using a **category dropdown** (Days, Work, Trails, Hours; **Work** is the default for new users, and the last-used category + metric persist per browser). Each category exposes its own **metric tabs** to the right (e.g. Days: Patrol, Hike, Stock, Trailwork, Wilderness). Rankings are filterable by time range. Trend charts use a **This Year / Year over Year** control plus four chart types (patrol activity, violations, trees by size, seasonal), with period copy driven by the page time range and that control.

## User Flows
- Select a time range (week to date, month to date, quarter to date, year to date, all-time) to filter both leaderboards and trend charts simultaneously
- Choose a leaderboard **category** from the dropdown: Days, Work, Trails, or Hours (default **Work** for new users); then switch **metric tabs** beside it (Days → Patrol, Hike, Stock, Trailwork, Wilderness; Work → Contacts, Trees, Brushing, Fire rings, Trash; Trails → Miles, #Trails, Types; Hours → Total, Patrol, Non-patrol). The app **remembers** the last category and metric tab per browser (e.g. `localStorage`) so returning users keep their selection.
- Top 3 ranked members are displayed in a podium treatment (rank 1 center and elevated, ranks 2 and 3 flanking)
- Remaining ranked members appear in a numbered list below the podium
- The logged-in member's rank is always visible — highlighted inline if in the top 3, or pinned as a "You" row below the list if they fall outside it
- On the **Trends** tab: pick **This Year** or **Year over Year** from a dropdown (left of the chart-type buttons), then choose one of four chart types — Patrol Activity, Violations, Trees by Size, Seasonal. The dropdown is **disabled (grayed)** when the page time range is **All Time**; in that case only “This Year”–style full-history copy applies. The card shows a **period line** that updates with the time range and dropdown (e.g. YTD vs prior vs current year by month).

## UI Requirements
- Time range selector at the top of the page: pill/tab group (Week to Date, Month to Date, Quarter to Date, Year to Date, All-Time) — consistent with Activity Dashboard
- Leaderboard controls: **category dropdown** (Days | Work | Trails | Hours) on the left and **metric tabs** for the active category to its right (horizontal scroll on narrow widths). Default category for first-time visitors: **Work** (first tab: Contacts). Persist **category + active metric** in browser storage so returning users resume where they left off. The leaderboard always includes **all contributors** for the selected time range (no secondary filter).
- Podium treatment for top 3: rank 1 centered and elevated, ranks 2 and 3 flanking at equal height, each showing member initials/avatar and metric value
- Ranked list below the podium for all other members (rank 4 onward): numbered rows with member initials/avatar, name, and metric value
- Logged-in member row highlighted and/or pinned so they can always find their own rank
- Trend charts below, full width: **year mode** dropdown (**This Year** default, **Year over Year**) to the left of **four** pill buttons (Patrol Activity, Violations, Trees by Size, Seasonal). **This Year** shows the existing single-series or stacked chart for the selection; **Year over Year** shows paired monthly bars (prior vs current year) for that metric. Patrol Activity uses API/sample `yearOverYear` data; other metrics use implementation-supplied paired series. **All Time** grays out the dropdown and fixes interpretation to full-history.
- Leaderboard is always org-wide — no geographic area filter
- No navigation to individual member profiles
- No data export functionality
- Responsive: all elements stack vertically on mobile

## Auth Modes
- **Public (not logged in):** **Trends** is fully available (time range, year mode dropdown, all chart types). **Leaderboards** is **unavailable**: the Leaderboards tab is **disabled** (not selectable), with tooltip *Sign in to view leaderboards* and short helper copy that leaderboards require sign-in. No leaderboard content, names, or rankings are rendered or exposed.
- **Logged in:** Both tabs work; pass `currentUserId` so the leaderboard can highlight/pin the current user.
- Implementation: omit `currentUserId` (or pass empty/whitespace-only) when unauthenticated; provide a real member id when authenticated.

## Configuration
- shell: true
