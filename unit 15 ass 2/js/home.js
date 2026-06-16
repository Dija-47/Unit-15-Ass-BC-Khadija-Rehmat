// HOME PAGE - Specific JavaScript

// Newsletter subscription handler
function subscribeNews(e) {
  e.preventDefault();
  var em = document.getElementById('news-email');
  var ok = document.getElementById('news-ok');
  
  if (!em || !ok) return;
  
  if (!em.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) {
    em.style.borderColor = 'rgba(231,76,60,0.7)';
    return;
  }
  
  em.style.borderColor = '';
  ok.style.display = 'block';
  em.value = '';
  em.placeholder = 'Thanks for subscribing!';
}

// Preview card click handlers
(function setupPreviewCards() {
  var previewCards = document.querySelectorAll('.preview-card');
  previewCards.forEach(function(card) {
    card.style.cursor = 'pointer';
    
    // Set up keyboard accessibility
    if (card.getAttribute('tabindex') === null) {
      card.setAttribute('tabindex', '0');
    }
    
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var link = card.querySelector('a') || card.getAttribute('data-link');
        if (link && link.href) {
          window.location.href = link.href;
        }
      }
    });
  });
})();

// Home page initialization
(function homeInit() {
  // Setup form submission
  var newsForm = document.querySelector('.news-form');
  if (newsForm) {
    newsForm.addEventListener('submit', subscribeNews);
  }
  
  console.log('Home page initialized');
})();
