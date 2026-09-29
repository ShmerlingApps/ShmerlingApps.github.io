// Backgammon: overview, privacy policy and support (called from build.mjs).
// Store links are added once the game is live in each store; until then the pages say "coming soon".

export const BACKGAMMON = {
  play: '',   // https://play.google.com/store/apps/details?id=app.shmerling.backgammon once it is published
  amazon: '', // https://www.amazon.com/dp/<ASIN> once it is live
  googlePrivacy: 'https://policies.google.com/privacy',
  amazonPrivacy: 'https://www.amazon.com/privacy',
  playGamesData: 'https://support.google.com/googleplay/answer/9054946',
}

export function buildBackgammon({ page, doc, mail, ICON, SITE, ORG, more = '' }) {
  const shot = (key, alt, lazy = true) =>
    `<img src="/backgammon/media/${key}-1600.webp" srcset="/backgammon/media/${key}-960.webp 960w, /backgammon/media/${key}-1600.webp 1600w" sizes="(max-width: 960px) 88vw, 860px" alt="${alt}" width="1600" height="900"${lazy ? ' loading="lazy"' : ''} decoding="async">`
  const stores = BACKGAMMON.play || BACKGAMMON.amazon
    ? `<div class="btn-row">${BACKGAMMON.play ? `<a class="btn btn-play" href="${BACKGAMMON.play}" rel="noopener">${ICON.storePlay}<span class="two"><small>GET IT ON</small>Google Play</span></a>` : ''}${BACKGAMMON.amazon ? `<a class="btn btn-amazon" href="${BACKGAMMON.amazon}" rel="noopener">${ICON.storeBag}<span class="two"><small>AVAILABLE AT</small>Amazon Appstore</span></a>` : ''}</div>`
    : `<p class="hero-note">Coming soon to Google Play and the Amazon Appstore.</p>`

  page('backgammon/', {
    title: 'Backgammon | The classic board game for your TV',
    description: 'Backgammon: the classic board game against the computer, for Android TV, Google TV and Fire TV. Played with the remote, made for everyone.',
    nav: 'backgammon', sub: 'overview', app: 'backgammon',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [ORG, {
        '@type': 'SoftwareApplication',
        name: 'Backgammon',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Android TV, Google TV, Fire OS',
        url: SITE.url + '/backgammon/',
        image: SITE.url + '/assets/backgammon-icon-256.png',
        publisher: { '@id': ORG['@id'] },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }],
    },
    body: `
<section class="container app-hero">
  <div>
    <img class="icon" src="/assets/backgammon-icon-256.png" alt="Backgammon icon" width="84" height="84">
    <span class="eyebrow">Android TV &middot; Google TV &middot; Fire TV</span>
    <h1 class="gradient-text">Backgammon</h1>
    <p class="lead">The classic board game, you against the computer, on the biggest screen in the house. Roll, move your checkers home and bear them off with the remote.</p>
    ${stores}
    <p class="hero-note">Free to play &middot; No tracking &middot; Made for everyone</p>
  </div>
  <div class="tv"><div class="tv-screen">${shot('banner', 'Backgammon: a wooden board with light and dark checkers and a die showing five', false)}</div></div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">The game</span><h2>Fifteen checkers, two dice, one race home</h2></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.remote}</div><h3>Made for the remote</h3><p>OK rolls. Left and right go through the checkers that can move, OK picks one up and lights where it can go, OK moves it. Forced moves are played for you.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.gauge}</div><h3>A computer that thinks</h3><p>Easy plays loosely and likes to hit, Normal weighs every play, Hard also thinks through all 21 rolls you could answer with.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.shield}</div><h3>Fair dice</h3><p>Every roll comes from your TV's secure random generator: each face is exactly as likely as the others, every time.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>For every player</h2>
      <p>Backgammon works with TalkBack: every point, checker and roll describes itself, and every move, the computer's too, is said in the board's own point numbers, so a game can be followed by ear. Without a screen reader, the game can read itself aloud. High contrast makes the board black with white and yellow checkers, numbers can be shown on all 24 points, the checkers can be made bigger, and the game follows the text size set on your TV.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="glass plan-card reveal">
      <span class="eyebrow">Backgammon Pro</span>
      <div class="trial gradient-text">One purchase</div>
      <p>Backgammon is free to play. Now and then a short card between games shows our other apps, and it can be skipped after five seconds. Backgammon Pro, bought once in Google Play or the Amazon Appstore, removes the cards and adds the rest.</p>
      <div class="plan-points"><span class="tag">No cards between games</span><span class="tag">Hard computer, unlimited</span><span class="tag">4 boards, 4 checker colours</span><span class="tag">Statistics</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <dl class="facts glass prose-block reveal">
      <div><dt>Devices</dt><dd>Android TV &amp; Google TV (Android 7.0+), Fire TV (Fire OS 5+)</dd></div>
      <div><dt>Price</dt><dd>Free; Backgammon Pro is a one-time purchase</dd></div>
      <div><dt>Players</dt><dd>1 player against the computer, three levels</dd></div>
      <div><dt>Tracking</dt><dd>None. <a href="/backgammon/privacy/">Privacy policy</a></dd></div>
    </dl>
    <p class="muted" style="margin-top:24px;font-size:13px;text-align:center">Google TV and Google Play are trademarks of Google LLC. Amazon, Fire TV and the Amazon Appstore are trademarks of Amazon.com, Inc. Backgammon is not affiliated with, endorsed by or sponsored by any of them, or by the makers of any other backgammon game.</p>
  </div>
</section>
${more}`,
  })

  page('backgammon/privacy/', {
    title: 'Backgammon privacy policy',
    description: 'What Backgammon does with your information: nothing is sent to us, no ad networks, no tracking.',
    nav: 'backgammon', sub: 'privacy', app: 'backgammon',
    body: doc(`
<h1>Backgammon privacy policy</h1>
<p class="updated">Last updated: ${SITE.updated}</p>

<p>Backgammon is a game for Android TV, Google TV and Amazon Fire TV, made by ${SITE.name} ("we", "us"). This policy explains what information the game uses and where it goes. It applies to every version of Backgammon, including those installed from Google Play and the Amazon Appstore.</p>
<div class="note"><strong>In short:</strong> Backgammon does not send any personal data to us. It contains no advertising network, no analytics, no crash reporting and no tracking.</div>

<h2>1. What stays on your TV</h2>
<p>The game keeps your settings (computer level and speed, sound, accessibility choices, board and checker colours), the game in progress and your record (games won and lost against each level, points, gammons and backgammons, winning streaks and the pip lead behind the statistics) on the TV. Android's own backup may include them in your device backup if backup is switched on for your TV; that backup is handled by your device and its maker, not by us.</p>

<h2>2. Your record in Google Play Games (Google Play version)</h2>
<p>If you are signed in to Google Play Games on your TV, the Google Play version keeps a copy of your record as a saved game in your Google account, so a new TV or a reinstall gets it back. The saved game holds only the numbers listed above, counted per TV under a random number the game makes up, so that two TVs never count the same game twice. It is stored and handled by Google under the <a href="${BACKGAMMON.googlePrivacy}" rel="noopener">Google privacy policy</a>; we cannot see it. You can delete it with your Play Games data (<a href="${BACKGAMMON.playGamesData}" rel="noopener">how</a>). The Amazon version has no such copy.</p>

<h2>3. Purchases</h2>
<p>Backgammon Pro is sold by Google Play or the Amazon Appstore. The store handles the payment; we never receive your payment details. The game only asks the store whether you own Backgammon Pro. See the <a href="${BACKGAMMON.googlePrivacy}" rel="noopener">Google</a> and <a href="${BACKGAMMON.amazonPrivacy}" rel="noopener">Amazon</a> privacy policies.</p>

<h2>4. The cards between games</h2>
<p>Without Backgammon Pro, a card between games now and then shows another app of ours or Backgammon Pro. The cards are part of the game: no advertising network is involved and nothing about you is sent anywhere to show them. If you choose "See it in the store", the store app opens.</p>

<h2>5. Speech</h2>
<p>"Read aloud" uses the text-to-speech engine installed on your TV. What the game says is spoken by that engine on the TV.</p>

<h2>6. Children</h2>
<p>Backgammon is not directed at children under 13. It collects no personal information from anyone.</p>

<h2>7. Deleting your data</h2>
<p>Uninstall Backgammon to remove everything it stored on the TV. In the Google Play version, delete your Play Games data to remove the saved record from your Google account.</p>

<h2>8. Changes</h2>
<p>If this policy changes, the new version is published on this page with a new date.</p>

<h2>9. Contact</h2>
<p>Questions about privacy: ${mail}.</p>`),
  })

  const qa = (q, a) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`
  page('backgammon/support/', {
    title: 'Backgammon support',
    description: 'Help with Backgammon: how to play with the remote, the computer levels, Backgammon Pro, restoring a purchase, accessibility and contact details.',
    nav: 'backgammon', sub: 'support', app: 'backgammon',
    body: doc(`
<h1>Backgammon support</h1>
<p class="updated">Write to us and we will help.</p>
<div class="contact-grid">
  <div class="glass"><strong>Email</strong><p>${mail}</p></div>
  <div class="glass"><strong>Please include</strong><p class="muted">Your TV model and what you see on the screen. A photo of the screen helps.</p></div>
</div>

<h2>Questions and answers</h2>
<div class="faq">
${[
  qa('How do I play?', 'Press OK to roll. Left and right go through the checkers that can move; OK picks one up and lights where it can go (with one die, both dice, or off the board). Left and right choose, OK moves it, BACK puts it down. When all dice are used the move is confirmed after a few seconds; Undo, beside the board, takes it back until then. BACK pauses the game, and a game you leave is kept for Continue. "How to play" in the menu has the full rules.'),
  qa('What does Backgammon Pro add?', 'No cards between games, the Hard computer as often as you like, four boards and four checker colours, and a statistics page (points, gammons, backgammons, streaks, pip lead and your results against each level). It is a one-time purchase.'),
  qa('I bought Pro but the game does not show it.', 'Pro comes from the store account the TV uses. Make sure the TV is signed in with the account that bought it, then open the game again: it asks the store each time. It also comes back by itself after a reinstall or on another TV with the same account.'),
  qa('Why can I play the Hard computer only once a day?', 'Without Pro, the Hard computer gives one game a day. Easy and Normal can be played as often as you like.'),
  qa('Is there a doubling cube?', 'No. Every game is a single game: a win counts 1 point, a gammon 2 and a backgammon 3.'),
  qa('Does my record come back after a reinstall?', 'In the Google Play version, yes, when the TV is signed in to Google Play Games. In the Amazon version the record stays on the TV.'),
  qa('Can blind or low-vision players play?', 'Yes. With TalkBack on, every point, checker and roll is described, and every move, the computer&rsquo;s too, is said in point numbers. Without TalkBack, switch on Read aloud in Accessibility. High contrast, numbers on the points and bigger checkers help low vision, and the game follows the TV&rsquo;s text size.'),
  qa('Are the dice fair?', 'Yes. Every roll uses the TV&rsquo;s secure random number generator, and each face is exactly as likely as any other.'),
].join('\n')}
</div>`),
  })
}
