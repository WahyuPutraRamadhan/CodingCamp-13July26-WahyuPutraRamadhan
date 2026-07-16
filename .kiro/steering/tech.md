# Tech Stack

## Core Technologies

- **HTML5** — Semantic markup, single entry point (`index.html`)
- **CSS3** — Custom properties (CSS variables) for theming, CSS Grid for layout, Flexbox for component alignment
- **Vanilla JavaScript (ES6+)** — No frameworks, no build tools, no package manager

## Notable Patterns

- **CSS Custom Properties** for light/dark theme switching via `data-theme` attribute on `<html>`
- **localStorage** for all client-side persistence (tasks, links, username, theme)
- **`setInterval`** for live clock and focus timer
- **Inline event handlers** (`onclick`, `onchange`, `onblur`) used on dynamically generated DOM elements; handler functions are attached to `window` to make them globally accessible
- **`contenteditable`** for inline editing of task text and username

## No Build System

There is no bundler, transpiler, test runner, or package manager. Files are served directly as static assets.

## Common Commands

Open the project by launching `index.html` directly in a browser, or serve it with any static file server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (npx)
npx serve .
```

No install, build, or compile steps required.
