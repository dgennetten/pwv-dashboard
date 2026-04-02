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
- Row click → detail; back to list
- **Public:** violations + detailed patrol notes **blurred** with “Sign in to view”; `onSignInPrompt` for CTA
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
