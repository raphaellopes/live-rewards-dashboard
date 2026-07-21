# Live Rewards Dashboard

A small React app for browsing rewards, adding them to a cart, and redeeming them against a points balance. Cart and user profile state are managed with Zustand.

Built with **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **Zustand**.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- npm (comes with Node.js)

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Testing

The project uses [Vitest](https://vitest.dev/) for unit and component tests, with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for UI components.

```bash
# Run tests in watch mode
npm test

# Run tests once (CI-friendly)
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

After running coverage, open `coverage/index.html` in your browser for an interactive breakdown of what is tested.

## Scripts

| Command                 | Description                          |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Start the development server         |
| `npm run build`         | Type-check and build for production  |
| `npm run preview`       | Preview the production build locally |
| `npm run lint`          | Run ESLint                           |
| `npm run format`        | Format files with Prettier           |
| `npm run format:check`  | Check formatting without writing     |
| `npm test`              | Run tests in watch mode              |
| `npm run test:run`      | Run tests once                       |
| `npm run test:coverage` | Run tests and generate HTML coverage |
