# Project Structure

```
/
├── index.html          # Single entry point — all sections defined here
├── css/
│   ├── style.css       # All styles: variables, layout, components, dark mode, responsive
│   └── js/
│       └── app.js      # All JavaScript: clock, timer, tasks, links, theme toggle
└── README.md
```

## Conventions

- **One HTML file** — all UI lives in `index.html`. No templating or partials.
- **One CSS file** — `style.css` covers everything. CSS custom properties (`--var-name`) are defined in `:root` and overridden in `[data-theme="dark"]`.
- **One JS file** — `app.js` is organized into clearly commented sections using `// --- SECTION NAME ---` banners. Follow this pattern when adding new features.
- **Script tag at bottom of `<body>`** — keep the `<script>` tag as the last element before `</body>`.
- **CSS lives in `css/`, JS lives in `css/js/`** — unconventional but intentional; do not move files without updating the `<link>` and `<script>` references in `index.html`.

## Section Order in app.js

1. DOM element references
2. Clock & greeting
3. Light/dark mode
4. Focus timer
5. To-do list
6. Quick links

New features should be appended after section 6 following the same comment banner style.
