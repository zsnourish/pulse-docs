---
title: Component coverage audit
status: draft
---

Cross-referenced Figma's "Pulse Components" library file (published components only, via the Figma API — Scratch Pad, Archived, and Deprecated pages excluded), Storybook's real build manifest (`index.json`, 220 story entries / 38 component titles), and the Supernova documentation just migrated into the new docs site (31 pages).

## Executive summary

Figma is furthest ahead — it has design coverage for roughly 30 component families. Storybook (real built code) covers 38 component titles but several don't match anything in Figma or docs by name, suggesting either naming drift or genuinely undocumented builds. The new docs site now has 20 component pages migrated from Supernova, but Supernova itself was already behind Figma — several components designed and built have no usage guidance written anywhere. Net: the gap isn't "docs behind design," it's "docs behind both design and dev," and a few components exist in dev with no matching design page name at all, which is worth a direct conversation with the team rather than assuming it's just a naming mismatch.

## Coverage matrix

| Component / pattern | In Figma? | In Storybook (built)? | In Docs (migrated)? | Note |
|---|---|---|---|---|
| Buttons (Primary/Secondary/Destructive) | Yes | Yes — `Button/Button` | Yes | Fully covered |
| Chips | Yes | Yes — `Chip` | Yes | Fully covered |
| Progress Bar | Yes | Yes — `PulseProgressBar` | Yes | Fully covered |
| Cards | Yes | Yes — `Panel/Card` | Yes | Fully covered |
| Photo Gallery | Yes ("Gallery") | Yes — `Media/PulseGallery` | Yes | Fully covered |
| Table | Yes | Yes — `PulseDataTable` | Yes | Fully covered |
| Date Picker | Yes | Yes — `Input/PulseDatePicker` | Yes | Fully covered |
| Number Scale | Yes | Yes — `Input/PulseNumberSelectButton` | Yes | Fully covered |
| Dropdown / Select / Tree Select | Yes | Yes — `PulseSelect`, `PulseTreeSelect` | Yes | Fully covered |
| Text Fields / Text Area | Yes | Yes — `PulseInputText`, `PulseInputTextArea` | Yes | Fully covered |
| Checkboxes | Yes | Yes — `PulseCheckBox`, `PulseCheckboxGroup`, `PulseCompositeCheckbox` | Yes | Fully covered |
| Pagination | Yes | Yes — `Pagination/PulsePaginator` | Yes | Fully covered |
| Tabs | Yes | Yes — `Panel/Tabs` | Yes | Fully covered |
| Panels | Yes | Yes — `Panel/Panel` | Yes | Fully covered |
| Sheets (Bottom + Side) | Yes | Not obviously named in Storybook (check `PulseDrawer`) | Yes | Possible naming drift — "Sheets" in docs/Figma vs `Overlay/PulseDrawer` in code |
| Overflow Bar | Not found as its own Figma page (may sit inside a Navigation page) | Yes — `Pagination/PulseOverflowBar` | Yes | Worth confirming Figma location directly with design |
| Three Dot Menu | Likely "Navigation — Option Menu" in Figma (name mismatch) | Not obviously named (check `PulseMenu`) | Yes | Names don't line up cleanly across all three — flag for the team |
| **Tags** | Yes | Yes — `PulseTag/PulseTag`, `PulseTag/PulseStatusTag` | Yes | Fully covered |
| **Avatars** | Yes | **No match found in Storybook** | Yes | **Gap: designed and documented, not found built** |
| **KPI Cards / KPI Card Group** | Yes | Yes — `PulseKpiCard`, `PulseKpiCardGroup` | **No** | **Gap: designed and built, zero docs** |
| **Rich Text (editor)** | Yes | Yes — `PulseInputRichText` | **No** | **Gap: designed and built, zero docs** |
| **Radio Buttons** | Yes | No clear match | **No** | **Gap: designed only, on both dev and docs** |
| **Password field** | Yes | No clear match (may be bundled in `PulseInputText`) | **No** | **Gap: designed only** — docs site's own Text Inputs overview blurb mentions Password but no page exists |
| **Search field** | Yes | No clear match | **No** | **Gap: designed only** — same story, overview blurb mentions it, no page |
| **Error Summary** | Yes | No clear match | **No** | Gap — worth checking if this is meant to ship |
| **Callout** | Yes | No clear match | No (Note: our docs site has its own unrelated "Do/Don't callout" CMS block — not the same thing, don't conflate) | Gap |
| **Toasts** | Yes | No clear match | **No** | Gap |
| **Tooltip** | Yes | Yes — `Directives/PulseTooltip` | **No** | Gap: designed and built, not documented |
| **File Upload** | Yes, marked *"Not Signed Off"* in Figma | No clear match | No | Correctly excluded — still in progress per Figma's own label |
| **Switch / Toggle** | Yes, marked *"PENDING REVIEW"* in Figma | No clear match | No | Correctly excluded — still in progress |
| **SessionBar** | Yes, marked *"PENDING REVIEW"* in Figma | No clear match | No | Correctly excluded — still in progress |
| **StatusBanner** | Yes, marked *"REQUIRES REDESIGN — DO NOT USE"* in Figma | No clear match | No | Correctly excluded — Figma itself says don't use it |
| **Text Links** | Yes, marked *"(Pending)"* | No clear match | No | Correctly excluded — still pending |
| `PulseConfirmDialog`, `PulseFilters`, `PulseForm`, `PulseIcon`, `PulseLink`, `PulseCentralNavigation`, `PulseDragAndDrop`, `PulseContainerLayout` | **Not matched to any obvious Figma page name** | Yes — built | No | **Reverse gap: built in code, no matching Figma page name found and no docs** — needs a direct check with dev, these may be internal/utility components rather than design-system-level ones |

## Priority gaps, ranked

1. **KPI Cards and Rich Text editor** — fully designed *and* built, zero documentation. Fastest to close: content only, no design or dev work needed.
2. **Avatars** — documented and designed, but no match found in Storybook. Worth confirming with dev whether it's actually built under a different name, or genuinely not yet implemented.
3. **Radio Buttons, Password field, Search field, Error Summary, Toasts, Tooltip** — designed in Figma (Tooltip and possibly others also built), none documented. Password and Search are the two most visible gaps since your own Text Inputs overview page already namechecks them.
4. **Naming drift** (Sheets↔Drawer, Overflow Bar, Three Dot Menu↔Option Menu, and the cluster of `Pulse*` components with no obvious Figma counterpart) — not necessarily missing work, but the three sources don't speak the same names for the same things. Worth a short naming-alignment pass with design + dev rather than assuming anything's actually missing.
5. **Correctly excluded, not gaps**: File Upload, Switch, SessionBar, StatusBanner, Text Links — Figma's own page names already flag these as not signed off, pending review, or explicitly "do not use." Leave these out of docs until design clears them.

## Caveats on this audit

- Figma coverage is based on the flat published-component list from the API, not a manual page-by-page click-through — a handful of name-matching calls above (Sheets/Drawer, Overflow Bar, Three Dot Menu) are best-guess, not confirmed, and are flagged as such rather than stated as fact.
- Storybook coverage is based on its build manifest (`index.json`), which lists every story/doc entry that exists in the deployed build — reliable for "is this built," but doesn't tell us about build *quality* or whether a component is production-ready.
- This only covers the "Pulse Components" Figma file — "Pulse Foundations" (colour, type, iconography etc.) wasn't re-audited since Foundations pages were already fully migrated from Supernova in the prior pass.
