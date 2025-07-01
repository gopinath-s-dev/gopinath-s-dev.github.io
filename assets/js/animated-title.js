// Animated Job Title Script with letter-by-letter animation
document.addEventListener("DOMContentLoaded", function () {
  // Define job titles to animate
  const jobTitles = [
    "Software Engineer", // Explicit space between words
    "Web Application Developer",
    "Backend Engineer", // Explicit space between words
  ];

  // Get the container
  const titleContainer = document.getElementById("animated-job-title");
  if (!titleContainer) return;

  let currentIndex = 0;
  let isDeleting = false;

  // Create or get the title element
  let titleElement = titleContainer.querySelector(".animated-title");
  if (!titleElement) {
    titleElement = document.createElement("span");
    titleElement.className = "animated-title";
    titleContainer.appendChild(titleElement);
  }

  // Animation timings
  const letterDelay = 80; // Delay between each letter appearing/disappearing
  const wordDisplayTime = 2000; // How long to display the complete word

  // Function to animate letters
  function animateLetters(word, isDeleting) {
    // Clear any existing content
    titleElement.innerHTML = "";

    // Create a span for each letter
    const letters = word.split("");

    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.className = "letter";
      // Make spaces more visible with a wider gap
      if (letter === " ") {
        span.innerHTML = "&nbsp;"; // Use non-breaking space for better visibility
        span.classList.add("space-letter"); // Add special class for spaces
      }
      titleElement.appendChild(span);

      // Stagger the animation of each letter
      setTimeout(() => {
        if (!isDeleting) {
          span.classList.add("visible");
        } else {
          // For deletion, animate from end to beginning
          const reverseIndex = letters.length - 1 - index;
          const letterToHide =
            titleElement.querySelectorAll(".letter")[reverseIndex];
          if (letterToHide) letterToHide.classList.remove("visible");
        }
      }, index * letterDelay);
    });

    return letters.length * letterDelay; // Return total animation duration
  }

  // Main animation loop
  function updateTitle() {
    const currentTitle = jobTitles[currentIndex];

    if (isDeleting) {
      // Delete current word letter by letter
      const animationDuration = animateLetters(currentTitle, true);

      // After deletion, show next word
      setTimeout(() => {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % jobTitles.length;
        updateTitle();
      }, animationDuration + 100); // Small extra delay after deletion
    } else {
      // Show new word letter by letter
      const animationDuration = animateLetters(currentTitle, false);

      // Wait, then start deletion
      setTimeout(() => {
        isDeleting = true;
        updateTitle();
      }, animationDuration + wordDisplayTime);
    }
  }

  // Start the animation
  updateTitle();
});
