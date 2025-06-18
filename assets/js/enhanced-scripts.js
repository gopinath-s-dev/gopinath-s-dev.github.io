// Enhanced Portfolio Scripts

document.addEventListener("DOMContentLoaded", function () {
  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".profile-image, .floating-shape, .about-image-wrapper img, .tech-icon"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add("animated");
      }
    });
  };

  // Initial check for elements in view
  animateOnScroll();

  // Check for elements in view on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Add parallax effect to section backgrounds
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    document
      .querySelectorAll(".skills, .experience, .projects")
      .forEach((section) => {
        // Get the distance from the top of the document
        const sectionTop = section.offsetTop;
        const distance = sectionTop - scrollPosition;

        // Apply parallax effect if the section is in view
        if (
          distance < window.innerHeight &&
          distance + section.offsetHeight > 0
        ) {
          const speed = 0.5;
          const yPos = -(distance * speed);
          section.style.backgroundPosition = `center ${yPos}px`;
        }
      });
  });

  // Profile image animation
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.addEventListener("mouseenter", function () {
      document.querySelector(".shape-1").style.transform =
        "rotate(25deg) translate(-10px, -10px)";
      document.querySelector(".shape-2").style.transform =
        "rotate(-25deg) translate(10px, 10px)";
    });

    profileImage.addEventListener("mouseleave", function () {
      document.querySelector(".shape-1").style.transform = "rotate(15deg)";
      document.querySelector(".shape-2").style.transform = "rotate(-15deg)";
    });
  }
});
