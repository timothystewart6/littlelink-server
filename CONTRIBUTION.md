# Contribution Guide

This guide will help you set up a local development environment and give you some tips how to contribute new button configurations to this project.

## Local Development Environment

### Prerequisites

- Node.js 24 or later
- Yarn Classic 1.22.x

### Install dependencies

```bash
yarn install
```

### Start development server

```bash
yarn dev
```

Access the app at http://localhost:3000.

### Type checking

Run `yarn typecheck` to verify TypeScript types before committing:

```bash
yarn typecheck
```

### Run tests

```bash
yarn test
```

### Build for production

```bash
yarn build
yarn start
```

### Lint and format

```bash
yarn lint
```
### File conventions

This project uses TypeScript. The file extension tells you what the file contains:

- `.ts` for code without JSX (server, configuration, utilities)
- `.tsx` for React components and tests that contain JSX

If you use VS Code, set the workspace TypeScript version:

1. Open any `.ts` or `.tsx` file.
2. Click the TypeScript version in the bottom-right status bar.
3. Select **Use Workspace Version** (the one listed next to `node_modules/typescript`).

### Full validation before committing

Run the full validation pipeline to catch issues early:

```bash
yarn typecheck  # Verify TypeScript types
yarn ci         # Lint and unit tests
yarn build      # Production build with server compilation
```
### Docker build

```bash
docker compose up --build
```

Access the container at http://localhost:8080.

## Contributing

### Add new button

1. Choose a meaningful name for the service you are adding. Make sure to use the same name everywhere.
2. Add button class in `public/css/brands.css`. Make sure the background/font color matches the logo.
3. Put the logo as SVG into `src/icons` and import it in `src/components/Home/Home.tsx`.
4. Add component for the button in `src/components/Home/Home.tsx`.
5. Add the environment variable name to `src/config/envNames.ts`.
6. Add the environment with an example value in `docker-compose.yml`.

Afterwards, build the container via Docker (see above) and check if the button is displayed correctly.
