/**
 * Smooth counter animation for statistics
 * Provides a smoother animation especially for large numbers
 * Dynamically calculates years of experience based on work history
 */
document.addEventListener("DOMContentLoaded", () => {
  updateExperienceYears();
  initSmoothCounterAnimation();
});

/**
 * Calculate and update the years of experience based on career start date
 */
function updateExperienceYears() {
  // Career start date - July 2023 (from your resume)
  const careerStartDate = new Date(2022, 12, 26); // Note: months are 0-indexed in JavaScript (July = 6)
  const currentDate = new Date();

  // Calculate the difference in years
  let yearsOfExperience =
    currentDate.getFullYear() - careerStartDate.getFullYear();

  // Adjust for months if needed
  if (
    currentDate.getMonth() < careerStartDate.getMonth() ||
    (currentDate.getMonth() === careerStartDate.getMonth() &&
      currentDate.getDate() < careerStartDate.getDate())
  ) {
    yearsOfExperience--;
  }

  // Ensure we have at least 1 year of experience shown
  yearsOfExperience = Math.max(1, yearsOfExperience);

  // Update all instances of experience years in the DOM
  const experienceCounters = document.querySelectorAll(
    '.counter-value[data-count="2"]'
  );
  experienceCounters.forEach((counter) => {
    counter.setAttribute("data-count", yearsOfExperience);
    // Update the text for non-animated views or initial render
    const numSpan = counter.querySelector("span:first-child");
    if (numSpan) {
      numSpan.textContent = yearsOfExperience;
    }
  });

  // Update the experience badge in the profile section
  const experienceBadges = document.querySelectorAll(
    ".experience-badge .years"
  );
  experienceBadges.forEach((badge) => {
    badge.textContent = yearsOfExperience + "+";
  });

  // Update hero stats section
  const heroYearsEl = document.querySelector(
    ".hero-stats .exp-year-item .years-count"
  );
  if (heroYearsEl) {
    heroYearsEl.textContent = yearsOfExperience + "+";
  }

  // Update page title if it contains years of experience
  const titlePattern = /(\d+)\+\s+Years/;
  if (document.title.match(titlePattern)) {
    document.title = document.title.replace(
      titlePattern,
      yearsOfExperience + "+ Years"
    );
  }

  // Update any other static mentions of years of experience in the page content
  const bioTextElements = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6"
  );
  const expPattern = /(\d+)\+\s+years\s+of\s+experience/i;
  bioTextElements.forEach((el) => {
    if (el.textContent.match(expPattern)) {
      el.textContent = el.textContent.replace(
        expPattern,
        yearsOfExperience + "+ years of experience"
      );
    }
  });

  // Update the specific element with dynamic-years class
  const dynamicYearsElements = document.querySelectorAll(".dynamic-years");
  dynamicYearsElements.forEach((el) => {
    el.textContent = yearsOfExperience + "+";
  });
}

function initSmoothCounterAnimation() {
  const counters = document.querySelectorAll(".counter-value");

  // Create observer to start counter when in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseFloat(counter.getAttribute("data-count"));

          // Determine the optimal animation approach based on number size
          if (target >= 100) {
            // For large numbers (like 1000), use a progressive acceleration approach
            animateLargeNumber(counter, target);
          } else {
            // For smaller numbers, use a smoother incremental approach
            animateSmallNumber(counter, target);
          }

          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe each counter element
  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

/**
 * Animates large numbers (≥100) with a progressive acceleration
 * This makes the animation visually more appealing for large numbers
 */
function animateLargeNumber(counter, target) {
  const numSpan = counter.querySelector("span:first-child");
  if (!numSpan) return;

  const duration = 2500; // longer duration for more smoothness
  const startTime = performance.now();
  const startValue = 0;

  // Format for decimal numbers
  const decimals = target.toString().includes(".")
    ? target.toString().split(".")[1].length
    : 0;

  // Create a natural easing effect that accelerates then decelerates
  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // Use an easing function for smoother acceleration/deceleration
    const easedProgress = easeOutQuart(progress);
    const currentValue = startValue + easedProgress * (target - startValue);

    // Format and display the current value
    numSpan.textContent = decimals
      ? currentValue.toFixed(decimals)
      : Math.floor(currentValue);

    // Continue animation if not complete
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Ensure final value is exact
      numSpan.textContent = decimals ? target.toFixed(decimals) : target;
    }
  };

  requestAnimationFrame(animate);
}

/**
 * Animates smaller numbers (<100) with a simpler approach
 */
function animateSmallNumber(counter, target) {
  const numSpan = counter.querySelector("span:first-child");
  if (!numSpan) return;

  const duration = 2000;
  const startTime = performance.now();

  // Format for decimal numbers
  const decimals = target.toString().includes(".")
    ? target.toString().split(".")[1].length
    : 0;

  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // Linear progress for smaller numbers
    const currentValue = progress * target;

    numSpan.textContent = decimals
      ? currentValue.toFixed(decimals)
      : Math.floor(currentValue);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      numSpan.textContent = decimals ? target.toFixed(decimals) : target;
    }
  };

  requestAnimationFrame(animate);
}

/**
 * Easing function for smoother acceleration/deceleration
 * Creates a more natural counting effect
 */
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}
