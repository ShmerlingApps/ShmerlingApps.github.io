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

  // Carousels: native scroll-snap for swiping, plus arrows, dots, keyboard and a gentle autoplay.
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
    var dotsBox = root.querySelector('.carousel-dots');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
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
    var stopped = false;
    function pause() { stopped = true; if (timer) { clearInterval(timer); timer = null; } }
    function play() { if (reduced || stopped || timer) return; timer = setInterval(function () { go(current + 1); }, 5500); }
    root.addEventListener('mouseenter', function () { if (timer) { clearInterval(timer); timer = null; } });
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', pause);
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
})();
