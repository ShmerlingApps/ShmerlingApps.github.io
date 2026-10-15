// Become a tester: how to join the Google Play tests of our apps (called from build.mjs).

// [package name, page, icon, name, what it is, runs on]
const TEST_APPS = [
  ['app.shmerling.downabit', '/downabit/', '/assets/downabit-icon-256.png', 'Downabit', 'Telegram files to the TV, NAS or cloud', 'TV'],
  ['app.shmerling.downabitplayer', '/downabit-player/', '/assets/downabitplayer-icon-256.png', 'Downabit Player', 'Telegram videos and music, streamed', 'TV'],
  ['app.shmerling.radio', '/radio/', '/assets/shmerlingradio-icon-256.png', 'Shmerling Radio', 'Radio from all over the world', 'TV and phone'],
  ['app.shmerling.fivedice', '/five-dice/', '/assets/fivedice-icon-256.png', 'Five Dice', 'The classic dice game', 'TV'],
  ['app.shmerling.paintmaze', '/paint-maze/', '/assets/paintmaze-icon-256.png', 'Paint Maze', 'Roll the ball, paint every square', 'TV'],
  ['app.shmerling.solitaire', '/solitaire/', '/assets/solitaire-icon-256.png', 'Solitaire', 'Klondike patience', 'TV'],
  ['app.shmerling.backgammon', '/backgammon/', '/assets/backgammon-icon-256.png', 'Backgammon', 'The classic board game', 'TV'],
]

export function buildTesters({ page, mail, ICON, SITE, ORG }) {
  const subject = encodeURIComponent('I want to test your apps')
  const body = encodeURIComponent('My Gmail address (the Google account on my TV): \nMy TV or streaming box: \nApps I want to test (or "all"): \n')
  const signUp = `mailto:${SITE.email}?subject=${subject}&body=${body}`

  const apps = TEST_APPS.map(([pkg, href, icon, name, line, runs]) => `
      <div class="glass tester-app">
        <img src="${icon}" alt="" width="56" height="56">
        <div class="tester-app-text"><h3><a href="${href}">${name}</a></h3><p>${line}</p><p class="tester-runs">Installs on: ${runs}</p></div>
        <a class="btn btn-glass" href="https://play.google.com/apps/testing/${pkg}" rel="noopener">Join the test<span class="sr-only"> of ${name}</span> ${ICON.arrow}</a>
      </div>`).join('')

  const faq = [
    ['Does it cost anything?', `<p>No. Joining a test is free. Some apps offer a purchase or a subscription inside; you never have to buy anything to test them.</p>`],
    ['Why do you need my Gmail address?', `<p>Google only lets people on a list take part in a test, and the list is made of Google accounts. We use your address for that and to answer you, nothing else: no mailing list, no sharing.</p>`],
    ['I have a Fire TV. Can I help?', `<p>Google Play is not on Fire TV, but all our apps are already in the Amazon Appstore, so you can install them there today: see <a href="/apps/">all apps and store links</a>. Your feedback helps just as much: ${mail}.</p>`],
    ['The app does not install on my phone.', `<p>That is expected: the TV apps and games are made for the remote, so Google Play only offers them for TVs. Shmerling Radio is the one that also runs on phones.</p>`],
    ['Can I stop testing?', `<p>Yes, any time: open the same <span class="ui">Join the test</span> link and choose <span class="ui">Leave the program</span>. If you can, please stay for at least 14 days; Google counts only testers who stay that long.</p>`],
  ].map(([q, a]) => `<details><summary>${q}</summary><div>${a}</div></details>`).join('\n      ')

  page('become-a-tester/', {
    title: 'Become a tester | Shmerling Apps',
    description: 'Help bring our accessible TV apps and games to Google Play: join the free test on your Google TV or Android TV in a few minutes.',
    nav: 'testers',
    jsonLd: { '@context': 'https://schema.org', '@graph': [ORG, { '@type': 'WebPage', name: 'Become a tester', url: SITE.url + '/become-a-tester/', publisher: { '@id': ORG['@id'] } }] },
    body: `
<section class="hero">
  <div class="container">
    <span class="eyebrow">Become a tester</span>
    <h1 class="gradient-text">Help bring our apps to Google Play</h1>
    <p class="lead">Google lets a new developer publish an app only after at least 12 people have tested it for 14 days. Try our TV apps and games first, for free, and tell us what you think.</p>
    <div class="btn-row"><a class="btn btn-play" href="${signUp}">${ICON.mail} Send us your Gmail address</a><a class="btn btn-glass" href="#how">How it works</a></div>
  </div>
</section>

<section class="section" style="padding-top:20px">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>What you need</h2>
      <ul>
        <li>A TV with <strong>Google TV or Android TV</strong> and the Google Play store: for example a Chromecast with Google TV, a Google TV Streamer, a Xiaomi TV Box or TV Stick, an Nvidia Shield, or a Sony, TCL, Hisense or Philips TV with Google TV.</li>
        <li>The <strong>Google account (Gmail)</strong> that is signed in on that TV.</li>
        <li>Five minutes now, and a few minutes on a few days over the next two weeks.</li>
      </ul>
    </div>
  </div>
</section>

<section class="section" id="how">
  <div class="container narrow">
    <div class="glass prose-block reveal">
      <h2>How it works</h2>
      <ol class="steps">
        <li><strong>Send us your Gmail address</strong>: the one on your TV. <a href="${signUp}">Write to us</a> (${mail}) and tell us which TV you have.</li>
        <li><strong>We add you to the testers list</strong>, usually within a day, and write back.</li>
        <li><strong>Open the test link</strong> of each app below, signed in with that Gmail address, and choose <span class="ui">Become a tester</span>.</li>
        <li><strong>Install it on your TV</strong>: on the TV, open Google Play and search for the app. Or open the app's Google Play page on your phone or computer, choose <span class="ui">Install</span> and pick your TV.</li>
        <li><strong>Use it now and then for 14 days</strong>: open it on a few different days, play a round, try the settings. Please stay in the test for the whole 14 days.</li>
        <li><strong>Tell us what you think</strong>: in Google Play, on the app's page, choose <span class="ui">Send feedback</span> under the tester section, or simply write to ${mail}. Every remark helps, big or small.</li>
      </ol>
      <div class="btn-row" style="margin-top:18px"><a class="btn btn-play" href="${signUp}">${ICON.mail} Send us your Gmail address</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="section-head reveal"><span class="eyebrow">The apps</span><h2>Test links</h2><p>The links work once we have added you to the list (step 2). One sign-up covers all of them; join as many as you like.</p></div>
    <div class="tester-apps reveal">${apps}
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="section-head reveal"><h2>Questions</h2></div>
    <div class="faq reveal">
      ${faq}
    </div>
  </div>
</section>`,
  })
}
