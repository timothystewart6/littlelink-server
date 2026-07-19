# 🔗 LittleLink-Server

LittleLink-Server is a lightweight, self-hosted link page for publishing a profile, avatar, social links, custom buttons, metadata, analytics, and health checks from environment variables.

It is inspired by [LittleLink](https://github.com/sethcottle/littlelink) and built with [Next.js](https://nextjs.org/), React, and TypeScript. The container image uses Next.js standalone output so the production runtime stays small and only includes the files needed to serve the app.

 ![image](https://user-images.githubusercontent.com/1322205/174909247-2515ab5c-fd39-475d-b5dc-9c0a1ea20d6e.png)

## 👇 What is LittleLink-Server?

LittleLink-Server takes the same simple approach as LittleLink and packages it as a configurable Node.js application. Pass environment variables to control page metadata, theme, profile content, social links, custom buttons, analytics providers, and health check behavior.

Configuration is evaluated at request time. Rebuilds are not required when environment values change, but containers should be restarted so the running process receives the new values.

## Developer Setup

### Prerequisites

- Node.js 24 or later
- Yarn Classic 1.22.x

### Commands

```bash
# Install dependencies
yarn install

# Start development server with hot reload
yarn dev

# Run type checking
yarn typecheck

# Run tests
yarn test

# Run lint, style, markdown, type, and unit test checks
yarn ci

# Build for production
yarn build

# Start production server
yarn start

# Run Playwright e2e tests
yarn test:e2e
```

### File conventions

This project uses TypeScript. The file extension tells you what the file contains:

- `.ts` for code without JSX (server, configuration, utilities)
- `.tsx` for React components and tests that contain JSX

If you use VS Code, set the workspace TypeScript version:

1. Open any `.ts` or `.tsx` file.
2. Click the TypeScript version in the bottom-right status bar.
3. Select **Use Workspace Version** (the one listed next to `node_modules/typescript`).

For contribution workflow, validation, and button guidance, see [CONTRIBUTING.md](CONTRIBUTING.md).

### Runtime configuration

Environment values are always strings and are read at **request time**, not at build time. No `NEXT_PUBLIC_` prefix or `env` block is needed. Changes take effect after a container restart without rebuilding the image.

### Sitemap

LittleLink-Server exposes `/sitemap.xml` when `OG_URL` is configured and `META_INDEX_STATUS` allows indexing. The sitemap contains the single public profile URL and is generated at request time from environment variables.

```bash
OG_URL=https://links.example.com
META_INDEX_STATUS=all
```

If `OG_URL` is not set, or `META_INDEX_STATUS` contains `noindex`, `/sitemap.xml` returns `404`.

### Robots

LittleLink-Server generates `/robots.txt` at request time. By default, `META_INDEX_STATUS=all` allows crawling and adds a sitemap link when `OG_URL` is configured. Missing or `noindex` metadata disallows crawling.

```bash
META_INDEX_STATUS=all
OG_URL=https://links.example.com
```

Use `ROBOTS_ADDITIONAL_RULES` to append crawler-specific rules. Escaped `\n` sequences are converted to new lines, which works well in container environment variables.

```bash
ROBOTS_ADDITIONAL_RULES=User-agent: GPTBot\nDisallow: /\n\nUser-agent: Googlebot\nDisallow: /
```

Use `ROBOTS_TXT` when you need to replace the generated file entirely.

```bash
ROBOTS_TXT=User-agent: *\nDisallow: /private
```

### Docker build

```bash
docker build -t littlelink-server .
docker run -p 8080:3000 littlelink-server
```

## Contributing

For local setup, validation, pull requests, and button contribution guidance, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

LittleLink-Server is licensed under the [MIT License](LICENSE.md).

Customizing LittleLink-Server is as easy as passing in environment variables. For a walkthrough, see this [video](https://youtu.be/42SqfI_AjXU), or view a live example at [links.technotim.com](https://links.technotim.com/).

## ⭐ Features

- Over 60+ brand buttons with more able to be requested
- Customisable themes
- Analytics Support
- Health Check Support
- A fully customisable Docker Compose setup

## 🚀 Getting Started

Check the [docker-compose.yml](/docker-compose.yml) file for all supported buttons and configuration!

The example below will generate a site exactly like <https://links.technotim.com>

### Using Docker-Compose

```yml
version: "3.0"
services:
  littlelink-server:
    image: ghcr.io/timothystewart6/littlelink-server:latest
    # dockerhub is also supported timothystewart6/littlelink-server
    # image: timothystewart6/littlelink-server:latest
    container_name: littlelink-server
    environment:
      - META_TITLE=Techno Tim
      - META_DESCRIPTION=Software Engineer | Gamer | Twitch Streamer | Content Creator on YouTube | Homelab | 🇺🇸 🇯🇵  | Full Nerd
      - META_AUTHOR=Techno Tim
      - META_KEYWORDS=HomeLab, HTML, CSS, Engineering
      - LANG=en
      - META_INDEX_STATUS=all
      - OG_SITE_NAME=Techno Tim
      - OG_TITLE=Techno Tim
      - OG_DESCRIPTION=The home of Techno Tim
      - OG_URL=https://technotim.com
      - OG_IMAGE=https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_400x400.jpg
      - OG_IMAGE_WIDTH=400
      - OG_IMAGE_HEIGHT=400
      - GA_TRACKING_ID=G-XXXXXXXXXX
      - THEME=Dark
      - FAVICON_URL=https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_200x200.jpg
      - AVATAR_URL=https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_200x200.jpg
      - AVATAR_2X_URL=https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_400x400.jpg
      - AVATAR_ALT=Techno Tim Profile Pic
      - NAME=TechnoTim
      - BIO=Software Engineer | Gamer | Twitch Streamer | Content Creator on YouTube | Homelab | 🇺🇸 🇯🇵 | Full Nerd
      # use ENV variable names for order, listed buttons will be boosted to the top
      - BUTTON_ORDER=YOUTUBE,TWITCH,TWITTER,GITHUB,INSTAGRAM,LINKED_IN,DISCORD,FACEBOOK,TIKTOK,PATREON,GEAR,DOCUMENTATION
      # you can render an unlimited amount of custom buttons by adding
      # the CUSTOM_BUTTON_* variables and by using a comma as a separator.
      - CUSTOM_BUTTON_TEXT=Documentation,Recommended Gear
      - CUSTOM_BUTTON_URL=https://l.technotim.com/docs,https://l.technotim.com/gear
      - CUSTOM_BUTTON_COLOR=#000000,#000000
      - CUSTOM_BUTTON_TEXT_COLOR=#ffffff,#ffffff
      - CUSTOM_BUTTON_ALT_TEXT=Tech documentation site for my videos and more,Recommended Gear
      - CUSTOM_BUTTON_NAME=DOCUMENTATION,GEAR
      - CUSTOM_BUTTON_ICON=fas file-lines,fas gear
      - GITHUB=https://l.technotim.com/github
      - TWITTER=https://l.technotim.com/twitter
      - INSTAGRAM=https://l.technotim.com/instagram
      - LINKED_IN=https://l.technotim.com/linkedin
      - YOUTUBE=https://l.technotim.com/subscribe
      - TWITCH=https://l.technotim.com/twitch
      - DISCORD=https://l.technotim.com/discord
      - TIKTOK=https://l.technotim.com/tiktok
      - FACEBOOK=https://l.technotim.com/facebook
      - PATREON=https://l.technotim.com/patreon
      - FOOTER=Techno Tim © 2022
    ports:
      - 8080:3000
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
```

### Using Docker

```bash
docker run -d \
  --name=littlelink-server \
  -p 8080:3000 \
  -e META_TITLE='Techno Tim' \
  -e META_DESCRIPTION='Techno Tim Link page' \
  -e META_AUTHOR='Techno Tim' \
  -e META_KEYWORDS='HomeLab, HTML, CSS, Engineering' \
  -e LANG=en \
  -e META_INDEX_STATUS='noindex' \
  -e THEME='Dark' \
  -e FAVICON_URL='https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_200x200.jpg' \
  -e AVATAR_URL='https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_200x200.jpg' \
  -e AVATAR_2X_URL='https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_400x400.jpg' \
  -e AVATAR_ALT='Techno Tim Profile Pic' \
  -e NAME='TechnoTim' \
  -e BIO='Software Engineer | Gamer | Twitch Streamer | Content Creator on YouTube | Homelab | 🇺🇸 🇯🇵 | Full Nerd' \
  -e GITHUB='https://l.technotim.com/github' \
  -e TWITTER='https://l.technotim.com/twitter' \
  -e INSTAGRAM='https://www.instagram.com/techno.tim' \
  -e LINKED_IN='https://l.technotim.com/linkedin' \
  -e YOUTUBE='https://l.technotim.com/subscribe' \
  -e TWITCH='https://l.technotim.com/twitch' \
  -e DISCORD='https://l.technotim.com/discord' \
  -e TIKTOK='https://l.technotim.com/discord' \
  -e KIT='https://l.technotim.com/gear' \
  -e FOOTER=Techno Tim © 2022 \
  --restart unless-stopped \
  ghcr.io/timothystewart6/littlelink-server:latest
```

### Using Kubernetes

[Unofficial helm chart provided by k8s-at-home](https://github.com/k8s-at-home/charts/tree/master/charts/stable/littlelink-server)

```bash
helm repo add k8s-at-home https://k8s-at-home.com/charts/
helm repo update
helm install littlelink-server \
  --set env.TZ="America/New York" \
  --set env.META_TITLE="TechnoTim"
    k8s-at-home/littlelink-server
```

Or use a values.yaml file:

`helm install littlelink-server k8s-at-home/littlelink-server -f values.yaml`

## 🔧 Configuration

See [docs/analytics.md](docs/analytics.md) for analytics setup instructions and [docs/healthcheck.md](docs/healthcheck.md) for health check configuration.

Environment variables are read at request time, so changes take effect after a container restart without rebuilding the image.


