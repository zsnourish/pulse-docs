---
title: Dashboard Design
status: draft
---

Guidance for designing Power BI / analytics dashboards across Nourish, covering pre-design questions, layout, visual choice, styling and interaction patterns.

## Overview

### Pre-Design

#### Decide purpose and audience

- In one sentence e.g. "This dashboard helps <role> decide <X> using <Y> metrics."
- List 3 key decisions the page must support e.g. "Shift marketing spend between channels".

#### Define the story of the dashboard

- Pick one main narrative e.g. "Growth is slowing because retention dropped".
- If you cannot summarise the dashboard in one sentence, split it into two pages.

### Standard Layout

Every dashboard page should use this layout, unless explicitly agreed otherwise for the benefit of the end user.

#### Layout 'tiers'

- **Top band**: KPIs (3–5): High‑level metrics with status and trend.
- **Middle band:** Explanations: Breakdowns by time, region, segment.
- **Bottom band**: Diagnostics: Tables or detail views for follow‑up.

#### Rules

- Aim for one screen without vertical or horizontal scroll, especially for overview pages.
- Place filters close to the visuals they control.
- Snap visuals to a simple grid so spacing and alignment stay consistent.

### Data Visualisation & Usage

Use the guidance from this list by default. Anything else will require a review.

#### Use:

- **KPI card:** Single important metric; use on the top band only.
- **Line chart:** Trends over time, up to 3–5 series.
- **Bar chart (horizontal preferred):** Compare categories (e.g., regions, products).
- **Stacked bar / treemap:** Simple part‑to‑whole relationships.
- **Table / matrix:** Detailed exploration in the bottom band only.

#### Avoid:

- Pie charts (except very simple 2–3 slice splits).
- Complex or niche visuals unless there is a clear decision they uniquely support.

### Styling

This section enforces a consistent look and meaning.

#### Colour

- Use our [Primary palette](/foundations/colour/) for key metrics and selected states, not for backgrounds.
- Use our [Neutral palette](/foundations/colour/) for backgrounds, gridlines, and low‑priority data.
- Use our [Semantic palette](/foundations/colour/) for success or error states; always pair with an icon or label.
- Use our [Accent palette](/foundations/colour/) across reports sparingly.

#### Text

- Refer to our [Typography for Power BI](/foundations/typography/).
- Titles must state the question, e.g. "Revenue by region, last 12 months".
- Keep labels short; remove anything that does not help the decision.

#### Iconography

- Refer to our Pulse [Iconography](/foundations/iconography/).

### Interaction & Navigation

Design every page to lead users from 'What?' → 'Why?' → 'What next?'

#### Navigation patterns

- **Overview → detail:** One overview page; separate sub-pages as/if needed.
- **Drill‑through:** From KPI or chart to a filtered detail page (e.g., 'View region detail').
- **Buttons:** Use verb‑first labels like "Investigate churn" or "Open pipeline detail". Refer to our [Button guidelines](/components/button/) for guidance on colour and copy.

#### Interaction rules

- For each top KPI, provide at least one designed path to investigate (drill‑through or linked page).
- Use conditional formatting to highlight exceptions, not every data point.
- Aim for '5‑second clarity': users should know if things are on or off track almost immediately.

When **reviewing a dashboard:** 1) Check: top = KPIs, middle = explanations, bottom = diagnostics, 2) Check colour: Pulse colours and alerts used intentionally, not everywhere, 3) Confirm drill‑through or clear navigation exists for each main KPI. Adjust any visual that does not support the defined decisions.

## Principles

### Purpose & Principles

Our dashboards exist to drive decisions and empower the end user. Each screen must help a clearly defined audience understand where to look, what is happening, and what to do next within a few seconds.

#### Design principles

- Audience‑first: Start from user roles and decisions, not from available datasets.
- Every page has a single narrative users can summarise in one sentence.
- Default to removing, not adding, visuals. Anything that does not support a decision is a candidate for removal.

#### Governance & QA

- Apply consistent naming for pages, measures, and filters so users can move between dashboards without relearning the language.
- Schedule lightweight, recurring reviews (e.g., quarterly) for active dashboards, to:
  - Refine patterns and update templates based on what actually works in practice.
  - Collect feedback from key users on clarity and decision‑support, and prioritise changes that reduce time‑to‑insight.
  - Deprecate unused pages and align older work with current standards.

For **each new dashboard**, write a one‑sentence purpose and three key decisions it must support; if a visual does not support these, do not include it. Use the "Context → Insight → Action" framing when designing pages: baseline context, key change, and explicit next steps.

## Layout

### Layout & Hierarchy

Dashboards should follow the user's natural F‑pattern reading behaviour: critical information appears first and in predictable locations.

#### Hierarchy

- **Top band:** 3–5 primary KPIs with trend and status (e.g., target vs actual).
- **Middle band:** Core breakdowns (by time, segment, region) that explain movement in those KPIs.
- **Bottom band:** Diagnostic tables and detailed lists for follow‑up.

#### Layout Guidelines

- Executive/summary pages: one screen, no scroll (whenever technically feasible).
- Align visuals to an underlying grid (e.g., 12‑column) to keep spacing and alignment consistent across dashboards.
- Keep interactive filters near the visuals they control and avoid scattering slicers across the page.

Lock in a **standard 'overview' layout template** and reuse it for all top‑level dashboards. When adding a new visual, decide: is this top (KPI), middle (explanation), or bottom (diagnostics)? Place accordingly or remove.

## Visuals

### Visual Components & Usage

Each component in the design system should have a clear default usage and anti‑usage so designers and analysts make consistent choices.

#### Core components

- **KPI card:** For single, high‑priority metrics; pair with a small sparkline (a small word-sized chart that fits inside a single spreadsheet cell to visually represent data trends) for recent trend.
- **Line chart:** For time series with up to 3–5 series; prefer direct labels over legends where possible.
- **Bar chart (horizontal preferred):** For comparisons between categories; better readability and label handling.
- **Stacked bars/treemap:** For part‑to‑whole; avoid pies except very simple splits.
- **Table/matrix:** For detailed investigation only, not for the top band.

#### Guidelines

- Default to common, easily understood charts. Exotic visuals require a specific justification tied to a decision.
- Limit the number of distinct visuals per page to keep cognitive load low (e.g., 3–6 well‑chosen visuals).
- Use conditional formatting for exceptions and variance, not for every data point.

Define standard variants (e.g., 'Primary KPI card', 'Secondary KPI card', 'Exception table') with pre‑set formatting. Create a short 'allowed visual types' list with examples; anything outside this list requires design review.

## Styling

### Theme, Colour & Typography

Visual identity must be consistent and purposeful: colours and typography communicate meaning and hierarchy, not decoration.

#### Colour

- **Primary brand colour:** Use our [Primary palette](/foundations/colour/) for key metrics and selected states, not for backgrounds. For a small set of high‑importance metrics or selected states only.
- **Neutral palette:** Use our [Neutral palette](/foundations/colour/) for backgrounds, gridlines, and low‑priority data to keep focus on signals.
- **Alert colours:** Use our [Semantic palette](/foundations/colour/) for success or error states. Red for negative variance, green for positive; supplement with icons or labels for accessibility.
- Use our [Accent palette](/foundations/colour/) across reports sparingly, including for category colours (ideally a limited set, maximum 6, for segment distinctions), reused consistently across all dashboards.

#### Typography

- Refer to our [Typography for Power BI](/foundations/typography/).
- One primary font plus one secondary weight/style; no more than two sizes per visual (title and values).
- Use concise titles that state the question ("Revenue by region, last 12 months"), not just the metric name.
- Keep labels short; remove anything that does not help the decision.

#### Iconography

- Refer to our Pulse [Iconography](/foundations/iconography/). It may be easier to pull icons from the Phosphor, though please ensure selected icon usage aligns with Pulse. If not in Pulse, please reach out.

Maintain a **single Power BI theme JSON** that encodes brand colours, fonts, and default visual styles; all reports must use it.

## Interactions

### Interactions & Navigation

Interactive behaviour should guide users from high‑level signals to explanations and then to actions, without forcing them to understand the data model.

#### Navigation patterns

Design every page to lead users from 'What?' → 'Why?' → 'What next?'

- **Overview → detail:** One overview page that links to focused detail pages per domain (e.g., Sales, Ops, Retention) as/if needed.
- **Drill‑through:** Right‑click or button‑based navigation from KPI or chart to a filtered detail page (e.g., 'View region detail').
- **Buttons:** Use verb‑first labels like "Investigate churn" or "Open pipeline detail" for buttons and navigation items. Refer to our [Button guidelines](/components/button/) for guidance on colour and copy.

#### Interaction rules

- For each top KPI, provide at least one designed path to investigate (drill‑through or linked page).
- Use conditional formatting to highlight exceptions, not every data point.
- Aim for '5‑second clarity': users should know if things are on or off track almost immediately.

#### Decision‑support patterns

- **Five‑second rule:** A user should understand if things are on or off track within five seconds of landing on the page.
- **Context → Insight → Action:** Each page should show current state, explain what changed, and hint at what to do.
- **Exception‑first:** Use filters and conditional formatting to highlight outliers and problem areas rather than listing everything equally.

For every major KPI, provide at least one path to drill deeper (e.g., dedicated drill‑through page) instead of expecting ad‑hoc exploration. Consider a "How to use this dashboard" guide which is tucked away for key dashboards; remove once behaviour is consistent and intuitive.
