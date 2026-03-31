# Trail Health Specification

## Overview
A per-trail view of patrol coverage and condition data across all trails in the Canyon Lakes Ranger District. Users can browse and filter the full trail list, sort by patrol efficiency score, and drill into individual trail detail pages to review patrol history, tree clearing, violations, and maintenance work.

## User Flows
- Browse the trail list filtered by geographic area, wilderness status, difficulty, and/or the under-patrolled toggle
- Sort the trail list by patrol efficiency score (color-coded badge) or patrol count
- Click a trail row to open its detail view showing patrol history, hiker contacts, trees down/cleared by size class, violations by category, and maintenance work logged
- Use the under-patrolled toggle to quickly surface trails that need more coverage relative to visitor volume
- Navigate back to the trail list from a detail view

## UI Requirements
- Trail list table with columns: trail name, area, difficulty, wilderness status badge, patrol count, patrol frequency, efficiency score (color-coded green/yellow/red badge, sortable), and under-patrolled flag
- Filter bar above the list: geographic area dropdown, difficulty filter, wilderness status toggle, under-patrolled only toggle
- Trail detail view: header with trail name, number, length, area, difficulty, and wilderness status; stat cards for total patrol count and total hikers contacted; patrol history log; trees down and cleared grouped by size class (small/medium/large/XL/XXL); violations by category as a horizontal bar list; maintenance work log table
- Clicking a trail row opens the detail view; a back button returns to the filtered list

## Auth Modes
- **Public (not logged in):** Shows the trail list and basic stats per trail — patrol count, total hiker contacts, and patrol efficiency score. Trail detail view is accessible but violation records and detailed patrol notes are blurred with a "Sign in to view" prompt overlaid on those sections.
- **Logged in:** Full trail detail including violation records by category and detailed patrol history notes.
- Gating UI: Violations section and patrol notes in the detail view are blurred/locked with a "Sign in to view" prompt for unauthenticated users.

## Configuration
- shell: true
