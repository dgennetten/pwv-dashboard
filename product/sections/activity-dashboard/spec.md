# Activity Dashboard Specification

## Overview
The primary view of PWV Insights. Displays a snapshot of patrol activity across the organization or for a single member, across a user-selected time range. The dashboard leads with four headline KPI cards, followed by a grid of charts: patrol activity over time, trail coverage, violations by category, and trees cleared by size class (with an all-vs-by-trail breakdown). **Trail coverage drill-down:** selecting a trail row opens an in-section **patrol list** screen (same interaction model as the Trails section’s list → detail), listing individual patrols for that trail **in scope** — the same **time range** and **member(s)** filter as the rest of the dashboard (not all-time / all-members history unless those are the selected filters).

## User Flows
- Select a time range preset (Last 7 Days / Last Month / Last 3 Months / Last Year / All Time) to filter all data on the page
- Use the member selector to switch between "All Members" (org-wide aggregate) and "Me" (logged-in member's stats); additional individual members are accessible via a secondary dropdown for admins or coordinators viewing a specific member's data
- View headline KPIs: total patrols, trails covered, trees cleared, and hikers contacted for the selected scope
- Read the patrol activity chart to see how patrols were distributed across days/weeks in the selected period
- Read the trail coverage list to see which trails were patrolled, how many times, and by how many members — **this list responds to both the time range and the member scope**. Example: with **Me** and **All Time**, a logged-in user sees their complete personal patrol history across trails (every trail they have ever patrolled in the dataset, subject to that scope).
- **Open a trail’s patrol list:** click a row in Trail Coverage (same as clicking a row in the Trails section list) to leave the dashboard layout and show a **detail view** that lists **patrols in scope** — filtered by the **current time range** and **member scope** (All members, Me, or another selected member). Each row is one patrol report (date, member(s), duration, hikers contacted). **Back** returns to the Activity Dashboard.
- Read the violations by category chart to see the distribution of violation types recorded
- Read the trees cleared chart: view total trees cleared broken down by size class (< 8" through > 36"); toggle between "All trails" and per-trail view to see which trails had the most clearing work
- **Members by age** appears only when member scope is **All Members**; it is **not** shown for **Me** or any other single-member scope (a cohort age chart does not apply to one person)

## UI Requirements
- Time range selector: horizontal pill/tab group with 5 presets — Last 7 Days, Last Month, Last 3 Months, Last Year, All Time
- Member selector: a segmented control or toggle with two primary options — "All Members" and "Me" — for fast switching between org-wide and personal views; a secondary "Other member…" option opens a searchable dropdown listing all members for when an admin or coordinator needs to view a specific individual's stats
- Four headline KPI cards in a row: Patrols, Trails Covered, Trees Cleared, Hikers Contacted — each with a large number, label, and comparison to prior period (e.g. "+3 vs prior period")
- Patrol activity chart: bar chart with date on x-axis, patrol count on y-axis; bar granularity adapts to time range (daily for 7d/month, weekly for quarter/year)
- Trail coverage list: sorted table/list showing trail name, geographic area, patrol count, and hiker contact total **for the selected time range and member scope** (same filters as the rest of the dashboard); sortable columns; highlights trails with zero patrols in that scope; **rows are clickable** and navigate to the **trail patrol list** screen
- **Trail patrol list (detail):** full-width view with back control (“Back to Activity Dashboard”), trail header (name, number, length, area, wilderness badge), **scope subtitle** showing both the **time range** and **member scope** (matching the dashboard), optional summary chips, and a **patrols** table or list: date, member (report writer / party), duration, hikers contacted; empty state if no patrols match that combined scope; responsive stacked layout on small screens
- Violations by category: horizontal bar chart showing count per violation type, sorted descending
- Trees cleared chart: grouped or stacked bar chart by size class (< 8", 8–15", 16–23", 24–36", > 36"); a toggle switches between the aggregate view (all trails combined) and a per-trail breakdown
- Members by age: histogram of active vs inactive volunteers by age band — **only shown when member scope is All Members** (org-wide). **Hidden** when viewing a single member, including **Me**; a cross-member age distribution is meaningless for one person.
- Responsive: on mobile, stat cards stack 2×2, charts stack vertically

## Auth Modes
- **Public (not logged in):** Shows org-wide aggregate stats only — headline KPIs, patrol activity chart, trail coverage list, violations chart, and trees cleared chart all reflect all-member totals. The member selector is hidden. No personal stats are visible.
- **Logged in:** Adds the member selector (defaults to "Me" — the logged-in member's personal stats). User can toggle between "Me", "All Members", and "Other member…" (admin/coordinator only). Personal stats are the logged-in user's own data.
- Gating UI: The member selector and personal stat views are hidden entirely in the public view (not blurred).

## Configuration
- shell: true
- **Trail coverage page size:** Org admin setting (default 50). The trail coverage table loads this many rows at a time; after the user scrolls to the bottom of the current batch, a **Load more** control appears if additional rows exist, with copy showing how many trails are shown vs. the full filtered list total.
