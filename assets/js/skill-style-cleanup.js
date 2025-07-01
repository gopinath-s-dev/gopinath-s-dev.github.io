// Script to remove inline styles from skill elements and enhance the skills section
document.addEventListener("DOMContentLoaded", function () {
  // Add enhanced class to skills section for our new styles
  document.querySelector(".skills").classList.add("enhanced-skills");

  // Get all skill progress bars and remove their inline styles
  document.querySelectorAll(".skill-progress").forEach((progress) => {
    progress.removeAttribute("style");
  });

  // Get all skill bars and simplify their inline styles
  document.querySelectorAll(".skill-bar").forEach((bar) => {
    const width = bar.dataset.width || "0%";
    bar.style.cssText = `--skill-width: ${width};`;
  });

  // Set timeouts for staggered animation effects
  setTimeout(() => {
    document.querySelectorAll(".skill-category").forEach((category, index) => {
      setTimeout(() => {
        category.classList.add("animated");
      }, index * 100);
    });

    document.querySelector(".other-skills").classList.add("animated");
  }, 300);
});
