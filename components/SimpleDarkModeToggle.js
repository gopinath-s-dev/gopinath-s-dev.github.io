// Dark Mode Implementation - Dark Mode is now the default
// The toggle button has been removed from the UI

const body = document.body;

// Force dark mode as default regardless of system preference
body.classList.add("dark-mode");
localStorage.setItem("theme", "dark");

// Light theme code is still included in the CSS
// This script now just ensures dark mode is always activated
