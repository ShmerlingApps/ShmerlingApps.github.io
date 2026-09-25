// Builds every page of the Shmerling Apps site into plain HTML (run: node build.mjs).
// The output is committed as it is: GitHub Pages serves it without any build step.
// Change the contact email or a store link here, run the script again, commit.
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildGuides } from './guides.mjs'

const ROOT = dirname(fileURLToPath(import.meta.url))

const SITE = {
  name: 'Shmerling Apps',
  url: 'https://shmerling.app',          // the custom domain (CNAME); paths below are root-relative
  email: 'support@shmerling.app',       // shown on every page; stores require a working contact address
  updated: '25 September 2026',        // "last updated" date of the legal pages
  isoUpdated: '2026-09-25',            // same date for the sitemap
  year: 2026,
}

const DOWNABIT = {
  play: 'https://play.google.com/store/apps/details?id=app.shmerling.downabit',
  // Replace with the app's own Amazon page once it is live (it has an ASIN only after publishing).
  amazon: 'https://www.amazon.com/s?k=Downabit&i=mobile-apps',
  playSubscriptions: 'https://play.google.com/store/account/subscriptions',
  amazonSubscriptions: 'https://www.amazon.com/gp/mas/your-account/myapps/yoursubscriptions',
}

const EXT = {
  telegramPrivacy: 'https://telegram.org/privacy',
  telegramDelete: 'https://my.telegram.org/deactivate',
  googleConnections: 'https://myaccount.google.com/connections',
  dropboxConnected: 'https://www.dropbox.com/account/connected_apps',
  googlePrivacy: 'https://policies.google.com/privacy',
  dropboxPrivacy: 'https://www.dropbox.com/privacy',
  amazonPrivacy: 'https://www.amazon.com/privacy',
}

const mail = `<a href="mailto:${SITE.email}">${SITE.email}</a>`
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// ---- icons (simple strokes drawn for this site) -------------------------------------------------------------------
const svg = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`
const ICON = {
  send: svg('<path d="M21 3 10 14"/><path d="M21 3 14.5 21l-4.5-7-7-4.5z"/>'),
  folder: svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
  play: svg('<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8"/><path d="m10 8 5 2.5-5 2.5z"/>'),
  cloud: svg('<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5z"/>'),
  stream: svg('<path d="M4 12h11"/><path d="m11 8 4 4-4 4"/><path d="M19 5v14"/>'),
  shield: svg('<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>'),
  remote: svg('<rect x="7" y="2.5" width="10" height="19" rx="5"/><circle cx="12" cy="8" r="1.8"/><path d="M12 13v.01M12 16.5v.01"/>'),
  gauge: svg('<path d="M4.5 17a8.5 8.5 0 1 1 15 0"/><path d="m12 13 3.5-4"/><circle cx="12" cy="13" r="1"/>'),
  globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/>'),
  heart: svg('<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/>'),
  text: svg('<path d="M4 6h16M4 11h16M4 16h10"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  prev: svg('<path d="m15 5-7 7 7 7"/>'),
  next: svg('<path d="m9 5 7 7-7 7"/>'),
  arrow: svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
  playFilled: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4.5v15l13-7.5z"/></svg>',
  storePlay: svg('<path d="M5 3.5v17l14-8.5z"/>'),
  storeBag: svg('<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
}
const BRAND_MARK = `<svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="bm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b8ff0"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#bm)"/><path d="M21 11.2c-.9-1.5-2.7-2.4-4.8-2.4-2.8 0-4.8 1.5-4.8 3.6 0 4.7 9.9 2.6 9.9 7.4 0 2.2-2.1 3.8-5 3.8-2.3 0-4.2-1-5.2-2.7" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>`

const storeButtons = (extra = '') => `<div class="btn-row"${extra}>
  <a class="btn btn-play" href="${DOWNABIT.play}" rel="noopener">${ICON.storePlay}<span class="two"><small>GET IT ON</small>Google Play</span></a>
  <a class="btn btn-amazon" href="${DOWNABIT.amazon}" rel="noopener">${ICON.storeBag}<span class="two"><small>AVAILABLE AT</small>Amazon Appstore</span></a>
</div>`

// ---- page frame -----------------------------------------------------------------------------------------------------
function layout({ path, title, description, nav, sub, body, jsonLd, image = '/assets/og-image.jpg' }) {
  const canonical = SITE.url + '/' + path
  const navItem = (href, label, key) => `<a href="${href}"${nav === key ? ' aria-current="page"' : ''}>${label}</a>`
  const subnav = sub
    ? `<nav class="subnav" aria-label="Downabit pages">${[
        ['/downabit/', 'Overview', 'overview'],
        ['/downabit/guides/', 'Guides', 'guides'],
        ['/downabit/support/', 'Support', 'support'],
        ['/downabit/privacy/', 'Privacy', 'privacy'],
        ['/downabit/terms/', 'Terms', 'terms'],
        ['/downabit/delete-data/', 'Delete data', 'delete'],
        ['/downabit/subscribe/', 'Subscription', 'subscribe'],
      ].map(([h, l, k]) => `<a href="${h}"${sub === k ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>`
    : ''
  const ld = jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n` : ''
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#020617">
<meta name="color-scheme" content="dark">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE.url}${image}">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap">
<link rel="stylesheet" href="/assets/site.css">
${ld}<script src="/assets/site.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="bg-glow" aria-hidden="true"></div>
<header class="navbar">
  <div class="inner">
    <a class="brand" href="/">${BRAND_MARK}${SITE.name}</a>
    <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">${ICON.menu}</button>
    <nav class="nav-links" id="nav-links" aria-label="Main">
      ${navItem('/', 'Home', 'home')}
      ${navItem('/apps/', 'Apps', 'apps')}
      ${navItem('/downabit/', 'Downabit', 'downabit')}
      ${navItem('/downabit/guides/', 'Guides', 'guides')}
      ${navItem('/downabit/support/', 'Support', 'support')}
    </nav>
  </div>
</header>
<main id="main">
${sub ? `<div class="container narrow doc-wrap">${subnav}</div>` : ''}
${body}
</main>
<footer class="footer">
  <div class="container">
    <div class="cols">
      <div class="about">
        <a class="brand" href="/">${BRAND_MARK}${SITE.name}</a>
        <p>Small, careful apps for the big screen. No ads, no tracking, written in plain words.</p>
        <p>${mail}</p>
      </div>
      <div><h4>Apps</h4><ul><li><a href="/downabit/">Downabit</a></li><li><a href="/apps/">All apps</a></li></ul></div>
      <div><h4>Downabit</h4><ul>
        <li><a href="/downabit/guides/">Connection guides</a></li>
        <li><a href="/downabit/support/">Support</a></li>
        <li><a href="/downabit/subscribe/">Subscription</a></li>
        <li><a href="/downabit/privacy/">Privacy policy</a></li>
        <li><a href="/downabit/terms/">Terms of use</a></li>
        <li><a href="/downabit/delete-data/">Delete your data</a></li>
      </ul></div>
      <div><h4>Get the app</h4><ul>
        <li><a href="${DOWNABIT.play}" rel="noopener">Google Play</a></li>
        <li><a href="${DOWNABIT.amazon}" rel="noopener">Amazon Appstore</a></li>
      </ul></div>
    </div>
    <div class="bottom"><span>&copy; ${SITE.year} ${SITE.name}. All rights reserved.</span><span><a href="/downabit/privacy/">Privacy</a> &middot; <a href="/downabit/terms/">Terms</a></span></div>
  </div>
</footer>
</body>
</html>
`
}

const pages = {}
const sitemap = []
function page(path, opts) {
  pages[path + (path === '' || path.endsWith('/') ? 'index.html' : '')] = layout({ path, ...opts })
  sitemap.push(SITE.url + '/' + path)
}

const ORG = { '@type': 'Organization', '@id': SITE.url + '/#org', name: SITE.name, url: SITE.url + '/', email: SITE.email, logo: SITE.url + '/assets/apple-touch-icon.png' }

// ---- Home -------------------------------------------------------------------------------------------------------------
const downabitCard = `
<a class="glass app-card reveal" href="/downabit/">
  <img src="/assets/downabit-icon-256.png" alt="" width="64" height="64">
  <h3>Downabit</h3>
  <p>Your family's photos and videos, from your private Telegram channel to the TV, a USB drive, your NAS or the cloud.</p>
  <div class="tags"><span class="tag">Android TV</span><span class="tag">Google TV</span><span class="tag">Fire TV</span></div>
  <span class="btn btn-glass more">Learn more ${ICON.arrow}</span>
</a>`

page('', {
  title: 'Shmerling Apps | Apps for the big screen',
  description: 'Small, careful apps for Android TV, Google TV and Fire TV. Home of Downabit: your family videos from Telegram to the TV.',
  nav: 'home',
  jsonLd: { '@context': 'https://schema.org', '@graph': [ORG, { '@type': 'WebSite', name: SITE.name, url: SITE.url + '/', publisher: { '@id': ORG['@id'] } }] },
  body: `
<section class="hero">
  <div class="container">
    <span class="eyebrow">Apps for the big screen</span>
    <h1 class="gradient-text">Made for the remote.<br>Respectful of your files.</h1>
    <p class="lead">Shmerling Apps builds small, careful apps for Android TV, Google TV and Fire TV. No ads, no tracking, and every screen says what will happen before it happens.</p>
    <div class="btn-row"><a class="btn btn-play" href="/apps/">See our apps ${ICON.arrow}</a><a class="btn btn-glass" href="mailto:${SITE.email}">${ICON.mail} Contact us</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><h2>Our apps</h2><p>Each one does one job well, on the biggest screen in the house.</p></div>
    <div class="apps-grid">${downabitCard}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><h2>How we build</h2></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.shield}</div><h3>Your files stay yours</h3><p>No ads, no tracking, no analytics. Our apps do not send your data to us, because we do not want it.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.remote}</div><h3>Made for the remote</h3><p>Short lists, big buttons, codes you scan with your phone and very little typing.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.text}</div><h3>Plain language</h3><p>Clear words instead of error codes, in 30 languages, with right-to-left support.</p></div>
    </div>
  </div>
</section>`,
})

// ---- Apps -------------------------------------------------------------------------------------------------------------
page('apps/', {
  title: 'Apps | Shmerling Apps',
  description: 'All apps by Shmerling Apps, with their store links, privacy policies and support.',
  nav: 'apps',
  body: `
<section class="hero">
  <div class="container">
    <span class="eyebrow">Apps</span>
    <h1 class="gradient-text">Everything we make</h1>
    <p class="lead">Store links, privacy policy and support for every app, in one place.</p>
  </div>
</section>
<section class="section" style="padding-top:40px">
  <div class="container">
    <div class="apps-grid">${downabitCard}</div>
  </div>
</section>`,
})

// ---- Downabit ---------------------------------------------------------------------------------------------------------
const FAQ = [
  ['What do I need to use Downabit?', 'A Telegram account, and a TV with Android TV or Google TV (Android 7.0 or newer) or an Amazon Fire TV with Fire OS 5 or newer. Downabit creates a private channel in your Telegram account; you send files there from your phone.'],
  ['Where can I save files?', 'On the TV itself, a USB drive, a Windows share or NAS on your home network (SMB), a WebDAV server, Google Drive or Dropbox. You choose for every file.'],
  ['Does Downabit see my chats or my files?', 'No. Downabit only reads the private channel it creates for you, and files move straight from Telegram to the place you choose. Nothing is sent to us: there are no ads, no analytics and no tracking.'],
  ['How much does it cost?', 'Downabit is free to download. Using it needs a monthly or yearly subscription, and every plan starts with a 7-day free trial. Prices are shown in the app in your currency. Cancel any time in Google Play or the Amazon Appstore.'],
  ['Which Fire TV devices are supported?', 'Fire TV devices with Fire OS 5 or newer. Fire TV devices running Vega OS, such as the Fire TV Stick 4K Select and the Fire TV Stick HD (2nd generation), cannot run Android apps.'],
  ['My TV has little storage. Can I still save a film?', 'Yes. Large files stream straight to their destination, so a stick with little free space can pass a film on to your NAS or cloud account without keeping it.'],
]

const SCREENS = [
  ['cloud', 'Cloud and network', 'Connect Google Drive, Dropbox, WebDAV or a network share by scanning a code with your phone.', 'Cloud and network settings listing Google Drive, a network share and Dropbox'],
  ['storage', 'Storage on the TV', 'Free space is checked before every download, and old files are one press away.', 'Storage on TV settings showing the free space'],
  ['speed', 'Internet speed', 'A daily speed test sets the download limits, or pick your own.', 'Internet speed settings with the measured download speed'],
  ['language', '30 languages', 'Choose the app language, including right-to-left languages.', 'Language settings with the list of languages'],
]
const slides = SCREENS.map(([key, name, text, alt], i) => `
      <figure class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${SCREENS.length}: ${name}">
        <div class="shot"><img src="/downabit/media/screens/${key}-1600.webp" srcset="/downabit/media/screens/${key}-960.webp 960w, /downabit/media/screens/${key}-1600.webp 1600w" sizes="(max-width: 960px) 88vw, 860px" alt="${alt}" width="1600" height="900"${i === 0 ? '' : ' loading="lazy"'} decoding="async"></div>
        <figcaption><strong>${name}</strong><span>${text}</span></figcaption>
      </figure>`).join('')

page('downabit/', {
  title: 'Downabit | Family videos from Telegram to your TV',
  description: 'Send a video to your private Telegram channel and watch it on your TV, or keep it on a USB drive, your NAS, Google Drive or Dropbox. For Android TV, Google TV and Fire TV.',
  nav: 'downabit',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      {
        '@type': 'SoftwareApplication',
        name: 'Downabit',
        url: SITE.url + '/downabit/',
        image: SITE.url + '/assets/downabit-icon-256.png',
        description: 'Turns a private Telegram channel into a drop folder for your TV. Saves files to the TV, a USB drive, a network share, WebDAV, Google Drive or Dropbox, and plays them.',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Android TV, Google TV, Fire OS',
        publisher: { '@id': ORG['@id'] },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free download; monthly or yearly subscription with a 7-day free trial' },
        installUrl: DOWNABIT.play,
        privacyPolicy: SITE.url + '/downabit/privacy/',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  },
  body: `
<section class="container app-hero">
  <div>
    <img class="icon" src="/assets/downabit-icon-256.png" alt="Downabit icon" width="84" height="84">
    <span class="eyebrow">Android TV &middot; Google TV &middot; Fire TV</span>
    <h1 class="gradient-text">Downabit</h1>
    <p class="lead">Your family's photos and videos, from your private Telegram channel to the big screen. Send from your phone, watch on the TV, keep it where you like.</p>
    ${storeButtons()}
    <p class="hero-note">7-day free trial &middot; No ads &middot; No tracking</p>
  </div>
  <div class="tv">
    <div class="tv-screen" data-video="/downabit/media/downabit-promo.mp4">
      <picture><source srcset="/downabit/media/downabit-promo-poster.webp" type="image/webp"><img src="/downabit/media/downabit-promo-poster.jpg" alt="A family watching their videos on the TV" width="1920" height="1080" fetchpriority="high"></picture>
      <button class="play-overlay" type="button" aria-label="Play the Downabit video (40 seconds)"><span>${ICON.playFilled}</span></button>
    </div>
    <div class="tv-stand"></div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>What is Downabit?</h2>
      <p>Downabit turns a private Telegram channel into a drop folder for your TV. Send a video, a photo or a document to the channel from any phone or computer, and it is on the TV a moment later, ready to play, or saved where you want it: the TV itself, a USB drive, your NAS, a WebDAV server, Google Drive or Dropbox.</p>
      <p>It is built for the remote control: sign in by scanning a code, connect cloud accounts from your phone, and let a daily speed test pick sensible download limits.</p>
      <dl class="facts">
        <div><dt>Devices</dt><dd>Android TV &amp; Google TV (Android 7.0+), Fire TV (Fire OS 5+)</dd></div>
        <div><dt>Price</dt><dd>Free download, subscription with a 7-day free trial</dd></div>
        <div><dt>Languages</dt><dd>30, including right-to-left</dd></div>
        <div><dt>Ads and tracking</dt><dd>None</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">How it works</span><h2>Three steps, no cables</h2></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.send}</div><h3>1. Send</h3><p>Post a video, photo or document to your private Downabit channel from any Telegram app.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.folder}</div><h3>2. Choose where it goes</h3><p>On the TV, pick where to keep it: the TV, a USB drive, your NAS, WebDAV, Google Drive or Dropbox.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.play}</div><h3>3. Watch</h3><p>Play videos and music and open photos right away, from the TV or straight from where you saved them.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Why Downabit?</span><h2>Everything the big screen needs</h2><p>Built around the TV remote and the way families actually share videos.</p></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.cloud}</div><h3>Every place, one list</h3><p>My files shows every copy, on the TV, a USB drive, your NAS or the cloud, with a badge for each place it is kept.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.stream}</div><h3>Streams big files through</h3><p>Large files go straight to their destination, so a small stick can pass a film on to your NAS.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.gauge}</div><h3>Smart download limits</h3><p>A daily speed test sets the limits for you. Downloads keep going in the background, two at a time.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.shield}</div><h3>Private by design</h3><p>Only your own channel is read. No ads, no analytics, nothing sent to us.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.remote}</div><h3>Made for the remote</h3><p>Sign in and connect accounts by scanning a code with your phone. Almost no typing.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.globe}</div><h3>30 languages</h3><p>From English and Hebrew to Arabic, Russian, Spanish, German and Chinese.</p></div>
    </div>
  </div>
</section>

<section class="section" id="screens">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Screens</span><h2>See it on the TV</h2><p>Real screens from Downabit on Android TV.</p></div>
    <div class="carousel reveal" data-carousel role="region" aria-roledescription="carousel" aria-label="Downabit screens" tabindex="0">
      <div class="carousel-track">${slides}
      </div>
      <div class="carousel-controls">
        <button class="carousel-btn" type="button" data-prev aria-label="Previous screen">${ICON.prev}</button>
        <div class="carousel-dots"></div>
        <button class="carousel-btn" type="button" data-next aria-label="Next screen">${ICON.next}</button>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="showcase reveal">
      <div class="media"><picture><source srcset="/downabit/media/picnic-in-the-park.webp" type="image/webp"><img src="/downabit/media/picnic-in-the-park.jpg" alt="Illustration: a family picnic in the park" width="960" height="540" loading="lazy"></picture></div>
      <div>
        <span class="eyebrow">Share</span>
        <h2>Everyone sends, the TV plays</h2>
        <p>Add grandparents, cousins and friends to your channel. Whatever they post is ready on the TV for the next family evening.</p>
        <ul><li>Works with any Telegram app on phone or computer</li><li>Videos, music, photos and documents</li><li>A notification when a file is ready</li></ul>
      </div>
    </div>
    <div class="showcase flip reveal">
      <div class="media"><picture><source srcset="/downabit/media/beach-day.webp" type="image/webp"><img src="/downabit/media/beach-day.jpg" alt="Illustration: a family day at the beach" width="960" height="540" loading="lazy"></picture></div>
      <div>
        <span class="eyebrow">Keep</span>
        <h2>Your memories, where you keep them</h2>
        <p>Save the summer's videos to your NAS or cloud account instead of filling up the TV. Free space is checked first, and name clashes ask before anything is replaced.</p>
        <ul><li>Network shares are found on your home network</li><li>Google Drive and Dropbox connect from your phone</li><li>Delete from the TV, at the place you saved it</li></ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="glass plan-card reveal">
      <span class="eyebrow">Plans</span>
      <div class="trial gradient-text">7 days free</div>
      <p>Downabit is free to download. Choose a monthly or yearly plan after the trial; prices are shown in the app in your own currency and billed by Google Play or the Amazon Appstore. Cancel any time.</p>
      <div class="plan-points"><span class="tag">Monthly or yearly</span><span class="tag">Cancel any time</span><span class="tag">All features included</span></div>
      <div class="btn-row" style="justify-content:center"><a class="btn btn-glass" href="/downabit/subscribe/">Manage your subscription ${ICON.arrow}</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">FAQ</span><h2>Questions and answers</h2></div>
    <div class="faq reveal">
${FAQ.map(([q, a]) => `      <details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('\n')}
    </div>
    <p class="muted" style="text-align:center;margin-top:24px">Step-by-step <a href="/downabit/guides/">connection guides</a> for every place you can save to, and more help on the <a href="/downabit/support/">support page</a>.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="glass cta reveal">
      <h2>Bring your family videos to the TV</h2>
      <p>Try Downabit free for 7 days on Android TV, Google TV or Fire TV.</p>
      ${storeButtons()}
    </div>
    <p class="muted" style="margin-top:32px;font-size:13px;text-align:center">Telegram is a trademark of Telegram FZ-LLC. Google Drive, Google TV and Google Play are trademarks of Google LLC. Dropbox is a trademark of Dropbox, Inc. Amazon, Fire TV and the Amazon Appstore are trademarks of Amazon.com, Inc. Downabit is not affiliated with, endorsed by or sponsored by any of them. The family pictures are illustrations made for this site.</p>
  </div>
</section>`,
})

// ---- documents (legal and help pages share one frame) -----------------------------------------------------------------
const doc = inner => `
<div class="container narrow">
  <article class="glass doc">
${inner}
  </article>
</div>`

// ---- Privacy policy ---------------------------------------------------------------------------------------------------
page('downabit/privacy/', {
  title: 'Downabit privacy policy',
  description: 'What Downabit does with your information: nothing is sent to us, no ads, no tracking.',
  nav: 'downabit', sub: 'privacy',
  body: doc(`
<h1>Downabit privacy policy</h1>
<p class="updated">Last updated: ${SITE.updated}</p>

<p>Downabit is an app for Android TV, Google TV and Amazon Fire TV, made by ${SITE.name} ("we", "us"). This policy explains what information the app uses, where it goes, and the choices you have. It applies to every version of Downabit, including those installed from Google Play and the Amazon Appstore.</p>
<div class="note"><strong>In short:</strong> Downabit does not send any of your personal data to us. It shows no ads and contains no analytics, crash reporting or tracking. Your files go only where you send them.</div>

<h2>1. Your Telegram account</h2>
<p>Downabit is a Telegram client. When you sign in, the app connects directly to Telegram's servers using Telegram's official library (TDLib). If you sign in with a phone number, the number and the login code are sent to Telegram, not to us. If you sign in with a QR code, no phone number is entered at all. Your Telegram session is stored only on your TV, in storage that other apps cannot read.</p>
<p>Downabit reads only the private channel it creates for you (called "Downabit" unless you rename it) and the files you post there. It does not read your chats, contacts or other channels. Telegram's own privacy policy applies to your Telegram account: <a href="${EXT.telegramPrivacy}">${EXT.telegramPrivacy}</a>.</p>

<h2>2. Your files</h2>
<p>Files move directly from Telegram to the destination you choose: the TV's own storage, a USB drive, a network share or NAS on your home network, a WebDAV server, Google Drive or Dropbox. We never receive, see or store your files. Files you save stay under your control at the destination you chose; when you delete a file in Downabit, it is deleted there.</p>

<h2>3. Storage and cloud accounts</h2>
<p>When you connect a network share, a WebDAV server, Google Drive or Dropbox, the address, user name, password or access token are stored only on your TV and are used only to reach that destination. Google Drive and Dropbox are linked through their own sign-in pages on your phone; Downabit gets access to its own "Downabit" folder there. Their privacy policies apply to those services: <a href="${EXT.googlePrivacy}">Google</a>, <a href="${EXT.dropboxPrivacy}">Dropbox</a>.</p>

<h2>4. Speed test</h2>
<p>Once a day, and when you press "Test now", Downabit measures your internet speed by downloading test data from public speed-test servers (Cloudflare, Netflix's fast.com and Hetzner) and a file from your own Telegram channel. Like any internet request, these servers see your IP address. No personal data is sent with the test.</p>

<h2>5. Subscriptions and payments</h2>
<p>Subscriptions are sold and billed by Google Play or the Amazon Appstore. We do not receive your card or billing details. The app asks the store whether your subscription is active and remembers the answer on the TV so it keeps working briefly when the store cannot be reached. Store privacy policies apply to purchases: <a href="${EXT.googlePrivacy}">Google</a>, <a href="${EXT.amazonPrivacy}">Amazon</a>.</p>

<h2>6. Permissions the app asks for</h2>
<ul>
  <li><strong>Internet and network state</strong>: to reach Telegram and your destinations, and to find shares on your home network.</li>
  <li><strong>Notifications</strong> and a <strong>foreground service</strong>: to show download progress and keep a download running when you leave the app.</li>
  <li><strong>Photos, videos and music (media)</strong>: to list, play and delete the files in Downabit's own Download/Downabit folder, including files saved before the app was reinstalled. The app reads only that folder.</li>
  <li><strong>Storage</strong> (older Android versions only): to save into the Download folder and onto USB drives.</li>
  <li><strong>All files access</strong> (Amazon and directly installed versions only, optional): to show archives and documents saved before a reinstall. It is never asked for at start and can be left off.</li>
  <li><strong>Install apps</strong>: used only when you press "Install" on an app file you downloaded; Android asks you to confirm every install.</li>
</ul>

<h2>7. What we collect</h2>
<p>We collect nothing. Downabit has no account with us, no analytics, no advertising identifier, no crash reporting and no server that receives your data. We do not sell, rent or share personal data, because we do not have any.</p>

<h2>8. Security</h2>
<p>Connections to Telegram, Google, Dropbox and the speed-test servers are encrypted in transit. Connections to a network share or WebDAV server on your own network use the security that server offers. Sign-in details are kept in the app's private storage on your TV.</p>

<h2>9. Keeping and deleting your data</h2>
<p>Everything Downabit stores stays on your TV until you remove it. Log out in Settings &gt; Account &amp; channel to remove your Telegram sign-in; disconnect a destination in Settings &gt; Cloud &amp; network; uninstall the app to remove everything it stored. Files you saved stay at their destinations until you delete them. See <a href="/downabit/delete-data/">how to delete your data</a> for the full steps, including how to delete a Telegram account.</p>

<h2>10. Children</h2>
<p>Downabit is not directed at children under 13, and we do not knowingly collect information from anyone.</p>

<h2>11. Changes to this policy</h2>
<p>If this policy changes, the new version is published on this page with a new date. Material changes are also described in the app's release notes.</p>

<h2>12. Contact</h2>
<p>Questions about privacy: ${mail}.</p>`),
})

// ---- Terms ------------------------------------------------------------------------------------------------------------
page('downabit/terms/', {
  title: 'Downabit terms of use',
  description: 'The terms for using Downabit, including subscriptions, trials and cancellation.',
  nav: 'downabit', sub: 'terms',
  body: doc(`
<h1>Downabit terms of use</h1>
<p class="updated">Last updated: ${SITE.updated}</p>

<p>These terms apply when you use Downabit, an app by ${SITE.name}. By using the app you agree to them. The terms of the store you installed it from (Google Play or the Amazon Appstore) also apply.</p>

<h2>1. What Downabit does</h2>
<p>Downabit copies files that you post to your own private Telegram channel to storage you choose, and plays or opens them. It does not host, index, search for or share any content.</p>

<h2>2. Your content</h2>
<p>You are responsible for the files you send to your channel and save with Downabit. Use it only with files you own or have the right to copy, such as your own photos, videos and documents. Do not use Downabit to copy content in breach of copyright or of any law.</p>

<h2>3. Subscriptions, trials and cancellation</h2>
<ul>
  <li>Downabit is free to download; using it requires a subscription. Plans and prices are shown in the app before you buy.</li>
  <li>New subscribers get a 7-day free trial. If you do not cancel before the trial ends, the subscription starts and is charged by the store.</li>
  <li>Subscriptions renew automatically at the end of each period until you cancel. Cancel any time in the store's subscription settings (<a href="${DOWNABIT.playSubscriptions}">Google Play</a>, <a href="${DOWNABIT.amazonSubscriptions}">Amazon</a>); the subscription stays active until the end of the period you paid for.</li>
  <li>Payments and refunds are handled by the store under its own refund policy.</li>
</ul>

<h2>4. Other services</h2>
<p>Downabit works with services run by others: Telegram, Google Drive, Dropbox, WebDAV servers and network storage. Their own terms apply to your use of them, and we are not responsible for their availability or for changes they make.</p>

<h2>5. The app</h2>
<p>We grant you a personal, non-transferable right to use Downabit on your devices. Do not copy, resell or reverse engineer the app except where the law allows it.</p>

<h2>6. No warranty</h2>
<p>Downabit is provided "as is". We work to keep it reliable, but we cannot promise that it will always be available or free of errors. Keep your own backups of files that matter to you.</p>

<h2>7. Liability</h2>
<p>To the extent the law allows, ${SITE.name} is not liable for lost data, lost profits or indirect damages arising from the use of Downabit. Our total liability is limited to the amount you paid for the subscription in the 12 months before the claim. Nothing in these terms limits rights you have as a consumer under the law of your country.</p>

<h2>8. Changes</h2>
<p>We may update these terms. The new version is published on this page with a new date and applies from then on.</p>

<h2>9. Contact</h2>
<p>${mail}</p>`),
})

// ---- Support ----------------------------------------------------------------------------------------------------------
const qa = (q, a) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`
page('downabit/support/', {
  title: 'Downabit support',
  description: 'Help with Downabit: signing in, saving files, network shares, subscriptions and contact details.',
  nav: 'support', sub: 'support',
  body: doc(`
<h1>Downabit support</h1>
<p class="updated">Write to us and we will help.</p>
<div class="contact-grid">
  <div class="glass"><strong>Email</strong><p>${mail}</p></div>
  <div class="glass"><strong>Please include</strong><p class="muted">Your TV model and what you see on the screen. A photo of the screen helps.</p></div>
</div>

<div class="note">Connecting a NAS, a Windows or Mac shared folder, WebDAV, Google Drive or Dropbox? The <a href="/downabit/guides/">connection guides</a> go through each one step by step.</div>

<h2>Getting started</h2>
<div class="faq">
${qa('How do I sign in?', 'Open Downabit and choose "Log in with QR code". On your phone, open Telegram, go to Settings &gt; Devices &gt; Link Desktop Device and scan the code. You can also enter your phone number and the code Telegram sends you.')}
${qa('Where do I send files?', 'On first start Downabit creates a private channel called "Downabit" in your Telegram account. Send or forward files there from any Telegram app. They appear in the Files tab; press Refresh if one is missing.')}
${qa('Where are my downloads?', 'In My files, with a badge for every place a file is kept. On the TV itself they are in the Download/Downabit folder; on a USB drive, network share or cloud account in a folder called Downabit.')}
</div>

<h2>Saving files</h2>
<div class="faq">
${qa('My network share or NAS is not found', 'The TV and the NAS must be on the same home network. In Settings &gt; Cloud &amp; network choose "Find shared folders on my network". If it is still missing, choose "Enter address manually" and type the NAS address, for example 192.168.1.20.')}
${qa('"Not enough space"', 'Downabit checks the free space before every download and keeps some room for Android. Save the file to a USB drive, your NAS or the cloud instead, or delete files you no longer need in My files.')}
${qa('A file with the same name already exists', 'Downabit asks what to do: keep both (the new file gets a number, such as "name (1)"), replace the old file, or cancel.')}
${qa('After reinstalling, my old files are missing from My files', 'Android hides files an earlier install saved. Allow access to photos and videos when Downabit asks, or in Settings &gt; Storage on TV, and the videos, music and pictures appear again. On Fire TV you can also allow "All files access" there to see archives and documents.')}
</div>

<h2>Playing and opening</h2>
<div class="faq">
${qa('A file will not open', 'Videos, music and pictures play inside Downabit. Other files are handed to an app on your TV that can open them; if there is none, Downabit offers to look for one in your TV\'s app store.')}
</div>

<h2>Subscription</h2>
<div class="faq">
${qa('How do I cancel or change my plan?', `Subscriptions are managed by the store you bought from: <a href="${DOWNABIT.playSubscriptions}">Google Play subscriptions</a> or <a href="${DOWNABIT.amazonSubscriptions}">Amazon subscriptions</a>. See <a href="/downabit/subscribe/">Subscription</a> for details.`)}
${qa('I subscribed but Downabit still shows the plans', 'Choose "Restore / check again" on the plan screen. Make sure the TV is signed in to the same Google or Amazon account you subscribed with.')}
</div>

<h2>Devices</h2>
<div class="faq">
${qa('Which TVs are supported?', 'Android TV and Google TV with Android 7.0 or newer, and Amazon Fire TV with Fire OS 5 or newer. Fire TV devices running Vega OS (such as Fire TV Stick 4K Select and Fire TV Stick HD 2nd generation) cannot run Android apps.')}
</div>`),
})

// ---- Delete data ------------------------------------------------------------------------------------------------------
page('downabit/delete-data/', {
  title: 'Delete your Downabit data',
  description: 'How to remove everything Downabit stored, disconnect cloud accounts and delete a Telegram account.',
  nav: 'downabit', sub: 'delete',
  body: doc(`
<h1>Delete your Downabit data</h1>
<p class="updated">Downabit by ${SITE.name}. Last updated: ${SITE.updated}</p>
<div class="note">Downabit keeps no account and no data on any server of ours. Everything it stores is on your TV, so you can remove it yourself at any time with the steps below.</div>

<h2>1. Remove your sign-in from the TV</h2>
<p>Open Downabit &gt; Settings &gt; Account &amp; channel &gt; Log out. The Telegram session is removed from the TV. Your Telegram account and the Downabit channel stay as they are.</p>

<h2>2. Disconnect storage and cloud accounts</h2>
<p>In Settings &gt; Cloud &amp; network, remove each network share, WebDAV server, Google Drive or Dropbox you connected. To also withdraw the access you gave:</p>
<ul>
  <li>Google Drive: <a href="${EXT.googleConnections}">Google account &gt; Third-party connections</a>, then remove Downabit.</li>
  <li>Dropbox: <a href="${EXT.dropboxConnected}">Dropbox settings &gt; Connected apps</a>, then disconnect Downabit.</li>
</ul>

<h2>3. Remove everything the app stored</h2>
<p>Uninstall Downabit, or clear its storage in the TV's Settings &gt; Apps &gt; Downabit &gt; Clear storage. This deletes the sign-in, settings, download history and saved connection details.</p>

<h2>4. Delete saved files</h2>
<p>Files you saved stay where you saved them until you delete them: in My files choose a file and "Delete file", or remove the Downabit folder on the TV, USB drive, network share or cloud account.</p>

<h2>5. Delete your Telegram account (optional)</h2>
<p>If you created a Telegram account through Downabit, or want to delete your Telegram account, do it with Telegram: sign in at <a href="${EXT.telegramDelete}">${EXT.telegramDelete}</a> and choose "Delete account", or in a Telegram app go to Settings &gt; Privacy and Security &gt; Delete my account. Deleting it removes your messages, channels (including the Downabit channel) and contacts from Telegram.</p>

<h2>Questions</h2>
<p>Write to ${mail}. Because we hold no data about you, there is nothing for us to delete, but we are happy to help with the steps.</p>`),
})

// ---- Subscription -----------------------------------------------------------------------------------------------------
page('downabit/subscribe/', {
  title: 'Downabit subscription',
  description: 'Start, manage or cancel your Downabit subscription on Google Play or the Amazon Appstore.',
  nav: 'downabit', sub: 'subscribe',
  body: doc(`
<h1>Your Downabit subscription</h1>
<p class="updated">Every plan starts with a 7-day free trial. Prices are shown in the app in your currency.</p>

<h2>Subscribe</h2>
<p>Subscribe inside Downabit on your TV: the plan screen appears after you sign in, and in Settings &gt; Subscription. Payment is handled by the store your TV uses.</p>

<h2>Manage or cancel</h2>
<div class="contact-grid">
  <div class="glass"><strong>Google Play</strong><p class="muted">Android TV and Google TV. Open <a href="${DOWNABIT.playSubscriptions}">Google Play subscriptions</a> on your phone or computer, signed in with the same Google account as the TV.</p></div>
  <div class="glass"><strong>Amazon Appstore</strong><p class="muted">Fire TV. Open <a href="${DOWNABIT.amazonSubscriptions}">Your Subscriptions on Amazon</a>, or on the Fire TV go to Settings &gt; Applications &gt; Appstore &gt; Subscriptions.</p></div>
</div>
<p>After you cancel, Downabit keeps working until the end of the period you already paid for. Refunds are handled by the store.</p>
<p>Questions: ${mail}</p>`),
})

// ---- Guides: how to connect every place Downabit saves to ----------------------------------------------------------
buildGuides({ page, doc, mail, ICON, svg })

// ---- 404 (served from any path, so every link is root-relative) -------------------------------------------------------
pages['404.html'] = layout({
  path: '404.html',
  title: `Page not found | ${SITE.name}`,
  description: 'The page you are looking for is not here.',
  body: `
<section class="hero">
  <div class="container">
    <span class="eyebrow">404</span>
    <h1 class="gradient-text">Page not found</h1>
    <p class="lead">The page you are looking for is not here. It may have moved.</p>
    <div class="btn-row"><a class="btn btn-play" href="/">Go home</a><a class="btn btn-glass" href="/downabit/">Downabit</a></div>
  </div>
</section>`,
}).replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n<meta name="viewport"')

pages['sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(u => `  <url><loc>${u}</loc><lastmod>${SITE.isoUpdated}</lastmod></url>`).join('\n')}
</urlset>
`
pages['robots.txt'] = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`

for (const [path, content] of Object.entries(pages)) {
  const full = join(ROOT, path)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, content)
  console.log('wrote', path)
}
