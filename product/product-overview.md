# PWV Insights

## Description
A data-rich analytics dashboard for Poudre Wilderness Volunteers (PWV) members. Transforms raw patrol data from the Canyon Lakes Ranger District into intuitive, interactive visualizations — replacing a cumbersome legacy reporting site with a fast, insights-driven experience accessible to all 252 active members.

## Problems & Solutions

### Problem 1: Buried Data, No Big Picture
The current reporting system (clrdvol.org) is a menu-heavy form tool with no visualization or aggregation. Members have no way to see patterns, trends, or the collective impact of their work.
PWV Insights surfaces patrol data as charts, stats, and rankings — turning raw form submissions into meaningful at-a-glance insight.

### Problem 2: Trail Coverage Blind Spots
There's no easy way to know which trails are over- or under-patrolled relative to their actual visitor traffic. Some trails may see dozens of patrols; others may go weeks without coverage despite heavy hiker use.
The Trail Health section computes a patrol efficiency index per trail (patrol count vs. hiker contacts), flagging under-served trails and helping leadership allocate volunteer effort more strategically.

### Problem 3: Volunteer Effort Is Invisible
Individual members have no easy way to review their own patrol history, see how they compare to peers, or track their contribution over time. Recognition and engagement suffer.
PWV Insights provides personal dashboards, contribution stats, and leaderboards that celebrate volunteer effort and encourage continued engagement.

### Problem 4: Sensitive Data Needs Protection
Violation records, member contact information, and detailed patrol notes are not appropriate for public access.
A two-tier access model makes aggregate stats publicly viewable while gating sensitive detail behind email + 6-digit 2FA login.

## Key Features
- Configurable time-range snapshots (last 7 days, month, quarter, year, all-time)
- Switchable between organization-wide view and individual member view
- Headline stats: total patrols, trails covered, trees cleared, hikers contacted, parking lot vehicle counts
- Trail patrol efficiency index: identifies under- and over-patrolled trails relative to hiker volume
- Per-trail health detail: patrol frequency, condition history, violations, trees down, maintenance work
- Leaderboards: most patrols, miles, trees cleared, volunteer hours — with seasonal and all-time rankings
- Trend charts: patrol activity over time, violations by category, seasonal trail usage patterns
- Public summary view (no login required); sensitive detail behind email + 6-digit 2FA
- Supabase backend with snapshot of the live MariaDB volunteer database
