// Enhanced Mobile Menu Toggle - Only for Mobile Screens
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  // Check if elements exist
  if (!mobileMenuBtn || !navLinks) {
    console.error("Mobile menu elements not found");
    return;
  }

  // Function to check if viewport is mobile-sized
  const isMobileView = () => window.innerWidth <= 768;

  // Function to handle visibility of mobile menu button
  const updateMobileMenuVisibility = () => {
    if (isMobileView()) {
      mobileMenuBtn.style.display = "flex";
      mobileMenuBtn.style.visibility = "visible";
      mobileMenuBtn.style.opacity = "1";
      mobileMenuBtn.style.pointerEvents = "all";
    } else {
      mobileMenuBtn.style.display = "none";
      mobileMenuBtn.style.visibility = "hidden";
      mobileMenuBtn.style.opacity = "0";
      mobileMenuBtn.style.pointerEvents = "none";
      // Reset menu state when returning to desktop
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
  };

  // Set initial state
  updateMobileMenuVisibility();

  // Update when window is resized
  window.addEventListener("resize", updateMobileMenuVisibility);

  // Toggle menu on button click - only when in mobile view
  mobileMenuBtn.addEventListener("click", function (e) {
    if (!isMobileView()) return;

    e.preventDefault();
    e.stopPropagation();

    const isExpanded = navLinks.classList.contains("active");
    navLinks.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");

    // Update aria-expanded for accessibility
    mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  });

  // Close menu when clicking on navigation links
  const menuLinks = navLinks.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navLinks.classList.contains("active") &&
      e.target !== mobileMenuBtn &&
      !mobileMenuBtn.contains(e.target) &&
      e.target !== navLinks &&
      !navLinks.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });

  // Adjust mobile menu on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });
});
