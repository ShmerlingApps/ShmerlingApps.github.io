// Solitaire: overview, privacy policy and support (called from build.mjs).
// Store links are added once the game is live in each store; until then the pages say "coming soon".

export const SOLITAIRE = {
  play: '',   // https://play.google.com/store/apps/details?id=app.shmerling.solitaire once it is published
  amazon: '', // https://www.amazon.com/dp/<ASIN> once it is live
  googlePrivacy: 'https://policies.google.com/privacy',
  amazonPrivacy: 'https://www.amazon.com/privacy',
  playGamesData: 'https://support.google.com/googleplay/answer/9054946',
}

export function buildSolitaire({ page, doc, mail, ICON, SITE, ORG, more = '' }) {
  const shot = (key, alt, lazy = true) =>
    `<img src="/solitaire/media/${key}-1600.webp" srcset="/solitaire/media/${key}-960.webp 960w, /solitaire/media/${key}-1600.webp 1600w" sizes="(max-width: 960px) 88vw, 860px" alt="${alt}" width="1600" height="900"${lazy ? ' loading="lazy"' : ''} decoding="async">`
  const stores = SOLITAIRE.play || SOLITAIRE.amazon
    ? `<div class="btn-row">${SOLITAIRE.play ? `<a class="btn btn-play" href="${SOLITAIRE.play}" rel="noopener">${ICON.storePlay}<span class="two"><small>GET IT ON</small>Google Play</span></a>` : ''}${SOLITAIRE.amazon ? `<a class="btn btn-amazon" href="${SOLITAIRE.amazon}" rel="noopener">${ICON.storeBag}<span class="two"><small>AVAILABLE AT</small>Amazon Appstore</span></a>` : ''}</div>`
    : `<p class="hero-note">Coming soon to Google Play and the Amazon Appstore.</p>`

  page('solitaire/', {
    title: 'Solitaire | Classic Klondike for your TV',
    description: 'Solitaire: classic Klondike patience for Android TV, Google TV and Fire TV. Draw 1 or Draw 3, unlimited undo, played with the remote, made for everyone.',
    nav: 'solitaire', sub: 'overview', app: 'solitaire',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [ORG, {
        '@type': 'SoftwareApplication',
        name: 'Solitaire',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Android TV, Google TV, Fire OS',
        url: SITE.url + '/solitaire/',
        image: SITE.url + '/assets/solitaire-icon-256.png',
        publisher: { '@id': ORG['@id'] },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }],
    },
    body: `
<section class="container app-hero">
  <div>
    <img class="icon" src="/assets/solitaire-icon-256.png" alt="Solitaire icon" width="84" height="84">
    <span class="eyebrow">Android TV &middot; Google TV &middot; Fire TV</span>
    <h1 class="gradient-text">Solitaire</h1>
    <p class="lead">Classic Klondike patience on the biggest screen in the house. Deal from the stock, build down in alternating colours and bring every suit home, all with the remote.</p>
    ${stores}
    <p class="hero-note">Free to play &middot; No tracking &middot; Made for everyone</p>
  </div>
  <div class="tv"><div class="tv-screen">${shot('banner', 'Solitaire, classic Klondike: an ace of spades and a king of hearts on green felt', false)}</div></div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">The game</span><h2>Seven piles, one deck, four suits to bring home</h2></div>
    <div class="features">
      <div class="glass feature reveal"><div class="ico">${ICON.remote}</div><h3>Made for the remote</h3><p>The arrows move between piles, OK plays a card or a run to the best place. Hold OK to pick cards up and put them down exactly where you want.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.gauge}</div><h3>Draw 1 or Draw 3</h3><p>As many passes through the stock as you like, unlimited undo, a move counter and a clock. When every card is face up, Finish plays the rest home.</p></div>
      <div class="glass feature reveal"><div class="ico">${ICON.shield}</div><h3>A fair shuffle</h3><p>Every deal is shuffled with your TV's secure random generator, so every order of the 52 cards is equally likely, as with a real deck.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>For every player</h2>
      <p>Solitaire works with TalkBack: every pile describes itself, and every move and every card that turns over is announced. Without a screen reader, the game can read itself aloud. High contrast turns the table black with white cards, a four-colour deck gives diamonds and clubs their own colours, big cards make every card larger, and the game follows the text size set on your TV.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="glass plan-card reveal">
      <span class="eyebrow">Solitaire Pro</span>
      <div class="trial gradient-text">One purchase</div>
      <p>Solitaire is free to play: the whole game, as often as you like, with three hints a game. Now and then a short card between games shows our other apps, and it can be skipped after five seconds. Solitaire Pro, bought once in Google Play or the Amazon Appstore, removes the cards and adds the rest.</p>
      <div class="plan-points"><span class="tag">No cards between games</span><span class="tag">Unlimited hints</span><span class="tag">4 tables, 4 card backs</span><span class="tag">Statistics</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <dl class="facts glass prose-block reveal">
      <div><dt>Devices</dt><dd>Android TV &amp; Google TV (Android 7.0+), Fire TV (Fire OS 5+)</dd></div>
      <div><dt>Price</dt><dd>Free; Solitaire Pro is a one-time purchase</dd></div>
      <div><dt>Game</dt><dd>Klondike, Draw 1 or Draw 3, 1 player</dd></div>
      <div><dt>Tracking</dt><dd>None. <a href="/solitaire/privacy/">Privacy policy</a></dd></div>
    </dl>
    <p class="muted" style="margin-top:24px;font-size:13px;text-align:center">Google TV and Google Play are trademarks of Google LLC. Amazon, Fire TV and the Amazon Appstore are trademarks of Amazon.com, Inc. Solitaire is not affiliated with, endorsed by or sponsored by any of them, or by the makers of any other solitaire game.</p>
  </div>
</section>
${more}`,
  })

  page('solitaire/privacy/', {
    title: 'Solitaire privacy policy',
    description: 'What Solitaire does with your information: nothing is sent to us, no ad networks, no tracking.',
    nav: 'solitaire', sub: 'privacy', app: 'solitaire',
    body: doc(`
<h1>Solitaire privacy policy</h1>
<p class="updated">Last updated: ${SITE.updated}</p>

<p>Solitaire is a game for Android TV, Google TV and Amazon Fire TV, made by ${SITE.name} ("we", "us"). This policy explains what information the game uses and where it goes. It applies to every version of Solitaire, including those installed from Google Play and the Amazon Appstore.</p>
<div class="note"><strong>In short:</strong> Solitaire does not send any personal data to us. It contains no advertising network, no analytics, no crash reporting and no tracking.</div>

<h2>1. What stays on your TV</h2>
<p>The game keeps your settings (draw mode, sound, accessibility choices, table colour and card back), the game in progress and your record (games played and won in each draw mode, winning streaks, best times and fewest moves) on the TV. Android's own backup may include them in your device backup if backup is switched on for your TV; that backup is handled by your device and its maker, not by us.</p>

<h2>2. Your record in Google Play Games (Google Play version)</h2>
<p>If you are signed in to Google Play Games on your TV, the Google Play version keeps a copy of your record as a saved game in your Google account, so a new TV or a reinstall gets it back. The saved game holds only the numbers listed above, counted per TV under a random number the game makes up, so that two TVs never count the same game twice. It is stored and handled by Google under the <a href="${SOLITAIRE.googlePrivacy}" rel="noopener">Google privacy policy</a>; we cannot see it. You can delete it with your Play Games data (<a href="${SOLITAIRE.playGamesData}" rel="noopener">how</a>). The Amazon version has no such copy.</p>

<h2>3. Purchases</h2>
<p>Solitaire Pro is sold by Google Play or the Amazon Appstore. The store handles the payment; we never receive your payment details. The game only asks the store whether you own Solitaire Pro. See the <a href="${SOLITAIRE.googlePrivacy}" rel="noopener">Google</a> and <a href="${SOLITAIRE.amazonPrivacy}" rel="noopener">Amazon</a> privacy policies.</p>

<h2>4. The cards between games</h2>
<p>Without Solitaire Pro, a card between games now and then shows another app of ours or Solitaire Pro. The cards are part of the game: no advertising network is involved and nothing about you is sent anywhere to show them. If you choose "See it in the store", the store app opens.</p>

<h2>5. Speech</h2>
<p>"Read aloud" uses the text-to-speech engine installed on your TV. What the game says is spoken by that engine on the TV.</p>

<h2>6. Children</h2>
<p>Solitaire is not directed at children under 13. It collects no personal information from anyone.</p>

<h2>7. Deleting your data</h2>
<p>Uninstall Solitaire to remove everything it stored on the TV. In the Google Play version, delete your Play Games data to remove the saved record from your Google account.</p>

<h2>8. Changes</h2>
<p>If this policy changes, the new version is published on this page with a new date.</p>

<h2>9. Contact</h2>
<p>Questions about privacy: ${mail}.</p>`),
  })

  const qa = (q, a) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`
  page('solitaire/support/', {
    title: 'Solitaire support',
    description: 'Help with Solitaire: how to play with the remote, Draw 1 and Draw 3, Solitaire Pro, restoring a purchase, accessibility and contact details.',
    nav: 'solitaire', sub: 'support', app: 'solitaire',
    body: doc(`
<h1>Solitaire support</h1>
<p class="updated">Write to us and we will help.</p>
<div class="contact-grid">
  <div class="glass"><strong>Email</strong><p>${mail}</p></div>
  <div class="glass"><strong>Please include</strong><p class="muted">Your TV model and what you see on the screen. A photo of the screen helps.</p></div>
</div>

<h2>Questions and answers</h2>
<div class="faq">
${[
  qa('How do I play?', 'The arrows move between the piles; up and down inside a pile choose the card a move starts from. OK on the stock deals; OK on a card plays it, or the run from it, to the best place. To choose the place yourself, hold OK (or press Menu) to pick the cards up, go to a pile and press OK to put them down; BACK puts them back. Undo, Hint, New game and Finish are on the right. "How to play" in the menu has the full rules.'),
  qa('What does Solitaire Pro add?', 'No cards between games, unlimited hints, four table colours and four card backs, and a statistics page for Draw 1 and Draw 3 (win rate, streaks, best time, fewest moves). It is a one-time purchase.'),
  qa('I bought Pro but the game does not show it.', 'Pro comes from the store account the TV uses. Make sure the TV is signed in with the account that bought it, then open the game again: it asks the store each time. It also comes back by itself after a reinstall or on another TV with the same account.'),
  qa('Why do I have only three hints?', 'Without Pro, each game has three hints; asking again for the hint already shown costs nothing. Undo is unlimited for everyone.'),
  qa('How do I switch between Draw 1 and Draw 3?', 'In the main menu or the pause menu (BACK). The change applies at once to a game with no moves yet, otherwise from the next game.'),
  qa('Can every game be won?', 'No. The cards are shuffled at random, as with a real deck, and some deals cannot be won. When the game sees that no useful move is left, it says so and suggests Undo or a new game.'),
  qa('Does my record come back after a reinstall?', 'In the Google Play version, yes, when the TV is signed in to Google Play Games. In the Amazon version the record stays on the TV.'),
  qa('Can blind or low-vision players play?', 'Yes. With TalkBack on, every pile describes itself and every move is announced. Without TalkBack, switch on Read aloud in Accessibility. High contrast, the four-colour deck and big cards help low vision, and the game follows the TV&rsquo;s text size.'),
].join('\n')}
</div>`),
  })
}
