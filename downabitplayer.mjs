// Downabit Player: overview, privacy policy and support (called from build.mjs).
// Store links are added once the app is live in each store; until then the pages say "coming soon".

export const DOWNABIT_PLAYER = {
  play: '',   // https://play.google.com/store/apps/details?id=<package> once it is published
  amazon: '', // https://www.amazon.com/dp/<ASIN> once it is live
  playSubscriptions: 'https://play.google.com/store/account/subscriptions',
  amazonSubscriptions: 'https://www.amazon.com/gp/mas/your-account/myapps/yoursubscriptions',
  telegramPrivacy: 'https://telegram.org/privacy',
  googlePrivacy: 'https://policies.google.com/privacy',
  amazonPrivacy: 'https://www.amazon.com/privacy',
  updated: '29 September 2026', // "last updated" date of its privacy policy
}

// Screens in the carousel: [file key, name, caption, alt text]. The player itself is the hero picture.
const SCREENS = [
  ['preview-strip', 'Pictures along the film', 'Move along the film and see where you will land before you jump.', 'The seek bar with a strip of pictures from the film, one of them chosen'],
  ['recently-watched', 'Recently watched', 'Every film you started and did not finish, ready to continue where you stopped.', 'Recently watched: a film from the sample films, stopped at 0:10 of 0:16'],
  ['favourites', 'Favourites', 'Chats, films and songs you keep at hand. Hold OK on any of them to add it.', 'Favourites: a chat, a song and a film'],
  ['music-player', 'Music', 'Previous, next, shuffle, repeat and a playlist, straight from a chat.', 'The music player playing a song, with Previous, Next, Shuffle, Repeat and Playlist'],
  ['subtitles', 'Subtitles and audio', 'Choose the language a film starts with, and how subtitles look, with a live preview.', 'Subtitles and audio settings: default languages, and subtitle size, colour and background with a preview'],
  ['welcome', 'Welcome', 'A short welcome on first start says what the app does.', 'The welcome screen: Your Telegram films on the big screen'],
]

export function buildDownabitPlayer({ page, doc, mail, ICON, SITE, ORG, svg, more = '' }) {
  const P = DOWNABIT_PLAYER
  const search = svg('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>')
  const shot = (key, alt, lazy = true) =>
    `<img src="/downabit-player/media/${key}-1600.webp" srcset="/downabit-player/media/${key}-960.webp 960w, /downabit-player/media/${key}-1600.webp 1600w" sizes="(max-width: 960px) 88vw, 860px" alt="${alt}" width="1600" height="900"${lazy ? ' loading="lazy"' : ''} decoding="async">`
  const stores = P.play || P.amazon
    ? `<div class="btn-row">${P.play ? `<a class="btn btn-play" href="${P.play}" rel="noopener">${ICON.storePlay}<span class="two"><small>GET IT ON</small>Google Play</span></a>` : ''}${P.amazon ? `<a class="btn btn-amazon" href="${P.amazon}" rel="noopener">${ICON.storeBag}<span class="two"><small>AVAILABLE AT</small>Amazon Appstore</span></a>` : ''}</div>`
    : `<p class="hero-note">Coming soon to Google Play and the Amazon Appstore.</p>`
  const slides = SCREENS.map(([key, name, text, alt], i) => `
      <figure class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${SCREENS.length}: ${name}">
        <div class="shot">${shot(key, alt, i !== 0)}</div>
        <figcaption><strong>${name}</strong><span>${text}</span></figcaption>
      </figure>`).join('')

  page('downabit-player/', {
    title: 'Downabit Player | Your Telegram films and music on the TV',
    description: 'Downabit Player plays the videos and music in your Telegram chats, channels and groups on Android TV, Google TV and Fire TV, streamed as they play.',
    nav: 'downabitplayer', sub: 'overview', app: 'downabitplayer',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [ORG, {
        '@type': 'SoftwareApplication',
        name: 'Downabit Player',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Android TV, Google TV, Fire OS',
        url: SITE.url + '/downabit-player/',
        image: SITE.url + '/assets/downabitplayer-icon-256.png',
        publisher: { '@id': ORG['@id'] },
        offers: [
          { '@type': 'Offer', price: '2.99', priceCurrency: 'USD', description: 'Monthly subscription with a 7-day free trial' },
          { '@type': 'Offer', price: '29.99', priceCurrency: 'USD', description: 'Yearly subscription' },
        ],
        privacyPolicy: SITE.url + '/downabit-player/privacy/',
      }],
    },
    body: `
<section class="container app-hero">
  <div>
    <img class="icon" src="/assets/downabitplayer-icon-256.png" alt="Downabit Player icon" width="84" height="84">
    <span class="eyebrow">Android TV &middot; Google TV &middot; Fire TV</span>
    <h1 class="gradient-text">Downabit Player</h1>
    <p class="lead">The videos and music in your own Telegram chats, channels and groups, on the big screen. They stream as they play: nothing is copied to the TV first.</p>
    ${stores}
    <p class="hero-note">7-day free trial &middot; No ads &middot; No tracking</p>
  </div>
  <div class="tv"><div class="tv-screen">${shot('player', 'Downabit Player on a TV: a family film playing, with the Audio and Subtitles buttons', false)}</div></div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">The player</span><h2>Your Telegram, made for the remote</h2></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.stream}</div><h3>Streams as it plays</h3><p>Nothing is copied to the TV first, so it works even on a TV with little memory and storage.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.play}</div><h3>Pictures along the film</h3><p>Move along the film and a strip of pictures shows where you will land. Jump there and it plays straight away.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.remote}</div><h3>Picks up where you stopped</h3><p>Recently watched keeps every film you started and did not finish. Press OK to continue.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.heart}</div><h3>Favourites</h3><p>Hold OK on a chat, a film or a song to keep it at hand in Favourites.</p></div>
      <div class="glass feature reveal"><div class="ico">${search}</div><h3>Search every chat</h3><p>Find a film or a song across all your chats, channels and groups at once.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.text}</div><h3>Subtitles your way</h3><p>Choose the audio track and subtitles, the languages a film starts with, and the subtitle size, colour and background, with a live preview.</p></div>
    </div>
  </div>
</section>

<section class="section" id="screens">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Screens</span><h2>See it on the TV</h2><p>Real screens from Downabit Player, with the demo account's sample films.</p></div>
    <div class="carousel reveal" data-carousel role="region" aria-roledescription="carousel" aria-label="Downabit Player screens">
      <div class="carousel-track" tabindex="0" aria-label="Screens: left and right arrow keys move between them">${slides}
      </div>
      <div class="carousel-controls">
        <button class="carousel-btn" type="button" data-prev aria-label="Previous screen">${ICON.prev}</button>
        <div class="carousel-dots"></div>
        <button class="carousel-btn" type="button" data-next aria-label="Next screen">${ICON.next}</button>
        <button class="carousel-btn carousel-pause" type="button" data-pause>Pause</button>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>Music too</h2>
      <p>Songs play with previous and next, shuffle and repeat. The playlist is the chat the song came from, or your search results.</p>
      <h2>The same list on every TV</h2>
      <p>If you like, Recently watched and Favourites follow you from TV to TV through your own Google account. Sign in with Google by scanning a code with your phone; the list is kept in one file in your own Google Drive. It is optional, and the app works fully without it.</p>
      <h2>Your favourite player</h2>
      <p>Prefer VLC or MX Player? Downabit Player can hand a film to either of them.</p>
      <h2>Look around first</h2>
      <p>No Telegram account is needed to try it: the demo account has sample films to play.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="glass plan-card reveal">
      <span class="eyebrow">Plans</span>
      <div class="trial gradient-text">7 days free</div>
      <p>Downabit Player is a subscription: $2.99 a month, starting with a 7-day free trial, or $29.99 a year. It is billed by Google Play or the Amazon Appstore and renews until you cancel. Cancel any time in the store.</p>
      <div class="plan-points"><span class="tag">$2.99 a month</span><span class="tag">$29.99 a year</span><span class="tag">Cancel any time</span></div>
      <div class="btn-row" style="justify-content:center"><a class="btn btn-glass" href="/downabit-player/support/#subscription">Manage your subscription ${ICON.arrow}</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <dl class="facts glass prose-block reveal">
      <div><dt>Devices</dt><dd>Android TV, Google TV and Fire TV</dd></div>
      <div><dt>Price</dt><dd>$2.99 a month with a 7-day free trial, or $29.99 a year</dd></div>
      <div><dt>Languages</dt><dd>English and Hebrew</dd></div>
      <div><dt>Ads and tracking</dt><dd>None. <a href="/downabit-player/privacy/">Privacy policy</a></dd></div>
    </dl>
    <p class="muted" style="margin-top:24px;font-size:13px;text-align:center">Telegram is a trademark of Telegram FZ-LLC. VLC is a trademark of VideoLAN. MX Player is a trademark of its respective owner. Google Drive, Google TV and Google Play are trademarks of Google LLC. Amazon, Fire TV and the Amazon Appstore are trademarks of Amazon.com, Inc. Downabit Player is not affiliated with, endorsed by or sponsored by any of them.</p>
  </div>
</section>
${more}`,
  })

  page('downabit-player/privacy/', {
    title: 'Downabit Player privacy policy',
    description: 'What Downabit Player does with your information: nothing is sent to us, no ads, no analytics, no tracking.',
    nav: 'downabitplayer', sub: 'privacy', app: 'downabitplayer',
    body: doc(`
<h1>Downabit Player privacy policy</h1>
<p class="updated">Last updated: ${P.updated}</p>

<p>Downabit Player is an app for Android TV, Google TV and Amazon Fire TV, made by ${SITE.name} ("we", "us"). It plays the videos and music in your own Telegram chats, channels and groups. This policy explains what information the app uses, where it goes, and the choices you have. It applies to every version of Downabit Player, including those installed from Google Play and the Amazon Appstore.</p>
<div class="note"><strong>In short:</strong> You have no account with us. Downabit Player shows no ads, contains no analytics and no tracking, and sends nothing to any server of ours.</div>

<h2>1. Your Telegram account</h2>
<p>You sign in to Telegram on the TV. The app uses Telegram's official library (TDLib), so your login and your chats go between the TV and Telegram only, and are kept on the TV. We never see them. Logging out in Settings removes the login from that TV. Telegram's own privacy policy applies to your Telegram account: <a href="${P.telegramPrivacy}">${P.telegramPrivacy}</a>.</p>

<h2>2. Films and music</h2>
<p>Films and music are streamed from Telegram and kept on the TV only while they play. They are deleted from the TV when the player closes; anything left behind, for example when the app was closed in the middle of a film, is deleted the next time the app starts. Small pictures, such as chat photos and thumbnails, are kept on the TV so lists load quickly.</p>

<h2>3. Watch history and favourites</h2>
<p>Where each film stopped (Recently watched) and your favourites are stored on the TV.</p>

<h2>4. Google sync (optional)</h2>
<p>If you switch on Google sync, you sign in with Google by scanning a code with your phone. The app asks Google for permission to see only the files it creates in your Google Drive, and for your e-mail address, which it shows so you know which account is used.</p>
<p>The app keeps one file in your own Google Drive, "Downabit Player - watch history.json". It holds your watch history (chat and message numbers, where each film stopped and how long it is, the film title, the chat title and your Telegram account number) and your favourites (chat and message numbers and titles). The file stays in your Google Drive: we never receive it. You can sign out in Settings &gt; Google sync and delete the file from your Google Drive at any time. Google's privacy policy applies to your Google account: <a href="${P.googlePrivacy}">Google</a>.</p>

<h2>5. Playing in VLC or MX Player</h2>
<p>When you choose to play a film in VLC or MX Player, Downabit Player gives that app a link that exists only inside the TV.</p>

<h2>6. Subscriptions and payments</h2>
<p>Subscriptions are sold and billed by Google Play or the Amazon Appstore. We never receive your card or billing details. The app only receives from the store whether your subscription is active. Store privacy policies apply to purchases: <a href="${P.googlePrivacy}">Google</a>, <a href="${P.amazonPrivacy}">Amazon</a>.</p>

<h2>7. What we collect</h2>
<p>We collect nothing. Downabit Player has no account with us, no ads, no analytics, no tracking and no server of ours that receives your data. We do not sell, rent or share personal data, because we do not have any.</p>

<h2>8. Children</h2>
<p>Downabit Player is not directed at children.</p>

<h2>9. Deleting your data</h2>
<p>Log out in Settings to remove your Telegram login from the TV. If you use Google sync, sign out in Settings &gt; Google sync and delete "Downabit Player - watch history.json" from your Google Drive. Uninstall the app to remove everything it stored on the TV.</p>

<h2>10. Changes</h2>
<p>If this policy changes, the new version is published on this page with a new date.</p>

<h2>11. Contact</h2>
<p>Questions about privacy: ${mail}.</p>`),
  })

  const qa = (q, a) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`
  page('downabit-player/support/', {
    title: 'Downabit Player support',
    description: 'Help with Downabit Player: playing films and music, subtitles, favourites, Google sync, the subscription and how to cancel it, and contact details.',
    nav: 'downabitplayer', sub: 'support', app: 'downabitplayer',
    body: doc(`
<h1>Downabit Player support</h1>
<p class="updated">Write to us and we will help.</p>
<div class="contact-grid">
  <div class="glass"><strong>Email</strong><p>${mail}</p></div>
  <div class="glass"><strong>Please include</strong><p class="muted">Your TV model and what you see on the screen. A photo of the screen helps.</p></div>
</div>

<h2>Questions and answers</h2>
<div class="faq">
${[
  qa('What do I need?', 'A Telegram account and a TV with Android TV, Google TV or Fire TV. To look around first, choose the demo account: it has sample films and needs no Telegram account.'),
  qa('Does it copy films to the TV?', 'No. Films and music stream from Telegram as they play, so Downabit Player works even on a TV with little memory and storage. What was streamed is deleted when the player closes.'),
  qa('How do I continue a film?', 'Open Recently watched and press OK on the film: it continues where you stopped. Hold OK to take a film off the list or add it to your favourites.'),
  qa('How do I add a favourite?', 'Hold OK on a chat, a film or a song. Favourites keeps them at hand; hold OK there to take one off.'),
  qa('How do I find a film?', 'Search looks through all your chats, channels and groups at once.'),
  qa('How do I change the subtitles or the audio track?', 'During a film, press Down and choose Audio or Subtitles. In Settings &gt; Subtitles &amp; audio you choose the languages a film starts with, and the subtitle size, colour and background, with a live preview.'),
  qa('Can it play music?', 'Yes. Songs play with previous and next, shuffle and repeat. The playlist is the chat the song came from, or your search results.'),
  qa('Can I have the same list on two TVs?', 'Yes, with Google sync in Settings. Sign in with Google on each TV by scanning the code with your phone; Recently watched and Favourites are kept in one file in your own Google Drive. The <a href="/downabit-player/privacy/">privacy policy</a> says what the file holds.'),
  qa('Can I play a film in VLC or MX Player?', 'Yes. Downabit Player can hand a film to VLC or MX Player.'),
  qa('Which languages does the app speak?', 'English and Hebrew.'),
  qa('How much does it cost?', '$2.99 a month, starting with a 7-day free trial, or $29.99 a year, through Google Play or the Amazon Appstore. The subscription renews until you cancel it.'),
  qa('I subscribed but the app still shows the plans.', 'The subscription comes from the store account the TV uses. Make sure the TV is signed in to the same Google or Amazon account you subscribed with, then open Downabit Player again.'),
].join('\n')}
</div>

<h2 id="subscription">Manage or cancel your subscription</h2>
<p>The subscription renews until you cancel it. Cancel any time in the store you subscribed with:</p>
<div class="contact-grid">
  <div class="glass"><strong>Google Play</strong><p class="muted">Android TV and Google TV. Open <a href="${P.playSubscriptions}">Google Play subscriptions</a> on your phone or computer, signed in with the same Google account as the TV, choose Downabit Player and cancel.</p></div>
  <div class="glass"><strong>Amazon Appstore</strong><p class="muted">Fire TV. Open <a href="${P.amazonSubscriptions}">Your Subscriptions on Amazon</a>, or on the Fire TV go to Settings &gt; Applications &gt; Appstore &gt; Subscriptions, choose Downabit Player and cancel.</p></div>
</div>
<p>After you cancel, Downabit Player keeps working until the end of the period you already paid for. Refunds are handled by the store.</p>`),
  })
}
