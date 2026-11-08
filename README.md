# TheKnow theme

Shared, opt-in design tokens and UI primitives for TheKnow's monochrome interface. Colour is
reserved for primary actions and meaningful data, such as party affiliations,
vote outcomes, and charts.

## Publish and install

Install the tagged Git dependency in each app:

```sh
npm install 'git+https://github.com/albertjvm/theknow-theme.git#v0.7.1'
```

Commit the app's updated `package.json` and lockfile. Check the lockfile's
`resolved` URL as npm may record an SSH URL even when HTTPS was requested;
an SSH URL requires build-time Git credentials. Netlify must be able to
access the repository; for a private repository, configure appropriate
build-time Git access. Do not commit credentials.

## Use in a Vite app

Import the tokens before the app stylesheet:

```ts
import "@theknow/theme/tokens.css";
import "@theknow/theme/components.css";
import "./styles.css";
```

For a Vite app, reference the shared favicon in `index.html` so Vite emits it
with the production assets:

```html
<link rel="icon" type="image/svg+xml" href="/node_modules/@theknow/theme/favicon.svg" />
```

Use the tokens in the app's stylesheet:

```css
:root {
  font-family: var(--tk-font-body);
  color: var(--tk-color-text);
  background: var(--tk-color-background);
  line-height: var(--tk-line-height-body);
}

h1, h2, h3 {
  font-family: var(--tk-font-heading);
  color: var(--tk-color-heading);
  line-height: var(--tk-line-height-heading);
}
```

The theme uses system fonts matching the landing page. The legacy `fonts.css`
export remains available for existing consumers, but is not needed for this
design. Tokens are opt-in: app styles must reference them to take effect.

## UI primitives

Municipal civic apps can import `@theknow/theme/civic.css` after `components.css`
for the exact Toronto civic layouts, tables, motion rows, budget, election and
overview styles. This opt-in stylesheet includes page-level defaults and
responsive rules. Make shared presentation changes here rather than copying
the styles into individual apps.

`MotionRow` and `TallyBar` in `@theknow/theme/react` provide the shared vote
row layout while accepting jurisdiction-specific links and labels.
`SortableTable` and `SortHeader` supply Toronto's sortable table presentation.
Columns use explicit numeric or text sort values; missing values sort last.
`TurnoutChart` in `@theknow/theme/charts` is the shared Recharts election
turnout chart, and `YearlyCouncilChart` renders Toronto's year-by-year chart.
`AlignmentHeatmap` provides the voting-alignment matrix. Apps using the charts
must install Recharts 3.

`components.css` supplies opt-in `.card`, `.page-title`, `.tk-header`,
`.tk-header-top`, `.tk-header-links`, `.nav-tabs`,
`.nav-elections`, `.brand`, `.brand-name`, `.brand-region`, `.overview-intro`, `.overview-eyebrow`, `.overview-actions`,
`.overview-action`, `.tk-heading`, and `.tk-link` styles. Import tokens first,
then components, then local styles. Apply `.tk-typography` to an ancestor to
style its h1–h3 headings, or use `.tk-heading` on individual elements.
Existing navigation controls must still
provide their own links, event handling and current-page state (`.active` or
`aria-current="page"` for elections). A navigation link is not an ARIA tab.
Local styles can override layout or supply jurisdiction-specific variants.
Use `.tk-header` on the header container and `.tk-header-top` for its first
row. Use `.nav-tabs` for scrollable tab-style navigation or `.tk-header-links`
for wrapping links. The theme sets spacing, not positioning: apps control
sticky behaviour and the horizontal page gutters.

React consumers can import `Brand`, `Card`, `PageTitle`, `ElectionsLabel`, and
`OverviewIntro` from `@theknow/theme/react`;
they require React 18 or newer. The React peer is optional for CSS-only users.
The `Card` uses a section, an h2 and an optional `.note`, and expects the app
to style `.note` and heading typography. Keep navigation/router-specific and
data-dependent components in the app.

Use `ElectionsLabel` inside the app's election link or button; the shared icon
is decorative and the text provides its accessible name. `OverviewIntro`
renders the overview's eyebrow, h1, description and optional action group.
Pass jurisdiction-specific links or buttons as children with
`overview-action` and optionally `primary` classes; preserve router behaviour.
Use `Brand` with a jurisdiction home link or button as its child, assigning that
child `className="brand-region"` and an accessible name. `Brand` supplies the
separate link to TheKnow's main site; the app retains control of its own routing.

## Updating

Make and test the theme change, update the package version, and create a new
Git tag. Update each app's dependency to that tag and verify its build and
appearance before deploying. Tags should remain immutable. Keep
jurisdiction-specific data and interpretation in the apps.
