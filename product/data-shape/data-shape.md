# Data Shape

## Entities

### Member
A registered PWV volunteer. Has a profile with name, email, and login credentials. Participates in patrol reports and accumulates contribution stats over time. May serve as a patrol leader (report writer) or as a secondary participant on a shared patrol.

### PatrolReport
A submitted patrol record for a specific trail and date. Captures who patrolled, when they started and ended, how far they traveled, how many hikers they contacted, trail conditions observed, and any notable comments. A single report can have multiple member participants. The central fact record from which all stats derive.

### Trail
A named Forest Service trail in the Canyon Lakes Ranger District. Has a trail number, length in miles, difficulty rating, tread/clearing specifications, wilderness status, and travel zone flag. The geography against which all patrol activity is measured.

### Area
One of seven geographic regions within the Canyon Lakes Ranger District: Pawnee Buttes, Big Thompson/Estes Park, Lower Poudre Canyon, Pingree Park, Red Feather Lakes, Upper Poudre Canyon, and Rawah Wilderness. Trails are grouped by area for filtering and regional comparisons.

### TreeDown
A fallen tree recorded during a patrol report. Categorized by diameter at the trail corridor edge (< 8", 8–15", 16–23", 24–36", > 36"). Also captures limbing and brushing in linear feet. Aggregated across reports to compute "trees cleared" stats per trail and per member.

### Violation
A rule violation observed on-trail and recorded in a patrol report. Typed by violation category (e.g., off-leash dog, campfire in restricted zone, camping in non-designated area). Aggregated by type, trail, area, and time range to surface compliance trends.

### ParkingLot
A trailhead parking area associated with one or more trails. During a patrol, vehicle and trailer counts are recorded at both the start and end of the patrol. Vehicle count is a proxy for visitor pressure and is used in the trail patrol efficiency calculation.

### TrailWork
A record of trail maintenance or clearing work performed during a patrol. Typed by work category (brushing, limbing, drainage, sign work, tread repair, weed management, etc.) and measured in quantity or linear feet. Distinguishes routine clearing from formal trail maintenance events.

### Schedule
A planned patrol event — a member or group committed to patrol a specific trail on a specific date. Links to the resulting PatrolReport once submitted. Used to track scheduled vs. completed coverage.

## Activity Dashboard scope (Trail coverage)

**Trail coverage** on the Activity Dashboard is driven by the same **scope** as the rest of the page: **time range** and **member** together. Changing either control refilters which patrols (and thus which trails) count. For example, a logged-in member who selects **Me** and **All Time** sees the full history of **their** patrols across trails — not only a recent window or org-wide totals.

The **trail coverage drill-down** (patrol list for one trail) applies the same two-part scope: the listed patrols are only those that fall in the selected **time range** and involve the selected **member(s)** (org-wide, self only, or another member).

## Relationships

- Member has many PatrolReports (through report_member join)
- PatrolReport belongs to one Trail
- Trail belongs to one Area
- PatrolReport has many TreeDowns
- PatrolReport has many Violations
- PatrolReport has many ParkingLotCounts (one per parking lot visited)
- PatrolReport has many TrailWork entries
- PatrolReport has many Members (multiple volunteers can share one report)
- Schedule belongs to one Trail and has many Members
- Schedule may have one resulting PatrolReport
