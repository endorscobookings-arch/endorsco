// Global function to toggle Talent Topics dropdown
function toggleTalentTopics() {
  console.log("toggleTalentTopics called!");
  
  const topicsDropdown = document.getElementById("talent-topics-dropdown");
  const topicsIcon = document.getElementById("talent-topics-icon");

  if (topicsDropdown) {
    topicsDropdown.classList.toggle("hidden");
  }
  
  if (topicsIcon) {
    if (topicsDropdown && !topicsDropdown.classList.contains("hidden")) {
      topicsIcon.style.transform = "rotate(180deg)";
    } else {
      topicsIcon.style.transform = "rotate(0deg)";
    }
  }
}

// Mobile menu toggle functionality
function initMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const openButtons = [
    document.getElementById("top-menu-toggle"),
    document.getElementById("header-menu-toggle"),
    document.getElementById("lg-menu-toggle")
  ].filter(Boolean);
  const closeButton = document.getElementById("close-mobile-menu");
  const mobileBookNow = document.getElementById("mobile-menu-book-now");

  // Open menu
  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  // Close menu
  const closeMenu = () => {
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "";
  };

  if (closeButton) closeButton.addEventListener("click", closeMenu);
  
  // Close when clicking outside the menu
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close with Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) closeMenu();
  });

  // Book Now button in mobile menu
  if (mobileBookNow) {
    mobileBookNow.addEventListener("click", () => {
      closeMenu();
      // Trigger the booking modal
      const headerBookNow = document.getElementById("header-book-now");
      if (headerBookNow) headerBookNow.click();
    });
  }
}

// Initialize desktop talent topics dropdown
function initDesktopTalentTopics() {
  const container = document.getElementById("desktop-talent-topics-container");
  const toggle = document.getElementById("desktop-talent-topics-toggle");
  const dropdown = document.getElementById("desktop-talent-topics-dropdown");
  const chevron = document.getElementById("desktop-talent-topics-chevron");
  
  if (container && toggle && dropdown && chevron) {
    let closeTimeout;
    
    // Function to open dropdown
    const openDropdown = () => {
      // Clear any existing close timeout
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      
      dropdown.classList.remove("opacity-0");
      dropdown.classList.remove("invisible");
      dropdown.classList.remove("pointer-events-none");
      dropdown.classList.add("opacity-100");
      dropdown.classList.add("visible");
      dropdown.classList.add("pointer-events-auto");
      chevron.style.transform = "rotate(180deg)";
    };
    
    // Function to close dropdown
    const closeDropdown = () => {
      // Set a timeout to allow time to move mouse into dropdown
      closeTimeout = setTimeout(() => {
        dropdown.classList.add("opacity-0");
        dropdown.classList.add("invisible");
        dropdown.classList.add("pointer-events-none");
        dropdown.classList.remove("opacity-100");
        dropdown.classList.remove("visible");
        dropdown.classList.remove("pointer-events-auto");
        chevron.style.transform = "rotate(0deg)";
      }, 200); // 200ms delay
    };
    
    // Hover events
    container.addEventListener("mouseenter", openDropdown);
    container.addEventListener("mouseleave", closeDropdown);
    
    // Click events
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (dropdown.classList.contains("opacity-0")) {
        openDropdown();
      } else {
        closeDropdown();
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      closeDropdown();
    });
    
    // Prevent dropdown close when clicking inside
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initDesktopTalentTopics();
});

// Also initialize immediately for good measure
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initDesktopTalentTopics();
  });
} else {
  initMobileMenu();
  initDesktopTalentTopics();
}
