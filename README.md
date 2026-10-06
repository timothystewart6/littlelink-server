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

## 🧬 DNA helix layout

An optional layout that renders your links as the base pairs of a scrolling
DNA double helix instead of a vertical list. It is off by default; set
`LAYOUT=dna` to turn it on and `LAYOUT=list` (or leave it unset) to keep the
original page.

```yaml
environment:
  - LAYOUT=dna
  - HELIX_STYLE=bio      # bio | chroma | clinical
  - HELIX_TURNS=2        # whole turns across the full list
  - HELIX_RADIUS=172     # helix radius in pixels
  - HELIX_RISE=90        # vertical gap between base pairs, in pixels
  - HELIX_DRIFT=true     # turn slowly while the pointer is away
  - HELIX_PARTICLES=subtle  # off | subtle | rich
  - HELIX_CONTROLS=false    # true adds a gear button with live scene controls
```

The strand is driven by the wheel, a drag, a swipe, or the arrow keys, and it
loops endlessly in both directions: run off the end of your list and you come
straight back into the start of it.

A full write-up — the screw motion, why the loop has no seam, how it keeps every
link a real anchor, and the configuration reference — is in
[docs/dna-helix.md](docs/dna-helix.md).

| Variable | Default | Notes |
| --- | --- | --- |
| `LAYOUT` | `list` | `dna` enables the helix. Any other value keeps the stock list. |
| `HELIX_STYLE` | `bio` | `bio` tints each button as lit glass over a cyan strand, `chroma` keeps full brand colours against a violet strand, `clinical` is a monochrome treatment with brand colour on hover. |
| `HELIX_TURNS` | `2` | Whole turns of the helix across the whole list, 1-6. **Must be a whole number**: the list wraps by shifting a button one full list-length along the strand, so the twist across that shift has to be a whole number of revolutions or the loop would visibly jump. |
| `HELIX_RADIUS` | `172` | 90-320. Reduced automatically to fit narrow viewports. |
| `HELIX_RISE` | `90` | 50-190. Scaled automatically on short viewports. |
| `HELIX_DRIFT` | `true` | Set `false` to hold the strand still until it is scrolled. Drift is also suppressed while the pointer is over the page and whenever the visitor prefers reduced motion. |
| `HELIX_PARTICLES` | `subtle` | Orbiting motes, travelling signal pulses along the backbone, and synapse arcs between motes that drift close together. `rich` roughly doubles the population. Motion is suppressed for visitors who prefer reduced motion. |
| `HELIX_CONTROLS` | `false` | `true` adds a gear button that opens a small panel letting visitors change the render style, particle density, twist, radius, rise and drift. Nothing is persisted, so a reload returns every setting to the configured values. |

Every button stays an ordinary anchor in the document, so links remain
crawlable, keyboard-navigable and right-click-copyable. Only the backbone and
the background are drawn to canvas. Buttons keep the brand colours they
already had; the helix reads them at runtime rather than requiring any button
definition to know about the layout.

The helix commits to a dark scene whatever `THEME` is set to, because the
strands are lit objects in a dark field.

## 👤 Long-form bio

Set `BIO_LONG` and the avatar becomes a button that opens a profile panel.
Leave it unset and the avatar stays a plain image, exactly as before. This
works in both layouts.

```yaml
environment:
  - BIO_TAGS=Systems Engineer,Speaker,Photographer
  - BIO_LONG=|
      The first paragraph is shown as a lede.

      Separate paragraphs with a blank line. Soft-wrapped lines inside a
      paragraph are joined back together.
```

`\n\n` is accepted in place of real blank lines, which is easier to write on a
single line in a `.env` file. When `LINKED_IN` is set, the panel closes with a
link to it.

## 🔧 Configuration

See [docs/analytics.md](docs/analytics.md) for analytics setup instructions, [docs/healthcheck.md](docs/healthcheck.md) for health check configuration, and [docs/dna-helix.md](docs/dna-helix.md) for a full write-up of the DNA helix layout — how the motion works, how it plugs into this project, and the configuration reference.

Environment variables are read at request time, so changes take effect after a container restart without rebuilding the image.


