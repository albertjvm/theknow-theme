# TheKnow theme

Shared design tokens and self-hosted fonts for TheKnow. This initial package
reflects the existing Toronto and Ontario app styling; it does not apply any
global styles or change an app's appearance by itself.

## Publish and install

Create a GitHub repository for this directory, commit these files, and create
a `v0.1.0` tag at that commit. In each app, install the tagged Git dependency
(replace `OWNER` with the repository owner):

```sh
npm install 'github:OWNER/theknow-theme#v0.1.0'
```

Commit the app's updated `package.json` and lockfile. Netlify must be able to
access the repository; for a private repository, configure appropriate
build-time Git access. Do not commit credentials.

## Use in a Vite app

Import the fonts and tokens before the app stylesheet:

```ts
import "@theknow/theme/fonts.css";
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

The font CSS imports the Fontsource packages declared as dependencies, so a
bundler such as Vite resolves and serves the font files with the app. Existing
direct Fontsource imports can be removed once the theme imports are in place.
The tokens are opt-in: existing app styles must reference them to take effect.
The static landing page needs a build or copy step that resolves these package
imports before it can use the theme.

## Updating

Make and test the theme change, update the package version, and create a new
Git tag. Update each app's dependency to that tag and verify its build and
appearance before deploying. Tags should remain immutable. Keep
jurisdiction-specific styles and chart colours in the apps.
