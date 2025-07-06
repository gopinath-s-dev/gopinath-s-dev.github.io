// Enhanced certificate card equalizer with special focus on the third certificate
document.addEventListener('DOMContentLoaded', function() {
  // Wait for images and other resources to load
  window.addEventListener('load', function() {
    // Function to equalize heights and spacing
    function equalizeCardHeights() {
      // Get all certificate cards
      const cards = document.querySelectorAll('#certifications .project-card .project-details');
      
      // Reset heights first
      cards.forEach(card => {
        card.style.height = 'auto';
      });
      
      // Apply spacing fixes regardless of screen size
      fixFieldSpacing();
      
      // Skip height equalizing on mobile screens
      if (window.innerWidth < 768) {
        return;
      }
      
      // Find tallest card
      let maxHeight = 0;
      cards.forEach(card => {
        const height = card.offsetHeight;
        maxHeight = Math.max(maxHeight, height);
      });
      
      // Set all cards to tallest height
      cards.forEach(card => {
        card.style.height = maxHeight + 'px';
      });
    }
    
    // Special function just for fixing field spacing
    function fixFieldSpacing() {
      // Get all issuer/date fields
      const allCertificates = document.querySelectorAll('#certifications .project-card');
      
      // Process each certificate
      allCertificates.forEach((certificate, index) => {
        const issuerField = certificate.querySelector('.project-details p:nth-of-type(1)');
        const dateField = certificate.querySelector('.project-details p:nth-of-type(2)');
        
        if (issuerField && dateField) {
          // Apply consistent margins
          issuerField.style.marginBottom = '10px';
          dateField.style.marginTop = '0';
          dateField.style.marginBottom = '10px';
          
          // Special fix for the third certificate (index 2)
          if (index === 2) {
            issuerField.style.marginBottom = '10px';
            dateField.style.marginTop = '0';
            
            // Apply inline styles to match other certificates exactly
            const issuerStrong = issuerField.querySelector('strong');
            const dateStrong = dateField.querySelector('strong');
            
            if (issuerStrong && dateStrong) {
              issuerStrong.style.minWidth = '55px';
              issuerStrong.style.display = 'inline-block';
              issuerStrong.style.marginRight = '5px';
              
              dateStrong.style.minWidth = '55px';
              dateStrong.style.display = 'inline-block';
              dateStrong.style.marginRight = '5px';
            }
          }
        }
      });
    }
    
    // Run initially
    equalizeCardHeights();
    
    // Also run after a slight delay to ensure all styles are applied
    setTimeout(equalizeCardHeights, 100);
    
    // Run on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(equalizeCardHeights, 250);
    });
  });
});
