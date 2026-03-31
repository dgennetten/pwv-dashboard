# Activity Dashboard Specification

## Overview
The primary view of PWV Insights. Displays a snapshot of patrol activity across the organization or for a single member, across a user-selected time range. The dashboard leads with four headline KPI cards, followed by a grid of four charts: patrol activity over time, trail coverage, violations by category, and trees cleared by size class (with an all-vs-by-trail breakdown).

## User Flows
- Select a time range preset (Last 7 Days / Last Month / Last 3 Months / Last Year / All Time) to filter all data on the page
- Use the member selector to switch between "All Members" (org-wide aggregate) and "Me" (logged-in member's stats); additional individual members are accessible via a secondary dropdown for admins or coordinators viewing a specific member's data
- View headline KPIs: total patrols, trails covered, trees cleared, and hikers contacted for the selected scope
- Read the patrol activity chart to see how patrols were distributed across days/weeks in the selected period
- Read the trail coverage list to see which trails were patrolled, how many times, and by how many members
- Read the violations by category chart to see the distribution of violation types recorded
- Read the trees cleared chart: view total trees cleared broken down by size class (< 8" through > 36"); toggle between "All trails" and per-trail view to see which trails had the most clearing work

## UI Requirements
- Time range selector: horizontal pill/tab group with 5 presets — Last 7 Days, Last Month, Last 3 Months, Last Year, All Time
- Member selector: a segmented control or toggle with two primary options — "All Members" and "Me" — for fast switching between org-wide and personal views; a secondary "Other member…" option opens a searchable dropdown listing all members for when an admin or coordinator needs to view a specific individual's stats
- Four headline KPI cards in a row: Patrols, Trails Covered, Trees Cleared, Hikers Contacted — each with a large number, label, and comparison to prior period (e.g. "+3 vs prior period")
- Patrol activity chart: bar chart with date on x-axis, patrol count on y-axis; bar granularity adapts to time range (daily for 7d/month, weekly for quarter/year)
- Trail coverage list: sorted table/list showing trail name, geographic area, patrol count, and hiker contact total for the period; sortable columns; highlights trails with zero patrols in the period
- Violations by category: horizontal bar chart showing count per violation type, sorted descending
- Trees cleared chart: grouped or stacked bar chart by size class (< 8", 8–15", 16–23", 24–36", > 36"); a toggle switches between the aggregate view (all trails combined) and a per-trail breakdown
- Responsive: on mobile, stat cards stack 2×2, charts stack vertically

## Auth Modes
- **Public (not logged in):** Shows org-wide aggregate stats only — headline KPIs, patrol activity chart, trail coverage list, violations chart, and trees cleared chart all reflect all-member totals. The member selector is hidden. No personal stats are visible.
- **Logged in:** Adds the member selector (defaults to "Me" — the logged-in member's personal stats). User can toggle between "Me", "All Members", and "Other member…" (admin/coordinator only). Personal stats are the logged-in user's own data.
- Gating UI: The member selector and personal stat views are hidden entirely in the public view (not blurred).

## Configuration
- shell: true
