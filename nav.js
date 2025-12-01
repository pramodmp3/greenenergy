const header = document.getElementById("main-header");
const toggleButton = header.querySelector(".menu-toggle");
const navMenu = header.querySelector("#main-nav");
const dropdownToggles = header.querySelectorAll(".dropdown-toggle");

// --- 1. Main Menu (Hamburger) Toggle Function ---
function toggleMobileMenu() {
  const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

  // Toggle classes and ARIA
  navMenu.classList.toggle("is-active");
  toggleButton.classList.toggle("is-active");
  toggleButton.setAttribute("aria-expanded", !isExpanded);
}

// --- 2. Dropdown Toggle Function ---
function toggleDropdown(button) {
  const parentItem = button.closest(".nav-item");
  const content = parentItem.querySelector(".dropdown-content");
  const isExpanded = button.getAttribute("aria-expanded") === "true";

  // Function to close all other active dropdowns
  function closeOtherDropdowns(currentContent) {
    dropdownToggles.forEach((btn) => {
      const otherContent = btn
        .closest(".nav-item")
        .querySelector(".dropdown-content");
      if (
        otherContent !== currentContent &&
        otherContent.classList.contains("is-open")
      ) {
        otherContent.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (!isExpanded) {
    // Close others before opening this one
    closeOtherDropdowns(content);

    // Open the current dropdown
    content.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
  } else {
    // Close the current dropdown
    content.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  }
}

// --- 3. Event Listeners ---

// Hamburger button listener
toggleButton.addEventListener("click", toggleMobileMenu);

// Dropdown toggle listeners (only on the ARROW button)
dropdownToggles.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Stop propagation to prevent document click from closing it immediately
    event.stopPropagation();
    toggleDropdown(event.currentTarget);
  });
});

// --- 4. Click Outside to Close Logic (Desktop + Mobile) ---
document.addEventListener("click", (event) => {
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;

  // A. Close Mobile Menu if active
  if (
    !isDesktop &&
    navMenu.classList.contains("is-active") &&
    !header.contains(event.target)
  ) {
    toggleMobileMenu();
  }

  // B. Close Dropdowns
  // Check if the click is outside any active dropdown/dropdown toggle button
  const isClickInsideAnyDropdown = event.target.closest(".has-dropdown");

  if (!isClickInsideAnyDropdown) {
    dropdownToggles.forEach((btn) => {
      const content = btn
        .closest(".nav-item")
        .querySelector(".dropdown-content");
      if (content.classList.contains("is-open")) {
        content.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }
});

// --- 5. Window Resize Logic ---
window.addEventListener("resize", () => {
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;

  // If switching from mobile to desktop, ensure mobile classes are reset
  if (isDesktop) {
    navMenu.classList.remove("is-active");
    toggleButton.classList.remove("is-active");
    toggleButton.setAttribute("aria-expanded", "false");
  }
});
