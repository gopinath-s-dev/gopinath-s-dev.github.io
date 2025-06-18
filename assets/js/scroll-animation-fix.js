// Fix for animation overlap between certification and projects section

document.addEventListener("DOMContentLoaded", function () {
  // Fix AOS animations to prevent overlap
  fixAOSAnimations();

  // Fix section transitions
  preventAnimationOverlap();
});

// Function to fix AOS animation settings
function fixAOSAnimations() {
  // Reconfigure AOS with better settings to prevent overlap
  if (typeof AOS !== "undefined") {
    // Destroy any existing AOS instance
    AOS.refreshHard();

    // Initialize with custom settings
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true, // Animation occurs only once
      mirror: false, // Don't mirror animations when scrolling up
      anchorPlacement: "top-bottom",
      disable: window.innerWidth < 768 ? true : false, // Disable on mobile
      throttleDelay: 99, // Increase throttle delay
    });
  }
}

// Function to handle the animation overlap between certifications and projects
function preventAnimationOverlap() {
  // Get sections that have animation conflicts
  const certificationSection = document.getElementById("certifications");
  const projectsSection = document.getElementById("projects");

  if (!certificationSection || !projectsSection) return;

  // Set a flag to track if we're currently in animation transition
  let isAnimatingSection = false;

  // Create intersection observers for both sections
  const certObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Only apply animations if we're not in an animation transition
          if (!isAnimatingSection) {
            isAnimatingSection = true;

            // Force all certification cards to be animated immediately
            const certCards =
              certificationSection.querySelectorAll("[data-aos]");
            certCards.forEach((card) => {
              card.classList.add("aos-animate");
            });

            // Release the animation lock after duration
            setTimeout(() => {
              isAnimatingSection = false;
            }, 1000);
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Only apply animations if we're not in an animation transition
          if (!isAnimatingSection) {
            isAnimatingSection = true;

            // Force all project cards to be animated immediately
            const projectCards = projectsSection.querySelectorAll("[data-aos]");
            projectCards.forEach((card) => {
              card.classList.add("aos-animate");
            });

            // Release the animation lock after duration
            setTimeout(() => {
              isAnimatingSection = false;
            }, 1000);
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  // Observe the sections
  certObserver.observe(certificationSection);
  projectObserver.observe(projectsSection);

  // Handle quick scrolling
  window.addEventListener("scroll", function () {
    // Throttle the scroll events
    if (!window.scrollThrottle) {
      window.scrollThrottle = setTimeout(function () {
        // Check if user is scrolling fast between sections
        const certVisible = isElementInViewport(certificationSection);
        const projectsVisible = isElementInViewport(projectsSection);

        // If both sections are partially visible, force complete animation
        if (certVisible && projectsVisible) {
          // Force animations on both sections
          document
            .querySelectorAll(
              "#certifications [data-aos], #projects [data-aos]"
            )
            .forEach((el) => {
              el.classList.add("aos-animate");
            });
        }

        window.scrollThrottle = null;
      }, 100);
    }
  });
}

// Helper function to check if an element is in viewport
function isElementInViewport(el) {
  if (!el) return false;

  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// On window load, reapply the fixes in case DOM changes happened
window.addEventListener("load", function () {
  // Re-run our fixes after a short delay
  setTimeout(() => {
    fixAOSAnimations();
    preventAnimationOverlap();
  }, 500);
});

// Ensure animations work correctly on resize
window.addEventListener("resize", function () {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }

  // Re-apply fixes on resize
  preventAnimationOverlap();
});
