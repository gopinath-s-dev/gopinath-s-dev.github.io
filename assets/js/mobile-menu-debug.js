// Mobile Menu Debug Helper
// This script will add a small debugging button to help test mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const debugHelper = document.createElement("div");
  debugHelper.className = "mobile-debug-helper";
  debugHelper.innerHTML = `
    <button id="debugCheckMobileMenu" style="position: fixed; bottom: 10px; left: 10px; z-index: 9999; 
      padding: 5px 10px; font-size: 12px; background: #333; color: #fff; border: none; border-radius: 4px; 
      opacity: 0.6;">Debug Menu</button>
  `;

  document.body.appendChild(debugHelper);

  document
    .getElementById("debugCheckMobileMenu")
    .addEventListener("click", function () {
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const navLinks = document.getElementById("navLinks");

      console.log("Mobile Menu Debug:");
      console.log("- Menu Button exists:", !!mobileMenuBtn);
      console.log("- Nav Links exists:", !!navLinks);

      if (mobileMenuBtn) {
        console.log(
          "- Button has click listeners:",
          !!mobileMenuBtn.onclick || mobileMenuBtn._events?.click?.length > 0
        );
        console.log(
          "- Button active class:",
          mobileMenuBtn.classList.contains("active")
        );

        // Test click event
        const testClick = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        mobileMenuBtn.dispatchEvent(testClick);
        console.log("- Test click dispatched");

        // Check after click
        setTimeout(() => {
          if (navLinks) {
            console.log(
              "- NavLinks active after click:",
              navLinks.classList.contains("active")
            );
          }
        }, 100);
      }

      // Show styles
      const computedBtnStyle = mobileMenuBtn
        ? window.getComputedStyle(mobileMenuBtn)
        : null;
      if (computedBtnStyle) {
        console.log("- Button display:", computedBtnStyle.display);
        console.log("- Button z-index:", computedBtnStyle.zIndex);
        console.log("- Button position:", computedBtnStyle.position);
      }

      alert(
        "Mobile menu debug info logged to console. Check browser developer tools."
      );
    });
});
