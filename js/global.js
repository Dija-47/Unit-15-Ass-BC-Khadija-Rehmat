// =============================================================
// GLOBAL JAVASCRIPT - Shared across all pages
// =============================================================

// CUSTOM PAW CURSOR - Only on desktop/hover-capable devices
// Detect if device supports hover (desktop) or is touch-only (mobile)
var isTouchDevice = () => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
};

// Only initialize cursor on non-touch devices
if (!isTouchDevice()) {
  var ring = document.getElementById('cur-ring');
  var dot  = document.getElementById('cur-dot');
  var mx=0, my=0, rx=0, ry=0;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    // Dot cursor follows mouse position instantly
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Animation function creates lerp (linear interpolation) effect for ring cursor
  // Ring moves smoothly toward mouse position using 0.16 interpolation factor
  function animCursor() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    // Update ring position with smooth animation
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    // RequestAnimationFrame continues animation on next frame
    requestAnimationFrame(animCursor);
  }
  // Start the cursor animation loop
  animCursor();

  // Expand paw when hovering interactive elements
  document.addEventListener('mouseover', function(e) {
    var t = e.target;
    var isClickable = t.tagName==='BUTTON'||t.tagName==='A'||t.tagName==='SELECT'||
      t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.closest('.cat-card')||
      t.closest('.preview-card')||t.closest('.faq-q')||t.closest('.soc-btn')||
      t.closest('.price-card')||t.closest('.menu-card')||t.closest('.rule-card')||
      t.closest('.adopt-step');
    document.body.classList.toggle('cur-hover', !!isClickable);
  });
} else {
  // Hide cursor elements on touch devices
  var curRing = document.getElementById('cur-ring');
  var curDot = document.getElementById('cur-dot');
  if (curRing) curRing.style.display = 'none';
  if (curDot) curDot.style.display = 'none';
}

// FLOATING PAWS BACKGROUND
// Creates 12 slowly drifting paw emojis in the background
(function spawnPaws() {
  var container = document.getElementById('fp-container');
  if (!container) return;
  
  // Array of cat-related emoji choices for visual variety
  var emojis = ['🐾','🐱','😸','😻','🐈','🐾','🐱','🐾'];
  // Loop creates 12 floating elements
  for (var i = 0; i < 12; i++) {
    var el = document.createElement('span');
    el.className = 'fp';
    // Cycle through emoji array for each element
    el.textContent = emojis[i % emojis.length];
    // Random horizontal position across viewport width
    el.style.left = (Math.random() * 100) + 'vw';
    // Random animation duration between 18-40 seconds for organic feel
    el.style.animationDuration = (18 + Math.random() * 22) + 's';
    // Negative delay creates staggered start times for continuous effect
    el.style.animationDelay = -(Math.random() * 20) + 's';
    // Random size between 0.9rem and 2.3rem
    el.style.fontSize = (0.9 + Math.random() * 1.4) + 'rem';
    container.appendChild(el);
  }
})();

// SCROLL REVEAL
// Intersection Observer watches for elements entering viewport for scroll reveal effect
var revObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    // When 10% of element is visible, add visible class and stop observing
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });

// Function attaches observer to all reveal elements on page
function bindReveals() {
  document.querySelectorAll('.reveal').forEach(function(el) { revObs.observe(el); });
}

// FOOTER INJECTION
// Injects footer template into placeholder elements
function injectFooters() {
  var tmpl = document.getElementById('ft');
  if (!tmpl) return;
  
  document.querySelectorAll('[data-footer]').forEach(function(ph) {
    ph.replaceWith(tmpl.content.cloneNode(true));
  });
}

// MOBILE NAV — hamburger toggle
(function setupMobileNav() {
  var navIn = document.querySelector('.nav-in');
  if (!navIn) return;
  
  // Create hamburger button
  var hbg = document.createElement('button');
  hbg.id = 'hbg';
  hbg.setAttribute('aria-label', 'Open navigation menu');
  hbg.setAttribute('aria-expanded', 'false');
  hbg.innerHTML = '<span></span><span></span><span></span>';
  hbg.style.cssText = 'display:none;flex-direction:column;gap:5px;background:none;border:none;padding:8px;min-width:44px;min-height:44px;align-items:center;justify-content:center;border-radius:50px;cursor:pointer;';
  
  // Hamburger CSS
  var hbStyle = document.createElement('style');
  hbStyle.textContent = [
    '#hbg span{display:block;width:22px;height:2px;background:var(--brown);border-radius:2px;transition:all 0.28s ease}',
    '#hbg.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}',
    '#hbg.open span:nth-child(2){opacity:0;width:0}',
    '#hbg.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}',
    '.mob-nav-panel{display:none;position:fixed;top:var(--nav);right:0;bottom:0;width:72%;max-width:280px;background:var(--cream);z-index:999;flex-direction:column;border-left:1px solid var(--border);box-shadow:-12px 0 40px rgba(92,61,46,0.15);transform:translateX(100%);transition:transform 0.28s cubic-bezier(0.4,0,0.2,1)}',
    '.mob-nav-panel.open{display:flex;transform:translateX(0)}',
    '.mob-overlay{display:none;position:fixed;inset:0;top:var(--nav);background:rgba(92,61,46,0.35);z-index:998}',
    '.mob-overlay.open{display:block}',
    '.mob-nav-links{flex:1;display:flex;flex-direction:column;padding:10px 0}',
    '.mob-nav-links a{padding:0 22px;height:52px;display:flex;align-items:center;justify-content:space-between;font-family:var(--fh);font-size:0.95rem;font-weight:700;color:var(--charcoal);border-bottom:1px solid var(--border);transition:all 0.15s;cursor:pointer;}',
    '.mob-nav-links a:hover{background:var(--cream2);color:var(--terracotta)}',
    '.mob-nav-links a.active{color:var(--terracotta)}',
    '.mob-nav-foot{padding:18px 22px;border-top:1px solid var(--border)}',
    '@media(max-width:767px){.nav-links{display:none!important}#hbg{display:flex!important}}'
  ].join('');
  document.head.appendChild(hbStyle);
  navIn.appendChild(hbg);

  // Create mobile panel
  var panel = document.createElement('div');
  panel.className = 'mob-nav-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Mobile navigation');
  panel.innerHTML = [
    '<nav class="mob-nav-links">',
    '<a href="index.html" id="mn-home">Home <span style="color:#ccc">›</span></a>',
    '<a href="cats.html" id="mn-cats">Our Cats <span style="color:#ccc">›</span></a>',
    '<a href="menu.html" id="mn-menu">Menu & Pricing <span style="color:#ccc">›</span></a>',
    '<a href="booking.html" id="mn-booking">Book a Visit <span style="color:#ccc">›</span></a>',
    '<a href="rules.html" id="mn-rules">Café Rules <span style="color:#ccc">›</span></a>',
    '<a href="info.html" id="mn-info">Visit Us <span style="color:#ccc">›</span></a>',
    '</nav>',
    '<div class="mob-nav-foot">',
    '<p style="font-size:0.7rem;color:var(--grey-light);margin-bottom:8px;font-family:var(--fh);letter-spacing:1px;text-transform:uppercase">The Meow Lounge</p>',
    '<p style="font-size:0.82rem;color:var(--grey-text)">14 Bloom Street, Manchester</p>',
    '<p style="font-size:0.82rem;color:var(--terracotta)">hello@themeowlounge.co.uk</p>',
    '</div>'
  ].join('');
  document.body.appendChild(panel);

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'mob-overlay';
  overlay.onclick = closeMob;
  document.body.appendChild(overlay);

  // Hamburger click handler
  hbg.addEventListener('click', function() {
    if (hbg.classList.contains('open')) closeMob();
    else {
      hbg.classList.add('open');
      panel.classList.add('open');
      overlay.classList.add('open');
      hbg.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close menu on nav link click
  panel.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMob);
  });
})();

function closeMob() {
  var hbg = document.getElementById('hbg');
  var panel = document.querySelector('.mob-nav-panel');
  var overlay = document.querySelector('.mob-overlay');
  if (hbg)    { hbg.classList.remove('open'); hbg.setAttribute('aria-expanded','false'); }
  if (panel)  panel.classList.remove('open');
  if (overlay)overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close menu on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.querySelector('.mob-nav-panel.open')) closeMob();
});

// INITIALIZATION
(function globalInit() {
  injectFooters();
  
  // Update nav active state based on current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-links a, .mob-nav-links a');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href') || '';
    if (href === currentPage || (href === '' && currentPage === '')) {
      link.classList.add('active');
    }
  });

  // Set up nav logo click
  var logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
    logo.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        window.location.href = 'index.html';
      }
    });
  }

  setTimeout(bindReveals, 120);
})();
