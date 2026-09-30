// Shmerling Radio: overview, privacy policy and support (called from build.mjs).
// Store links are added once the app is live in each store; until then the pages say "coming soon".

export const RADIO = {
  play: '',   // https://play.google.com/store/apps/details?id=app.shmerling.radio once it is published
  amazon: '', // https://www.amazon.com/dp/<ASIN> once it is live
  playSubscriptions: 'https://play.google.com/store/account/subscriptions',
  amazonSubscriptions: 'https://www.amazon.com/gp/mas/your-account/myapps/yoursubscriptions',
  directory: 'https://www.radio-browser.info',
  googlePrivacy: 'https://policies.google.com/privacy',
  amazonPrivacy: 'https://www.amazon.com/privacy',
  updated: '30 September 2026', // "last updated" date of its privacy policy
}

// Screens in the carousel: [file key, name, caption, alt text]. The home screen is the hero picture.
const SCREENS = [
  ['home', 'Home', 'Recently played, your favourites, stations near you and what is popular now.', 'The home screen: recently played and favourite stations, with a song playing in the mini player'],
  ['now-playing', 'Now playing', 'The song the station announces, with previous, next, stop, favourite and the sleep timer.', 'Now playing: a station with the song title, the player buttons and the sleep timer'],
  ['browse', 'Browse', 'By country, by genre or by language.', 'Browse: countries with the number of stations in each'],
  ['search', 'Search', 'Type a few letters and every station with that name appears.', 'Search results for the word jazz, with each station country, genre and bitrate'],
  ['my-radio', 'My radio', 'Favourites, recently played, and the songs you heard.', 'My radio: favourites, recently played stations and songs heard'],
]

export function buildRadio({ page, doc, mail, ICON, SITE, ORG, svg, more = '' }) {
  const P = RADIO
  const search = svg('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>')
  const shot = (key, alt, lazy = true) =>
    `<img src="/radio/media/${key}-1600.webp" srcset="/radio/media/${key}-960.webp 960w, /radio/media/${key}-1600.webp 1600w" sizes="(max-width: 960px) 88vw, 860px" alt="${alt}" width="1600" height="900"${lazy ? ' loading="lazy"' : ''} decoding="async">`
  const stores = P.play || P.amazon
    ? `<div class="btn-row">${P.play ? `<a class="btn btn-play" href="${P.play}" rel="noopener">${ICON.storePlay}<span class="two"><small>GET IT ON</small>Google Play</span></a>` : ''}${P.amazon ? `<a class="btn btn-amazon" href="${P.amazon}" rel="noopener">${ICON.storeBag}<span class="two"><small>AVAILABLE AT</small>Amazon Appstore</span></a>` : ''}</div>`
    : `<p class="hero-note">Coming soon to Google Play and the Amazon Appstore.</p>`
  const slides = SCREENS.map(([key, name, text, alt], i) => `
      <figure class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${SCREENS.length}: ${name}">
        <div class="shot">${shot(key, alt, i !== 0)}</div>
        <figcaption><strong>${name}</strong><span>${text}</span></figcaption>
      </figure>`).join('')

  page('radio/', {
    title: 'Shmerling Radio | Radio stations from all over the world on your TV and phone',
    description: 'Shmerling Radio plays radio stations from all over the world on Android TV, Google TV, Fire TV, Android phones and tablets. Browse by country, genre or language, keep favourites, no account needed.',
    nav: 'radio', sub: 'overview', app: 'radio',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [ORG, {
        '@type': 'SoftwareApplication',
        name: 'Shmerling Radio',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Android TV, Google TV, Fire OS, Android',
        url: SITE.url + '/radio/',
        image: SITE.url + '/assets/shmerlingradio-icon-256.png',
        publisher: { '@id': ORG['@id'] },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free, with an optional Pro subscription' },
        privacyPolicy: SITE.url + '/radio/privacy/',
      }],
    },
    body: `
<section class="container app-hero">
  <div>
    <img class="icon" src="/assets/shmerlingradio-icon-256.png" alt="Shmerling Radio icon" width="84" height="84">
    <span class="eyebrow">Android TV &middot; Google TV &middot; Fire TV &middot; Android</span>
    <h1 class="gradient-text">Shmerling Radio</h1>
    <p class="lead">Radio stations from all over the world, on the big screen and in your pocket. Pick a country, a genre or a language, press OK, and listen. No account needed.</p>
    ${stores}
    <p class="hero-note">Free to use &middot; No ad networks &middot; No tracking</p>
  </div>
  <div class="tv"><div class="tv-screen">${shot('home', 'Shmerling Radio on a TV: recently played and favourite stations, with a song playing', false)}</div></div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">The radio</span><h2>Made for the remote, and for the phone</h2></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.stream}</div><h3>Stations from everywhere</h3><p>The stations come from the open radio-browser.info directory, kept by its community: tens of thousands of them, in every country.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.play}</div><h3>Browse your way</h3><p>By country, by genre or by language, or see what is near you and what is popular now.</p></div>
      <div class="glass feature reveal"><div class="ico">${search}</div><h3>Search</h3><p>Type a few letters and every station with that name appears, with its country, genre and quality.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.heart}</div><h3>Favourites and history</h3><p>Hold OK on a station to keep it. Recently played is always one press away.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.remote}</div><h3>Made for the remote</h3><p>Big buttons, short lists. Hold Back anywhere to jump to the player, and Left goes back to the menu.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.text}</div><h3>The song that is playing</h3><p>The title the station announces is shown on the screen and in the notification on a phone.</p></div>
    </div>
  </div>
</section>

<section class="section" id="screens">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Screens</span><h2>See it on the TV</h2><p>Real screens from Shmerling Radio on an Android TV.</p></div>
    <div class="carousel reveal" data-carousel role="region" aria-roledescription="carousel" aria-label="Shmerling Radio screens">
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
  <div class="container">
    <div class="glass plan-card reveal">
      <span class="eyebrow">Free and Pro</span>
      <div class="trial gradient-text">Free to listen</div>
      <p>The free app plays the low-bitrate stations, keeps 10 favourites and shows the last 10 stations you played. It shows a card for one of our other apps from time to time, and never an ad network.</p>
      <p><strong>Pro</strong> is a monthly or yearly subscription with a 7-day free trial. The price is shown in your store. It gives you:</p>
      <div class="plan-points"><span class="tag">Every station, in full quality</span><span class="tag">Google sync between your devices</span><span class="tag">Sleep timer</span><span class="tag">Unlimited favourites</span><span class="tag">A longer history</span><span class="tag">Songs I heard</span><span class="tag">Add your own stations</span><span class="tag">Start where you left off</span><span class="tag">No cards</span></div>
      <p>It is billed by Google Play or the Amazon Appstore and renews until you cancel. Cancel any time in the store.</p>
      <div class="btn-row" style="justify-content:center"><a class="btn btn-glass" href="/radio/support/#subscription">Manage your subscription ${ICON.arrow}</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>The same lists on every device</h2>
      <p>With Pro you can have your favourites, history and songs on every device signed in to the same Google account. Sign in with Google by scanning a code with your phone; the lists are kept in one file in your own Google Drive. It is optional.</p>
      <h2>A station the directory does not have</h2>
      <p>With Pro, add a station by the address of its stream. It is kept with your favourites.</p>
      <h2>Fall asleep to the radio</h2>
      <p>With Pro, the sleep timer stops the music after 15, 30, 60 or 90 minutes.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <dl class="facts glass prose-block reveal">
      <div><dt>Devices</dt><dd>Android TV, Google TV, Fire TV, and Android phones and tablets</dd></div>
      <div><dt>Price</dt><dd>Free. Pro is a monthly or yearly subscription with a 7-day free trial</dd></div>
      <div><dt>Stations</dt><dd>The open <a href="${P.directory}" rel="noopener">radio-browser.info</a> directory</dd></div>
      <div><dt>Ads and tracking</dt><dd>No ad networks, no analytics, no tracking. <a href="/radio/privacy/">Privacy policy</a></dd></div>
    </dl>
    <p class="muted" style="margin-top:24px;font-size:13px;text-align:center">Radio station names and logos belong to their owners. radio-browser.info is a community project. Google Drive, Google TV and Google Play are trademarks of Google LLC. Amazon, Fire TV and the Amazon Appstore are trademarks of Amazon.com, Inc. Shmerling Radio is not affiliated with, endorsed by or sponsored by any of them.</p>
  </div>
</section>
${more}`,
  })

  page('radio/privacy/', {
    title: 'Shmerling Radio privacy policy',
    description: 'What Shmerling Radio does with your information: no account, no ad network, no analytics, no tracking, nothing is sent to us.',
    nav: 'radio', sub: 'privacy', app: 'radio',
    body: doc(`
<h1>Shmerling Radio privacy policy</h1>
<p class="updated">Last updated: ${P.updated}</p>

<p>Shmerling Radio is an app for Android TV, Google TV, Amazon Fire TV and Android phones and tablets, made by ${SITE.name} ("we", "us"). It plays radio stations from the open radio-browser.info directory. This policy explains what information the app uses, where it goes, and the choices you have. It applies to every version of Shmerling Radio, including those installed from Google Play and the Amazon Appstore.</p>
<div class="note"><strong>In short:</strong> You have no account with us. Shmerling Radio contains no ad network, no analytics and no tracking, and sends nothing to any server of ours.</div>

<h2>1. The station directory</h2>
<p>The list of stations, the countries, genres and languages, and your searches come from the radio-browser.info directory (<a href="${P.directory}" rel="noopener">${P.directory}</a>), a community project that runs several servers. When you browse or search, the app asks one of those servers, and the server sees your IP address and the words you searched for, as any website does. When you start a station, the app tells the directory which station it was, so the directory can rank stations by how much they are played. The directory has its own policy.</p>

<h2>2. The stations themselves</h2>
<p>The sound is streamed directly from the station's own server, which sees your IP address like any website. Station logos are loaded from the stations' own servers too. We are not part of that connection and do not see it.</p>

<h2>3. What stays on your device</h2>
<p>Your favourites, recently played stations, the songs you heard (Pro), the stations you added yourself (Pro) and the app's settings are stored on your device only. "Near you" uses the country of your device's language settings; the app does not ask for your location.</p>

<h2>4. Google sync (optional, Pro)</h2>
<p>If you switch on Google sync, you sign in with Google by scanning a code with your phone. The app asks Google for permission to see only the files it creates in your Google Drive, and for your e-mail address, which it shows so you know which account is used.</p>
<p>The app keeps one file in your own Google Drive, "Shmerling Radio - library.json". It holds your favourites, your recently played stations and the songs you heard, with the station addresses and the times. The file stays in your Google Drive: we never receive it. You can sign out in Settings &gt; Google sync and delete the file from your Google Drive at any time. Google's privacy policy applies to your Google account: <a href="${P.googlePrivacy}">Google</a>.</p>

<h2>5. Songs</h2>
<p>Stations announce the title of the song that is playing. With Pro the app keeps a list of them on your device. Only when you choose a song in that list does the app open a web search for its title in your browser.</p>

<h2>6. Subscriptions and payments</h2>
<p>Pro is sold and billed by Google Play or the Amazon Appstore. We never receive your card or billing details. The app only receives from the store whether your subscription is active. Store privacy policies apply to purchases: <a href="${P.googlePrivacy}">Google</a>, <a href="${P.amazonPrivacy}">Amazon</a>.</p>

<h2>7. Cards for our other apps</h2>
<p>The free app shows a card for one of our other apps from time to time. It is our own picture and text stored inside the app: no ad network is contacted, and nothing about you is sent anywhere. You can say you are not interested in an app, and Pro has no cards.</p>

<h2>8. What we collect</h2>
<p>We collect nothing. Shmerling Radio has no account with us, no analytics, no tracking and no server of ours that receives your data. We do not sell, rent or share personal data, because we do not have any.</p>

<h2>9. Children</h2>
<p>Shmerling Radio is not directed at children.</p>

<h2>10. Deleting your data</h2>
<p>Clear your history and songs in My radio, or remove favourites one by one. If you use Google sync, sign out in Settings &gt; Google sync and delete "Shmerling Radio - library.json" from your Google Drive. Uninstall the app to remove everything it stored on the device.</p>

<h2>11. Changes</h2>
<p>If this policy changes, the new version is published on this page with a new date.</p>

<h2>12. Contact</h2>
<p>Questions about privacy: ${mail}.</p>`),
  })

  const qa = (q, a) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`
  page('radio/support/', {
    title: 'Shmerling Radio support',
    description: 'Help with Shmerling Radio: finding and playing stations, favourites, the sleep timer, Google sync, Pro and how to cancel it, and contact details.',
    nav: 'radio', sub: 'support', app: 'radio',
    body: doc(`
<h1>Shmerling Radio support</h1>
<p class="updated">Write to us and we will help.</p>
<div class="contact-grid">
  <div class="glass"><strong>Email</strong><p>${mail}</p></div>
  <div class="glass"><strong>Please include</strong><p class="muted">Your device model, the name of the station, and what you see on the screen. A photo of the screen helps.</p></div>
</div>

<h2>Questions and answers</h2>
<div class="faq">
${[
  qa('What do I need?', 'Nothing but the app and an internet connection. There is no account to make.'),
  qa('Where do the stations come from?', 'From the open radio-browser.info directory, kept by its community. If a station is missing or its address is wrong, it can be added or corrected there.'),
  qa('A station does not play.', 'Stations move and stop. Try another one, or the same one a little later. If most stations fail, check the internet connection.'),
  qa('Why do I only see some of the stations in the free app?', 'The free app plays the low-bitrate stations. Pro plays every station, in full quality. A station that needs Pro shows a small "Pro" mark.'),
  qa('How do I keep a station?', 'Hold OK on a station on a TV, or press and hold on a phone, to add it to your favourites. The heart on the Now playing screen does the same. The free app keeps 10 favourites; Pro keeps as many as you like.'),
  qa('How do I get to the player quickly?', 'On a TV, hold Back anywhere, or hold OK on any button, and the focus goes to the player at the bottom. Press Left there to return to the menu.'),
  qa('What is the sleep timer?', 'It stops the music after 15, 30, 60 or 90 minutes. It is on the Now playing screen and is part of Pro.'),
  qa('Can I add a station that is not in the list?', 'Yes, with Pro: My radio &gt; Add a station by its address. Type a name and the web address of the stream.'),
  qa('Can I have the same favourites on two devices?', 'Yes, with Pro and Google sync in Settings. Sign in with Google on each device by scanning the code with your phone; your lists are kept in one file in your own Google Drive. The <a href="/radio/privacy/">privacy policy</a> says what the file holds.'),
  qa('What are "Songs I heard"?', 'With Pro, the app keeps the titles the stations announce while you listen. Choose one to search for it on the web.'),
  qa('How much does Pro cost?', 'The price is shown in Google Play or the Amazon Appstore. It is a monthly or yearly subscription that starts with a 7-day free trial and renews until you cancel it.'),
  qa('I subscribed but the app still says Free.', 'The subscription comes from the store account the device uses. Make sure the device is signed in to the same Google or Amazon account you subscribed with, then open Shmerling Radio again.'),
].join('\n')}
</div>

<h2 id="subscription">Manage or cancel your subscription</h2>
<p>The subscription renews until you cancel it. Cancel any time in the store you subscribed with:</p>
<div class="contact-grid">
  <div class="glass"><strong>Google Play</strong><p class="muted">Android TV, Google TV and Android phones. Open <a href="${P.playSubscriptions}">Google Play subscriptions</a> on your phone or computer, signed in with the same Google account, choose Shmerling Radio and cancel.</p></div>
  <div class="glass"><strong>Amazon Appstore</strong><p class="muted">Fire TV. Open <a href="${P.amazonSubscriptions}">Your Subscriptions on Amazon</a>, or on the Fire TV go to Settings &gt; Applications &gt; Appstore &gt; Subscriptions, choose Shmerling Radio and cancel.</p></div>
</div>
<p>After you cancel, Pro keeps working until the end of the period you already paid for. Refunds are handled by the store.</p>`),
  })
}
