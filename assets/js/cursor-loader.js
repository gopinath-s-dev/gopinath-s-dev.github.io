/**
 * Modern Custom Cursor & Loading Screen
 * Pure vanilla JS - no dependencies
 */

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // ---- LOADING SCREEN ----
  const loader = document.getElementById("loader");
  if (loader) {
    // Animate SVG
    const svgCircle = document.querySelector("#loader-svg circle");
    let rotation = 0;

    function animateLoader() {
      if (loader.style.opacity !== "0") {
        rotation += 2;
        if (svgCircle) {
          svgCircle.setAttribute("transform", `rotate(${rotation}, 50, 50)`);
        }
        requestAnimationFrame(animateLoader);
      }
    }

    animateLoader();

    // Hide loader when page is fully loaded
    window.addEventListener("load", function () {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 300); // Small delay for smoother transition
    });

    // Fallback: hide after 5s max
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 5000);
  }

  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById("cursor");
  if (cursor && !("ontouchstart" in window)) {
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    let mouseX = 0,
      mouseY = 0;
    let dotX = 0,
      dotY = 0;
    let ringX = 0,
      ringY = 0;

    // Hide default cursor
    document.body.style.cursor = "none";

    // Animated cursor movement
    function animateCursor() {
      // Smooth dot movement (faster)
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;

      // Smoother ring movement (slower)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      // Apply transforms
      if (cursorDot) {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }

      if (cursorRing) {
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }

      requestAnimationFrame(animateCursor);
    }

    // Track mouse movement
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Special effects on interactive elements
    const interactiveElements =
      'a, button, .btn, .primary-btn, .secondary-btn, [role="button"], input[type="submit"], input[type="button"]';

    document.querySelectorAll(interactiveElements).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
      });
    });

    // Click effect
    document.addEventListener("mousedown", () => {
      cursor.classList.add("cursor-click");
    });

    document.addEventListener("mouseup", () => {
      cursor.classList.remove("cursor-click");
    });

    // Start animation
    animateCursor();
  }
});
