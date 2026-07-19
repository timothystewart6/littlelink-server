import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  workers: 1,
  expect: {
    timeout: 10000,
  },
  webServer: {
    command: 'node server.js',
    port: 3000,
    reuseExistingServer: false,
    timeout: 30000,
    env: {
      NODE_ENV: 'development',
      META_TITLE: 'Techno Tim',
      META_DESCRIPTION:
        'Software Engineer | Gamer | Twitch Streamer | Content Creator on YouTube | Homelab | ' +
        String.fromCodePoint(0x1f1fa, 0x1f1f8) +
        ' ' +
        String.fromCodePoint(0x1f1ef, 0x1f1f5) +
        '  | Full Nerd',
      META_AUTHOR: 'Techno Tim',
      META_KEYWORDS: 'HomeLab, HTML, CSS, Engineering',
      LANG: 'en',
      META_INDEX_STATUS: 'all',
      OG_SITE_NAME: 'Techno Tim',
      OG_TITLE: 'Techno Tim',
      OG_DESCRIPTION: 'The home of Techno Tim',
      OG_URL: 'https://technotim.com',
      OG_IMAGE:
        'https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_400x400.jpg',
      OG_IMAGE_WIDTH: '400',
      OG_IMAGE_HEIGHT: '400',
      GA_TRACKING_ID: 'G-XXXXXXXXXX',
      THEME: 'Dark',
      FAVICON_URL:
        'https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_200x200.jpg',
      AVATAR_URL:
        'https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_200x200.jpg',
      AVATAR_2X_URL:
        'https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_400x400.jpg',
      AVATAR_ALT: 'Techno Tim Profile Pic',
      NAME: 'TechnoTim',
      BIO:
        'Software Engineer | Gamer | Twitch Streamer | Content Creator on YouTube | Homelab | ' +
        String.fromCodePoint(0x1f1fa, 0x1f1f8) +
        ' ' +
        String.fromCodePoint(0x1f1ef, 0x1f1f5) +
        ' | Full Nerd',
      BUTTON_ORDER:
        'YOUTUBE,TWITCH,TWITTER,GITHUB,INSTAGRAM,LINKED_IN,DISCORD,FACEBOOK,TIKTOK,PATREON,GEAR,DOCUMENTATION',
      CUSTOM_BUTTON_TEXT: 'Documentation,Recommended Gear',
      CUSTOM_BUTTON_URL:
        'https://l.technotim.com/docs,https://l.technotim.com/gear',
      CUSTOM_BUTTON_COLOR: '#000000,#000000',
      CUSTOM_BUTTON_TEXT_COLOR: '#ffffff,#ffffff',
      CUSTOM_BUTTON_ALT_TEXT:
        'Tech documentation site for my videos and more,Recommended Gear',
      CUSTOM_BUTTON_NAME: 'DOCUMENTATION,GEAR',
      CUSTOM_BUTTON_ICON: 'fas file-alt,fas fa-cog',
      GITHUB: 'https://l.technotim.com/github',
      TWITTER: 'https://l.technotim.com/twitter',
      INSTAGRAM: 'https://www.instagram.com/techno.tim',
      LINKED_IN: 'https://l.technotim.com/linkedin',
      YOUTUBE: 'https://l.technotim.com/subscribe',
      TWITCH: 'https://l.technotim.com/twitch',
      DISCORD: 'https://l.technotim.com/discord',
      TIKTOK: 'https://l.technotim.com/tiktok',
      FACEBOOK: 'https://l.technotim.com/facebook',
      PATREON: 'https://l.technotim.com/patreon',
      FOOTER: 'Techno Tim ' + String.fromCharCode(169) + ' 2022',
    },
  },
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      testMatch: '**/full-env.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'minimal-env',
      testMatch: '**/minimal-env.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3002',
      },
    },
  ],
});
