/* ============================================================
   ADVISORY MONKS — shared behaviour (progressive enhancement)
   ============================================================ */
(function () {
  document.documentElement.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll reveals -------------------------------------- */
  function setupReveals() {
    var auto = document.querySelectorAll(
      '.section .s-head, .sp-card, .index-row, .principle, .outcome, .tcard, ' +
      '.p-step, .price-card, .price-custom, .about-stats, .who-card, .work-item, ' +
      '.scenario, .faq-item, .ins-card, .team-card, .ledger-cell, .stat'
    );
    auto.forEach(function (el) { el.classList.add('reveal'); });
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || reduced) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          var siblings = el.parentElement ? [].slice.call(el.parentElement.children).filter(function (c) {
            return c.classList && c.classList.contains('reveal') && !c.classList.contains('in');
          }) : [el];
          var idx = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = Math.min(idx * 70, 280) + 'ms';
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Animated counters (elements with data-count) --------- */
  function setupCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    function animate(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1200, t0 = null;
      if (reduced) { el.textContent = prefix + target.toLocaleString('en-IN') + suffix; return; }
      function tick(t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var v = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = prefix + v.toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- FAQ accordion ----------------------------------------- */
  function setupFaq() {
    document.querySelectorAll('.faq').forEach(function (faq) {
      faq.classList.add('faq-js');
      var items = faq.querySelectorAll('.faq-item');
      items.forEach(function (item, i) {
        var q = item.querySelector('.faq-q');
        var a = item.querySelector('.faq-a');
        if (!q || !a) return;
        q.setAttribute('role', 'button');
        q.setAttribute('tabindex', '0');
        q.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
        if (i === 0) item.classList.add('open');
        function toggle() {
          var open = item.classList.toggle('open');
          q.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        q.addEventListener('click', toggle);
        q.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(); }
        });
      });
    });
  }

  /* ---- Engagement brief rotator (homepage hero) -------------- */
  function setupBriefs() {
    var card = document.getElementById('brief-card');
    var dataEl = document.getElementById('brief-data');
    if (!card || !dataEl) return;
    var briefs;
    try { briefs = JSON.parse(dataEl.textContent); } catch (e) { return; }
    if (!briefs || !briefs.length) return;
    var i = 0;
    var body = card.querySelector('.brief-body');
    var count = card.querySelector('.brief-count');
    function esc(s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    }
    function render(idx) {
      var b = briefs[idx];
      var html = '';
      b.rows.forEach(function (r) {
        var em = r[0] === 'Engagement' ? ' em' : '';
        html += '<div class="brief-row"><span class="k">' + esc(r[0]) + '</span><span class="v' + em + '">' + esc(r[1]) + '</span></div>';
      });
      body.innerHTML = html;
      count.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(briefs.length).padStart(2, '0');
      var tag = card.querySelector('.brief-tagline');
      if (tag) tag.textContent = b.tag || '';
    }
    function go(delta) {
      i = (i + delta + briefs.length) % briefs.length;
      if (reduced) { render(i); return; }
      body.classList.add('out');
      setTimeout(function () { render(i); body.classList.remove('out'); }, 220);
    }
    card.querySelector('.brief-prev').addEventListener('click', function () { go(-1); resetTimer(); });
    card.querySelector('.brief-next').addEventListener('click', function () { go(1); resetTimer(); });
    var timer = null;
    function resetTimer() {
      if (timer) clearInterval(timer);
      if (!reduced) timer = setInterval(function () { go(1); }, 7000);
    }
    render(0);
    resetTimer();
  }

  /* ---- Pricing currency toggle -------------------------------- */
  function setupPricing() {
    var bar = document.getElementById('pbar');
    if (!bar) return;
    var btns = bar.querySelectorAll('.pbar-btn');
    var cards = document.querySelectorAll('.price-card[data-group]');
    function show(group) {
      btns.forEach(function (b) { b.classList.toggle('active', b.dataset.group === group); });
      cards.forEach(function (c) { c.hidden = c.dataset.group !== group; });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { show(b.dataset.group); });
    });
    show('inr');
  }

  /* ---- Contact form (mailto fallback / endpoint-ready) -------- */
  function setupForm() {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('form-status');
    if (!form) return;
    var FORM_ENDPOINT = '';                       /* e.g. 'https://formspree.io/f/abc123' */
    var FALLBACK_EMAIL = 'info@advisorymonks.com';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      if (!name || !email) {
        status.className = 'form-status show';
        status.textContent = 'Name and email are required to start the conversation.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.className = 'form-status show';
        status.textContent = 'That email address does not look right. Please check it.';
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var orig = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = 'Sending…';
      function done(ok, msg) {
        status.className = 'form-status show' + (ok ? ' ok' : '');
        status.textContent = msg;
        btn.disabled = false; btn.innerHTML = orig;
      }
      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: data })
          .then(function (r) {
            if (!r.ok) throw new Error('fail');
            form.reset();
            done(true, 'Thank you, ' + name + '. A partner will reply within two business days.');
          })
          .catch(function () {
            done(false, 'Something went wrong. Please email ' + FALLBACK_EMAIL + ' directly.');
          });
      } else {
        var subject = encodeURIComponent('Introduction request from ' + ((data.get('company') || '').toString().trim() || name));
        var body = encodeURIComponent(
          'Name: ' + name + '\nCompany: ' + (data.get('company') || '') + '\nEmail: ' + email +
          '\nPhone: ' + (data.get('phone') || '') + "\nI'm a: " + (data.get('persona') || '') +
          '\nEngagement interest: ' + (data.get('tier') || '') +
          "\n\nWhat's prompting the conversation:\n" + (data.get('message') || '')
        );
        window.location.href = 'mailto:' + FALLBACK_EMAIL + '?subject=' + subject + '&body=' + body;
        done(true, 'Opening your email. Please send the prefilled message and a partner will reply within two business days.');
      }
    });
  }

  /* ---- Cookie consent (DPDP / GDPR) ---------------------------- */
  function setupConsent() {
    var KEY = 'amc_consent';
    var banner = document.getElementById('consent');
    if (!banner) return;
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    function record(choice) {
      try { localStorage.setItem(KEY, choice); } catch (e) {}
      window.amcConsent = choice;
      banner.hidden = true;
      window.dispatchEvent(new CustomEvent('amc:consent', { detail: { choice: choice } }));
    }
    if (stored) { window.amcConsent = stored; }
    else { banner.hidden = false; }
    var acc = document.getElementById('consent-accept');
    var dec = document.getElementById('consent-decline');
    if (acc) acc.addEventListener('click', function () { record('all'); });
    if (dec) dec.addEventListener('click', function () { record('essential'); });
  }

  /* ---- Analytics — gated on consent ----------------------------- */
  function setupAnalytics() {
    var ANALYTICS_DOMAIN = 'advisorymonks.com';
    var ANALYTICS_ENABLED = false;               /* flip when Plausible/GA4 is live */
    function loadPlausible() {
      if (window.__amcPlausibleLoaded) return;
      window.__amcPlausibleLoaded = true;
      var s = document.createElement('script');
      s.defer = true;
      s.dataset.domain = ANALYTICS_DOMAIN;
      s.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(s);
    }
    function maybe() {
      if (!ANALYTICS_ENABLED) return;
      if (window.amcConsent === 'all') loadPlausible();
    }
    maybe();
    window.addEventListener('amc:consent', maybe);
  }

  function init() {
    setupReveals();
    setupCounters();
    setupFaq();
    setupBriefs();
    setupPricing();
    setupForm();
    setupConsent();
    setupAnalytics();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
