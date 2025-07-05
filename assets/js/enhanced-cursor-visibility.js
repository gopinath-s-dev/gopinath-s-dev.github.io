/**
 * Enhanced Cursor Visibility
 * Additional JS to improve cursor contrast on different backgrounds
 */

// Execute when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Get cursor elements
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");

  if (!cursor || !cursorDot || !cursorRing) return;

  // Function to calculate brightness from RGB values
  function calculateBrightness(r, g, b) {
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  // Function to set cursor classes based on brightness
  function setCursorMode(brightness) {
    if (brightness < 128) {
      // Dark background - use light cursor
      cursor.classList.add("on-dark-bg");
      cursor.classList.remove("on-light-bg");
    } else {
      // Light background - use dark cursor
      cursor.classList.add("on-light-bg");
      cursor.classList.remove("on-dark-bg");
    }
  }

  // Function to extract RGB from a background color string
  function processBackgroundColor(bgColor) {
    if (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") {
      return null;
    }

    const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      return calculateBrightness(r, g, b);
    }

    return null;
  }

  // Update cursor appearance based on element under it - simplified version
  function updateCursorVisibility(e) {
    // Get element under cursor
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    if (!elementUnderCursor) return;

    // Check current element's background
    const bgColor = getComputedStyle(elementUnderCursor).backgroundColor;
    const brightness = processBackgroundColor(bgColor);

    if (brightness !== null) {
      setCursorMode(brightness);
      return;
    }

    // Check parent elements if current element is transparent
    let parent = elementUnderCursor.parentElement;
    while (parent) {
      const parentBgColor = getComputedStyle(parent).backgroundColor;
      const parentBrightness = processBackgroundColor(parentBgColor);

      if (parentBrightness !== null) {
        setCursorMode(parentBrightness);
        return;
      }

      parent = parent.parentElement;
    }

    // Default to dark mode cursor if no background found
    cursor.classList.add("on-dark-bg");
    cursor.classList.remove("on-light-bg");
  }

  // Add event listener for cursor movement
  document.addEventListener("mousemove", updateCursorVisibility);

  // Initial run
  setTimeout(() => {
    // Force cursor visibility mode once everything is loaded
    cursor.style.opacity = "1";
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
  }, 1000);
});
