// RULES PAGE - Specific JavaScript

// FAQ accordion toggle - expands/collapses FAQ answers
function toggleFaq(el) {
  var item = el.closest('.faq-item');
  if (!item) return;
  
  var wasOpen = item.classList.contains('open');
  
  /* Close all other FAQ items before opening new one */
  document.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); });
  
  /* Open clicked item if it wasn't already open */
  if (!wasOpen) item.classList.add('open');
}

// Rules page initialization
(function rulesInit() {
  // Set up FAQ click handlers
  var faqQuestions = document.querySelectorAll('.faq-q');
  faqQuestions.forEach(function(faq) {
    faq.addEventListener('click', function() {
      toggleFaq(this);
    });
    /* Also handle keyboard activation */
    faq.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(this);
      }
    });
  });
  
  console.log('Rules page initialized');
})();
