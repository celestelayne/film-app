# films-list: intent

## User job
When I open my watchlist, I want to see the films in my collection so I can scan what is available to watch.

## Entry point
Opening the app at `/`. No controls, no URL state. The film list replaces the token specimen currently rendered by `App.tsx`.

## What success looks like
- Every film in the local dataset is visible on the page, in dataset order, after load and after refresh.
- A film with missing optional metadata renders cleanly, with no broken layout and no placeholder that implies a value.
- An empty dataset shows an explanatory empty state, not a blank screen.

## Out of scope
- Search (`search-films`), genre filter (`filter-films`), sort (`sort-films`).
- Grid/list switching and remembered preference (`grid-list-toggle`).
- Selecting a film or detail view (`select-film`).
- Adding, editing or deleting films. URL query state, browser storage, accounts, servers, external APIs.

## Open questions
- None.

## Decisions
- Presentation is a readable, responsive single-column list, not a grid (decided; grid arrives with `grid-list-toggle`). `AGENTS.md`'s slice table says "responsive grid" for this slice and should be corrected after sign-off; it is not edited here.
