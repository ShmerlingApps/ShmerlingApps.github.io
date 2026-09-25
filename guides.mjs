// Downabit connection guides: one page per place Downabit saves to, plus signing in.
// Called from build.mjs, which passes its page helpers in so the guides share the site's frame.
// The button and screen names quoted here are the app's own English wording; keep them in step with the app.

export function buildGuides({ page, doc, mail, ICON, svg }) {
  const extra = {
    usb: svg('<rect x="7" y="2.5" width="10" height="7" rx="1"/><path d="M5 9.5h14v7a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z"/><path d="M10 5v1.5M14 5v1.5"/>'),
    nas: svg('<rect x="4" y="3" width="16" height="7" rx="1.5"/><rect x="4" y="14" width="16" height="7" rx="1.5"/><path d="M8 6.5h.01M8 17.5h.01M12 6.5h4M12 17.5h4"/>'),
    dav: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/>'),
    drive: svg('<path d="m8.5 4 7 0 6 10.5-3.5 6h-12L2.5 14.5z"/><path d="m8.5 4 6.5 11h6.5M2.5 14.5 9 4M6 20.5l6.5-11"/>'),
    box: svg('<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>'),
    tg: svg('<path d="M21 4 3 11l6 2.5L11.5 20l3.5-5 5 4z"/><path d="m9 13.5 11-9.5"/>'),
  }

  const GUIDES = [
    ['telegram', extra.tg, 'Sign in and your channel', 'Sign in with Telegram, find your private Downabit channel and send files to it. Or try the demo first.'],
    ['tv-and-usb', extra.usb, 'TV storage and USB drives', 'Save on the TV itself or on a USB drive plugged into it, and keep an eye on free space.'],
    ['network-share', extra.nas, 'Network share (SMB)', 'Save to a shared folder on a Windows PC, a Mac or a NAS (Synology, QNAP and others).'],
    ['webdav', extra.dav, 'WebDAV', 'Nextcloud, ownCloud, or the WebDAV service of a Synology or QNAP NAS.'],
    ['google-drive', extra.drive, 'Google Drive', 'Link your Google account with your phone. No typing on the TV.'],
    ['dropbox', extra.box, 'Dropbox', 'Link your Dropbox with your phone and a short code.'],
  ]

  const guideNav = current => `<nav class="chips" aria-label="Guides">${GUIDES.map(([slug, , title]) =>
    `<a href="/downabit/guides/${slug}/"${slug === current ? ' aria-current="page"' : ''}>${title}</a>`).join('')}</nav>`

  const toc = items => `<nav class="toc" aria-label="On this page"><span>On this page</span>${items.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav>`

  const path = (...parts) => `<span class="path">${parts.join(' <b>›</b> ')}</span>`
  const btn = t => `<span class="ui">${t}</span>`

  const footer = `
<h2 id="help">Still stuck?</h2>
<p>Write to ${mail} with your TV model, what you are connecting to and a photo of the screen. The <a href="/downabit/support/">support page</a> answers the most common questions.</p>`

  const guidePage = (slug, title, description, body) => page(`downabit/guides/${slug}/`, {
    title: `${title} | Downabit guides`,
    description,
    nav: 'guides', sub: 'guides',
    body: doc(`
<p class="kicker"><a href="/downabit/guides/">Guides</a></p>
<h1>${title}</h1>
<p class="updated">${description}</p>
${guideNav(slug)}
${body}
${footer}`),
  })

  // ---- Index ---------------------------------------------------------------------------------------------------------
  page('downabit/guides/', {
    title: 'Downabit guides: connect every place you save to',
    description: 'Step-by-step guides for Downabit: Telegram sign-in, TV and USB storage, network shares on Windows, Mac and NAS, WebDAV, Google Drive and Dropbox.',
    nav: 'guides',
    body: `
<section class="hero" style="padding-bottom:0">
  <div class="container">
    <span class="eyebrow">Guides</span>
    <h1 class="gradient-text">Connect Downabit to anything</h1>
    <p class="lead">Step by step, for every place Downabit can save your files. Pick yours.</p>
  </div>
</section>
<section class="section" style="padding-top:48px">
  <div class="container">
    <div class="features">
${GUIDES.map(([slug, icon, title, text]) => `      <a class="glass feature guide-card reveal" href="/downabit/guides/${slug}/"><div class="ico">${icon}</div><h3>${title}</h3><p>${text}</p><span class="more">Open the guide ${ICON.arrow}</span></a>`).join('\n')}
    </div>
    <div class="glass prose-block reveal" style="margin-top:32px">
      <h2>Where do my files go?</h2>
      <p>Wherever you save, Downabit puts the files in a folder called <strong>Downabit</strong>: in the TV's Download folder, on the USB drive, inside the shared folder or WebDAV server you pick, or at the top of your Google Drive or Dropbox. Nothing is stored anywhere else, and nothing is sent to us.</p>
      <p>Every place you connect is set up in ${path('Settings', 'Cloud &amp; network')} on the TV, and it then appears in the <em>Save to</em> list when you pick a file.</p>
    </div>
  </div>
</section>`,
  })

  // ---- Telegram ------------------------------------------------------------------------------------------------------
  guidePage('telegram', 'Sign in and your channel',
    'Sign in with Telegram, find your private channel and send files to it.',
    `
${toc([['demo', 'Try the demo'], ['sign-in', 'Sign in'], ['channel', 'Your channel'], ['send', 'Send files'], ['sign-out', 'Sign out']])}
<h2 id="demo">Try the demo first (optional)</h2>
<p>On the subscription screen, press ${btn('Try the demo')}. You get a channel of sample family files and every feature, with no Telegram account and no subscription. When you are done, go to ${path('Settings', 'Account &amp; channel')} and press ${btn('Leave the demo')}.</p>

<h2 id="sign-in">Sign in</h2>
<p>Downabit works with your own Telegram account. Telegram accounts are free; if you do not have one, install Telegram on your phone and create it there first.</p>
<h3>With a QR code (recommended, no typing)</h3>
<ol class="steps">
  <li>On the TV, choose ${btn('Log in with QR code')}. A QR code appears.</li>
  <li>On your phone, open Telegram and go to ${path('Settings', 'Devices', 'Link Desktop Device')}.</li>
  <li>Point the phone at the QR code on the TV. The TV signs in by itself.</li>
</ol>
<h3>With your phone number</h3>
<ol class="steps">
  <li>On the TV, choose ${btn('Log in with phone number')}, type the number with the country code, for example <code>+1 555 123 4567</code>, and press ${btn('Send code')}.</li>
  <li>Telegram sends a code, usually as a message in the Telegram app on your phone. Type it on the TV.</li>
  <li>If your account has a Two-Step Verification password, the TV asks for it next.</li>
</ol>
<div class="note">Downabit never sees your code or password leave the TV: they go straight to Telegram. See the <a href="/downabit/privacy/">privacy policy</a>.</div>

<h2 id="channel">Your private channel</h2>
<p>After signing in, Downabit creates a private channel called <strong>Downabit</strong> in your account (or uses one you already have with that name). It is private: only you, and anyone you add yourself, can see it. Downabit reads only this one channel, never your chats.</p>
<p>You can rename it or switch to another channel in ${path('Settings', 'Account &amp; channel')}.</p>

<h2 id="send">Send files to the TV</h2>
<ol class="steps">
  <li>On your phone or computer, open Telegram and find the <strong>Downabit</strong> channel.</li>
  <li>Send a video, picture, song or document, or forward one from any chat.</li>
  <li>On the TV it appears in <strong>Files</strong> a moment later. Press ${btn('Refresh')} if it is not there yet.</li>
</ol>
<p><strong>Tip:</strong> to keep photos and videos in full quality, send them <em>as a file</em> (in Telegram's attach menu choose <em>File</em> instead of <em>Gallery</em>). Telegram compresses pictures sent the normal way.</p>
<p><strong>Family:</strong> add family members to the channel as admins (in Telegram: channel info, Administrators, Add admin) and whatever they post shows up on your TV too.</p>

<h2 id="sign-out">Sign out</h2>
<p>${path('Settings', 'Account &amp; channel')} › ${btn('Log out')} removes the sign-in from this TV only. Your Telegram account, the channel and your files stay as they are. To delete everything, see <a href="/downabit/delete-data/">delete your data</a>.</p>`)

  // ---- TV and USB ----------------------------------------------------------------------------------------------------
  guidePage('tv-and-usb', 'TV storage and USB drives',
    'Save on the TV itself or on a USB drive plugged into it.',
    `
${toc([['tv', 'TV storage'], ['usb', 'USB drives'], ['space', 'Free space']])}
<h2 id="tv">TV storage</h2>
<p>Nothing to set up. When you pick a file, choose ${btn('TV storage')}. It is saved in the TV's <code>Download/Downabit</code> folder and appears in <strong>My files</strong>, where you can play, open or delete it.</p>
<p>The first time, Android asks whether Downabit may access photos, videos and music. Allow it: this lets Downabit show and play the files it saved, also after the app is reinstalled.</p>

<h2 id="usb">USB drives</h2>
<ol class="steps">
  <li>Plug the USB stick or disk into the TV (or into a USB hub or OTG adapter on a streaming stick).</li>
  <li>If Android asks how to use the drive, choose <strong>removable storage</strong> (sometimes called <em>portable storage</em> or <em>use as media</em>). Do <strong>not</strong> choose to use it as internal storage: that erases the drive.</li>
  <li>Open ${path('Settings', 'Storage on TV')} in Downabit: the drive is listed with its free space.</li>
  <li>When you save a file, the drive appears in the <em>Save to</em> list. Files go into a Downabit folder on the drive.</li>
</ol>
<div class="note"><strong>Which format?</strong> exFAT works on almost every TV and holds files larger than 4 GB. FAT32 works everywhere but cannot hold a single file over 4 GB. NTFS works on many Android TVs but not all. If a drive is listed as <em>cannot be used</em>, the TV cannot write to it: format it as exFAT on a computer (this erases it).</div>

<h2 id="space">Free space</h2>
<p>Downabit checks the free space before every download and keeps some room for Android. Files saved to a NAS, WebDAV or the cloud stream straight through the TV in small pieces, so a small streaming stick can pass on a film much bigger than its own free space.</p>`)

  // ---- Network share (SMB) -------------------------------------------------------------------------------------------
  guidePage('network-share', 'Network share (SMB)',
    'Save to a shared folder on a Windows PC, a Mac or a NAS.',
    `
${toc([['before', 'Before you start'], ['tv', 'On the TV'], ['windows', 'Windows'], ['mac', 'Mac'], ['nas', 'NAS'], ['synology', 'Synology'], ['qnap', 'QNAP'], ['other', 'Other NAS and routers'], ['trouble', 'Troubleshooting']])}
<h2 id="before">Before you start</h2>
<ul>
  <li>The TV and the computer or NAS must be on the <strong>same home network</strong> (not a guest Wi-Fi).</li>
  <li>You need a <strong>shared folder</strong> and an <strong>account that may change files</strong> in it. The steps for Windows, Mac and NAS are below.</li>
  <li>Downabit speaks <strong>SMB 2 and SMB 3</strong>, which every computer and NAS from the last ten years supports. Old devices that only offer SMB 1 do not work.</li>
  <li>The computer must be awake while Downabit saves to it or plays from it.</li>
</ul>

<h2 id="tv">On the TV</h2>
<ol class="steps">
  <li>Open ${path('Settings', 'Cloud &amp; network')} and find the card <strong>Network share (NAS, Windows PC)</strong>.</li>
  <li>Press ${btn('Find shared folders on my network')}. Downabit lists the computers and NAS it finds. Pick yours.
    <br><span class="muted">Not listed? Press ${btn('Enter address manually')} and type its address, for example <code>192.168.1.20</code>, then ${btn('Show shared folders')}. The sections below show where to find the address.</span></li>
  <li>When it asks, sign in with the <strong>User name</strong> and <strong>Password</strong> of an account on that computer or NAS. Leave <em>Domain</em> empty unless you are on a work network.</li>
  <li>Pick the shared folder. Downabit checks that it may save there and shows the free space.</li>
  <li>Done: the share appears in the <em>Save to</em> list. Files go into a <strong>Downabit</strong> folder inside it, and videos kept there play straight from the share.</li>
</ol>

<h2 id="windows">Windows 10 and 11</h2>
<h3>1. Share a folder</h3>
<ol class="steps">
  <li>Create a folder for the TV, for example <code>C:\\TV</code> or a folder on a second drive.</li>
  <li>Right-click it, choose <strong>Properties</strong>, open the <strong>Sharing</strong> tab and press <strong>Share…</strong>.</li>
  <li>Choose your own account, set <strong>Permission level</strong> to <strong>Read/Write</strong>, and press <strong>Share</strong>, then <strong>Done</strong>.</li>
</ol>
<h3>2. Allow sharing on your home network</h3>
<ol class="steps">
  <li>Make sure your network is <strong>Private</strong>: ${path('Settings', 'Network &amp; internet', 'Wi-Fi or Ethernet', 'your network')}, <em>Network profile type</em>: <strong>Private</strong>.</li>
  <li>Turn on sharing: Windows 11: ${path('Settings', 'Network &amp; internet', 'Advanced network settings', 'Advanced sharing settings')}. Windows 10: ${path('Control Panel', 'Network and Sharing Center', 'Change advanced sharing settings')}. Under <strong>Private networks</strong>, turn on <strong>Network discovery</strong> and <strong>File and printer sharing</strong>.</li>
</ol>
<h3>3. The account to sign in with</h3>
<ul>
  <li>If you sign in to Windows with a <strong>Microsoft account</strong>, the user name is its <strong>email address</strong> and the password is the <strong>Microsoft account password</strong>. Your Windows <em>PIN</em> does not work over the network.</li>
  <li>If you use a <strong>local account</strong>, use its name and password. An account without a password cannot be used over the network: give it one, or create a separate local account for the TV and give it Read/Write on the folder.</li>
</ul>
<h3>4. The address</h3>
<p>${path('Settings', 'Network &amp; internet', 'your network', 'Properties')}: the <strong>IPv4 address</strong>, for example <code>192.168.1.20</code>. The computer's name (${path('Settings', 'System', 'About')}) usually works too.</p>
<div class="note"><strong>Keep it awake.</strong> A sleeping PC cannot be reached. While downloading or watching from it, set ${path('Settings', 'System', 'Power', 'Sleep')} to <em>Never</em> when plugged in.</div>

<h2 id="mac">Mac (macOS 13 Ventura and later)</h2>
<ol class="steps">
  <li>Open ${path('System Settings', 'General', 'Sharing')} and turn on <strong>File Sharing</strong>.</li>
  <li>Press the <strong>ⓘ</strong> next to File Sharing. Under <em>Shared Folders</em> press <strong>+</strong> and add the folder for the TV. Under <em>Users</em>, set your account to <strong>Read &amp; Write</strong>.</li>
  <li>Press <strong>Options…</strong>, make sure <strong>Share files and folders using SMB</strong> is on, and under <em>Windows File Sharing</em> tick your account and type its password. Without this tick, SMB sign-in with that account is refused.</li>
  <li>The address is shown on the same screen (<code>smb://192.168.1.21</code>); on the TV type only the number part.</li>
  <li>Sign in with your Mac account's <strong>short name</strong> (the name of your home folder) and its password.</li>
</ol>
<p class="muted">macOS 12 and earlier: the same settings are in ${path('System Preferences', 'Sharing', 'File Sharing', 'Options…')}. To keep the Mac reachable, turn on <em>Wake for network access</em> in the battery or energy settings.</p>

<h2 id="nas">NAS in general</h2>
<ol class="steps">
  <li>Turn on the <strong>SMB</strong> (Windows file sharing) service and set the minimum protocol to <strong>SMB 2</strong> or higher.</li>
  <li>Create a <strong>shared folder</strong>, or use one you have, such as <em>video</em> or <em>media</em>.</li>
  <li>Give a user account <strong>read/write</strong> permission on that folder. A separate user just for the TV is a good idea.</li>
  <li>Find the NAS address in its admin page or your router's list of devices, then follow <a href="#tv">On the TV</a>.</li>
</ol>
<h3 id="synology">Synology (DSM 7)</h3>
<ol class="steps">
  <li>${path('Control Panel', 'File Services', 'SMB')}: tick <strong>Enable SMB service</strong>. In <em>Advanced Settings</em>, set <em>Minimum SMB protocol</em> to <strong>SMB2</strong> (or higher).</li>
  <li>${path('Control Panel', 'Shared Folder')}: create a folder or pick one, press <strong>Edit</strong>, <strong>Permissions</strong>, and give your user <strong>Read/Write</strong>.</li>
  <li>On the TV, sign in with that DSM user name and password.</li>
</ol>
<h3 id="qnap">QNAP (QTS / QuTS hero)</h3>
<ol class="steps">
  <li>${path('Control Panel', 'Network &amp; File Services', 'Win/Mac/NFS/WebDAV', 'Microsoft Networking')}: tick <strong>Enable file service for Microsoft networking</strong>. In <em>Advanced Options</em>, set the lowest SMB version to <strong>SMB 2</strong>.</li>
  <li>${path('Control Panel', 'Privilege', 'Shared Folders')}: create a folder or pick one, open <strong>Edit Shared Folder Permission</strong>, and give your user <strong>RW</strong>.</li>
  <li>On the TV, sign in with that QNAP user name and password.</li>
</ol>
<h3 id="other">Other NAS, routers and Raspberry Pi</h3>
<p>TrueNAS, Unraid, OpenMediaVault, WD My Cloud, Asustor and Samba on Linux or a Raspberry Pi all work the same way: an SMB share, a user with write permission, SMB 2 or newer. Many routers can share a USB disk over SMB too; check that the router offers SMB 2, since some older ones only offer SMB 1.</p>

<h2 id="trouble">Troubleshooting</h2>
<div class="faq">
  <details><summary>"No computers with shared folders were found"</summary><div><p>Check the TV and the computer are on the same network (not a guest Wi-Fi), that the computer is on and awake, and that sharing is turned on. Then use ${btn('Enter address manually')} with its IP address: some networks block the search even though the share works.</p></div></details>
  <details><summary>"… needs a user name and password to save files"</summary><div><p>The folder does not let guests write. Sign in with an account on that computer or NAS, as described above.</p></div></details>
  <details><summary>"Signed in as …, but … does not let that account save files"</summary><div><p>The account may read but not change files. Give it <strong>Read/Write</strong> (Windows), <strong>Read &amp; Write</strong> (Mac) or <strong>RW</strong> (NAS) on that folder, or pick another folder.</p></div></details>
  <details><summary>Sign-in keeps failing on Windows</summary><div><p>Use the Microsoft account's email and password, not the PIN. If that still fails, create a local account with a password for the TV (${path('Settings', 'Accounts', 'Other users')}) and give it Read/Write on the folder.</p></div></details>
  <details><summary>Sign-in keeps failing on a Mac</summary><div><p>Open File Sharing ${path('Options…')} and make sure your account is ticked under <em>Windows File Sharing</em>. Use the account's short name.</p></div></details>
  <details><summary>It worked yesterday, today it does not</summary><div><p>The computer may be asleep, or its address may have changed. Give the computer a fixed address in your router (a "DHCP reservation"), or connect again with ${btn('Find a different shared folder')}.</p></div></details>
  <details><summary>Old NAS or router</summary><div><p>If it only offers SMB 1, Downabit cannot use it. Look for a firmware update that adds SMB 2, or use its WebDAV service if it has one.</p></div></details>
</div>`)

  // ---- WebDAV --------------------------------------------------------------------------------------------------------
  guidePage('webdav', 'WebDAV',
    'Nextcloud, ownCloud, or the WebDAV service of a NAS.',
    `
${toc([['tv', 'On the TV'], ['nextcloud', 'Nextcloud'], ['owncloud', 'ownCloud'], ['synology', 'Synology'], ['qnap', 'QNAP'], ['trouble', 'Troubleshooting']])}
<h2 id="tv">On the TV</h2>
<ol class="steps">
  <li>Open ${path('Settings', 'Cloud &amp; network')} and find the card <strong>WebDAV (Nextcloud, ownCloud, NAS)</strong>.</li>
  <li>Press ${btn('Find servers on my network')}. Downabit looks for WebDAV servers on the usual ports (80, 443, 5005, 5006, 8080, 8443) and common paths. Pick yours.
    <br><span class="muted">For a server on the internet, or one it does not find, press ${btn('Enter address manually')} and type the full <strong>Server address</strong> from the sections below.</span></li>
  <li>If the server asks, enter your <strong>User name</strong> and <strong>Password</strong>.</li>
  <li>Done: files go into a <strong>Downabit</strong> folder at the address you gave, and videos kept there play straight from the server.</li>
</ol>

<h2 id="nextcloud">Nextcloud</h2>
<ol class="steps">
  <li>Server address: <code>https://your-cloud.example.com/remote.php/dav/files/USERNAME/</code>, with your Nextcloud user name in place of <code>USERNAME</code>. Nextcloud shows it in <strong>Files</strong>, <strong>Files settings</strong> (bottom left), <em>WebDAV</em>.</li>
  <li>Use an <strong>app password</strong> instead of your normal password: ${path('Settings', 'Security', 'Devices &amp; sessions')}, type a name such as <em>TV</em> and press <strong>Create new app password</strong>. This also works when two-factor sign-in is on.</li>
</ol>
<h2 id="owncloud">ownCloud</h2>
<ol class="steps">
  <li>Server address: <code>https://your-cloud.example.com/remote.php/webdav/</code>. ownCloud shows it in <strong>Files</strong>, <strong>Settings</strong> (bottom left).</li>
  <li>If two-factor sign-in is on, create an app passcode in ${path('Settings', 'Security')} and use it as the password.</li>
</ol>
<h2 id="synology">Synology</h2>
<ol class="steps">
  <li>In <strong>Package Center</strong>, install <strong>WebDAV Server</strong>, open it and enable HTTP (port 5005) and/or HTTPS (port 5006).</li>
  <li>Give your user permission to the shared folder (${path('Control Panel', 'Shared Folder', 'Edit', 'Permissions')}).</li>
  <li>Server address: <code>http://NAS-ADDRESS:5005/SHARED-FOLDER/</code>, for example <code>http://192.168.1.20:5005/video/</code>. Include the shared folder: the top level of a Synology WebDAV server only lists folders and cannot hold files.</li>
</ol>
<h2 id="qnap">QNAP</h2>
<ol class="steps">
  <li>${path('Control Panel', 'Network &amp; File Services', 'Win/Mac/NFS/WebDAV', 'WebDAV')}: tick <strong>Enable WebDAV</strong> (HTTP port 8080 by default, HTTPS 8081).</li>
  <li>Give your user read/write on the shared folder.</li>
  <li>Server address: <code>http://NAS-ADDRESS:8080/SHARED-FOLDER/</code>.</li>
</ol>

<h2 id="trouble">Troubleshooting</h2>
<div class="faq">
  <details><summary>"No WebDAV server was found on your network"</summary><div><p>A NAS usually needs its WebDAV service switched on first (see above). Nextcloud and ownCloud on the internet are never found by the search: use ${btn('Enter address manually')}.</p></div></details>
  <details><summary>The password is refused</summary><div><p>On Nextcloud and ownCloud with two-factor sign-in, only an app password works. Check the user name in the address matches the one you sign in with.</p></div></details>
  <details><summary>Uploads of big files fail</summary><div><p>Servers behind a proxy or hosting plan may limit upload size. Raise the limit on the server, or save big files to a network share instead.</p></div></details>
</div>`)

  // ---- Google Drive --------------------------------------------------------------------------------------------------
  guidePage('google-drive', 'Google Drive',
    'Link your Google account with your phone. No typing on the TV.',
    `
${toc([['link', 'Link your account'], ['files', 'Where files go'], ['unlink', 'Unlink']])}
<h2 id="link">Link your account</h2>
<ol class="steps">
  <li>Open ${path('Settings', 'Cloud &amp; network')} and, on the <strong>Google Drive</strong> card, press ${btn('Link with your phone (QR code)')}.</li>
  <li>Scan the QR code with your phone's camera and sign in to the Google account you want to use.</li>
  <li>If the code is not filled in automatically, type the code shown on the TV on the Google page.</li>
  <li>Allow Downabit access. The TV shows <em>Waiting for you to finish on the phone…</em> and then the account it linked.</li>
</ol>
<h2 id="files">Where files go</h2>
<p>Files are uploaded into a folder called <strong>Downabit</strong> in your Drive. Downabit can only see the files it created itself: it has no access to anything else in your Drive. Videos kept there play straight from Drive, so they use no space on the TV.</p>
<p>Uploads count towards your Google storage (15 GB free, shared with Gmail and Photos).</p>
<h2 id="unlink">Unlink</h2>
<p>Remove Google Drive in ${path('Settings', 'Cloud &amp; network')}. To withdraw the access completely, open <a href="https://myaccount.google.com/connections">Google Account › Third-party connections</a> and remove Downabit. Files already uploaded stay in your Drive.</p>`)

  // ---- Dropbox -------------------------------------------------------------------------------------------------------
  guidePage('dropbox', 'Dropbox',
    'Link your Dropbox with your phone and a short code.',
    `
${toc([['link', 'Link your account'], ['files', 'Where files go'], ['unlink', 'Unlink']])}
<h2 id="link">Link your account</h2>
<ol class="steps">
  <li>Open ${path('Settings', 'Cloud &amp; network')} and, on the <strong>Dropbox</strong> card, press ${btn('Link with your phone (QR code)')}.</li>
  <li>Scan the QR code with your phone. A page opens on your phone.</li>
  <li>Tap <strong>Open and allow access</strong>, sign in to Dropbox and press <strong>Allow</strong>. Dropbox then shows an access code.</li>
  <li>Copy the code, go back to the page and paste it, then tap <strong>Send to my TV</strong>. The TV picks it up by itself.
    <br><span class="muted">That page is served by the TV on your own home network, so the phone must be on the same Wi-Fi. If it cannot open, the TV offers to type the <em>Access code</em> instead.</span></li>
</ol>
<h2 id="files">Where files go</h2>
<p>Files are uploaded into the <strong>/Downabit</strong> folder of your Dropbox. Videos kept there play straight from Dropbox, so they use no space on the TV. Uploads count towards your Dropbox storage.</p>
<h2 id="unlink">Unlink</h2>
<p>Remove Dropbox in ${path('Settings', 'Cloud &amp; network')}. To withdraw the access completely, open <a href="https://www.dropbox.com/account/connected_apps">Dropbox › Connected apps</a> and disconnect Downabit. Files already uploaded stay in your Dropbox.</p>`)

  return GUIDES.map(([slug, , title]) => [slug, title])
}
