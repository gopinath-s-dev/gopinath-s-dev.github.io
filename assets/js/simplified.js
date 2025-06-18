// Simplified Portfolio JavaScript

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initNavbar();
  initMobileMenu();
  initScrollAnimation();
  initFormValidation();
  initCounterAnimation();

  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: true,
    anchorPlacement: "top-bottom",
  });
});

// Handle navbar changes on scroll
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    // Add background when scrolled
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active link based on scroll position
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active-link");
      }
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const navLinksAnchors = document.querySelectorAll(".nav-links a");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });
  }

  // Close menu when clicking a link
  navLinksAnchors.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      e.target !== mobileMenuBtn &&
      !mobileMenuBtn.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });
}

// Smooth scroll for anchor links
function initScrollAnimation() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Handle form validation
function initFormValidation() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      let valid = true;
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      if (!name.value.trim()) {
        markInvalid(name, "Please enter your name");
        valid = false;
      } else {
        markValid(name);
      }

      if (!email.value.trim()) {
        markInvalid(email, "Please enter your email");
        valid = false;
      } else if (!isValidEmail(email.value)) {
        markInvalid(email, "Please enter a valid email address");
        valid = false;
      } else {
        markValid(email);
      }

      if (!message.value.trim()) {
        markInvalid(message, "Please enter your message");
        valid = false;
      } else {
        markValid(message);
      }

      if (valid) {
        // Normally would submit the form here
        alert("Message sent successfully! I'll get back to you soon.");
        contactForm.reset();
      }
    });
  }
}

function markInvalid(element, message) {
  element.classList.add("invalid");

  // Create error message if it doesn't exist
  let errorMessage = element.parentElement.querySelector(".error-message");
  if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.className = "error-message";
    element.parentElement.appendChild(errorMessage);
  }
  errorMessage.textContent = message;
}

function markValid(element) {
  element.classList.remove("invalid");
  const errorMessage = element.parentElement.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Counter animation for statistics
function initCounterAnimation() {
  const counters = document.querySelectorAll(".counter-value");

  // Create observer to start counter when in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseFloat(counter.getAttribute("data-count"));
          let count = 0;
          const decimals = target.toString().includes(".")
            ? target.toString().split(".")[1].length
            : 0;
          const duration = 2000; // ms
          const increment = target / (duration / 16); // 60fps = 16ms per frame

          const updateCount = () => {
            if (count < target) {
              count += increment;
              if (count > target) count = target;

              counter.textContent = decimals
                ? count.toFixed(decimals)
                : Math.floor(count);
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = decimals
                ? target.toFixed(decimals)
                : target;
            }
          };

          updateCount();
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

// Add animation for skill bars when in view
document.addEventListener("DOMContentLoaded", function () {
  const skillBars = document.querySelectorAll(".skill-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0";

          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
});
