# Test Specs: Trails (Trail Health)

## List

- [ ] Filters: area dropdown, difficulty, wilderness toggle, under-patrolled toggle filter rows correctly
- [ ] Sort by efficiency score and patrol count / last patrol updates order
- [ ] Clicking a row calls `onSelectTrail` with trail `id`
- [ ] Under-patrolled badge or highlight visible for rows with `underPatrolled: true`

## Detail — public (`isAuthenticated: false`)

- [ ] Trail header shows name, number, length, area, difficulty, wilderness
- [ ] Violations block shows blur/overlay and **Sign in to view** (or equivalent) messaging
- [ ] Patrol history notes area gated same as violations
- [ ] Clicking sign-in CTA invokes `onSignInPrompt` when wired

## Detail — authenticated (`isAuthenticated: true`)

- [ ] Violations by category visible with counts
- [ ] Patrol history entries show member, date, hikers, duration
- [ ] Trees down/cleared sections show size-class breakdowns
- [ ] Maintenance table lists work type, quantity, unit, notes

## Navigation

- [ ] Back control calls `onBackToList` and returns to list context

## Edge cases

- [ ] Trail with empty `patrolHistory` still renders
- [ ] Very long trail names truncate or wrap without breaking layout
