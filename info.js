// INFO / VISIT US PAGE - Specific JavaScript

// Contact form handler
function sendContact() {
  var ok = true;
  
  function chkC(fid, eid, test) {
    var f = document.getElementById(fid), e = document.getElementById(eid);
    if (!test(f.value)) { f.classList.add('err'); e.classList.add('show'); ok = false; }
    else                { f.classList.remove('err'); e.classList.remove('show'); }
  }
  
  chkC('cf-n', 'ecf-n', function(v){ return v.trim().length >= 2; });
  chkC('cf-e', 'ecf-e', function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
  chkC('cf-s', 'ecf-s', function(v){ return v !== ''; });
  chkC('cf-m', 'ecf-m', function(v){ return v.trim().length >= 8; });
  
  if (ok) {
    var form = document.getElementById('contact-form');
    var success = document.getElementById('contact-ok');
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
  }
}

// Info page initialization
(function infoInit() {
  console.log('Info page initialized');
})();
