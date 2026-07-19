# Contributing

This guide describes how to make focused, reviewable changes to LittleLink-Server. It applies to human contributors and automation agents working in the repository.

## Development Setup

### Prerequisites

- Node.js 24 or later
- Yarn Classic 1.22.x
- Docker, when changing container, Compose, or e2e behavior

### Install Dependencies

```bash
yarn install
```

### Start the Development Server

```bash
yarn dev
```

Open <http://localhost:3000>.

## Common Commands

```bash
# Lint, stylelint, markdownlint, compose env check, typecheck, and unit tests
yarn ci

# Type checking only
yarn typecheck

# Unit tests only
yarn test

# Browser e2e tests
yarn test:e2e

# Docker-backed minimal environment e2e tests
yarn test:e2e:minimal

# Production build
yarn build

# Sync docker-compose.yml with supported runtime env names
yarn compose-env:sync

# Check docker-compose.yml env coverage without writing changes
yarn compose-env:check
```

Run the narrowest useful command while developing, then run `yarn ci` before opening or updating a pull request.

## Workflow

1. Create a branch from `main` for each focused change.
2. Keep unrelated formatting, refactors, dependency changes, and generated files out of the branch.
3. Add or update tests when behavior changes.
4. Update documentation and examples when user-facing behavior, env vars, Docker, or CI behavior changes.
5. Run the relevant validation commands and list them in the pull request.
6. Open a pull request against `main`.

## Guidance for Automation Agents

- Read the nearby implementation and tests before editing.
- Preserve user changes already present in the working tree.
- Prefer small commits and focused pull requests.
- Do not commit `.env` files, secrets, credentials, or unrelated generated output.
- Use `yarn compose-env:sync` after changing `src/config/envNames.ts`.
- Leave enough validation detail in the pull request for a reviewer to reproduce the checks.

## Runtime Environment Variables

Supported runtime environment names are defined in `src/config/envNames.ts`. That file is the source of truth for the application and for the Compose example.

When adding, renaming, or removing an environment variable:

1. Update `src/config/envNames.ts` and keep the list alphabetically sorted.
2. Update code that reads or renders the setting.
3. Add or update unit and e2e coverage when behavior changes.
4. Run `yarn compose-env:sync` so `docker-compose.yml` stays complete and sorted.
5. Run `yarn compose-env:check` or `yarn ci` before opening the pull request.

## Adding a Button

1. Choose a stable, descriptive environment variable name for the service.
2. Add the environment variable name to `src/config/envNames.ts`.
3. Add the button rendering in `src/components/Home/Home.tsx`.
4. Add the icon asset under `src/icons` when the button needs a new local icon.
5. Add or update CSS in `public/css/brands.css` when the button needs custom colors.
6. Run `yarn compose-env:sync` to add the new variable to `docker-compose.yml`.
7. Add or update tests for the new button.
8. Include a screenshot in the pull request when the visual output changes.

## Docker and Compose Changes

- Validate Compose-only changes with `docker compose config`.
- Validate image changes with a local Docker build when practical.
- Run `yarn test:e2e:minimal` when container runtime behavior changes.
- Keep the Docker image focused on Next.js standalone output and production runtime files.

## Pull Request Checklist

Before requesting review, confirm:

- The branch is based on the latest `main`.
- The pull request has a concise summary of what changed and why.
- Relevant tests, lint, type checks, Docker checks, or e2e checks have passed.
- Documentation and examples match the behavior being shipped.
- No secrets or ignored files are included.

## License

By contributing, contributors agree that their changes are provided under the repository's [MIT License](LICENSE.md).
