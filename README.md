# TheKnow theme

Shared, opt-in design tokens for TheKnow's monochrome interface. Colour is
reserved for primary actions and meaningful data, such as party affiliations,
vote outcomes, and charts.

## Publish and install

Install the tagged Git dependency in each app:

```sh
npm install 'git+https://github.com/albertjvm/theknow-theme.git#v0.2.0'
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
import "./styles.css";
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

## Updating

Make and test the theme change, update the package version, and create a new
Git tag. Update each app's dependency to that tag and verify its build and
appearance before deploying. Tags should remain immutable. Keep
jurisdiction-specific styles and chart colours in the apps.
