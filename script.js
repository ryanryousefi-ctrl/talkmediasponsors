/* ============================================================
   TALK MEDIA SPONSORS — JAVASCRIPT
   ============================================================ */

// ---- NAV SCROLL ----
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

// ---- MOBILE NAV TOGGLE ----
(function () {
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobile.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  mobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobile.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
})();

// ---- DEMO BAR ANIMATION (Intersection Observer) ----
(function () {
  const bars = document.querySelectorAll('.demo-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

// ---- STAT COUNTER ANIMATION ----
(function () {
  function parseValue(str) {
    const raw = str.replace(/[^0-9.]/g, '');
    return parseFloat(raw) || 0;
  }
  function getSuffix(str) {
    return str.replace(/[0-9.,]/g, '').trim();
  }
  function formatNumber(n) {
    if (n >= 1000) return Math.round(n).toLocaleString();
    return Number.isInteger(n) ? n.toString() : n.toFixed(0);
  }

  const nums = document.querySelectorAll('.hero__stat-number');
  if (!nums.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseValue(el.textContent);
      const suffix = getSuffix(el.textContent);
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatNumber(target * ease) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
})();

// ---- FORM VALIDATION & SUBMISSION ----
(function () {
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('formSuccess');
  if (!form || !successEl) return;

  const rules = {
    firstName: { required: true, label: 'First name' },
    lastName:  { required: true, label: 'Last name' },
    email:     { required: true, label: 'Email address', type: 'email' },
    business:  { required: true, label: 'Business name' },
    city:      { required: true, label: 'Target city' },
  };

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function validateField(name) {
    const rule = rules[name];
    if (!rule) return null;
    const el = form.elements[name];
    if (!el) return null;
    const val = el.value.trim();
    const errEl = document.getElementById(name + 'Error');
    const group = el.closest('.form-group');

    let error = null;
    if (rule.required && !val) error = rule.label + ' is required.';
    else if (rule.type === 'email' && val && !validateEmail(val)) error = 'Please enter a valid email address.';

    if (errEl) errEl.textContent = error || '';
    if (group) group.classList.toggle('has-error', !!error);
    return error;
  }

  // Live validation on blur
  Object.keys(rules).forEach(name => {
    const el = form.elements[name];
    if (el) el.addEventListener('blur', () => validateField(name));
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const errors = Object.keys(rules).map(validateField).filter(Boolean);
    if (errors.length) return;

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    fetch('https://formspree.io/ryanryousefi@gmail.com', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        Array.from(form.children).forEach(function (child) {
          if (child !== successEl) child.style.display = 'none';
        });
        successEl.classList.add('visible');
        successEl.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        btn.disabled = false;
        btn.textContent = 'Get My Free Media Kit';
        alert('Something went wrong. Please email ryanryousefi@gmail.com directly.');
      }
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = 'Get My Free Media Kit';
      alert('Network error. Please try again or email ryanryousefi@gmail.com directly.');
    });
  });
})();

// ---- SMOOTH SCROLL OFFSET (fixed nav) ----
(function () {
  const NAV_HEIGHT = 72;
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
