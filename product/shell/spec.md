# Application Shell Specification

## Overview
PWV Insights uses a persistent sidebar layout. A fixed left sidebar provides navigation to all sections and utility pages. The right content area renders section screens at full height. The sidebar carries the brand identity and user context, keeping the content area free for data-dense visualizations.

## Navigation Structure
- Activity Dashboard → /dashboard (default landing view)
- Trail Health → /trails
- Leaderboards & Trends → /leaderboards
- Admin → /admin (data visualization tools; role-gated)
- Settings → /settings
- Help & About → /help

## User Menu
Located at the bottom of the sidebar. Displays the member's name and a generated avatar (initials-based). Clicking opens a popover with: profile name, email, and logout action.

## Layout Pattern
Fixed sidebar (224px wide) on desktop. On tablet, sidebar collapses to icon-only mode (56px). On mobile, sidebar is hidden and accessible via a hamburger menu that opens a full-height overlay drawer.

## Responsive Behavior
- **Desktop (lg+):** Sidebar fixed at 224px, content area fills remainder
- **Tablet (md):** Sidebar collapses to icon-only rail (56px), tooltips on hover
- **Mobile (< md):** Sidebar hidden; hamburger button in top bar opens sheet overlay

## Design Notes
- Active nav item: emerald-600 background with white text (dark mode); emerald-50 bg with emerald-700 text (light mode)
- Sidebar background: stone-950 (dark) / white (light) with stone-100 border
- Brand mark: mountain silhouette icon in emerald with "PWV Insights" wordmark
- Admin item is visually separated from main nav items with a faint divider
- Settings and Help appear at the bottom of the sidebar, above the user menu
- Two-tier auth: unauthenticated users see a "Sign In" button in place of the user menu
- All navigation items are visible to public users; sections handle their own gating (blurred content + "Sign in to view" prompts)
- Gated content within sections uses a blur overlay with a centered "Sign in to view" prompt — not a redirect to a login page
