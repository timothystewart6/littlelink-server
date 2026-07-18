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

### Run tests

```bash
yarn test
```

### Build for production

```bash
yarn build
yarn start
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
3. Put the logo as SVG into `src/icons` and import it in `src/components/Home/Home.js`.
4. Add component for the button in `src/components/Home/Home.js`.
5. Add the environment variable name to `src/config/envNames.js`.
6. Add the environment with an example value in `docker-compose.yml`.

Afterwards, build the container via Docker (see above) and check if the button is displayed correctly.