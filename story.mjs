// My story: who makes these apps and why (called from build.mjs).

export function buildStory({ page, mail, ICON, SITE, ORG }) {
  const part = (title, text) => `
      <h2>${title}</h2>
      ${text}`

  page('my-story/', {
    title: 'My story | Shmerling Apps',
    description: 'Why Shmerling Apps makes TV apps and games for people with low vision: the story of Shmerling, a dragon and a TV that became hard to see.',
    nav: 'story',
    jsonLd: { '@context': 'https://schema.org', '@graph': [ORG, { '@type': 'AboutPage', name: 'My story', url: SITE.url + '/my-story/', publisher: { '@id': ORG['@id'] } }] },
    body: `
<section class="hero">
  <div class="container">
    <span class="eyebrow">My story</span>
    <h1 class="gradient-text">Why I make these apps</h1>
    <p class="lead">A dragon, a pair of eyes that got worse every year, and a TV that became hard to see.</p>
  </div>
</section>

<section class="section" style="padding-top:20px">
  <div class="container narrow">
    <div class="glass prose-block story reveal">${part('Who I am', `
      <p>My nickname is Shmerling. When I was a child, Shmerling was my imaginary friend, a dragon. We talked and played a lot, and I have loved dragons ever since.</p>`)}
${part('My eyes', `
      <p>I was born with severe low vision, a very high and rare myopia. Over the years it got much worse. I worked with computers for many years; about ten years ago my sight declined badly and I stopped working.</p>`)}
${part('Watching TV', `
      <p>Since then I spend most of my day at home. I watched a lot of TV and played with streamers and apps. In recent years my sight has become so poor that I can hardly see the screen.</p>`)}
${part('What I decided to do', `
      <p>I decided to design apps and games around my own vision, so I can use them comfortably on the TV with a simple remote. Every app takes care of text size, colours, contrast and outlines, is simple to use, and you always know where you are on the screen. The games already read themselves aloud and have high contrast; the other apps are getting the same, and more apps and options are coming.</p>`)}
${part('What I hope for', `
      <p>I hope that one day there will be a solution for my eyes, and that I can pay for the procedure myself, along with glasses and aids that make daily life easier. If you know of a solution for very high myopia or a poor-quality retina, I would be glad to hear from you: ${mail}.</p>`)}
${part('How you can help', `
      <p>Right now I fund the development myself. Try the apps, send feedback, and if they help you, buy them or subscribe. That keeps the development going, for people with low vision, older people, and everyone who finds it hard to enjoy their TV from the sofa.</p>`)}
      <div class="btn-row" style="margin-top:26px"><a class="btn btn-play" href="/#apps">See the apps ${ICON.arrow}</a><a class="btn btn-glass" href="mailto:${SITE.email}">${ICON.mail} Send feedback</a></div>
    </div>
  </div>
</section>`,
  })
}
