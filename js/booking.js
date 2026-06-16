// BOOKING PAGE - Specific JavaScript

// Multi-step booking form navigation - shows correct step and updates progress bar
function goStep(n) {
  /* Hide all booking steps */
  document.querySelectorAll('.bstep').forEach(function(s) { s.classList.remove('active'); });
  /* Show requested step */
  var t = document.getElementById('bs' + n);
  if (t) t.classList.add('active');

  /* Update step indicator circles and labels to show progress */
  var sc1 = document.getElementById('sc1'), sl1 = document.getElementById('sl1');
  var sc2 = document.getElementById('sc2'), sl2 = document.getElementById('sl2');
  var ln1 = document.getElementById('sln1');
  
  /* Step 1 active - highlight first step */
  if (n === 1) {
    sc1.className = 'step-circle active'; sl1.className = 'step-lbl active';
    sc2.className = 'step-circle';        sl2.className = 'step-lbl';
    ln1.className = 'step-line';
  } else if (n === 2) {
    /* Step 2 active - mark step 1 done, highlight step 2 */
    sc1.className = 'step-circle done';   sl1.className = 'step-lbl done';
    sc2.className = 'step-circle active'; sl2.className = 'step-lbl active';
    ln1.className = 'step-line done';
  }

  var bar = document.getElementById('step-bar');
  if (bar && n <= 2) bar.setAttribute('aria-valuenow', n);

  var card = document.querySelector('.booking-wrap');
  if (card) card.scrollIntoView({behavior:'smooth', block:'start'});
}

// Booking form step 1 validation
function step1next() {
  var ok = true;
  var date = document.getElementById('b-date');
  var eDate = document.getElementById('e-date');
  var today = new Date().toISOString().split('T')[0];
  
  if (!date.value || date.value < today) {
    date.classList.add('err'); eDate.classList.add('show');
    eDate.textContent = date.value ? '⚠ Please select a future date' : '⚠ Please select a date';
    ok = false;
  } else { date.classList.remove('err'); eDate.classList.remove('show'); }

  var sess = document.getElementById('b-session');
  var eSess = document.getElementById('e-session');
  if (!sess.value) {
    sess.classList.add('err'); eSess.classList.add('show'); ok = false;
  } else { sess.classList.remove('err'); eSess.classList.remove('show'); }

  if (ok) goStep(2);
}

// Booking form confirmation and success display
function confirmBook() {
  var ok = true;
  
  function chk(fid, eid, test, msg) {
    var f = document.getElementById(fid), e = document.getElementById(eid);
    if (!test(f.value)) {
      f.classList.add('err'); e.classList.add('show');
      if (msg) e.textContent = '⚠ ' + msg;
      ok = false;
    } else { f.classList.remove('err'); e.classList.remove('show'); }
  }
  
  chk('b-fn',    'e-fn',    function(v){ return v.trim().length >= 2; }, 'Enter your first name');
  chk('b-ln',    'e-ln',    function(v){ return v.trim().length >= 2; }, 'Enter your last name');
  chk('b-email', 'e-email', function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, 'Enter a valid email address');
  if (!ok) return;

  /* Build summary */
  var date  = document.getElementById('b-date').value;
  var dp    = date.split('-');
  var nd    = dp[2] + '/' + dp[1] + '/' + dp[0];
  var sessEl= document.getElementById('b-session');
  var sess  = sessEl.options[sessEl.selectedIndex].text;
  var adults= document.getElementById('b-adults').value;
  var kids  = document.getElementById('b-children').value;
  var packEl= document.getElementById('b-package');
  var pack  = packEl.options[packEl.selectedIndex].text;
  var fn    = document.getElementById('b-fn').value.trim();
  var ln    = document.getElementById('b-ln').value.trim();
  var em    = document.getElementById('b-email').value.trim();
  var ref   = 'ML-' + (Math.floor(Math.random()*900000)+100000);

  var okSum = document.getElementById('ok-sum');
  if (okSum) {
    okSum.innerHTML =
      '<strong>Booking Ref: ' + ref + '</strong><br>' +
      '📅 Date: ' + nd + '<br>' +
      '🕐 Session: ' + sess + '<br>' +
      '👥 Guests: ' + adults + ' adult(s)' + (kids > 0 ? ', ' + kids + ' child(ren)' : '') + '<br>' +
      '☕ Package: ' + pack + '<br>' +
      '📧 Confirmation sent to: ' + em + '<br><br>' +
      '<em style="font-size:0.82rem;color:var(--grey-light)">Please arrive 5 minutes early. Confirmation sent to ' + fn + ' ' + ln + '.</em>';
  }

  /* Hide step bar on success */
  var bar = document.getElementById('step-bar');
  if (bar) bar.style.display = 'none';

  document.querySelectorAll('.bstep').forEach(function(s) { s.classList.remove('active'); });
  var okStep = document.getElementById('bs-ok');
  if (okStep) okStep.classList.add('active');
}

// Reset booking form
function resetBook() {
  ['b-date','b-session','b-adults','b-children','b-package','b-notes','b-fn','b-ln','b-email','b-phone'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'SELECT') {
      if (id === 'b-adults')   el.selectedIndex = 1;
      else if (id === 'b-children' || id === 'b-package') el.selectedIndex = 0;
      else el.selectedIndex = 0;
    } else el.value = '';
  });
  
  document.querySelectorAll('.fi.err,.fsel.err').forEach(function(f) { f.classList.remove('err'); });
  document.querySelectorAll('.emsg.show').forEach(function(e) { e.classList.remove('show'); });
  
  var bar = document.getElementById('step-bar');
  if (bar) bar.style.display = '';
  goStep(1);
}

// Booking page initialization
(function bookingInit() {
  // Set booking date minimum to today
  var di = document.getElementById('b-date');
  if (di) di.min = new Date().toISOString().split('T')[0];

  // Start on step 1
  goStep(1);
  
  console.log('Booking page initialized');
})();
