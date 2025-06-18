// IMPROVED SKILL BARS PERCENTAGE FIX
document.addEventListener("DOMContentLoaded", function () {
  // Get all skill bars
  const skillBars = document.querySelectorAll(".skill-bar");

  // First, reset all skill bars for fresh animation
  skillBars.forEach((bar) => {
    // Reset to 0 width
    bar.style.width = "0";
    bar.style.transition = "none";

    // Get the percentage from the closest skill-item
    const skillItem = bar.closest(".skill-item");
    if (skillItem) {
      const percentEl = skillItem.querySelector(".skill-percentage");
      if (percentEl) {
        const percent = percentEl.textContent;
        // Store the percentage as a data attribute
        bar.setAttribute("data-target-width", percent);
      }
    }
  });

  // Function to animate skill bars with proper percentages
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      // Force reflow to ensure animation works
      void bar.offsetWidth;

      // Add the animated class to trigger CSS transitions
      bar.classList.add("animated");

      // Get target width from data attribute
      const targetWidth = bar.getAttribute("data-target-width") || "0%";

      // Set the width after a small delay to ensure animation works
      setTimeout(() => {
        // Set the width directly to the target percentage
        bar.style.width = targetWidth;
      }, 100);
    });
  }

  // Use Intersection Observer to trigger animation when skills section is visible
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skill bars when skills section is in view
            animateSkillBars();
            // Only trigger once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(skillsSection);
  } else {
    // Fallback if section can't be found
    setTimeout(animateSkillBars, 500);
  }

  // Backup trigger for manual animation if needed
  window.triggerSkillAnimation = animateSkillBars;
});

// Trigger skill animations on window load as a fallback
window.addEventListener("load", function () {
  // Trigger skill animations after a delay
  setTimeout(() => {
    if (window.triggerSkillAnimation) {
      window.triggerSkillAnimation();
    }
  }, 1000);
});
