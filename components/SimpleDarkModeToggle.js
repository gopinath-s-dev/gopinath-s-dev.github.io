// Simple Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const icon = darkModeToggle.querySelector("i");

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem("theme");
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply saved theme or preferred color scheme
if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  body.classList.add("dark-mode");
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

// Toggle dark mode on click
darkModeToggle.addEventListener("click", () => {
  // Toggle dark mode class
  body.classList.toggle("dark-mode");

  // Update icon and save preference
  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});
