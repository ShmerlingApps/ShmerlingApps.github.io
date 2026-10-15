// Shmerling Apps site: mobile menu, screenshot carousel, promo video, reveal-on-scroll. No dependencies.
(function () {
  document.documentElement.classList.remove('no-js');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Apps menu: a button that opens the list of apps; Escape or a click outside closes it.
  document.querySelectorAll('.nav-menu').forEach(function (menu) {
    var btn = menu.querySelector('.nav-menu-btn');
    if (!btn) return;
    function set(open) {
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); set(!menu.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!menu.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { set(false); btn.focus(); }
    });
    menu.addEventListener('focusout', function (e) { if (e.relatedTarget && !menu.contains(e.relatedTarget)) set(false); });
  });

  // Carousels: native scroll-snap for swiping, plus arrows, dots, keyboard and a gentle autoplay.
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
    var dotsBox = root.querySelector('.carousel-dots');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var pauseBtn = root.querySelector('[data-pause]');
    if (!track || slides.length === 0) return;
    var current = 0;
    var dots = slides.map(function (slide, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show screen ' + (i + 1) + ' of ' + slides.length);
      b.addEventListener('click', function () { go(i); pause(); });
      dotsBox && dotsBox.appendChild(b);
      return b;
    });
    function mark(i) {
      current = i;
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      slides.forEach(function (s, k) { s.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
    }
    function go(i) {
      var n = (i + slides.length) % slides.length;
      var s = slides[n];
      track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.clientWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
      mark(n);
    }
    prev && prev.addEventListener('click', function () { go(current - 1); pause(); });
    next && next.addEventListener('click', function () { go(current + 1); pause(); });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(current + 1); pause(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(current - 1); pause(); e.preventDefault(); }
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting && en.intersectionRatio > 0.6) mark(slides.indexOf(en.target)); });
      }, { root: track, threshold: [0.6] });
      slides.forEach(function (s) { io.observe(s); });
    }
    mark(0);
    var timer = null;
    var html = document.documentElement;
    var still = function () { return reduced || html.classList.contains('a11y-still'); };
    // Stopped for good by the visitor (Pause, a click, a swipe, keyboard focus) or by "Stop animations" / reduced motion.
    var stopped = still();
    function showState() {
      if (!pauseBtn) return;
      pauseBtn.textContent = stopped ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-label', stopped ? 'Play the screens automatically' : 'Pause the screens');
    }
    function pause() { stopped = true; if (timer) { clearInterval(timer); timer = null; } showState(); }
    function play() { if (stopped || timer) return; timer = setInterval(function () { go(current + 1); }, 5500); }
    pauseBtn && pauseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (stopped) { stopped = false; showState(); play(); } else { pause(); }
    });
    document.addEventListener('a11ychange', function () { if (still()) pause(); });
    showState();
    root.addEventListener('mouseenter', function () { if (timer) { clearInterval(timer); timer = null; } });
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', function (e) { if (e.target !== pauseBtn) pause(); });
    track.addEventListener('touchstart', pause, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) play(); else if (timer) { clearInterval(timer); timer = null; } });
      }, { threshold: 0.4 }).observe(root);
    }
  });

  // Promo video: the poster is shown until the visitor presses play.
  document.querySelectorAll('[data-video]').forEach(function (box) {
    var btn = box.querySelector('.play-overlay');
    var src = box.getAttribute('data-video');
    var poster = box.querySelector('img');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var v = document.createElement('video');
      v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute('aria-label', btn.getAttribute('aria-label') || 'Video');
      if (poster) v.poster = poster.currentSrc || poster.src;
      box.innerHTML = '';
      box.appendChild(v);
      v.focus();
    });
  });

  // Fade sections in as they scroll into view.
  var items = document.querySelectorAll('.reveal');
  if (!reduced && 'IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { ro.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Screenshots open full screen when tapped or clicked (Enter or Space from the keyboard); Esc, a tap or the button closes.
  if (typeof HTMLDialogElement === 'function') {
    var zoom = document.createElement('dialog');
    zoom.className = 'zoom';
    zoom.setAttribute('aria-label', 'Screenshot');
    zoom.innerHTML = '<button class="zoom-close" type="button" aria-label="Close">&times;</button><img alt=""><p class="zoom-hint"><span class="turn-hint">Turn your phone sideways for a bigger picture. </span>Tap anywhere to close</p>';
    document.body.appendChild(zoom);
    var big = zoom.querySelector('img');
    zoom.addEventListener('click', function () { zoom.close(); });
    var open = function (img) {
      var set = img.getAttribute('srcset') || '';
      var largest = set.split(',').map(function (p) { return p.trim().split(' ')[0]; }).filter(Boolean).pop();
      big.src = largest || img.currentSrc || img.src;
      big.alt = img.alt;
      zoom.showModal();
    };
    document.querySelectorAll('.shot img, .tv-screen:not([data-video]) img, .showcase .media img').forEach(function (img) {
      img.classList.add('zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Show full screen: ' + img.alt);
      img.addEventListener('click', function () { open(img); });
      img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); } });
    });
  }
})();
