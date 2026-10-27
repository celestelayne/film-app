# films-list: plan

## Files to add
- `src/features/films/types.ts`: zod schema for `Film` and the inferred `Film` type.
- `src/features/films/data/films.ts`: local starter dataset, parsed with the zod schema at load (also checks unique ids).
- `src/features/films/components/FilmList.tsx`: renders `films` prop as a semantic list, plus the empty state.
- `src/features/films/components/FilmList.test.tsx`: behavior tests for AC-01, 02, 04, 05, 06, 07.
- `src/features/films/data/films.test.ts`: schema accepts the dataset, rejects invalid entries and duplicate ids.
- `src/test/setup.ts`: registers jest-dom matchers and RTL cleanup.

## Files to change
- `package.json` / `package-lock.json`: add dependencies (below). Approved by the user.
- `vite.config.ts`: add a `test` block (`environment: 'jsdom'`, `setupFiles`). Switch the import to `vitest/config` so the `test` key typechecks.
- `src/App.tsx`: replace the token specimen with a thin shell rendering `FilmList` with the dataset. No other slice owns it today; later slices will also edit it (see below).

## Shared-file changes
- `src/App.tsx`: touched here. Later slices (`search-films`, `filter-films`, `sort-films`, `grid-list-toggle`, `select-film`) will also touch it to wire controls and state. Keep it a shell so those edits stay small.
- `package.json`, `package-lock.json`, `vite.config.ts`: test tooling is infrastructure every later slice reuses; no other slice currently touches them.
- `.github/workflows/ci.yml` needs no change (it already runs `npm run test`).
- No change to `src/index.css` or `AGENTS.md`. No other existing slice exists.

## Dependencies (approved)
- `zod` (runtime): data validation at the loading boundary.
- Dev: `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`. `@testing-library/dom` is a peer of RTL and installed with it if required. Chosen as the standard Vitest + React pairing; `user-event` is deliberately omitted because this slice has no interaction. Add it in the first slice that needs it.
- Install exact current versions via `npm install` and confirm `npm run typecheck`, `lint`, `test` and `build` still pass before writing feature code.

## Sequence
0. Install dependencies, add the vitest `test` config and `src/test/setup.ts`; confirm baseline checks still pass.
1. `types.ts` (zod schema + inferred type) and a 3-film `films.ts`.
2. `FilmList` with titles only, wired into `App.tsx`; confirm it runs in the browser.
3. Add metadata rendering, then omit-when-missing handling.
4. Empty state.
5. Expand dataset to the agreed content; add duplicate-id check.
6. Tests.
7. Verify: typecheck, lint, test, browser at 320px and desktop in light and dark, keyboard, and the Done means list.

## Open questions
- Exact installed versions of the new packages (verify compatibility with Vitest 5 and React 19 at install time; report any peer-dependency problems rather than forcing them).
- Whether the `test` block goes in `vite.config.ts` or a separate `vitest.config.ts`. Proposal: `vite.config.ts`, to keep one config.
- Whether `tsc --noEmit` covers `src/**/*.test.tsx` (it does via `tsconfig.app.json` `include: ["src"]`); jest-dom matcher types come from importing `@testing-library/jest-dom/vitest` in the setup file. Confirm this typechecks during step 0.
