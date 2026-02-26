# SWAPI Explorer (React + TypeScript)

A polished, single-page Star Wars people search experience using SWAPI.

## Live demo

Video: [https://www.loom.com/share/7b391ddddd7f46e9b9715ea721ee94f4/](https://www.loom.com/share/7b391ddddd7f46e9b9715ea721ee94f4/)

App: [https://swapi-exporer.netlify.app/](https://swapi-exporer.netlify.app/)

Storybook: [https://swapi-explorer-storybook.netlify.app/](https://swapi-explorer-storybook.netlify.app/)

## Screenshots

<img width="1512" height="856" alt="Screenshot 2026-02-26 at 21 49 39" src="https://github.com/user-attachments/assets/f42cd1b0-7731-4564-a995-5b72ea692527" />

<img width="1509" height="860" alt="Screenshot 2026-02-26 at 21 49 49" src="https://github.com/user-attachments/assets/470fec47-38e4-4d31-b532-0d1d7dd0162c" />

<img width="1509" height="860" alt="Screenshot 2026-02-26 at 21 49 58" src="https://github.com/user-attachments/assets/c3d3afa4-dc5d-432a-bd4c-7e2ce9bedd3f" />

## What this solves

- Autosuggest starts when typing **2+ characters**.
- Suggestions come from `https://swapi.dev/api/people/?search=xxxx`.
- Selecting a suggestion renders a clean result card with key character details.
- Includes dark mode, Lottie empty state, skeleton loaders, and motion.
- Uses custom hooks and performance-focused patterns.

## Tech stack

- **React 18 + TypeScript + Vite**
- **React Router** (single route page)
- **TanStack Query** for remote data
- **React Hook Form + Zod** for form validation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Window** for optional suggestion virtualization
- **Jest + React Testing Library** for unit tests
- **Playwright** for E2E tests
- **ESLint + Prettier** for code quality

## Thought process

1. **Separate responsibilities**
   - Search input behavior and validation in `SearchInput`.
   - Result rendering in `ResultCard`.
   - Suggestion rendering in `SuggestionsDropdown`.
   - Data fetching isolated in `useSwapiPeopleSearch`.

2. **Keep request load low**
   - Debounced query with `useDebouncedValue`.
   - Query only runs at 2+ characters.
   - Query caching via TanStack Query.

3. **UX quality**
   - Animated empty state with Lottie when no query is typed.
   - Skeletons while loading.
   - Smooth transitions and polished light/dark visuals.

4. **Performance touches**
   - `memo`, `useMemo`, and `useCallback` used on frequently re-rendered UI.
   - `React.lazy` + `Suspense` route loading.
   - Virtualized dropdown path for larger result sets.

## Project structure

```txt
.storybook/
  main.ts
  preview.ts
src/
  api/
    swapi.ts
  components/
    EmptyState.tsx
    EmptyState.stories.tsx
    ResultCard.tsx
    ResultCard.stories.tsx
    SearchInput.tsx
    SearchInput.stories.tsx
    SuggestionsDropdown.tsx
    SuggestionsDropdown.stories.tsx
    ThemeToggle.tsx
    ThemeToggle.stories.tsx
    skeletons/
  constants/
    lottie.ts
  hooks/
    useDarkMode.ts
    useDebouncedValue.ts
    useSwapiPeopleSearch.ts
  lib/
    queryClient.ts
  pages/
    HomePage.tsx
  schemas/
    searchSchema.ts
  styles/
    index.css
  types/
    swapi.ts
  main.tsx
  router.tsx
```

## Run locally

> Requires Node.js 18+

1. Install dependencies

```bash
pnpm install
```

1. Start development server

```bash
pnpm run dev
```

1. Build production bundle

```bash
pnpm run build
```

1. Preview production build

```bash
pnpm run preview
```

1. Run Storybook

```bash
pnpm run storybook
```

Build Storybook static output:

```bash
pnpm run build-storybook
```

## Tests

### Unit tests

```bash
pnpm test
```

Coverage:

```bash
pnpm run test:coverage
```

### E2E tests (Playwright)

Install Playwright browsers once:

```bash
pnpm run test:e2e:playwright:install
```

Run Playwright E2E:

```bash
pnpm run test:e2e:playwright
```
