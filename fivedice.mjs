// Five Dice: overview, privacy policy and support (called from build.mjs).
// Store links are added once the app is live in each store; until then the pages say "coming soon".

export const FIVE_DICE = {
  play: '',   // https://play.google.com/store/apps/details?id=app.shmerling.fivedice once it is published
  amazon: '', // the Amazon page once it has an ASIN
  googlePrivacy: 'https://policies.google.com/privacy',
  amazonPrivacy: 'https://www.amazon.com/privacy',
  playGamesData: 'https://support.google.com/googleplay/answer/9054946',
}

export function buildFiveDice({ page, doc, mail, ICON, SITE, ORG, more = '' }) {
  const shot = (key, alt, lazy = true) =>
    `<img src="/five-dice/media/${key}-1600.webp" srcset="/five-dice/media/${key}-960.webp 960w, /five-dice/media/${key}-1600.webp 1600w" sizes="(max-width: 960px) 88vw, 860px" alt="${alt}" width="1600" height="900"${lazy ? ' loading="lazy"' : ''} decoding="async">`
  const stores = FIVE_DICE.play || FIVE_DICE.amazon
    ? `<div class="btn-row">${FIVE_DICE.play ? `<a class="btn btn-play" href="${FIVE_DICE.play}" rel="noopener">${ICON.storePlay}<span class="two"><small>GET IT ON</small>Google Play</span></a>` : ''}${FIVE_DICE.amazon ? `<a class="btn btn-amazon" href="${FIVE_DICE.amazon}" rel="noopener">${ICON.storeBag}<span class="two"><small>AVAILABLE AT</small>Amazon Appstore</span></a>` : ''}</div>`
    : `<p class="hero-note">Coming soon to Google Play and the Amazon Appstore.</p>`

  page('five-dice/', {
    title: 'Five Dice | The classic dice game for your TV',
    description: 'Five Dice: the classic five-dice game against the computer, for Android TV, Google TV and Fire TV. Played with the remote, made for everyone.',
    nav: 'fivedice', sub: 'overview', app: 'fivedice',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [ORG, {
        '@type': 'SoftwareApplication',
        name: 'Five Dice',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Android TV, Google TV, Fire OS',
        url: SITE.url + '/five-dice/',
        image: SITE.url + '/assets/fivedice-icon-256.png',
        publisher: { '@id': ORG['@id'] },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }],
    },
    body: `
<section class="container app-hero">
  <div>
    <img class="icon" src="/assets/fivedice-icon-256.png" alt="Five Dice icon" width="84" height="84">
    <span class="eyebrow">Android TV &middot; Google TV &middot; Fire TV</span>
    <h1 class="gradient-text">Five Dice</h1>
    <p class="lead">The classic dice game, you against the computer, on the biggest screen in the house. Roll, hold, and fill your scorecard with the remote.</p>
    ${stores}
    <p class="hero-note">Free to play &middot; No tracking &middot; Made for everyone</p>
  </div>
  <div class="tv"><div class="tv-screen">${shot('game', 'Five Dice on a TV: the scorecard and five dice, two of them held', false)}</div></div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">The game</span><h2>Thirteen rounds, three rolls, one scorecard</h2></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.remote}</div><h3>Made for the remote</h3><p>Roll with OK, hold a die with OK, move left to the scorecard. The best box for your dice is picked for you after the last roll.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.gauge}</div><h3>A computer that thinks</h3><p>Easy for a relaxed game, Normal for a fair fight, Hard works out every hold and plays close to perfect.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.shield}</div><h3>Fair dice</h3><p>Every roll comes from your TV's secure random generator: each face is exactly as likely as the others, every time.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>For every player</h2>
      <p>Five Dice works with TalkBack: every die, box and score describes itself, and each roll is announced. Without a screen reader, the game can read itself aloud. High contrast turns the table black and white with yellow and cyan, numbers on the dice replace the pips, and the game follows the text size set on your TV.</p>
      <div class="shot" style="margin-top:18px">${shot('accessibility', 'The Accessibility panel: read aloud, high contrast and numbers on dice')}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="glass plan-card reveal">
      <span class="eyebrow">Five Dice Pro</span>
      <div class="trial gradient-text">One purchase</div>
      <p>Five Dice is free to play. Now and then a short card between games shows our other apps, and it can be skipped after five seconds. Five Dice Pro, bought once in Google Play or the Amazon Appstore, removes the cards and adds the rest.</p>
      <div class="plan-points"><span class="tag">No cards between games</span><span class="tag">Hard computer, unlimited</span><span class="tag">4 tables, 4 dice colours</span><span class="tag">Statistics</span></div>
      <div class="shot" style="margin-top:18px">${shot('stats', 'Five Dice Pro statistics on the casino red table')}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <dl class="facts glass prose-block reveal">
      <div><dt>Devices</dt><dd>Android TV &amp; Google TV (Android 7.0+), Fire TV (Fire OS 5+)</dd></div>
      <div><dt>Price</dt><dd>Free; Five Dice Pro is a one-time purchase</dd></div>
      <div><dt>Players</dt><dd>1 player against the computer, three levels</dd></div>
      <div><dt>Tracking</dt><dd>None. <a href="/five-dice/privacy/">Privacy policy</a></dd></div>
    </dl>
    <p class="muted" style="margin-top:24px;font-size:13px;text-align:center">Google TV and Google Play are trademarks of Google LLC. Amazon, Fire TV and the Amazon Appstore are trademarks of Amazon.com, Inc. Five Dice is not affiliated with, endorsed by or sponsored by any of them, or by the makers of any other dice game.</p>
  </div>
</section>
${more}`,
  })

  page('five-dice/privacy/', {
    title: 'Five Dice privacy policy',
    description: 'What Five Dice does with your information: nothing is sent to us, no ad networks, no tracking.',
    nav: 'fivedice', sub: 'privacy', app: 'fivedice',
    body: doc(`
<h1>Five Dice privacy policy</h1>
<p class="updated">Last updated: ${SITE.updated}</p>

<p>Five Dice is a game for Android TV, Google TV and Amazon Fire TV, made by ${SITE.name} ("we", "us"). This policy explains what information the game uses and where it goes. It applies to every version of Five Dice, including those installed from Google Play and the Amazon Appstore.</p>
<div class="note"><strong>In short:</strong> Five Dice does not send any personal data to us. It contains no advertising network, no analytics, no crash reporting and no tracking.</div>

<h2>1. What stays on your TV</h2>
<p>The game keeps your settings (computer level, sound, accessibility choices, table and dice colours) and your record (games won and lost, best score and the numbers behind the statistics) on the TV. Android's own backup may include these settings in your device backup if backup is switched on for your TV; that backup is handled by your device and its maker, not by us.</p>

<h2>2. Your record in Google Play Games (Google Play version)</h2>
<p>If you are signed in to Google Play Games on your TV, the Google Play version keeps a copy of your record as a saved game in your Google account, so a new TV or a reinstall gets it back. The saved game holds only the numbers listed above. It is stored and handled by Google under the <a href="${FIVE_DICE.googlePrivacy}" rel="noopener">Google privacy policy</a>; we cannot see it. You can delete it with your Play Games data (<a href="${FIVE_DICE.playGamesData}" rel="noopener">how</a>). The Amazon version has no such copy.</p>

<h2>3. Purchases</h2>
<p>Five Dice Pro is sold by Google Play or the Amazon Appstore. The store handles the payment; we never receive your payment details. The game only asks the store whether you own Five Dice Pro. See the <a href="${FIVE_DICE.googlePrivacy}" rel="noopener">Google</a> and <a href="${FIVE_DICE.amazonPrivacy}" rel="noopener">Amazon</a> privacy policies.</p>

<h2>4. The cards between games</h2>
<p>Without Five Dice Pro, a card between games now and then shows another app of ours or Five Dice Pro. The cards are part of the game: no advertising network is involved and nothing about you is sent anywhere to show them. If you choose "See it in the store", the store app opens.</p>

<h2>5. Speech</h2>
<p>"Read aloud" uses the text-to-speech engine installed on your TV. What the game says is spoken by that engine on the TV.</p>

<h2>6. Children</h2>
<p>Five Dice is not directed at children under 13. It collects no personal information from anyone.</p>

<h2>7. Deleting your data</h2>
<p>Uninstall Five Dice to remove everything it stored on the TV. In the Google Play version, delete your Play Games data to remove the saved record from your Google account.</p>

<h2>8. Changes</h2>
<p>If this policy changes, the new version is published on this page with a new date.</p>

<h2>9. Contact</h2>
<p>Questions about privacy: ${mail}.</p>`),
  })

  const qa = (q, a) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`
  page('five-dice/support/', {
    title: 'Five Dice support',
    description: 'Help with Five Dice: how to play, Five Dice Pro, restoring a purchase, accessibility and contact details.',
    nav: 'fivedice', sub: 'support', app: 'fivedice',
    body: doc(`
<h1>Five Dice support</h1>
<p class="updated">Write to us and we will help.</p>
<div class="contact-grid">
  <div class="glass"><strong>Email</strong><p>${mail}</p></div>
  <div class="glass"><strong>Please include</strong><p class="muted">Your TV model and what you see on the screen. A photo of the screen helps.</p></div>
</div>

<h2>Questions and answers</h2>
<div class="faq">
${[
  qa('How do I play?', 'Press OK on Roll. Before the second and third roll, go up to the dice and press OK on each die you want to keep, then roll again. After any roll you can go left to the scorecard and press OK on a box; after the last roll the game moves there for you. Each box is used once, 13 rounds in all. "How to play" in the menu has the full rules.'),
  qa('What does Five Dice Pro add?', 'No cards between games, the Hard computer as often as you like, four tables and four dice colours, and a statistics page. It is a one-time purchase.'),
  qa('I bought Pro but the game does not show it.', 'Pro comes from the store account the TV uses. Make sure the TV is signed in with the account that bought it, then open the game again: it asks the store each time. It also comes back by itself after a reinstall or on another TV with the same account.'),
  qa('Why can I play the Hard computer only once a day?', 'Without Pro, the Hard computer gives one game a day. Easy and Normal can be played as often as you like.'),
  qa('Does my record come back after a reinstall?', 'In the Google Play version, yes, when the TV is signed in to Google Play Games. In the Amazon version the record stays on the TV.'),
  qa('Can blind or low-vision players play?', 'Yes. With TalkBack on, every die, box and score is described and each roll is announced. Without TalkBack, switch on Read aloud in Accessibility. High contrast and numbers on the dice help low vision, and the game follows the TV&rsquo;s text size.'),
  qa('Are the dice fair?', 'Yes. Every roll uses the TV&rsquo;s secure random number generator, and each face is exactly as likely as any other.'),
].join('\n')}
</div>`),
  })
}
