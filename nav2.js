/*
 * JAVASCRIPT LOGIC
 */

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownItems = document.querySelectorAll(".nav-item-dropdown");

  // 1. Hamburger Menu Toggle (Mobile Menu open/close)
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // 2. Mobile Dropdown Toggle (Submenu open/close)
  dropdownItems.forEach((item) => {
    const toggleIcon = item.querySelector(".dropdown-toggle-icon");
    const navLinkText = item.querySelector(".nav-link-text");

    // This logic is for mobile-only interaction (separate click on icon vs text)

    // Add click listener to the ICON
    if (toggleIcon) {
      toggleIcon.addEventListener("click", (event) => {
        // Prevent navigation if the icon is clicked
        event.preventDefault();
        // Stop event from closing the parent menu if needed, though max-height handles it well
        event.stopPropagation();

        // Toggle the 'submenu-open' class on the parent nav-item
        item.classList.toggle("submenu-open");
      });
    }

    // Optional: Ensure clicking the text label navigates, preventing the icon click from being mistaken for navigation
    if (navLinkText) {
      navLinkText.addEventListener("click", (event) => {
        // The text click is allowed to navigate (default behavior)
        // But we ensure it does not also toggle the dropdown class if clicked on mobile
        if (window.innerWidth <= 1024) {
          // Close the main menu after navigating on mobile
          navMenu.classList.remove("active");
          hamburger.classList.remove("active");
        }
      });
    }
  });

  // 3. Close menu when a standard nav link is clicked (mobile only)
  document
    .querySelectorAll(
      ".nav-item:not(.nav-item-dropdown) .nav-link, .nav-login .login-btn"
    )
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
          navMenu.classList.remove("active");
          hamburger.classList.remove("active");
        }
      });
    });

  // Optional: Close dropdowns when resizing from mobile to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      dropdownItems.forEach((item) => {
        item.classList.remove("submenu-open");
      });
    }
  });
});
