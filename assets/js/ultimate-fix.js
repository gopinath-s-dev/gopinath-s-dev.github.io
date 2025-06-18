// ULTIMATE FIX FOR SKILL BARS AND CERTIFICATIONS
document.addEventListener("DOMContentLoaded", function () {
  // PART 1: MAKE CERTIFICATIONS VISIBLE
  // Force certifications section to be visible
  const certSection = document.getElementById("certifications");
  if (certSection) {
    certSection.style.display = "block";
    certSection.style.visibility = "visible";
    certSection.style.opacity = "1";
  }

  // PART 2: FIX SKILL BAR ANIMATIONS
  // Get all skill bars
  const skillBars = document.querySelectorAll(".skill-bar");

  // First set all widths to 0
  skillBars.forEach((bar) => {
    // Reset any animations
    bar.style.width = "0";
    bar.style.transition = "none";

    // Get percentage from closest parent with skill-percentage class
    const skillItem = bar.closest(".skill-item");
    if (skillItem) {
      const percentEl = skillItem.querySelector(".skill-percentage");
      if (percentEl) {
        const percent = percentEl.textContent;
        // Store percentage for animation
        bar.setAttribute("data-target-width", percent);
      }
    }
  });

  // Function to animate skill bars
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      // Force reflow
      void bar.offsetWidth;

      // Add animated class for transition
      bar.classList.add("animated");

      // Set width to target percentage
      const targetWidth = bar.getAttribute("data-target-width") || "0%";
      setTimeout(() => {
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

  // Manual trigger for skill animations (fallback)
  window.manuallyTriggerSkills = function () {
    animateSkillBars();
  };
});

// Backup trigger on window load
window.addEventListener("load", function () {
  // Force certifications section to be visible again (double check)
  const certSection = document.getElementById("certifications");
  if (certSection) {
    certSection.style.display = "block";
    certSection.style.visibility = "visible";
    certSection.style.opacity = "1";

    // Force all certification cards to be visible
    const certCards = certSection.querySelectorAll(".project-card");
    certCards.forEach((card) => {
      card.style.display = "flex";
      card.style.visibility = "visible";
      card.style.opacity = "1";
    });
  }

  // Trigger skill animations again after a delay
  setTimeout(() => {
    if (window.manuallyTriggerSkills) {
      window.manuallyTriggerSkills();
    }
  }, 1000);
});
