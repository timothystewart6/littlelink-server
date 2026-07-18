import React, { memo } from 'react';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Share from '../Share/Share';
import { runtimeConfig } from '../../config';

import Sort from '../Sort/Sort';

function Home(props) {
  let order = [];
  if (runtimeConfig?.BUTTON_ORDER) {
    order = runtimeConfig.BUTTON_ORDER.split(',').reverse();
  }

  const buttonOrder = button => {
    return order.indexOf(button);
  };

  const renderCustomButtons = () => {
    const names = runtimeConfig.CUSTOM_BUTTON_NAME?.split(',');
    const urls = runtimeConfig.CUSTOM_BUTTON_URL?.split(',');
    const altTexts = runtimeConfig.CUSTOM_BUTTON_ALT_TEXT?.split(',');
    const texts = runtimeConfig.CUSTOM_BUTTON_TEXT?.split(',');
    const buttonColors = runtimeConfig.CUSTOM_BUTTON_COLOR?.split(',');
    const textColors = runtimeConfig.CUSTOM_BUTTON_TEXT_COLOR?.split(',');
    const icons = runtimeConfig.CUSTOM_BUTTON_ICON?.split(',');
    // have to clean up some of the strings to standardize for analytics

    return texts.map((t, i) => {
      // do not try to render button unless it has all of the required props
      return (
        <div key={i} order={buttonOrder(names[i]?.trim())}>
          {names &&
            names[i] &&
            urls &&
            urls[i] &&
            texts &&
            texts[i] &&
            buttonColors &&
            buttonColors[i] &&
            textColors &&
            textColors[i] &&
            altTexts &&
            altTexts[i] && (
              <Button
                name={names[i]?.trim().toLowerCase()}
                href={urls[i]?.trim()}
                displayName={texts[i]?.trim()}
                styles={{
                  backgroundColor: buttonColors[i]?.trim(),
                  color: textColors[i]?.trim(),
                }}
                alt={altTexts[i]?.trim()}
                icon={icons && icons[i]?.trim()}
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
              src={runtimeConfig.AVATAR_URL}
              srcSet={runtimeConfig.AVATAR_2X_URL}
              alt={runtimeConfig.AVATAR_ALT}
            />
            <h1>{`${runtimeConfig.NAME}`}</h1>
            <p>{runtimeConfig.BIO}</p>
            <Sort>
              {runtimeConfig.CUSTOM_BUTTON_TEXT && renderCustomButtons()}
              {runtimeConfig.YOUTUBE && (
                <Button
                  name="youtube"
                  href={runtimeConfig.YOUTUBE}
                  displayName="YouTube"
                  logo="/icons/youtube.svg"
                  order={buttonOrder('YOUTUBE')}
                />
              )}
              {runtimeConfig.TWITCH && (
                <Button
                  name="twitch"
                  href={runtimeConfig.TWITCH}
                  displayName="Twitch"
                  logo="/icons/twitch.svg"
                  order={buttonOrder('TWITCH')}
                />
              )}
              {runtimeConfig.TWITTER && (
                <Button
                  name="twitter"
                  href={runtimeConfig.TWITTER}
                  displayName="Twitter"
                  logo="/icons/twitter.svg"
                  order={buttonOrder('TWITTER')}
                />
              )}
              {runtimeConfig.INSTAGRAM && (
                <Button
                  name="instagram"
                  href={runtimeConfig.INSTAGRAM}
                  displayName="Instagram"
                  logo="/icons/instagram.svg"
                  order={buttonOrder('INSTAGRAM')}
                />
              )}
              {runtimeConfig.GITHUB && (
                <Button
                  name="github"
                  href={runtimeConfig.GITHUB}
                  displayName="GitHub"
                  logo="/icons/github.svg"
                  order={buttonOrder('GITHUB')}
                />
              )}
              {runtimeConfig.DISCORD && (
                <Button
                  name="discord"
                  href={runtimeConfig.DISCORD}
                  displayName="Discord"
                  logo="/icons/discord.svg"
                  order={buttonOrder('DISCORD')}
                />
              )}

              {runtimeConfig.TIKTOK && (
                <Button
                  name="tiktok"
                  href={runtimeConfig.TIKTOK}
                  displayName="TikTok"
                  logo="/icons/tiktok.svg"
                  order={buttonOrder('TIKTOK')}
                />
              )}
              {runtimeConfig.FACEBOOK && (
                <Button
                  name="facebook"
                  href={runtimeConfig.FACEBOOK}
                  displayName="Facebook"
                  logo="/icons/facebook.svg"
                  order={buttonOrder('FACEBOOK')}
                />
              )}
              {runtimeConfig.FACEBOOK_MESSENGER && (
                <Button
                  name="facebookmessenger"
                  href={runtimeConfig.FACEBOOK_MESSENGER}
                  displayName="Messenger"
                  logo="/icons/messenger.svg"
                  order={buttonOrder('FACEBOOK_MESSENGER')}
                />
              )}
              {runtimeConfig.LINKED_IN && (
                <Button
                  name="linkedin"
                  href={runtimeConfig.LINKED_IN}
                  displayName="LinkedIn"
                  logo="/icons/linkedin.svg"
                  order={buttonOrder('LINKED_IN')}
                />
              )}
              {runtimeConfig.PRODUCT_HUNT && (
                <Button
                  name="producthunt"
                  href={runtimeConfig.PRODUCT_HUNT}
                  displayName="Product Hunt"
                  logo="/icons/producthunt.svg"
                  order={buttonOrder('PRODUCT_HUNT')}
                />
              )}
              {runtimeConfig.SNAPCHAT && (
                <Button
                  name="snapchat"
                  href={runtimeConfig.SNAPCHAT}
                  displayName="SnapChat"
                  logo="/icons/snapchat.svg"
                  order={buttonOrder('SNAPCHAT')}
                />
              )}
              {runtimeConfig.SPOTIFY && (
                <Button
                  name="spotify"
                  href={runtimeConfig.SPOTIFY}
                  displayName="Spotify"
                  logo="/icons/spotify.svg"
                  order={buttonOrder('SPOTIFY')}
                />
              )}
              {runtimeConfig.REDDIT && (
                <Button
                  name="reddit"
                  href={runtimeConfig.REDDIT}
                  displayName="Reddit"
                  logo="/icons/reddit.svg"
                  order={buttonOrder('REDDIT')}
                />
              )}
              {runtimeConfig.MEDIUM && (
                <Button
                  name="medium"
                  href={runtimeConfig.MEDIUM}
                  displayName="Medium"
                  logo="/icons/medium.svg"
                  order={buttonOrder('MEDIUM')}
                />
              )}
              {runtimeConfig.PINTEREST && (
                <Button
                  name="pinterest"
                  href={runtimeConfig.PINTEREST}
                  displayName="Pinterest"
                  logo="/icons/pinterest.svg"
                  order={buttonOrder('PINTEREST')}
                />
              )}
              {runtimeConfig.EMAIL && (
                <Button
                  name="default"
                  href={`mailto:${runtimeConfig.EMAIL}`}
                  displayName={runtimeConfig.EMAIL_TEXT}
                  logo="/icons/email.svg"
                  order={buttonOrder('EMAIL')}
                />
              )}

              {runtimeConfig.EMAIL_ALT && (
                <Button
                  name="default"
                  href={`mailto:${runtimeConfig.EMAIL_ALT}`}
                  displayName={runtimeConfig.EMAIL_ALT_TEXT}
                  logo="/icons/email_alt.svg"
                  order={buttonOrder('EMAIL_ALT')}
                />
              )}

              {runtimeConfig.SOUND_CLOUD && (
                <Button
                  name="soundcloud"
                  href={runtimeConfig.SOUND_CLOUD}
                  displayName="SoundCloud"
                  logo="/icons/soundcloud.svg"
                  order={buttonOrder('SOUND_CLOUD')}
                />
              )}
              {runtimeConfig.FIGMA && (
                <Button
                  name="figma"
                  href={runtimeConfig.FIGMA}
                  displayName="Figma"
                  logo="/icons/figma.svg"
                  order={buttonOrder('FIGMA')}
                />
              )}

              {runtimeConfig.TELEGRAM && (
                <Button
                  name="telegram"
                  href={runtimeConfig.TELEGRAM}
                  displayName="Telegram"
                  logo="/icons/telegram.svg"
                  order={buttonOrder('TELEGRAM')}
                />
              )}

              {runtimeConfig.TUMBLR && (
                <Button
                  name="tumblr"
                  href={runtimeConfig.TUMBLR}
                  displayName="Tumblr"
                  logo="/icons/tumblr.svg"
                  order={buttonOrder('TUMBLR')}
                />
              )}
              {runtimeConfig.STEAM && (
                <Button
                  name="steam"
                  href={runtimeConfig.STEAM}
                  displayName="Steam"
                  logo="/icons/steam.svg"
                  order={buttonOrder('STEAM')}
                />
              )}

              {runtimeConfig.VIMEO && (
                <Button
                  name="vimeo"
                  href={runtimeConfig.VIMEO}
                  displayName="Vimeo"
                  logo="/icons/vimeo.svg"
                  order={buttonOrder('VIMEO')}
                />
              )}
              {runtimeConfig.WORDPRESS && (
                <Button
                  name="wordpress"
                  href={runtimeConfig.WORDPRESS}
                  displayName="Wordpress"
                  logo="/icons/wordpress.svg"
                  order={buttonOrder('WORDPRESS')}
                />
              )}
              {runtimeConfig.GOODREADS && (
                <Button
                  name="goodreads"
                  href={runtimeConfig.GOODREADS}
                  displayName="Goodreads"
                  logo="/icons/goodreads.svg"
                  order={buttonOrder('GOODREADS')}
                />
              )}
              {runtimeConfig.SKOOB && (
                <Button
                  name="skoob"
                  href={runtimeConfig.SKOOB}
                  displayName="Skoob"
                  logo="/icons/skoob.svg"
                  order={buttonOrder('SKOOB')}
                />
              )}
              {runtimeConfig.LETTERBOXD && (
                <Button
                  name="letterboxd"
                  href={runtimeConfig.LETTERBOXD}
                  displayName="Letterboxd"
                  logo="/icons/letterboxd.svg"
                  order={buttonOrder('LETTERBOXD')}
                />
              )}
              {runtimeConfig.MASTODON && (
                <Button
                  name="mastodon"
                  href={runtimeConfig.MASTODON}
                  rels="me noopener noreferrer"
                  displayName="Mastodon"
                  logo="/icons/mastodon.svg"
                  order={buttonOrder('MASTODON')}
                />
              )}
              {runtimeConfig.MICRO_BLOG && (
                <Button
                  name="microblog"
                  href={runtimeConfig.MICRO_BLOG}
                  displayName="Microblog"
                  logo="/icons/microblog.svg"
                  order={buttonOrder('MICRO_BLOG')}
                />
              )}
              {runtimeConfig.WHATSAPP && (
                <Button
                  name="whatsapp"
                  href={runtimeConfig.WHATSAPP}
                  displayName="WhatsApp"
                  logo="/icons/whatsapp.svg"
                  order={buttonOrder('WHATSAPP')}
                />
              )}
              {runtimeConfig.KIT && (
                <Button
                  name="kit"
                  href={runtimeConfig.KIT}
                  displayName="Kit"
                  logo="/icons/kit.svg"
                  order={buttonOrder('KIT')}
                />
              )}
              {runtimeConfig.STRAVA && (
                <Button
                  name="strava"
                  href={runtimeConfig.STRAVA}
                  displayName="Strava"
                  logo="/icons/strava.svg"
                  order={buttonOrder('STRAVA')}
                />
              )}
              {runtimeConfig.BLUESKY && (
                <Button
                  name="bluesky"
                  href={runtimeConfig.BLUESKY}
                  displayName="BlueSky"
                  logo="/icons/bluesky.svg"
                  order={buttonOrder('BLUESKY')}
                />
              )}
              {runtimeConfig.BUYMEACOFFEE && (
                <Button
                  name="buymeacoffee"
                  href={runtimeConfig.BUYMEACOFFEE}
                  displayName="Buy Me a Coffee"
                  logo="/icons/buymeacoffee.svg"
                  order={buttonOrder('BUYMEACOFFEE')}
                />
              )}
              {runtimeConfig.GITLAB && (
                <Button
                  name="gitlab"
                  href={runtimeConfig.GITLAB}
                  displayName="GitLab"
                  logo="/icons/gitlab.svg"
                  order={buttonOrder('GITLAB')}
                />
              )}
              {runtimeConfig.PATREON && (
                <Button
                  name="patreon"
                  href={runtimeConfig.PATREON}
                  displayName="Patreon"
                  logo="/icons/patreon.svg"
                  order={buttonOrder('PATREON')}
                />
              )}
              {runtimeConfig.DEVTO && (
                <Button
                  name="devto"
                  href={runtimeConfig.DEVTO}
                  displayName="Dev.to"
                  logo="/icons/devto.svg"
                  order={buttonOrder('DEVTO')}
                />
              )}
              {runtimeConfig.PAYPAL && (
                <Button
                  name="paypal"
                  href={runtimeConfig.PAYPAL}
                  displayName="Paypal"
                  logo="/icons/paypal.svg"
                  order={buttonOrder('PAYPAL')}
                />
              )}
              {runtimeConfig.SLACK && (
                <Button
                  name="slack"
                  href={runtimeConfig.SLACK}
                  displayName="Slack"
                  logo="/icons/slack.svg"
                  order={buttonOrder('SLACK')}
                />
              )}
              {runtimeConfig.STACKOVERFLOW && (
                <Button
                  name="stackoverflow"
                  href={runtimeConfig.STACKOVERFLOW}
                  displayName="stack"
                  logo="/icons/stackoverflow.svg"
                  order={buttonOrder('STACKOVERFLOW')}
                />
              )}
              {runtimeConfig.LASTFM && (
                <Button
                  name="lastfm"
                  href={runtimeConfig.LASTFM}
                  displayName="Last.fm"
                  logo="/icons/lastfm.svg"
                  order={buttonOrder('LASTFM')}
                />
              )}
              {runtimeConfig.GITEA && (
                <Button
                  name="gitea"
                  href={runtimeConfig.GITEA}
                  displayName="Gitea"
                  logo="/icons/gitea.svg"
                  order={buttonOrder('GITEA')}
                />
              )}
              {runtimeConfig.POLYWORK && (
                <Button
                  name="polywork"
                  href={runtimeConfig.POLYWORK}
                  displayName="Polywork"
                  logo="/icons/polywork.svg"
                  order={buttonOrder('POLYWORK')}
                />
              )}
              {runtimeConfig.SIGNAL && (
                <Button
                  name="signal"
                  href={runtimeConfig.SIGNAL}
                  displayName="Signal"
                  logo="/icons/signal.svg"
                  order={buttonOrder('SIGNAL')}
                />
              )}
              {runtimeConfig.UNTAPPD && (
                <Button
                  name="untappd"
                  href={runtimeConfig.UNTAPPD}
                  displayName="Untappd"
                  logo="/icons/untappd.svg"
                  order={buttonOrder('UNTAPPD')}
                />
              )}
              {runtimeConfig.INSTANTGAMING && (
                <Button
                  name="instantgaming"
                  href={runtimeConfig.INSTANTGAMING}
                  displayName="Instant Gaming"
                  logo="/icons/instantgaming.svg"
                  order={buttonOrder('INSTANTGAMING')}
                />
              )}
              {runtimeConfig.GHOST && (
                <Button
                  name="ghost"
                  href={runtimeConfig.GHOST}
                  displayName="ghost"
                  logo="/icons/ghost.svg"
                  order={buttonOrder('GHOST')}
                />
              )}
              {runtimeConfig.TRAKT && (
                <Button
                  name="trakt"
                  href={runtimeConfig.TRAKT}
                  displayName="Trakt"
                  logo="/icons/trakt.svg"
                  order={buttonOrder('TRAKT')}
                />
              )}
              {runtimeConfig.CASHAPP && (
                <Button
                  name="cashapp"
                  href={runtimeConfig.CASHAPP}
                  displayName="Cash App"
                  logo="/icons/cashapp.svg"
                  order={buttonOrder('CASHAPP')}
                />
              )}
              {runtimeConfig.TEESPRING && (
                <Button
                  name="teespring"
                  href={runtimeConfig.TEESPRING}
                  displayName="Teespring"
                  logo="/icons/teespring.svg"
                  order={buttonOrder('TEESPRING')}
                />
              )}
              {runtimeConfig.XING && (
                <Button
                  name="xing"
                  href={runtimeConfig.XING}
                  displayName="Xing"
                  logo="/icons/xing.svg"
                  order={buttonOrder('XING')}
                />
              )}
              {runtimeConfig.KEYBASE && (
                <Button
                  name="keybase"
                  href={runtimeConfig.KEYBASE}
                  displayName="Keybase"
                  logo="/icons/keybase.svg"
                  order={buttonOrder('KEYBASE')}
                />
              )}
              {runtimeConfig.ONLYFANS && (
                <Button
                  name="onlyfans"
                  href={runtimeConfig.ONLYFANS}
                  displayName="OnlyFans"
                  logo="/icons/onlyfans.svg"
                  order={buttonOrder('ONLYFANS')}
                />
              )}
              {runtimeConfig.SESSION && (
                <Button
                  name="session"
                  href={runtimeConfig.SESSION}
                  displayName="Session"
                  logo="/icons/session.svg"
                  order={buttonOrder('SESSION')}
                />
              )}
              {runtimeConfig.THREEMA && (
                <Button
                  name="threema"
                  href={runtimeConfig.THREEMA}
                  displayName="Threema"
                  logo="/icons/threema.svg"
                  order={buttonOrder('THREEMA')}
                />
              )}
              {runtimeConfig.STREAMLABS && (
                <Button
                  name="streamlabs"
                  href={runtimeConfig.STREAMLABS}
                  displayName="Streamlabs"
                  logo="/icons/streamlabs.svg"
                  order={buttonOrder('STREAMLABS')}
                />
              )}
              {runtimeConfig.PRIVATEBIN && (
                <Button
                  name="privatebin"
                  href={runtimeConfig.PRIVATEBIN}
                  displayName="Private Bin"
                  logo="/icons/privatebin.svg"
                  order={buttonOrder('PRIVATEBIN')}
                />
              )}
              {runtimeConfig.AMAZON_AFFILIATE && (
                <Button
                  name="amazon"
                  href={runtimeConfig.AMAZON_AFFILIATE}
                  displayName="Amazon Affiliate"
                  logo="/icons/amazon.svg"
                  order={buttonOrder('AMAZON_AFFILIATE')}
                />
              )}
              {runtimeConfig.AMAZON_WISHLIST && (
                <Button
                  name="amazon"
                  href={runtimeConfig.AMAZON_WISHLIST}
                  displayName="Amazon Wishlist"
                  logo="/icons/amazon.svg"
                  order={buttonOrder('AMAZON_WISHLIST')}
                />
              )}
              {runtimeConfig.APPLE_MUSIC && (
                <Button
                  name="applemusic"
                  href={runtimeConfig.APPLE_MUSIC}
                  displayName="Apple Music"
                  logo="/icons/applemusic.svg"
                  order={buttonOrder('APPLE_MUSIC')}
                />
              )}
              {runtimeConfig.YOUTUBE_MUSIC && (
                <Button
                  name="youtubemusic"
                  href={runtimeConfig.YOUTUBE_MUSIC}
                  displayName="YouTube Music"
                  logo="/icons/youtubemusic.svg"
                  order={buttonOrder('YOUTUBE_MUSIC')}
                />
              )}
              {runtimeConfig.VENMO && (
                <Button
                  name="venmo"
                  href={runtimeConfig.VENMO}
                  displayName="Venmo"
                  logo="/icons/venmo.svg"
                  order={buttonOrder('VENMO')}
                />
              )}
              {runtimeConfig.STATUS && (
                <Button
                  name="status"
                  href={runtimeConfig.STATUS}
                  displayName="Status"
                  logo="/icons/status.svg"
                  order={buttonOrder('STATUS')}
                />
              )}
              {runtimeConfig.MATRIX && (
                <Button
                  name="matrix"
                  href={runtimeConfig.MATRIX}
                  displayName="[matrix]"
                  logo="/icons/matrix.svg"
                  order={buttonOrder('MATRIX')}
                />
              )}
              {runtimeConfig.ANILIST && (
                <Button
                  name="anilist"
                  href={runtimeConfig.ANILIST}
                  displayName="AniList"
                  logo="/icons/anilist.svg"
                  order={buttonOrder('ANILIST')}
                />
              )}
              {runtimeConfig.GITBUCKET && (
                <Button
                  name="gitbucket"
                  href={runtimeConfig.GITBUCKET}
                  displayName="GitBucket"
                  logo="/icons/gitbucket.svg"
                  order={buttonOrder('GITBUCKET')}
                />
              )}
              {runtimeConfig.SHAZAM && (
                <Button
                  name="shazam"
                  href={runtimeConfig.SHAZAM}
                  displayName="Shazam"
                  logo="/icons/shazam.svg"
                  order={buttonOrder('SHAZAM')}
                />
              )}
              {runtimeConfig.FLICKR && (
                <Button
                  name="flickr"
                  href={runtimeConfig.FLICKR}
                  displayName="Flickr"
                  logo="/icons/flickr.svg"
                  order={buttonOrder('FLICKR')}
                />
              )}
              {runtimeConfig.TPDB && (
                <Button
                  name="tpdb"
                  href={runtimeConfig.TPDB}
                  displayName="The Poster Database"
                  logo="/icons/tpdb.svg"
                  order={buttonOrder('TPDB')}
                />
              )}
              {runtimeConfig.OSU && (
                <Button
                  name="osu"
                  href={runtimeConfig.OSU}
                  displayName="osu!"
                  logo="/icons/osu.svg"
                  order={buttonOrder('OSU')}
                />
              )}
              {runtimeConfig.KAKAOTALK && (
                <Button
                  name="kakaoTalk"
                  href={runtimeConfig.KAKAOTALK}
                  displayName="KakaoTalk"
                  logo="/icons/kaokotalk.svg"
                  order={buttonOrder('KAKAOTALK')}
                />
              )}
              {runtimeConfig.LINE && (
                <Button
                  name="lineMessenger"
                  href={runtimeConfig.LINE}
                  displayName="Line Messenger"
                  logo="/icons/linemessenger.svg"
                  order={buttonOrder('LINE')}
                />
              )}
              {runtimeConfig.DESIGNBYHUMANS && (
                <Button
                  name="designByHumans"
                  href={runtimeConfig.DESIGNBYHUMANS}
                  displayName="Design By Hümans"
                  logo="/icons/designbyhumans.svg"
                  order={buttonOrder('DESIGNBYHUMANS')}
                />
              )}
              {runtimeConfig.DOCKERHUB && (
                <Button
                  name="dockerhub"
                  href={runtimeConfig.DOCKERHUB}
                  displayName="Dockerhub"
                  logo="/icons/docker.svg"
                  order={buttonOrder('DOCKERHUB')}
                />
              )}
              {runtimeConfig.VERO && (
                <Button
                  name="vero"
                  href={runtimeConfig.VERO}
                  displayName="VERO"
                  logo="/icons/vero.svg"
                  order={buttonOrder('VERO')}
                />
              )}
              {runtimeConfig.MYANIMELIST && (
                <Button
                  name="myAnimeList"
                  href={runtimeConfig.MYANIMELIST}
                  displayName="MyAnimeList"
                  logo="/icons/myanimelist.svg"
                  order={buttonOrder('MYANIMELIST')}
                />
              )}
              {runtimeConfig.FIVEHUNDREDPX && (
                <Button
                  name="500px"
                  href={runtimeConfig.FIVEHUNDREDPX}
                  displayName="500px"
                  logo="/icons/500px.svg"
                  order={buttonOrder('FIVEHUNDREDPX')}
                />
              )}
              {runtimeConfig.JETPHOTOS && (
                <Button
                  name="jetphotos"
                  href={runtimeConfig.JETPHOTOS}
                  displayName="JetPhotos"
                  logo="/icons/jetphotos.svg"
                  order={buttonOrder('JETPHOTOS')}
                />
              )}
              {runtimeConfig.SUBSTACK && (
                <Button
                  name="substack"
                  href={runtimeConfig.SUBSTACK}
                  displayName="Substack"
                  logo="/icons/substack.svg"
                  order={buttonOrder('SUBSTACK')}
                />
              )}
              {runtimeConfig.PRINTABLES && (
                <Button
                  name="printables"
                  href={runtimeConfig.PRINTABLES}
                  displayName="Printables"
                  logo="/icons/printables.svg"
                  order={buttonOrder('PRINTABLES')}
                />
              )}
              {runtimeConfig.SERIALIZD && (
                <Button
                  name="serializd"
                  href={runtimeConfig.SERIALIZD}
                  displayName="Serializd"
                  logo="/icons/serializd.svg"
                  order={buttonOrder('SERIALIZD')}
                />
              )}
              {runtimeConfig.THREADS && (
                <Button
                  name="threads"
                  href={runtimeConfig.THREADS}
                  displayName="Threads"
                  logo="/icons/threads.svg"
                  order={buttonOrder('THREADS')}
                />
              )}
              {runtimeConfig.LEMMY && (
                <Button
                  name="lemmy"
                  href={runtimeConfig.LEMMY}
                  displayName="Lemmy"
                  logo="/icons/lemmy.svg"
                  order={buttonOrder('LEMMY')}
                />
              )}
              {runtimeConfig.PIXELFED && (
                <Button
                  name="pixelfed"
                  href={runtimeConfig.PIXELFED}
                  displayName="Pixelfed"
                  logo="/icons/pixelfed.svg"
                  order={buttonOrder('PIXELFED')}
                />
              )}
              {runtimeConfig.VRCHAT && (
                <Button
                  name="vrchat"
                  href={runtimeConfig.VRCHAT}
                  displayName="VRChat"
                  logo="/icons/vrchat.svg"
                  order={buttonOrder('VRCHAT')}
                />
              )}
              {runtimeConfig.X && (
                <Button
                  name="x"
                  href={runtimeConfig.X}
                  displayName=" "
                  logo="/icons/x.svg"
                  order={buttonOrder('X')}
                />
              )}
              {runtimeConfig.CODEWARS && (
                <Button
                  name="codewars"
                  href={runtimeConfig.CODEWARS}
                  displayName="Codewars"
                  logo="/icons/codewars.svg"
                  order={buttonOrder('CODEWARS')}
                />
              )}
              {runtimeConfig.APPLE_PODCASTS && (
                <Button
                  name="apple-podcasts"
                  href={runtimeConfig.APPLE_PODCASTS}
                  displayName="Apple Podcasts"
                  logo="/icons/apple-podcasts.svg"
                  order={buttonOrder('APPLE_PODCASTS')}
                />
              )}
              {runtimeConfig.GOOGLE_PODCASTS && (
                <Button
                  name="google-podcasts"
                  href={runtimeConfig.GOOGLE_PODCASTS}
                  displayName="Google Podcasts"
                  logo="/icons/google-podcasts.svg"
                  order={buttonOrder('GOOGLE_PODCASTS')}
                />
              )}
              {runtimeConfig.POCKET_CASTS && (
                <Button
                  name="pocket-casts"
                  href={runtimeConfig.POCKET_CASTS}
                  displayName="Pocket Casts"
                  logo="/icons/pocketcasts.svg"
                  order={buttonOrder('POCKET_CASTS')}
                />
              )}
              {runtimeConfig.OVERCAST && (
                <Button
                  name="overcast"
                  href={runtimeConfig.OVERCAST}
                  displayName="Overcast"
                  logo="/icons/overcast.svg"
                  order={buttonOrder('OVERCAST')}
                />
              )}
              {runtimeConfig.RSS && (
                <Button
                  name="rss"
                  href={runtimeConfig.RSS}
                  displayName="RSS"
                  logo="/icons/generic-rss.svg"
                  order={buttonOrder('RSS')}
                />
              )}
              {runtimeConfig.AUDIUS && (
                <Button
                  name="audius"
                  href={runtimeConfig.AUDIUS}
                  displayName="Audius"
                  logo="/icons/audius.svg"
                  order={buttonOrder('AUDIUS')}
                />
              )}
              {runtimeConfig.BANDCAMP && (
                <Button
                  name="bandcamp"
                  href={runtimeConfig.BANDCAMP}
                  displayName="Bandcamp"
                  logo="/icons/bandcamp.svg"
                  order={buttonOrder('BANDCAMP')}
                />
              )}
              {runtimeConfig.FORGEJO && (
                <Button
                  name="forgejo"
                  href={runtimeConfig.FORGEJO}
                  displayName="Forgejo"
                  logo="/icons/forgejo.svg"
                  order={buttonOrder('FORGEJO')}
                />
              )}
              {runtimeConfig.ORCID && (
                <Button
                  name="orcid"
                  href={runtimeConfig.ORCID}
                  displayName="ORCID"
                  logo="/icons/orcid.svg"
                  order={buttonOrder('ORCID')}
                />
              )}
              {runtimeConfig.CREDLY && (
                <Button
                  name="credly"
                  href={runtimeConfig.CREDLY}
                  displayName="Credly"
                  logo="/icons/credly.svg"
                  order={buttonOrder('CREDLY')}
                />
              )}
              {runtimeConfig.SEMANTICSCHOLAR && (
                <Button
                  name="semanticscholar"
                  href={runtimeConfig.SEMANTICSCHOLAR}
                  displayName="Semantic Scholar"
                  logo="/icons/semanticscholar.svg"
                  order={buttonOrder('SEMANTICSCHOLAR')}
                />
              )}
              {runtimeConfig.GOOGLESCHOLAR && (
                <Button
                  name="googlescholar"
                  href={runtimeConfig.GOOGLESCHOLAR}
                  displayName="Google Scholar"
                  logo="/icons/googlescholar.svg"
                  order={buttonOrder('GOOGLESCHOLAR')}
                />
              )}
              {runtimeConfig.SIMPLEX && (
                <Button
                  name="simplex"
                  href={runtimeConfig.SIMPLEX}
                  displayName="Simplex"
                  logo="/icons/simplex.svg"
                  order={buttonOrder('SIMPLEX')}
                />
              )}
              {runtimeConfig.MIXCLOUD && (
                <Button
                  name="mixcloud"
                  href={runtimeConfig.MIXCLOUD}
                  displayName="MIXCLOUD"
                  logo="/icons/mixcloud.svg"
                  order={buttonOrder('MIXCLOUD')}
                />
              )}
              {runtimeConfig.INTERNETARCHIVE && (
                <Button
                  name="internetarchive"
                  href={runtimeConfig.INTERNETARCHIVE}
                  displayName="Internet Archive"
                  logo="/icons/internetarchive.svg"
                  order={buttonOrder('INTERNETARCHIVE')}
                />
              )}
              {runtimeConfig.GOOGLEMAPS && (
                <Button
                  name="googlemaps"
                  href={runtimeConfig.GOOGLEMAPS}
                  displayName="Google Maps"
                  logo="/icons/googlemaps.svg"
                  order={buttonOrder('GOOGLEMAPS')}
                />
              )}
              {runtimeConfig.TIDAL && (
                <Button
                  name="tidal"
                  href={runtimeConfig.TIDAL}
                  displayName="Tidal"
                  logo="/icons/tidal.svg"
                  order={buttonOrder('TIDAL')}
                />
              )}
              {runtimeConfig.THESTORYGRAPH && (
                <Button
                  name="thestorygraph"
                  href={runtimeConfig.THESTORYGRAPH}
                  displayName="The StoryGraph"
                  logo="/icons/storygraph.svg"
                  order={buttonOrder('THESTORYGRAPH')}
                />
              )}
              {runtimeConfig.GEOCACHING && (
                <Button
                  name="geocaching"
                  href={runtimeConfig.GEOCACHING}
                  displayName="GEOCACHING"
                  logo="/icons/geocaching.svg"
                  order={buttonOrder('GEOCACHING')}
                />
              )}
              {runtimeConfig.NEOCITIES && (
                <Button
                  name="neocities"
                  href={runtimeConfig.NEOCITIES}
                  displayName="neocities"
                  logo="/icons/neocities.svg"
                  order={buttonOrder('NEOCITIES')}
                />
              )}
              {runtimeConfig.DREAMWIDTH && (
                <Button
                  name="dreamwidth"
                  href={runtimeConfig.DREAMWIDTH}
                  displayName="dreamWIDTH"
                  logo="/icons/dreamwidth.svg"
                  order={buttonOrder('DREAMWIDTH')}
                />
              )}
              {runtimeConfig.SPACEHEY && (
                <Button
                  name="spacehey"
                  href={runtimeConfig.SPACEHEY}
                  displayName="spacehey"
                  logo="/icons/spacehey.svg"
                  order={buttonOrder('SPACEHEY')}
                />
              )}
              {runtimeConfig.VIBER && (
                <Button
                  name="viber"
                  href={runtimeConfig.VIBER}
                  displayName="Viber"
                  logo="/icons/viber.svg"
                  order={buttonOrder('VIBER')}
                />
              )}
              {runtimeConfig.PILLOWFORT && (
                <Button
                  name="pillowfort"
                  href={runtimeConfig.PILLOWFORT}
                  displayName="Pillowfort"
                  logo="/icons/pillowfort.svg"
                  order={buttonOrder('PILLOWFORT')}
                />
              )}
              {runtimeConfig.MAKERWORLD && (
                <Button
                  name="makerworld"
                  href={runtimeConfig.MAKERWORLD}
                  displayName="Makerworld"
                  logo="/icons/makerworld.svg"
                  order={buttonOrder('MAKERWORLD')}
                />
              )}
            </Sort>
            <div>
              <p className="footer">
                {runtimeConfig.FOOTER}
                {runtimeConfig.SHARE &&
                  runtimeConfig.OG_TITLE &&
                  runtimeConfig.OG_DESCRIPTION && (
                    <>
                      <br />
                      <Share
                        url={runtimeConfig.SHARE}
                        title={runtimeConfig.OG_TITLE}
                        text={runtimeConfig.OG_DESCRIPTION}
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

export default memo(Home);
