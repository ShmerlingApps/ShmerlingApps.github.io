// Accessibility menu: a button on every page that opens a small panel of display options (text size, contrast,
// links, readable font, still page, strong focus). Our own code, no third-party overlay. The choices are kept in
// localStorage and applied by an inline snippet in <head> before the page paints (see build.mjs).
(function () {
  var KEY = 'a11y';
  var root = document.documentElement;
  var ZOOMS = [1, 1.15, 1.3, 1.5];
  var TOGGLES = [
    ['contrast', 'High contrast', 'Black background, white text, yellow links'],
    ['links', 'Highlight links', 'Underline and outline every link'],
    ['readable', 'Readable text', 'Plain font, wider letter and line spacing'],
    ['still', 'Stop animations', 'No motion, no sliding screens'],
    ['focus', 'Strong focus outline', 'A thick yellow frame around where you are'],
  ];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* private window: the choice lasts for this page only */ }
  }
  var state = load();

  function apply() {
    TOGGLES.forEach(function (t) { root.classList.toggle('a11y-' + t[0], !!state[t[0]]); });
    var z = ZOOMS[state.zoom || 0] || 1;
    root.classList.toggle('a11y-zoom', z !== 1);
    root.style.setProperty('--a11y-zoom', String(z));
    document.dispatchEvent(new CustomEvent('a11ychange', { detail: state }));
  }

  var icon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="4.2" r="2.2" fill="currentColor"/>' +
    '<path d="M4 8.2c2.7.9 5.3 1.3 8 1.3s5.3-.4 8-1.3M12 9.5v5m0 0-3 6.8M12 14.5l3 6.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'a11y-button';
  button.setAttribute('aria-label', 'Accessibility options');
  button.setAttribute('title', 'Accessibility · נגישות');
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'a11y-panel');
  button.innerHTML = icon;

  var panel = document.createElement('div');
  panel.id = 'a11y-panel';
  panel.className = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'a11y-title');
  panel.hidden = true;
  panel.innerHTML =
    '<div class="a11y-head"><h2 id="a11y-title" tabindex="-1">Accessibility <span lang="he">· נגישות</span></h2>' +
    '<button type="button" class="a11y-close" aria-label="Close accessibility options">×</button></div>' +
    '<div class="a11y-size" role="group" aria-labelledby="a11y-size-label"><span id="a11y-size-label">Text size</span>' +
    '<button type="button" data-zoom="-1" aria-label="Smaller text">A−</button>' +
    '<output aria-live="polite" id="a11y-size-value"></output>' +
    '<button type="button" data-zoom="1" aria-label="Larger text">A+</button></div>' +
    TOGGLES.map(function (t) {
      return '<button type="button" class="a11y-toggle" data-toggle="' + t[0] + '" aria-pressed="false">' +
        '<span class="a11y-text"><strong>' + t[1] + '</strong><small>' + t[2] + '</small></span>' +
        '<span class="a11y-state" aria-hidden="true"></span></button>';
    }).join('') +
    '<div class="a11y-foot"><button type="button" class="a11y-reset">Reset all</button>' +
    '<a href="/accessibility/">Accessibility statement</a></div>';

  function render() {
    var z = ZOOMS[state.zoom || 0] || 1;
    panel.querySelector('#a11y-size-value').textContent = Math.round(z * 100) + '%';
    panel.querySelector('[data-zoom="-1"]').disabled = !state.zoom;
    panel.querySelector('[data-zoom="1"]').disabled = (state.zoom || 0) >= ZOOMS.length - 1;
    panel.querySelectorAll('[data-toggle]').forEach(function (b) {
      var on = !!state[b.getAttribute('data-toggle')];
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.querySelector('.a11y-state').textContent = on ? 'On' : 'Off';
    });
  }

  function open() {
    panel.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    render();
    panel.querySelector('#a11y-title').focus();
  }
  function close(returnFocus) {
    if (panel.hidden) return;
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    if (returnFocus) button.focus();
  }

  button.addEventListener('click', function () { panel.hidden ? open() : close(true); });
  panel.querySelector('.a11y-close').addEventListener('click', function () { close(true); });
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(true); e.stopPropagation(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) close(true); });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !panel.contains(e.target) && !button.contains(e.target)) close(false);
  });
  panel.querySelectorAll('[data-zoom]').forEach(function (b) {
    b.addEventListener('click', function () {
      var next = (state.zoom || 0) + Number(b.getAttribute('data-zoom'));
      state.zoom = Math.max(0, Math.min(ZOOMS.length - 1, next));
      save(state); apply(); render();
    });
  });
  panel.querySelectorAll('[data-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-toggle');
      state[k] = !state[k];
      save(state); apply(); render();
    });
  });
  panel.querySelector('.a11y-reset').addEventListener('click', function () {
    state = {};
    save(state); apply(); render();
  });

  document.body.appendChild(button);
  document.body.appendChild(panel);
  apply();
})();
