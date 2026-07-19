import React from 'react';
import type { RuntimeConfig, DropShadow } from '../../config/runtimeConfig';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Share from '../Share/Share';

import Sort from '../Sort/Sort';

export interface HomeProps {
  config: RuntimeConfig;
}

function Home({ config }: HomeProps) {
  let order: string[] = [];
  if (config?.BUTTON_ORDER) {
    order = config.BUTTON_ORDER.split(',').reverse();
  }

  const buttonOrder = (button: string): number => {
    return order.indexOf(button);
  };

  const dropShadow = config?.DROP_SHADOW as DropShadow | undefined;
  const buttonTarget = config?.BUTTON_TARGET;

  const renderCustomButtons = () => {
    const names = config.CUSTOM_BUTTON_NAME?.split(',');
    const urls = config.CUSTOM_BUTTON_URL?.split(',');
    const altTexts = config.CUSTOM_BUTTON_ALT_TEXT?.split(',');
    const texts = config.CUSTOM_BUTTON_TEXT?.split(',');
    const buttonColors = config.CUSTOM_BUTTON_COLOR?.split(',');
    const textColors = config.CUSTOM_BUTTON_TEXT_COLOR?.split(',');
    const icons = config.CUSTOM_BUTTON_ICON?.split(',');
    // have to clean up some of the strings to standardize for analytics

    if (!texts) return null;

    return texts.map((t, i) => {
      // do not try to render button unless it has all of the required props
      return (
        <div key={i} data-order={buttonOrder(names?.[i]?.trim() ?? '')}>
          {names?.[i] &&
            urls?.[i] &&
            texts?.[i] &&
            buttonColors?.[i] &&
            textColors?.[i] &&
            altTexts?.[i] && (
              <Button
                name={names[i]?.trim().toLowerCase()}
                href={urls[i]?.trim()}
                displayName={texts[i]?.trim()}
                styles={{
                  backgroundColor: buttonColors[i]?.trim(),
                  color: textColors[i]?.trim(),
                }}
                alt={altTexts[i]?.trim()}
                icon={icons?.[i]?.trim()}
                buttonTarget={buttonTarget}
                dropShadow={dropShadow}
              />
            )}
        </div>
      );
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="column" style={{ marginTop: '12%' }}>
            <Avatar
              src={config.AVATAR_URL}
              srcSet={config.AVATAR_2X_URL}
              alt={config.AVATAR_ALT}
              avatarSize={config.AVATAR_SIZE}
              dropShadow={dropShadow}
            />
            {config.NAME && <h1>{config.NAME}</h1>}
            {config.BIO && <p>{config.BIO}</p>}
            <Sort>
              {config.CUSTOM_BUTTON_TEXT && renderCustomButtons()}
              {config.YOUTUBE && (
                <Button
                  name="youtube"
                  href={config.YOUTUBE}
                  displayName="YouTube"
                  logo="/icons/youtube.svg"
                  order={buttonOrder('YOUTUBE')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.TWITCH && (
                <Button
                  name="twitch"
                  href={config.TWITCH}
                  displayName="Twitch"
                  logo="/icons/twitch.svg"
                  order={buttonOrder('TWITCH')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.TWITTER && (
                <Button
                  name="twitter"
                  href={config.TWITTER}
                  displayName="Twitter"
                  logo="/icons/twitter.svg"
                  order={buttonOrder('TWITTER')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.INSTAGRAM && (
                <Button
                  name="instagram"
                  href={config.INSTAGRAM}
                  displayName="Instagram"
                  logo="/icons/instagram.svg"
                  order={buttonOrder('INSTAGRAM')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.GITHUB && (
                <Button
                  name="github"
                  href={config.GITHUB}
                  displayName="GitHub"
                  logo="/icons/github.svg"
                  order={buttonOrder('GITHUB')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.DISCORD && (
                <Button
                  name="discord"
                  href={config.DISCORD}
                  displayName="Discord"
                  logo="/icons/discord.svg"
                  order={buttonOrder('DISCORD')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}

              {config.TIKTOK && (
                <Button
                  name="tiktok"
                  href={config.TIKTOK}
                  displayName="TikTok"
                  logo="/icons/tiktok.svg"
                  order={buttonOrder('TIKTOK')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.FACEBOOK && (
                <Button
                  name="facebook"
                  href={config.FACEBOOK}
                  displayName="Facebook"
                  logo="/icons/facebook.svg"
                  order={buttonOrder('FACEBOOK')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.FACEBOOK_MESSENGER && (
                <Button
                  name="facebookmessenger"
                  href={config.FACEBOOK_MESSENGER}
                  displayName="Messenger"
                  logo="/icons/messenger.svg"
                  order={buttonOrder('FACEBOOK_MESSENGER')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.LINKED_IN && (
                <Button
                  name="linkedin"
                  href={config.LINKED_IN}
                  displayName="LinkedIn"
                  logo="/icons/linkedin.svg"
                  order={buttonOrder('LINKED_IN')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.PRODUCT_HUNT && (
                <Button
                  name="producthunt"
                  href={config.PRODUCT_HUNT}
                  displayName="Product Hunt"
                  logo="/icons/producthunt.svg"
                  order={buttonOrder('PRODUCT_HUNT')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.SNAPCHAT && (
                <Button
                  name="snapchat"
                  href={config.SNAPCHAT}
                  displayName="SnapChat"
                  logo="/icons/snapchat.svg"
                  order={buttonOrder('SNAPCHAT')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.SPOTIFY && (
                <Button
                  name="spotify"
                  href={config.SPOTIFY}
                  displayName="Spotify"
                  logo="/icons/spotify.svg"
                  order={buttonOrder('SPOTIFY')}
                  buttonTarget={buttonTarget}
                  dropShadow={dropShadow}
                />
              )}
              {config.REDDIT && (
                <Button
                  name="reddit"
                  href={config.REDDIT}
                  displayName="Reddit"
                  logo="/icons/reddit.svg"
                  order={buttonOrder('REDDIT')}
                />
              )}
              {config.MEDIUM && (
                <Button
                  name="medium"
                  href={config.MEDIUM}
                  displayName="Medium"
                  logo="/icons/medium.svg"
                  order={buttonOrder('MEDIUM')}
                />
              )}
              {config.PINTEREST && (
                <Button
                  name="pinterest"
                  href={config.PINTEREST}
                  displayName="Pinterest"
                  logo="/icons/pinterest.svg"
                  order={buttonOrder('PINTEREST')}
                />
              )}
              {config.EMAIL && (
                <Button
                  name="default"
                  href={`mailto:${config.EMAIL}`}
                  displayName={config.EMAIL_TEXT}
                  logo="/icons/email.svg"
                  order={buttonOrder('EMAIL')}
                />
              )}

              {config.EMAIL_ALT && (
                <Button
                  name="default"
                  href={`mailto:${config.EMAIL_ALT}`}
                  displayName={config.EMAIL_ALT_TEXT}
                  logo="/icons/email_alt.svg"
                  order={buttonOrder('EMAIL_ALT')}
                />
              )}

              {config.SOUND_CLOUD && (
                <Button
                  name="soundcloud"
                  href={config.SOUND_CLOUD}
                  displayName="SoundCloud"
                  logo="/icons/soundcloud.svg"
                  order={buttonOrder('SOUND_CLOUD')}
                />
              )}
              {config.FIGMA && (
                <Button
                  name="figma"
                  href={config.FIGMA}
                  displayName="Figma"
                  logo="/icons/figma.svg"
                  order={buttonOrder('FIGMA')}
                />
              )}

              {config.TELEGRAM && (
                <Button
                  name="telegram"
                  href={config.TELEGRAM}
                  displayName="Telegram"
                  logo="/icons/telegram.svg"
                  order={buttonOrder('TELEGRAM')}
                />
              )}

              {config.TUMBLR && (
                <Button
                  name="tumblr"
                  href={config.TUMBLR}
                  displayName="Tumblr"
                  logo="/icons/tumblr.svg"
                  order={buttonOrder('TUMBLR')}
                />
              )}
              {config.STEAM && (
                <Button
                  name="steam"
                  href={config.STEAM}
                  displayName="Steam"
                  logo="/icons/steam.svg"
                  order={buttonOrder('STEAM')}
                />
              )}

              {config.VIMEO && (
                <Button
                  name="vimeo"
                  href={config.VIMEO}
                  displayName="Vimeo"
                  logo="/icons/vimeo.svg"
                  order={buttonOrder('VIMEO')}
                />
              )}
              {config.WORDPRESS && (
                <Button
                  name="wordpress"
                  href={config.WORDPRESS}
                  displayName="Wordpress"
                  logo="/icons/wordpress.svg"
                  order={buttonOrder('WORDPRESS')}
                />
              )}
              {config.GOODREADS && (
                <Button
                  name="goodreads"
                  href={config.GOODREADS}
                  displayName="Goodreads"
                  logo="/icons/goodreads.svg"
                  order={buttonOrder('GOODREADS')}
                />
              )}
              {config.SKOOB && (
                <Button
                  name="skoob"
                  href={config.SKOOB}
                  displayName="Skoob"
                  logo="/icons/skoob.svg"
                  order={buttonOrder('SKOOB')}
                />
              )}
              {config.LETTERBOXD && (
                <Button
                  name="letterboxd"
                  href={config.LETTERBOXD}
                  displayName="Letterboxd"
                  logo="/icons/letterboxd.svg"
                  order={buttonOrder('LETTERBOXD')}
                />
              )}
              {config.MASTODON && (
                <Button
                  name="mastodon"
                  href={config.MASTODON}
                  rels="me noopener noreferrer"
                  displayName="Mastodon"
                  logo="/icons/mastodon.svg"
                  order={buttonOrder('MASTODON')}
                />
              )}
              {config.MICRO_BLOG && (
                <Button
                  name="microblog"
                  href={config.MICRO_BLOG}
                  displayName="Microblog"
                  logo="/icons/microblog.svg"
                  order={buttonOrder('MICRO_BLOG')}
                />
              )}
              {config.WHATSAPP && (
                <Button
                  name="whatsapp"
                  href={config.WHATSAPP}
                  displayName="WhatsApp"
                  logo="/icons/whatsapp.svg"
                  order={buttonOrder('WHATSAPP')}
                />
              )}
              {config.KIT && (
                <Button
                  name="kit"
                  href={config.KIT}
                  displayName="Kit"
                  logo="/icons/kit.svg"
                  order={buttonOrder('KIT')}
                />
              )}
              {config.STRAVA && (
                <Button
                  name="strava"
                  href={config.STRAVA}
                  displayName="Strava"
                  logo="/icons/strava.svg"
                  order={buttonOrder('STRAVA')}
                />
              )}
              {config.BLUESKY && (
                <Button
                  name="bluesky"
                  href={config.BLUESKY}
                  displayName="BlueSky"
                  logo="/icons/bluesky.svg"
                  order={buttonOrder('BLUESKY')}
                />
              )}
              {config.BUYMEACOFFEE && (
                <Button
                  name="buymeacoffee"
                  href={config.BUYMEACOFFEE}
                  displayName="Buy Me a Coffee"
                  logo="/icons/buymeacoffee.svg"
                  order={buttonOrder('BUYMEACOFFEE')}
                />
              )}
              {config.GITLAB && (
                <Button
                  name="gitlab"
                  href={config.GITLAB}
                  displayName="GitLab"
                  logo="/icons/gitlab.svg"
                  order={buttonOrder('GITLAB')}
                />
              )}
              {config.PATREON && (
                <Button
                  name="patreon"
                  href={config.PATREON}
                  displayName="Patreon"
                  logo="/icons/patreon.svg"
                  order={buttonOrder('PATREON')}
                />
              )}
              {config.DEVTO && (
                <Button
                  name="devto"
                  href={config.DEVTO}
                  displayName="Dev.to"
                  logo="/icons/devto.svg"
                  order={buttonOrder('DEVTO')}
                />
              )}
              {config.PAYPAL && (
                <Button
                  name="paypal"
                  href={config.PAYPAL}
                  displayName="Paypal"
                  logo="/icons/paypal.svg"
                  order={buttonOrder('PAYPAL')}
                />
              )}
              {config.SLACK && (
                <Button
                  name="slack"
                  href={config.SLACK}
                  displayName="Slack"
                  logo="/icons/slack.svg"
                  order={buttonOrder('SLACK')}
                />
              )}
              {config.STACKOVERFLOW && (
                <Button
                  name="stackoverflow"
                  href={config.STACKOVERFLOW}
                  displayName="stack"
                  logo="/icons/stackoverflow.svg"
                  order={buttonOrder('STACKOVERFLOW')}
                />
              )}
              {config.LASTFM && (
                <Button
                  name="lastfm"
                  href={config.LASTFM}
                  displayName="Last.fm"
                  logo="/icons/lastfm.svg"
                  order={buttonOrder('LASTFM')}
                />
              )}
              {config.GITEA && (
                <Button
                  name="gitea"
                  href={config.GITEA}
                  displayName="Gitea"
                  logo="/icons/gitea.svg"
                  order={buttonOrder('GITEA')}
                />
              )}
              {config.POLYWORK && (
                <Button
                  name="polywork"
                  href={config.POLYWORK}
                  displayName="Polywork"
                  logo="/icons/polywork.svg"
                  order={buttonOrder('POLYWORK')}
                />
              )}
              {config.SIGNAL && (
                <Button
                  name="signal"
                  href={config.SIGNAL}
                  displayName="Signal"
                  logo="/icons/signal.svg"
                  order={buttonOrder('SIGNAL')}
                />
              )}
              {config.UNTAPPD && (
                <Button
                  name="untappd"
                  href={config.UNTAPPD}
                  displayName="Untappd"
                  logo="/icons/untappd.svg"
                  order={buttonOrder('UNTAPPD')}
                />
              )}
              {config.INSTANTGAMING && (
                <Button
                  name="instantgaming"
                  href={config.INSTANTGAMING}
                  displayName="Instant Gaming"
                  logo="/icons/instantgaming.svg"
                  order={buttonOrder('INSTANTGAMING')}
                />
              )}
              {config.GHOST && (
                <Button
                  name="ghost"
                  href={config.GHOST}
                  displayName="ghost"
                  logo="/icons/ghost.svg"
                  order={buttonOrder('GHOST')}
                />
              )}
              {config.TRAKT && (
                <Button
                  name="trakt"
                  href={config.TRAKT}
                  displayName="Trakt"
                  logo="/icons/trakt.svg"
                  order={buttonOrder('TRAKT')}
                />
              )}
              {config.CASHAPP && (
                <Button
                  name="cashapp"
                  href={config.CASHAPP}
                  displayName="Cash App"
                  logo="/icons/cashapp.svg"
                  order={buttonOrder('CASHAPP')}
                />
              )}
              {config.TEESPRING && (
                <Button
                  name="teespring"
                  href={config.TEESPRING}
                  displayName="Teespring"
                  logo="/icons/teespring.svg"
                  order={buttonOrder('TEESPRING')}
                />
              )}
              {config.XING && (
                <Button
                  name="xing"
                  href={config.XING}
                  displayName="Xing"
                  logo="/icons/xing.svg"
                  order={buttonOrder('XING')}
                />
              )}
              {config.KEYBASE && (
                <Button
                  name="keybase"
                  href={config.KEYBASE}
                  displayName="Keybase"
                  logo="/icons/keybase.svg"
                  order={buttonOrder('KEYBASE')}
                />
              )}
              {config.ONLYFANS && (
                <Button
                  name="onlyfans"
                  href={config.ONLYFANS}
                  displayName="OnlyFans"
                  logo="/icons/onlyfans.svg"
                  order={buttonOrder('ONLYFANS')}
                />
              )}
              {config.SESSION && (
                <Button
                  name="session"
                  href={config.SESSION}
                  displayName="Session"
                  logo="/icons/session.svg"
                  order={buttonOrder('SESSION')}
                />
              )}
              {config.THREEMA && (
                <Button
                  name="threema"
                  href={config.THREEMA}
                  displayName="Threema"
                  logo="/icons/threema.svg"
                  order={buttonOrder('THREEMA')}
                />
              )}
              {config.STREAMLABS && (
                <Button
                  name="streamlabs"
                  href={config.STREAMLABS}
                  displayName="Streamlabs"
                  logo="/icons/streamlabs.svg"
                  order={buttonOrder('STREAMLABS')}
                />
              )}
              {config.PRIVATEBIN && (
                <Button
                  name="privatebin"
                  href={config.PRIVATEBIN}
                  displayName="Private Bin"
                  logo="/icons/privatebin.svg"
                  order={buttonOrder('PRIVATEBIN')}
                />
              )}
              {config.AMAZON_AFFILIATE && (
                <Button
                  name="amazon"
                  href={config.AMAZON_AFFILIATE}
                  displayName="Amazon Affiliate"
                  logo="/icons/amazon.svg"
                  order={buttonOrder('AMAZON_AFFILIATE')}
                />
              )}
              {config.AMAZON_WISHLIST && (
                <Button
                  name="amazon"
                  href={config.AMAZON_WISHLIST}
                  displayName="Amazon Wishlist"
                  logo="/icons/amazon.svg"
                  order={buttonOrder('AMAZON_WISHLIST')}
                />
              )}
              {config.APPLE_MUSIC && (
                <Button
                  name="applemusic"
                  href={config.APPLE_MUSIC}
                  displayName="Apple Music"
                  logo="/icons/applemusic.svg"
                  order={buttonOrder('APPLE_MUSIC')}
                />
              )}
              {config.YOUTUBE_MUSIC && (
                <Button
                  name="youtubemusic"
                  href={config.YOUTUBE_MUSIC}
                  displayName="YouTube Music"
                  logo="/icons/youtubemusic.svg"
                  order={buttonOrder('YOUTUBE_MUSIC')}
                />
              )}
              {config.VENMO && (
                <Button
                  name="venmo"
                  href={config.VENMO}
                  displayName="Venmo"
                  logo="/icons/venmo.svg"
                  order={buttonOrder('VENMO')}
                />
              )}
              {config.STATUS && (
                <Button
                  name="status"
                  href={config.STATUS}
                  displayName="Status"
                  logo="/icons/status.svg"
                  order={buttonOrder('STATUS')}
                />
              )}
              {config.MATRIX && (
                <Button
                  name="matrix"
                  href={config.MATRIX}
                  displayName="[matrix]"
                  logo="/icons/matrix.svg"
                  order={buttonOrder('MATRIX')}
                />
              )}
              {config.ANILIST && (
                <Button
                  name="anilist"
                  href={config.ANILIST}
                  displayName="AniList"
                  logo="/icons/anilist.svg"
                  order={buttonOrder('ANILIST')}
                />
              )}
              {config.GITBUCKET && (
                <Button
                  name="gitbucket"
                  href={config.GITBUCKET}
                  displayName="GitBucket"
                  logo="/icons/gitbucket.svg"
                  order={buttonOrder('GITBUCKET')}
                />
              )}
              {config.SHAZAM && (
                <Button
                  name="shazam"
                  href={config.SHAZAM}
                  displayName="Shazam"
                  logo="/icons/shazam.svg"
                  order={buttonOrder('SHAZAM')}
                />
              )}
              {config.FLICKR && (
                <Button
                  name="flickr"
                  href={config.FLICKR}
                  displayName="Flickr"
                  logo="/icons/flickr.svg"
                  order={buttonOrder('FLICKR')}
                />
              )}
              {config.TPDB && (
                <Button
                  name="tpdb"
                  href={config.TPDB}
                  displayName="The Poster Database"
                  logo="/icons/tpdb.svg"
                  order={buttonOrder('TPDB')}
                />
              )}
              {config.OSU && (
                <Button
                  name="osu"
                  href={config.OSU}
                  displayName="osu!"
                  logo="/icons/osu.svg"
                  order={buttonOrder('OSU')}
                />
              )}
              {config.KAKAOTALK && (
                <Button
                  name="kakaoTalk"
                  href={config.KAKAOTALK}
                  displayName="KakaoTalk"
                  logo="/icons/kaokotalk.svg"
                  order={buttonOrder('KAKAOTALK')}
                />
              )}
              {config.LINE && (
                <Button
                  name="lineMessenger"
                  href={config.LINE}
                  displayName="Line Messenger"
                  logo="/icons/linemessenger.svg"
                  order={buttonOrder('LINE')}
                />
              )}
              {config.DESIGNBYHUMANS && (
                <Button
                  name="designByHumans"
                  href={config.DESIGNBYHUMANS}
                  displayName="Design By Hümans"
                  logo="/icons/designbyhumans.svg"
                  order={buttonOrder('DESIGNBYHUMANS')}
                />
              )}
              {config.DOCKERHUB && (
                <Button
                  name="dockerhub"
                  href={config.DOCKERHUB}
                  displayName="Dockerhub"
                  logo="/icons/docker.svg"
                  order={buttonOrder('DOCKERHUB')}
                />
              )}
              {config.VERO && (
                <Button
                  name="vero"
                  href={config.VERO}
                  displayName="VERO"
                  logo="/icons/vero.svg"
                  order={buttonOrder('VERO')}
                />
              )}
              {config.MYANIMELIST && (
                <Button
                  name="myAnimeList"
                  href={config.MYANIMELIST}
                  displayName="MyAnimeList"
                  logo="/icons/myanimelist.svg"
                  order={buttonOrder('MYANIMELIST')}
                />
              )}
              {config.FIVEHUNDREDPX && (
                <Button
                  name="500px"
                  href={config.FIVEHUNDREDPX}
                  displayName="500px"
                  logo="/icons/500px.svg"
                  order={buttonOrder('FIVEHUNDREDPX')}
                />
              )}
              {config.JETPHOTOS && (
                <Button
                  name="jetphotos"
                  href={config.JETPHOTOS}
                  displayName="JetPhotos"
                  logo="/icons/jetphotos.svg"
                  order={buttonOrder('JETPHOTOS')}
                />
              )}
              {config.SUBSTACK && (
                <Button
                  name="substack"
                  href={config.SUBSTACK}
                  displayName="Substack"
                  logo="/icons/substack.svg"
                  order={buttonOrder('SUBSTACK')}
                />
              )}
              {config.PRINTABLES && (
                <Button
                  name="printables"
                  href={config.PRINTABLES}
                  displayName="Printables"
                  logo="/icons/printables.svg"
                  order={buttonOrder('PRINTABLES')}
                />
              )}
              {config.SERIALIZD && (
                <Button
                  name="serializd"
                  href={config.SERIALIZD}
                  displayName="Serializd"
                  logo="/icons/serializd.svg"
                  order={buttonOrder('SERIALIZD')}
                />
              )}
              {config.THREADS && (
                <Button
                  name="threads"
                  href={config.THREADS}
                  displayName="Threads"
                  logo="/icons/threads.svg"
                  order={buttonOrder('THREADS')}
                />
              )}
              {config.LEMMY && (
                <Button
                  name="lemmy"
                  href={config.LEMMY}
                  displayName="Lemmy"
                  logo="/icons/lemmy.svg"
                  order={buttonOrder('LEMMY')}
                />
              )}
              {config.PIXELFED && (
                <Button
                  name="pixelfed"
                  href={config.PIXELFED}
                  displayName="Pixelfed"
                  logo="/icons/pixelfed.svg"
                  order={buttonOrder('PIXELFED')}
                />
              )}
              {config.VRCHAT && (
                <Button
                  name="vrchat"
                  href={config.VRCHAT}
                  displayName="VRChat"
                  logo="/icons/vrchat.svg"
                  order={buttonOrder('VRCHAT')}
                />
              )}
              {config.X && (
                <Button
                  name="x"
                  href={config.X}
                  displayName=" "
                  logo="/icons/x.svg"
                  order={buttonOrder('X')}
                />
              )}
              {config.CODEWARS && (
                <Button
                  name="codewars"
                  href={config.CODEWARS}
                  displayName="Codewars"
                  logo="/icons/codewars.svg"
                  order={buttonOrder('CODEWARS')}
                />
              )}
              {config.APPLE_PODCASTS && (
                <Button
                  name="apple-podcasts"
                  href={config.APPLE_PODCASTS}
                  displayName="Apple Podcasts"
                  logo="/icons/apple-podcasts.svg"
                  order={buttonOrder('APPLE_PODCASTS')}
                />
              )}
              {config.GOOGLE_PODCASTS && (
                <Button
                  name="google-podcasts"
                  href={config.GOOGLE_PODCASTS}
                  displayName="Google Podcasts"
                  logo="/icons/google-podcasts.svg"
                  order={buttonOrder('GOOGLE_PODCASTS')}
                />
              )}
              {config.POCKET_CASTS && (
                <Button
                  name="pocket-casts"
                  href={config.POCKET_CASTS}
                  displayName="Pocket Casts"
                  logo="/icons/pocketcasts.svg"
                  order={buttonOrder('POCKET_CASTS')}
                />
              )}
              {config.OVERCAST && (
                <Button
                  name="overcast"
                  href={config.OVERCAST}
                  displayName="Overcast"
                  logo="/icons/overcast.svg"
                  order={buttonOrder('OVERCAST')}
                />
              )}
              {config.RSS && (
                <Button
                  name="rss"
                  href={config.RSS}
                  displayName="RSS"
                  logo="/icons/generic-rss.svg"
                  order={buttonOrder('RSS')}
                />
              )}
              {config.AUDIUS && (
                <Button
                  name="audius"
                  href={config.AUDIUS}
                  displayName="Audius"
                  logo="/icons/audius.svg"
                  order={buttonOrder('AUDIUS')}
                />
              )}
              {config.BANDCAMP && (
                <Button
                  name="bandcamp"
                  href={config.BANDCAMP}
                  displayName="Bandcamp"
                  logo="/icons/bandcamp.svg"
                  order={buttonOrder('BANDCAMP')}
                />
              )}
              {config.FORGEJO && (
                <Button
                  name="forgejo"
                  href={config.FORGEJO}
                  displayName="Forgejo"
                  logo="/icons/forgejo.svg"
                  order={buttonOrder('FORGEJO')}
                />
              )}
              {config.ORCID && (
                <Button
                  name="orcid"
                  href={config.ORCID}
                  displayName="ORCID"
                  logo="/icons/orcid.svg"
                  order={buttonOrder('ORCID')}
                />
              )}
              {config.CREDLY && (
                <Button
                  name="credly"
                  href={config.CREDLY}
                  displayName="Credly"
                  logo="/icons/credly.svg"
                  order={buttonOrder('CREDLY')}
                />
              )}
              {config.SEMANTICSCHOLAR && (
                <Button
                  name="semanticscholar"
                  href={config.SEMANTICSCHOLAR}
                  displayName="Semantic Scholar"
                  logo="/icons/semanticscholar.svg"
                  order={buttonOrder('SEMANTICSCHOLAR')}
                />
              )}
              {config.GOOGLESCHOLAR && (
                <Button
                  name="googlescholar"
                  href={config.GOOGLESCHOLAR}
                  displayName="Google Scholar"
                  logo="/icons/googlescholar.svg"
                  order={buttonOrder('GOOGLESCHOLAR')}
                />
              )}
              {config.SIMPLEX && (
                <Button
                  name="simplex"
                  href={config.SIMPLEX}
                  displayName="Simplex"
                  logo="/icons/simplex.svg"
                  order={buttonOrder('SIMPLEX')}
                />
              )}
              {config.MIXCLOUD && (
                <Button
                  name="mixcloud"
                  href={config.MIXCLOUD}
                  displayName="MIXCLOUD"
                  logo="/icons/mixcloud.svg"
                  order={buttonOrder('MIXCLOUD')}
                />
              )}
              {config.INTERNETARCHIVE && (
                <Button
                  name="internetarchive"
                  href={config.INTERNETARCHIVE}
                  displayName="Internet Archive"
                  logo="/icons/internetarchive.svg"
                  order={buttonOrder('INTERNETARCHIVE')}
                />
              )}
              {config.GOOGLEMAPS && (
                <Button
                  name="googlemaps"
                  href={config.GOOGLEMAPS}
                  displayName="Google Maps"
                  logo="/icons/googlemaps.svg"
                  order={buttonOrder('GOOGLEMAPS')}
                />
              )}
              {config.TIDAL && (
                <Button
                  name="tidal"
                  href={config.TIDAL}
                  displayName="Tidal"
                  logo="/icons/tidal.svg"
                  order={buttonOrder('TIDAL')}
                />
              )}
              {config.THESTORYGRAPH && (
                <Button
                  name="thestorygraph"
                  href={config.THESTORYGRAPH}
                  displayName="The StoryGraph"
                  logo="/icons/storygraph.svg"
                  order={buttonOrder('THESTORYGRAPH')}
                />
              )}
              {config.GEOCACHING && (
                <Button
                  name="geocaching"
                  href={config.GEOCACHING}
                  displayName="GEOCACHING"
                  logo="/icons/geocaching.svg"
                  order={buttonOrder('GEOCACHING')}
                />
              )}
              {config.NEOCITIES && (
                <Button
                  name="neocities"
                  href={config.NEOCITIES}
                  displayName="neocities"
                  logo="/icons/neocities.svg"
                  order={buttonOrder('NEOCITIES')}
                />
              )}
              {config.DREAMWIDTH && (
                <Button
                  name="dreamwidth"
                  href={config.DREAMWIDTH}
                  displayName="dreamWIDTH"
                  logo="/icons/dreamwidth.svg"
                  order={buttonOrder('DREAMWIDTH')}
                />
              )}
              {config.SPACEHEY && (
                <Button
                  name="spacehey"
                  href={config.SPACEHEY}
                  displayName="spacehey"
                  logo="/icons/spacehey.svg"
                  order={buttonOrder('SPACEHEY')}
                />
              )}
              {config.VIBER && (
                <Button
                  name="viber"
                  href={config.VIBER}
                  displayName="Viber"
                  logo="/icons/viber.svg"
                  order={buttonOrder('VIBER')}
                />
              )}
              {config.PILLOWFORT && (
                <Button
                  name="pillowfort"
                  href={config.PILLOWFORT}
                  displayName="Pillowfort"
                  logo="/icons/pillowfort.svg"
                  order={buttonOrder('PILLOWFORT')}
                />
              )}
              {config.MAKERWORLD && (
                <Button
                  name="makerworld"
                  href={config.MAKERWORLD}
                  displayName="Makerworld"
                  logo="/icons/makerworld.svg"
                  order={buttonOrder('MAKERWORLD')}
                />
              )}
            </Sort>
            <div>
              <p className="footer">
                {config.FOOTER}
                {config.SHARE && config.OG_TITLE && config.OG_DESCRIPTION && (
                  <>
                    <br />
                    <Share
                      url={config.SHARE}
                      title={config.OG_TITLE}
                      text={config.OG_DESCRIPTION}
                    />
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
