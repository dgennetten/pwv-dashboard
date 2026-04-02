# PWV Insights — Complete Implementation Instructions

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

## Product summary

See `../product-overview.md` for full product summary, entities, design system, and milestone list.

---

# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`  
> **Prerequisites:** None

---

## About This Handoff

**What you're receiving:** Finished UI designs (React + Tailwind), product requirements, design tokens, sample data shapes, and UI test specs.

**Your job:** Integrate into your app, wire callbacks to routing and auth, replace sample data with real APIs, add loading/error/empty states. Components are props-based.

---

## Goal

Set up **design tokens** and the **application shell** — persistent sidebar, navigation, user menu / Sign In.

## What to Implement

### 1. Design tokens

- `product-plan/design-system/tokens.css` — CSS variables
- `product-plan/design-system/tailwind-colors.md` — emerald / amber / stone
- `product-plan/design-system/fonts.md` — Inter + JetBrains Mono

### 2. Application shell

Copy `product-plan/shell/components/`:

- `AppShell.tsx` — layout wrapper, mobile drawer, `onNavigate` / `onLogout`
- `MainNav.tsx` — Activity Dashboard, Trails, Leaderboards & Trends, Admin, Settings, Help
- `UserMenu.tsx` — authenticated user block + **Sign In** when `user` is undefined

**Wire navigation** to your router (`/dashboard`, `/trails`, `/leaderboards`, `/admin`, `/settings`, `/help`).

**User menu:** pass `user: { name, email?, avatarUrl? }` when logged in; `onLogout` clears session.

## Files to Reference

- `product-plan/shell/README.md`
- `product/shell/spec.md` (in Design OS repo) for responsive and auth notes

## Done When

- [ ] Tokens/fonts applied globally
- [ ] Shell renders with working nav
- [ ] User menu shows Sign In (public) or profile + logout (authenticated)
- [ ] Responsive: desktop sidebar, mobile hamburger + drawer

---

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
- `PatrolActivityChart`, `TrailCoverageList`, `ViolationsChart`, `TreesClearedChart`, `MembersByAgeChart`

## Props (`ActivityDashboardProps`)

**Data:** `scope`, `summary`, `patrolActivity`, `trailCoverage`, `violationsByCategory`, `treesCleared`, `members`, `membersByAge`, optional `currentUserId`

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

---

# Milestone 3: Trails (Trail Health)

> **Provide alongside:** `product-overview.md`  
> **Prerequisites:** Milestones 1–2

---

## About This Handoff

**What you're receiving:** Finished UI designs (React + Tailwind), product requirements, design tokens, sample data shapes, and UI test specs.

**Your job:** Integrate into your app, wire callbacks to routing and auth, replace sample data with real APIs, add loading/error/empty states. Components are props-based.

---

## Goal

**Trail list** with filters, sorting, efficiency badges, and **trail detail** with patrol history, trees, violations, maintenance.

## Key Functionality

- Filter: area, difficulty, wilderness, under-patrolled
- Sort: efficiency score, patrol count, last patrol
- Row click â†’ detail; back to list
- **Public:** violations + detailed patrol notes **blurred** with "Sign in to view"; `onSignInPrompt` for CTA
- **Authenticated:** full detail

## Components

- `TrailHealth.tsx` — list + detail orchestration
- `TrailList.tsx`, `TrailDetail.tsx`

## Props (`TrailHealthProps`)

**Data:** `trails`, `isAuthenticated?`

**Callbacks:** `onSelectTrail`, `onBackToList`, `onSignInPrompt`

## Files to Reference

- `sections/trails/README.md`
- `sections/trails/tests.md`
- `sample-data.json`

## Done When

- [ ] List filters and sort work via state or server
- [ ] Detail gated sections respect `isAuthenticated`
- [ ] Navigation integrates with your router
- [ ] Responsive behavior verified

---

# Milestone 4: Leaderboards & Trends

> **Provide alongside:** `product-overview.md`  
> **Prerequisites:** Milestones 1–3

---

## About This Handoff

**What you're receiving:** Finished UI designs (React + Tailwind), product requirements, design tokens, sample data shapes, and UI test specs.

**Your job:** Integrate into your app, wire callbacks to routing and auth, replace sample data with real APIs, add loading/error/empty states. Components are props-based.

---

## Goal

**Leaderboards** (six metrics, podium + list, highlight current user) and **trend charts** (patrol activity, violations, trees by size, seasonal, YoY).

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

**Callbacks:** `onTimeRangeChange`, `onMetricChange`, `onContributorFilterChange`

## Files to Reference

- `sections/leaderboards-trends/README.md`
- `sections/leaderboards-trends/tests.md`
- `sample-data.json`

## Done When

- [ ] Public vs authenticated gating matches spec
- [ ] Current user always findable on leaderboard when logged in
- [ ] All charts receive data from your pipeline
- [ ] Mobile stacking acceptable
