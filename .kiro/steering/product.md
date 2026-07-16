# Product: To-Do List Life Dashboard

A single-page personal productivity dashboard built as a mini coding project for RevoU Coding Camp.

## Features

- **Live Clock & Greeting** — Real-time clock, date display, and time-based greeting (Morning/Afternoon/Evening/Night). The user's name is editable inline and persisted.
- **Focus Timer (Pomodoro)** — 25-minute countdown timer with Start, Stop, and Reset controls.
- **To-Do List** — Add, complete, edit (inline), and delete tasks. Duplicate task names are blocked. State is persisted.
- **Quick Links** — User-defined bookmarks rendered as clickable buttons. Defaults include Google and Gmail. State is persisted.
- **Light / Dark Mode** — Theme toggle persisted to localStorage.

## Data Persistence

All user data (tasks, links, username, theme) is stored in `localStorage` — no backend or server required.
