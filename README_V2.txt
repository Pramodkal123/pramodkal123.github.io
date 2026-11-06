VIGOROUS PROPERTY — ASTRO HOMEPAGE V2 (DROP-IN)

IMPORTANT
This package updates the HOME page and shared design components only.
The other existing routes are retained; secondary pages are still placeholders.
The photos are illustrative concept images, not verified completed projects.
The VP monogram is a temporary representation from the current UI reference;
replace it with the client's approved original logo asset prior to launch.

INSTALL ON YOUR EXISTING WORKING WINDOWS ASTRO PROJECT
1. Stop the Astro server in VS Code with Ctrl+C.
2. Back up your current src and public folders.
3. Copy src and public from this ZIP into the project root.
4. Allow replacement of existing files.
5. DO NOT replace your package.json, node_modules, or Astro configuration.
6. Run npm run dev and open http://localhost:4321/

UPDATE CONTENT
- src/pages/index.astro: homepage copy, card arrays, link destinations
- src/components/Header.astro / Footer.astro: navigation and footer
- src/styles/global.css: palette, responsive styles and transitions
- src/scripts/interactions.js: scroll / pointer / reveal interactions

VISUAL REFERENCE
The supplied V2 screenshot is a concept. This implementation matches its section arrangement,
colors, type direction, navy service cards, project layout and hero composition, but the
existing V1 photographic assets are reused, so it is not a pixel-identical photographic match.

NOTES
- Existing service, project, contact and guide links remain active.
- Project images are illustrative and projects have no live case-study detail URLs yet.
- Service cards currently display four linked service categories; kitchens and bathrooms
  remain mentioned through the services overview link and require confirmed service pages.
- Hero motion, scroll framing, project hover spotlight, reveal animation and mobile nav are included.
- Supports prefers-reduced-motion; effects simplified on touch interfaces.
- The build could not be fully executed in this environment because installing Astro timed out.
  Verify locally with npm run dev and npm run build.
