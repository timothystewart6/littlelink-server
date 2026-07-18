# 🔗 LittleLink-Server

LittleLink is a lightweight DIY alternative to services like [Linktree](https://linktr.ee)
and [many.link](https://many.link/).

Inspired by [littlelink](https://github.com/sethcottle/littlelink).

 ![image](https://user-images.githubusercontent.com/1322205/174909247-2515ab5c-fd39-475d-b5dc-9c0a1ea20d6e.png)

## 👇 What is LittleLink-Server?

LittleLink-Server is based on the great work from [littlelink](https://github.com/sethcottle/littlelink), a lightweight DIY alternative to services like [Linktree](https://linktr.ee) and [many.link](https://many.link/). LittleLink and LittleLink-Server is built using [Skeleton](http://getskeleton.com/), a dead simple, responsive boilerplate \u2014 we just stripped out some additional code you wouldn't need and added in branded styles for popular services. 😊

> **Migration note:** This project has migrated from Razzle to [Next.js](https://nextjs.org/). Container configuration is unchanged. All environment variable names are the same. Variables are read when the container starts and during request rendering, not when the image is built. No container configuration changes are required.

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

# Run tests
yarn test

# Build for production
yarn build

# Start production server
yarn start

# Lint and format checks
CI=true yarn lint
```

### Docker build

```bash
docker build -t littlelink-server .
docker run -p 8080:3000 littlelink-server
```

It takes the same simple approach to a link page and hosts it within a NodeJS server with React, containerized for you to use. Customizing `LittleLink` with `littlelink-server` is as easy as passing in some environment variables. If you need help configuring this, please see this [video](https://youtu.be/42SqfI_AjXU) at explains everything and a live example at [links.technotim.com](https://links.technotim.com/).

> **Migration note:** littlelink-server has migrated from Razzle to [Next.js](https://nextjs.org/). Container configuration is unchanged. All environment variable names are the same. Variables are read when the container starts and during request rendering, not when the image is built. No container configuration change is required.

## ⭐ Features

- Over 60+ brand buttons with more able to be requested
- Customisable Themes
- Analytics Support
- Health Check Support
- A fully customisable docker-compose 

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
      - CUSTOM_BUTTON_ICON=fas file-alt,fas fa-cog
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

Or use a values.yaml files

`helm install littlelink-server k8s-at-home/littlelink-server -f values.yaml`

## 🔧 Configuration

See [docs/analytics.md](docs/analytics.md) for analytics setup instructions and [docs/healthcheck.md](docs/healthcheck.md) for health check configuration.

All environment variable names remain unchanged. Variables are read at request time, so changes take effect after a container restart without rebuilding the image. 
  

