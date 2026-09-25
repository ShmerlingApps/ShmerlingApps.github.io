// Builds every page of the Shmerling Apps site into plain HTML (run: node build.mjs).
// The output is committed as it is: GitHub Pages serves it without any build step.
// Change the contact email or a store link here, run the script again, commit.
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))

const SITE = {
  name: 'Shmerling Apps',
  email: 'support@shmerling.app',       // shown on every page; stores require a working contact address
  updated: '25 September 2026',        // "last updated" date of the legal pages
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

function layout({ title, description, depth, nav, sub, body, image }) {
  const up = depth === 0 ? './' : '../'.repeat(depth)
  const navItem = (href, label, key) => `<a href="${up}${href}"${nav === key ? ' aria-current="page"' : ''}>${label}</a>`
  const subnav = sub
    ? `<nav class="subnav" aria-label="Downabit">${[
        ['downabit/', 'Overview', 'overview'],
        ['downabit/support/', 'Support', 'support'],
        ['downabit/privacy/', 'Privacy', 'privacy'],
        ['downabit/terms/', 'Terms', 'terms'],
        ['downabit/delete-data/', 'Delete data', 'delete'],
        ['downabit/subscribe/', 'Subscription', 'subscribe'],
      ].map(([h, l, k]) => `<a href="${up}${h}"${sub === k ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>`
    : ''
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:image" content="${up}assets/${image || 'downabit-social.jpg'}">
<link rel="icon" type="image/png" href="${up}assets/favicon.png">
<link rel="stylesheet" href="${up}assets/site.css">
</head>
<body>
<header class="site-header">
  <div class="bar">
    <a class="brand" href="${up}"><span class="brand-mark">S</span>${SITE.name}</a>
    <nav class="nav" aria-label="Main">
      ${navItem('', 'Home', 'home')}
      ${navItem('apps/', 'Apps', 'apps')}
      ${navItem('downabit/', 'Downabit', 'downabit')}
      ${navItem('downabit/support/', 'Support', 'support')}
    </nav>
  </div>
</header>
<main>
${sub ? `<div class="container narrow doc">${subnav}</div>` : ''}
${body}
</main>
<footer class="site-footer">
  <div class="container row">
    <span>&copy; ${SITE.year} ${SITE.name} &middot; ${mail}</span>
    <span><a href="${up}downabit/privacy/">Privacy</a> &middot; <a href="${up}downabit/terms/">Terms</a> &middot; <a href="${up}downabit/delete-data/">Delete data</a></span>
  </div>
</footer>
</body>
</html>
`
}

const pages = {}

// ---- Home ----------------------------------------------------------------------------------------------------
pages['index.html'] = layout({
  title: 'Shmerling Apps',
  description: 'Small, careful apps for the big screen. Home of Downabit for Android TV, Google TV and Fire TV.',
  depth: 0, nav: 'home',
  body: `
<section class="hero">
  <div class="container">
    <h1>Shmerling Apps</h1>
    <p class="lead">Small, careful apps for the big screen. Made for the remote control, respectful of your files, and written in plain words.</p>
    <div class="actions"><a class="btn btn-light" href="apps/">See our apps</a><a class="btn btn-ghost" href="downabit/support/">Contact</a></div>
  </div>
</section>
<section>
  <div class="container">
    <h2>Our apps</h2>
    <div class="card app-card">
      <img src="assets/downabit-icon.png" alt="Downabit icon" width="84" height="84">
      <div>
        <h3><a href="downabit/">Downabit</a></h3>
        <p>Your family's photos and videos, from your private Telegram channel to the TV, a USB drive, your NAS or the cloud.</p>
        <span class="tag">Android TV</span><span class="tag">Google TV</span><span class="tag">Fire TV</span>
        <div class="links"><a class="btn btn-primary" href="downabit/">Learn more</a><a class="btn btn-outline" href="downabit/privacy/">Privacy policy</a></div>
      </div>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <h2>How we build</h2>
    <div class="grid">
      <div class="card"><h3>Your files stay yours</h3><p>No ads, no tracking, no analytics. Our apps do not send your data to us.</p></div>
      <div class="card"><h3>Made for the remote</h3><p>Everything works with a TV remote: short lists, codes to scan with your phone, very little typing.</p></div>
      <div class="card"><h3>Plain language</h3><p>Every screen says what will happen before it happens, in 30 languages.</p></div>
    </div>
  </div>
</section>`,
})

// ---- Apps ----------------------------------------------------------------------------------------------------
pages['apps/index.html'] = layout({
  title: 'Apps | Shmerling Apps',
  description: 'All apps by Shmerling Apps.',
  depth: 1, nav: 'apps',
  body: `
<section class="hero"><div class="container"><h1>Apps</h1><p class="lead">Everything we make, with its store links, privacy policy and support.</p></div></section>
<section>
  <div class="container">
    <div class="card app-card">
      <img src="../assets/downabit-icon.png" alt="Downabit icon" width="84" height="84">
      <div>
        <h3><a href="../downabit/">Downabit</a></h3>
        <p>Turns a private Telegram channel into a drop folder for your TV. Saves files to the TV, a USB drive, a network share, WebDAV, Google Drive or Dropbox, and plays them.</p>
        <span class="tag">Android TV &amp; Google TV</span><span class="tag">Amazon Fire TV</span><span class="tag">7-day free trial</span>
        <div class="links">
          <a class="btn btn-primary" href="../downabit/">Details</a>
          <a class="btn btn-outline" href="${DOWNABIT.play}">Google Play</a>
          <a class="btn btn-outline" href="${DOWNABIT.amazon}">Amazon Appstore</a>
          <a class="btn btn-outline" href="../downabit/privacy/">Privacy</a>
          <a class="btn btn-outline" href="../downabit/support/">Support</a>
        </div>
      </div>
    </div>
  </div>
</section>`,
})

// ---- Downabit ------------------------------------------------------------------------------------------------
pages['downabit/index.html'] = layout({
  title: 'Downabit for Android TV, Google TV and Fire TV',
  description: 'Send a file to your private Telegram channel and watch it on your TV, or keep it on a USB drive, your NAS or in the cloud.',
  depth: 1, nav: 'downabit', sub: 'overview',
  body: `
<section class="hero">
  <div class="container app-hero">
    <img class="icon" src="../assets/downabit-icon.png" alt="Downabit icon" width="120" height="120">
    <div>
      <h1>Downabit</h1>
      <p class="lead">Your family's photos and videos, from your private Telegram channel to the big screen.</p>
      <div class="actions">
        <a class="btn btn-light" href="${DOWNABIT.play}">Get it on Google Play</a>
        <a class="btn btn-ghost" href="${DOWNABIT.amazon}">Amazon Appstore</a>
        <a class="btn btn-ghost" href="#video">Watch the video</a>
      </div>
    </div>
  </div>
</section>

<section id="video">
  <div class="container">
    <div class="video-frame">
      <video controls preload="none" playsinline poster="media/downabit-promo-poster.jpg" width="1920" height="1080">
        <source src="media/downabit-promo.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2>How it works</h2>
    <div class="grid steps">
      <div class="card"><h3>Send</h3><p>Post a video, photo or document to your private Downabit channel from any Telegram app on your phone or computer.</p></div>
      <div class="card"><h3>Choose where it goes</h3><p>On the TV, pick where to keep it: the TV itself, a USB drive, your NAS, WebDAV, Google Drive or Dropbox.</p></div>
      <div class="card"><h3>Watch</h3><p>Play videos and music and open photos right away, from the TV or straight from where you saved them.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2>What you can do</h2>
    <ul class="checklist">
      <li>Save to the TV, a USB drive, a Windows share or NAS (SMB), a WebDAV server, Google Drive or Dropbox</li>
      <li>Large files stream straight to their destination, so a stick with little storage can pass a film to your NAS</li>
      <li>Downloads keep going in the background, two at a time, with a notification when a file is ready</li>
      <li>My files keeps every copy in one list, with a badge for each place it is kept</li>
      <li>Network shares are found by scanning your home network; cloud accounts connect by scanning a code with your phone</li>
      <li>A daily speed test sets download limits for you, or pick fixed limits from a list</li>
      <li>Free space is checked before every download; name clashes ask whether to replace or keep both</li>
      <li>30 languages, built for the TV remote</li>
    </ul>
  </div>
</section>

<section>
  <div class="container">
    <h2>Screens</h2>
    <div class="shots">
      <figure><img src="media/01-cloud-and-network.jpg" alt="Cloud and network settings: Google Drive, network share and Dropbox" loading="lazy" width="1280" height="720"><figcaption>Connect Google Drive, Dropbox, WebDAV or a network share</figcaption></figure>
      <figure><img src="media/02-internet-speed.jpg" alt="Internet speed settings with the measured speeds" loading="lazy" width="1280" height="720"><figcaption>A daily speed test sets the download limits</figcaption></figure>
      <figure><img src="media/03-storage-on-tv.jpg" alt="Storage on TV settings showing the free space" loading="lazy" width="1280" height="720"><figcaption>Free space is checked before every download</figcaption></figure>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2>Made for family moments</h2>
    <div class="shots">
      <figure><img src="media/picnic-in-the-park.jpg" alt="Illustration: a family picnic in the park" loading="lazy" width="960" height="540"></figure>
      <figure><img src="media/beach-day.jpg" alt="Illustration: a family day at the beach" loading="lazy" width="960" height="540"></figure>
      <figure><img src="media/grandmas-birthday.jpg" alt="Illustration: grandma's birthday party" loading="lazy" width="960" height="540"></figure>
      <figure><img src="media/first-bike-ride.jpg" alt="Illustration: a child's first bike ride" loading="lazy" width="960" height="540"></figure>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2>Plans</h2>
    <div class="card">
      <p style="margin:0">Downabit is free to download. Using it needs a subscription, and every plan starts with a <strong>7-day free trial</strong>. Choose a monthly or a yearly plan; prices are shown in the app in your own currency and are billed by Google Play or the Amazon Appstore. Cancel any time in the store you bought from: the subscription stays active until the end of the period you paid for. <a href="subscribe/">Manage your subscription</a>.</p>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2>At a glance</h2>
    <table class="facts">
      <tr><th>Developer</th><td>${SITE.name}</td></tr>
      <tr><th>Devices</th><td>Android TV and Google TV with Android 7.0 or newer; Amazon Fire TV with Fire OS 5 or newer. Fire TV devices running Vega OS cannot run Android apps.</td></tr>
      <tr><th>Price</th><td>Free download; monthly or yearly subscription with a 7-day free trial</td></tr>
      <tr><th>Languages</th><td>30, including English, Hebrew, Arabic, Russian, Spanish, French, German and Chinese</td></tr>
      <tr><th>Ads and tracking</th><td>None</td></tr>
      <tr><th>Contact</th><td>${mail}</td></tr>
      <tr><th>Privacy policy</th><td><a href="privacy/">Downabit privacy policy</a></td></tr>
      <tr><th>Delete your data</th><td><a href="delete-data/">How to delete your data</a></td></tr>
    </table>
    <p class="muted" style="margin-top:20px;font-size:14px">Telegram is a trademark of Telegram FZ-LLC. Google Drive and Google Play are trademarks of Google LLC. Dropbox is a trademark of Dropbox, Inc. Amazon, Fire TV and the Amazon Appstore are trademarks of Amazon.com, Inc. Downabit is not affiliated with, endorsed by or sponsored by any of them.</p>
  </div>
</section>`,
})

// ---- Privacy policy --------------------------------------------------------------------------------------------
pages['downabit/privacy/index.html'] = layout({
  title: 'Downabit privacy policy',
  description: 'What Downabit does with your information: nothing is sent to us, no ads, no tracking.',
  depth: 2, nav: 'downabit', sub: 'privacy',
  body: `
<article class="container narrow doc">
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
<p>Everything Downabit stores stays on your TV until you remove it. Log out in Settings &gt; Account &amp; channel to remove your Telegram sign-in; disconnect a destination in Settings &gt; Cloud &amp; network; uninstall the app to remove everything it stored. Files you saved stay at their destinations until you delete them. See <a href="../delete-data/">how to delete your data</a> for the full steps, including how to delete a Telegram account.</p>

<h2>10. Children</h2>
<p>Downabit is not directed at children under 13, and we do not knowingly collect information from anyone.</p>

<h2>11. Changes to this policy</h2>
<p>If this policy changes, the new version is published on this page with a new date. Material changes are also described in the app's release notes.</p>

<h2>12. Contact</h2>
<p>Questions about privacy: ${mail}. We answer within 30 days.</p>
</article>`,
})

// ---- Terms ----------------------------------------------------------------------------------------------------
pages['downabit/terms/index.html'] = layout({
  title: 'Downabit terms of use',
  description: 'The terms for using Downabit, including subscriptions, trials and cancellation.',
  depth: 2, nav: 'downabit', sub: 'terms',
  body: `
<article class="container narrow doc">
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
<p>${mail}</p>
</article>`,
})

// ---- Support ----------------------------------------------------------------------------------------------------
pages['downabit/support/index.html'] = layout({
  title: 'Downabit support',
  description: 'Help with Downabit: signing in, saving files, network shares, subscriptions and contact details.',
  depth: 2, nav: 'support', sub: 'support',
  body: `
<article class="container narrow doc">
<h1>Downabit support</h1>
<p class="updated">Write to ${mail}. Please include your TV model and what you see on the screen; a photo of the screen helps. We answer within two working days.</p>

<h2>Getting started</h2>
<details><summary>How do I sign in?</summary><p>Open Downabit and choose "Log in with QR code". On your phone, open Telegram, go to Settings &gt; Devices &gt; Link Desktop Device and scan the code. You can also enter your phone number and the code Telegram sends you.</p></details>
<details><summary>Where do I send files?</summary><p>On first start Downabit creates a private channel called "Downabit" in your Telegram account. Send or forward files there from any Telegram app. They appear in the Files tab; press Refresh if one is missing.</p></details>
<details><summary>Where are my downloads?</summary><p>In My files, with a badge for every place a file is kept. On the TV itself they are in the Download/Downabit folder; on a USB drive, network share or cloud account in a folder called Downabit.</p></details>

<h2>Saving files</h2>
<details><summary>My network share or NAS is not found</summary><p>The TV and the NAS must be on the same home network. In Settings &gt; Cloud &amp; network choose "Find shared folders on my network". If it is still missing, choose "Enter address manually" and type the NAS address, for example 192.168.1.20.</p></details>
<details><summary>"Not enough space"</summary><p>Downabit checks the free space before every download and keeps some room for Android. Save the file to a USB drive, your NAS or the cloud instead, or delete files you no longer need in My files.</p></details>
<details><summary>A file with the same name already exists</summary><p>Downabit asks what to do: keep both (the new file gets a number, such as "name (1)"), replace the old file, or cancel.</p></details>
<details><summary>After reinstalling, my old files are missing from My files</summary><p>Android hides files an earlier install saved. Allow access to photos and videos when Downabit asks, or in Settings &gt; Storage on TV, and the videos, music and pictures appear again. On Fire TV you can also allow "All files access" there to see archives and documents.</p></details>

<h2>Playing and opening</h2>
<details><summary>A file will not open</summary><p>Videos, music and pictures play inside Downabit. Other files are handed to an app on your TV that can open them; if there is none, Downabit offers to look for one in your TV's app store.</p></details>

<h2>Subscription</h2>
<details><summary>How do I cancel or change my plan?</summary><p>Subscriptions are managed by the store you bought from: <a href="${DOWNABIT.playSubscriptions}">Google Play subscriptions</a> or <a href="${DOWNABIT.amazonSubscriptions}">Amazon subscriptions</a>. See <a href="../subscribe/">Subscription</a> for details.</p></details>
<details><summary>I subscribed but Downabit still shows the plans</summary><p>Choose "Restore / check again" on the plan screen. Make sure the TV is signed in to the same Google or Amazon account you subscribed with.</p></details>

<h2>Devices</h2>
<details><summary>Which TVs are supported?</summary><p>Android TV and Google TV with Android 7.0 or newer, and Amazon Fire TV with Fire OS 5 or newer. Fire TV devices running Vega OS (such as Fire TV Stick 4K Select and Fire TV Stick HD 2nd generation) cannot run Android apps.</p></details>
</article>`,
})

// ---- Delete data ---------------------------------------------------------------------------------------------
pages['downabit/delete-data/index.html'] = layout({
  title: 'Delete your Downabit data',
  description: 'How to remove everything Downabit stored, disconnect cloud accounts and delete a Telegram account.',
  depth: 2, nav: 'downabit', sub: 'delete',
  body: `
<article class="container narrow doc">
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
<p>Write to ${mail}. Because we hold no data about you, there is nothing for us to delete, but we are happy to help with the steps.</p>
</article>`,
})

// ---- Subscription -----------------------------------------------------------------------------------------------
pages['downabit/subscribe/index.html'] = layout({
  title: 'Downabit subscription',
  description: 'Start, manage or cancel your Downabit subscription on Google Play or the Amazon Appstore.',
  depth: 2, nav: 'downabit', sub: 'subscribe',
  body: `
<article class="container narrow doc">
<h1>Your Downabit subscription</h1>
<p class="updated">Every plan starts with a 7-day free trial. Prices are shown in the app in your currency.</p>

<h2>Subscribe</h2>
<p>Subscribe inside Downabit on your TV: the plan screen appears after you sign in, and in Settings &gt; Subscription. Payment is handled by the store your TV uses.</p>

<h2>Manage or cancel</h2>
<div class="grid">
  <div class="card"><h3>Google Play</h3><p>Android TV and Google TV. Open <a href="${DOWNABIT.playSubscriptions}">Google Play subscriptions</a> on your phone or computer, signed in with the same Google account as the TV.</p></div>
  <div class="card"><h3>Amazon Appstore</h3><p>Fire TV. Open <a href="${DOWNABIT.amazonSubscriptions}">Your Subscriptions on Amazon</a>, or on the Fire TV go to Settings &gt; Applications &gt; Appstore &gt; Subscriptions.</p></div>
</div>
<p>After you cancel, Downabit keeps working until the end of the period you already paid for. Refunds are handled by the store.</p>
<p>Questions: ${mail}</p>
</article>`,
})

// ---- 404 (self-contained: it is served from any path) -------------------------------------------------------------
pages['404.html'] = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | ${SITE.name}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0e1116;color:#e8ecf1;font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center;padding:20px}a{color:#4d9bf0}</style>
</head><body><div><h1>Page not found</h1><p>The page you are looking for is not here.</p><p><a href="javascript:history.back()">Go back</a></p></div></body></html>
`

for (const [path, html] of Object.entries(pages)) {
  const full = join(ROOT, path)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, html)
  console.log('wrote', path)
}
