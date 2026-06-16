// CATS PAGE - Specific JavaScript

// Cat filter function - shows/hides based on adoption status
function filterCats(status) {
  var cards = document.querySelectorAll('.cat-card');
  
  /* Loop through each cat card and show/hide based on filter */
  cards.forEach(function(c) {
    var cardStatus = c.getAttribute('data-status') || 'adopt';
    var show = status === 'all' || cardStatus === status;
    c.style.display = show ? '' : 'none';
  });
  
  /* Update filter button styles - highlight active filter */
  ['all','adopt','home','reserved'].forEach(function(s) {
    var btn = document.getElementById('cf-' + s);
    /* Active button gets terra color, others are outline style */
    if (btn) {
      btn.className = s === status ? 'btn btn-terra' : 'btn btn-outline';
      btn.style.fontSize = '0.82rem';
      btn.style.padding  = '9px 18px';
    }
  });
}

// Cats page initialization
(function catsInit() {
  // Set default filter to 'all'
  var defaultFilter = document.getElementById('cf-all');
  if (defaultFilter) {
    filterCats('all');
  }
  
  console.log('Cats page initialized');
})();
