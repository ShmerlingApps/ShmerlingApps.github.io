// Paint Maze: overview, privacy policy and support (called from build.mjs).
// Store links are added once the game is live in each store; until then the pages say "coming soon".

export const PAINT_MAZE = {
  play: '',   // https://play.google.com/store/apps/details?id=app.shmerling.paintmaze once it is published
  amazon: '', // https://www.amazon.com/dp/<ASIN> once it is live
  googlePrivacy: 'https://policies.google.com/privacy',
  amazonPrivacy: 'https://www.amazon.com/privacy',
}

export function buildPaintMaze({ page, doc, mail, ICON, SITE, ORG, more = '' }) {
  const shot = (key, alt, lazy = true) =>
    `<img src="/paint-maze/media/${key}-1600.webp" srcset="/paint-maze/media/${key}-960.webp 960w, /paint-maze/media/${key}-1600.webp 1600w" sizes="(max-width: 960px) 88vw, 860px" alt="${alt}" width="1600" height="900"${lazy ? ' loading="lazy"' : ''} decoding="async">`
  const stores = PAINT_MAZE.play || PAINT_MAZE.amazon
    ? `<div class="btn-row">${PAINT_MAZE.play ? `<a class="btn btn-play" href="${PAINT_MAZE.play}" rel="noopener">${ICON.storePlay}<span class="two"><small>GET IT ON</small>Google Play</span></a>` : ''}${PAINT_MAZE.amazon ? `<a class="btn btn-amazon" href="${PAINT_MAZE.amazon}" rel="noopener">${ICON.storeBag}<span class="two"><small>AVAILABLE AT</small>Amazon Appstore</span></a>` : ''}</div>`
    : `<p class="hero-note">Coming soon to Google Play and the Amazon Appstore.</p>`

  page('paint-maze/', {
    title: 'Paint Maze | Roll the ball, paint the maze, on your TV',
    description: 'Paint Maze: roll the ball with the TV remote and paint every square of the maze. 1,200 levels in four difficulties for Android TV, Google TV and Fire TV.',
    nav: 'paintmaze', sub: 'overview', app: 'paintmaze',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [ORG, {
        '@type': 'SoftwareApplication',
        name: 'Paint Maze',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Android TV, Google TV, Fire OS',
        url: SITE.url + '/paint-maze/',
        image: SITE.url + '/assets/paintmaze-icon-256.png',
        publisher: { '@id': ORG['@id'] },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }],
    },
    body: `
<section class="container app-hero">
  <div>
    <img class="icon" src="/assets/paintmaze-icon-256.png" alt="Paint Maze icon" width="84" height="84">
    <span class="eyebrow">Android TV &middot; Google TV &middot; Fire TV</span>
    <h1 class="gradient-text">Paint Maze</h1>
    <p class="lead">Roll the ball with the remote. It rolls until it hits a wall and paints every square it passes. Paint the whole maze to finish the level.</p>
    ${stores}
    <p class="hero-note">Free to play &middot; No tracking &middot; 1,200 levels</p>
  </div>
  <div class="tv"><div class="tv-screen">${shot('game', 'Paint Maze on a TV: a maze half painted pink, the ball rolling', false)}</div></div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">The game</span><h2>Easy to learn, hard to put down</h2></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.remote}</div><h3>Four arrows, that is all</h3><p>Press an arrow and the ball rolls until it hits a wall. OK takes back a move. Finish in par for three stars.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.gauge}</div><h3>Four difficulties</h3><p>Easy, Normal, Hard and Expert, each its own 300 levels, from small mazes with long corridors to large twisty ones.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.heart}</div><h3>Your ball</h3><p>Pick its face, its colour and how fast it rolls. The trail it paints takes the same colour.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>For every player</h2>
      <p>Paint Maze can read itself aloud: after every roll it says what was painted, how much is left and which ways the ball can roll, so the maze can be played by ear. It works with TalkBack too. High contrast makes the walls black and the floor pure white, and a dot can mark every square that still needs paint.</p>
      <div class="shot" style="margin-top:18px">${shot('accessibility', 'The Accessibility panel: read aloud, high contrast and marks on unpainted squares')}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="glass plan-card reveal">
      <span class="eyebrow">Paint Maze Pro</span>
      <div class="trial gradient-text">One purchase</div>
      <p>Paint Maze is free to play: all 600 Easy and Normal levels, and the first 20 of Hard and of Expert. Now and then a short card between levels shows our other apps, and it can be skipped after five seconds. Paint Maze Pro, bought once in Google Play or the Amazon Appstore, removes the cards and adds the rest.</p>
      <div class="plan-points"><span class="tag">No cards between levels</span><span class="tag">All 600 Hard and Expert levels</span><span class="tag">Rainbow paint</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <dl class="facts glass prose-block reveal">
      <div><dt>Devices</dt><dd>Android TV &amp; Google TV (Android 7.0+), Fire TV (Fire OS 5+)</dd></div>
      <div><dt>Price</dt><dd>Free; Paint Maze Pro is a one-time purchase</dd></div>
      <div><dt>Levels</dt><dd>1,200: Easy, Normal, Hard and Expert, 300 each</dd></div>
      <div><dt>Tracking</dt><dd>None. <a href="/paint-maze/privacy/">Privacy policy</a></dd></div>
    </dl>
    <p class="muted" style="margin-top:24px;font-size:13px;text-align:center">Google TV and Google Play are trademarks of Google LLC. Amazon, Fire TV and the Amazon Appstore are trademarks of Amazon.com, Inc. Paint Maze is not affiliated with, endorsed by or sponsored by any of them, or by the makers of any other maze game.</p>
  </div>
</section>
${more}`,
  })

  page('paint-maze/privacy/', {
    title: 'Paint Maze privacy policy',
    description: 'What Paint Maze does with your information: nothing is sent to us, no ad networks, no tracking.',
    nav: 'paintmaze', sub: 'privacy', app: 'paintmaze',
    body: doc(`
<h1>Paint Maze privacy policy</h1>
<p class="updated">Last updated: ${SITE.updated}</p>

<p>Paint Maze is a game for Android TV, Google TV and Amazon Fire TV, made by ${SITE.name} ("we", "us"). This policy explains what information the game uses and where it goes. It applies to every version of Paint Maze, including those installed from Google Play and the Amazon Appstore.</p>
<div class="note"><strong>In short:</strong> Paint Maze does not send any personal data to us. It contains no advertising network, no analytics, no crash reporting and no tracking.</div>

<h2>1. What stays on your TV</h2>
<p>The game keeps your progress (the levels you painted and your best moves) and your settings (difficulty, sound, your ball, accessibility choices) on the TV. Android's own backup may include them in your device backup if backup is switched on for your TV; that backup is handled by your device and its maker, not by us.</p>

<h2>2. Purchases</h2>
<p>Paint Maze Pro is sold by Google Play or the Amazon Appstore. The store handles the payment; we never receive your payment details. The game only asks the store whether you own Paint Maze Pro. See the <a href="${PAINT_MAZE.googlePrivacy}" rel="noopener">Google</a> and <a href="${PAINT_MAZE.amazonPrivacy}" rel="noopener">Amazon</a> privacy policies.</p>

<h2>3. The cards between levels</h2>
<p>Without Paint Maze Pro, a card between levels now and then shows another app of ours or Paint Maze Pro. The cards are part of the game: no advertising network is involved and nothing about you is sent anywhere to show them. If you choose "See it in the store", the store app opens.</p>

<h2>4. Speech</h2>
<p>"Read aloud" uses the text-to-speech engine installed on your TV. What the game says is spoken by that engine on the TV.</p>

<h2>5. Children</h2>
<p>Paint Maze is not directed at children under 13. It collects no personal information from anyone.</p>

<h2>6. Deleting your data</h2>
<p>Uninstall Paint Maze to remove everything it stored on the TV.</p>

<h2>7. Changes</h2>
<p>If this policy changes, the new version is published on this page with a new date.</p>

<h2>8. Contact</h2>
<p>Questions about privacy: ${mail}.</p>`),
  })

  const qa = (q, a) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`
  page('paint-maze/support/', {
    title: 'Paint Maze support',
    description: 'Help with Paint Maze: how to play, difficulties, Paint Maze Pro, restoring a purchase, accessibility and contact details.',
    nav: 'paintmaze', sub: 'support', app: 'paintmaze',
    body: doc(`
<h1>Paint Maze support</h1>
<p class="updated">Write to us and we will help.</p>
<div class="contact-grid">
  <div class="glass"><strong>Email</strong><p>${mail}</p></div>
  <div class="glass"><strong>Please include</strong><p class="muted">Your TV model, the difficulty and level, and what you see on the screen.</p></div>
</div>

<h2>Questions and answers</h2>
<div class="faq">
${[
  qa('How do I play?', 'Press an arrow on the remote: the ball rolls that way until it hits a wall, painting every square it passes. Paint all the white squares to finish the level. OK takes back a move, BACK pauses. Finish within par for three stars.'),
  qa('What does Paint Maze Pro add?', 'No cards between levels, all 600 Hard and Expert levels (the first 20 of each are free), and the rainbow paint for your ball. It is a one-time purchase.'),
  qa('I bought Pro but the game does not show it.', 'Pro comes from the store account the TV uses. Make sure the TV is signed in with the account that bought it, then open the game again: it asks the store each time. It also comes back by itself after a reinstall or on another TV with the same account.'),
  qa('Is every level possible?', 'Yes. Every maze is built by rolling a ball through it, so every level can be painted, and par is the number of moves it was built with.'),
  qa('Can blind or low-vision players play?', 'Yes. Switch on Read aloud in Accessibility (or use TalkBack): after every roll the game says what was painted, what is left and which ways the ball can roll. High contrast and the marks on unpainted squares help low vision.'),
  qa('Does my progress come back after a reinstall?', 'Your progress is kept on the TV. Android&rsquo;s own backup may restore it if backup is on for your TV.'),
].join('\n')}
</div>`),
  })
}
