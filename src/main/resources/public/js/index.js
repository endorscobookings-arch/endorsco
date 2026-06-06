// API Configuration
const API_BASE_URL = window.ENDORSCO_API_BASE || "/api";

document.addEventListener("click", function (e) {
  const target = e.target.closest("button");
  if (!target) return;

  const isPrev = target.textContent.includes("Previous slide");
  const isNext = target.textContent.includes("Next slide");

  if (isPrev || isNext) {
    e.preventDefault();
    const region = target.closest('[role="region"]');
    if (region) {
      const container = region.querySelector(
        ".carousel-scroll-container, .overflow-hidden, .overflow-x-auto, [data-scroll-container]"
      );
      if (container) {
        const item =
          container.querySelector('[role="group"]') ||
          container.firstElementChild.firstElementChild;
        // Scroll by the width of one item, or half the container width
        const scrollAmount = item
          ? item.clientWidth
          : container.clientWidth / 2;

        if (isPrev) {
          if (container.scrollLeft <= 0) {
            // Infinite Wrap Around: Scroll to the end
            container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
          } else {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
          }
        } else {
          // 2px tolerance for fractional pixel rounding
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
            // Infinite Wrap Around: Scroll back to the beginning
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
          }
        }
      }
    }
  }
});

function updateCarouselButtons(region, container) {
  const prevBtn = Array.from(region.querySelectorAll("button")).find((b) =>
    b.textContent.includes("Previous slide")
  );
  const nextBtn = Array.from(region.querySelectorAll("button")).find((b) =>
    b.textContent.includes("Next slide")
  );

  // Infinite Scroll: Arrows should never be disabled.
  if (prevBtn) prevBtn.removeAttribute("disabled");
  if (nextBtn) nextBtn.removeAttribute("disabled");
}

function scrollCarousel(container, direction) {
  // Get the flex container inside
  const flexContainer = container.firstElementChild;
  if (!flexContainer) return;
  
  // Get the first slide
  const firstSlide = flexContainer.firstElementChild;
  if (!firstSlide) return;
  
  const slideWidth = firstSlide.getBoundingClientRect().width;
  
  // Calculate scroll amount (one slide at a time)
  const scrollAmount = direction === "next" ? slideWidth : -slideWidth;
  
  // Smooth scroll
  container.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
}

function initCarousels() {
  // Inject style class to force horizontal native scrolling but hide scrollbars
  if (!document.getElementById("carousel-hide-scroll-style")) {
    const style = document.createElement("style");
    style.id = "carousel-hide-scroll-style";
    style.textContent = `
      .carousel-scroll-container {
        overflow-x: auto !important;
        scroll-behavior: smooth;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
      }
      .carousel-scroll-container::-webkit-scrollbar {
        display: none; /* WebKit */
        width: 0;
        height: 0;
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('[role="region"]').forEach((region) => {
    let container = region.querySelector(
      ".overflow-hidden, .overflow-x-auto, [data-scroll-container]"
    );

    if (container) {
      container.classList.remove("overflow-hidden");
      container.classList.add("carousel-scroll-container");
      container.setAttribute("data-scroll-container", "true");

      // Find prev/next buttons
      const prevBtn = Array.from(region.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Previous slide")
      );
      const nextBtn = Array.from(region.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Next slide")
      );

      // Add click listeners
      if (prevBtn) {
        prevBtn.addEventListener("click", () => scrollCarousel(container, "prev"));
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => scrollCarousel(container, "next"));
      }

      // Set timeout slightly to let images layout before calculating width
      setTimeout(() => updateCarouselButtons(region, container), 50);

      container.addEventListener(
        "scroll",
        () => updateCarouselButtons(region, container),
        { passive: true }
      );
      window.addEventListener("resize", () =>
        updateCarouselButtons(region, container)
      );
    }
  });
}

// Initialize category prev/next buttons
function initCategoryNavButtons() {
  const prevBtn = document.getElementById("prev-category-btn");
  const nextBtn = document.getElementById("next-category-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      // Go to previous category
      currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
      const prevCategory = categories[currentCategoryIndex];
      handleCategoryClick(prevCategory);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      // Go to next category
      currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      const nextCategory = categories[currentCategoryIndex];
      handleCategoryClick(nextCategory);
    });
  }
}

// Ensure carousels are updated on initial load
document.addEventListener("DOMContentLoaded", () => {
  initCarousels();
  initBookingModal();
  initTalentCardInteraction();
  initCategoryNavButtons();
});
initCarousels();
initCategoryNavButtons();

function initTalentCardInteraction() {
  // Click listener for talent cards to make the hover panel stay open
  document.addEventListener('click', (e) => {
    // Find the closest article (talent card)
    const clickedCard = e.target.closest('article');
    if (clickedCard) {
      // Remove active class from all cards
      document.querySelectorAll('article.group').forEach(card => {
        card.classList.remove('talent-card-active');
        const hoverPanel = card.querySelector('.pointer-events-none.absolute.inset-0');
        if (hoverPanel) {
          hoverPanel.classList.remove('opacity-100');
          hoverPanel.classList.add('opacity-0');
        }
      });
      
      // Add active class to clicked card
      clickedCard.classList.add('talent-card-active');
      const hoverPanel = clickedCard.querySelector('.pointer-events-none.absolute.inset-0');
      if (hoverPanel) {
        hoverPanel.classList.remove('opacity-0');
        hoverPanel.classList.add('opacity-100');
      }
    } else {
      // Clicked outside of any card - close all
      document.querySelectorAll('article.group').forEach(card => {
        card.classList.remove('talent-card-active');
        const hoverPanel = card.querySelector('.pointer-events-none.absolute.inset-0');
        if (hoverPanel) {
          hoverPanel.classList.remove('opacity-100');
          hoverPanel.classList.add('opacity-0');
        }
      });
    }
  });
}

function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('close-modal');
  const modalForm = modal.querySelector('form');
  const nameDisplay = modal.querySelector('.talent-name-display');
  const profileImg = modal.querySelector('.talent-profile-image');
  const feeDisplay = modal.querySelector('.talent-fee-range');
  const nameInput = modal.querySelector('.talent-name-input');
  const dateInput = document.getElementById('modal-event-date');
  const budgetSelect = document.getElementById('modal-budget-select');

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  const openModal = (data = {}) => {
    if (nameDisplay) nameDisplay.textContent = data.name || 'Talent';
    if (nameInput) nameInput.value = data.name || '';
    if (profileImg) profileImg.src = data.image || '';
    if (feeDisplay) feeDisplay.textContent = data.fee || 'Available Upon Request';
    
    // Attempt to match budget select
    if (budgetSelect && data.fee) {
        for (let option of budgetSelect.options) {
            if (option.text.includes(data.fee) || data.fee.includes(option.text) || option.value === data.fee) {
                budgetSelect.value = option.value;
                break;
            }
        }
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    // Reset form and errors
    if (modalForm) modalForm.reset();
    clearErrors(modal);
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  modal.onclick = (e) => { if (e.target === modal || e.target.classList.contains('backdrop-blur-sm')) closeModal(); };

  // Handle form submission
  if (modalForm) {
    modalForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Validate Name
      const nameField = modalForm.querySelector('input[type="text"][placeholder="Full name"]');
      const nameError = modal.querySelector('.error-text-name');
      if (nameField && !nameField.value.trim()) {
        showError(nameField, nameError, 'Please enter your name');
        isValid = false;
      } else {
        hideError(nameField, nameError);
      }
      
      // Validate Email
      const emailField = modalForm.querySelector('input[type="email"]');
      const emailError = modal.querySelector('.error-text-email');
      if (emailField && !emailField.value.trim()) {
        showError(emailField, emailError, 'Please enter your email');
        isValid = false;
      } else if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        showError(emailField, emailError, 'Please enter a valid email');
        isValid = false;
      } else {
        hideError(emailField, emailError);
      }
      
      // Validate Phone
      const phoneField = modalForm.querySelector('input[type="tel"]');
      const phoneError = modal.querySelector('.error-text-phone');
      if (phoneField && !phoneField.value.trim()) {
        showError(phoneField, phoneError, 'Please enter your phone number');
        isValid = false;
      } else {
        hideError(phoneField, phoneError);
      }
      
      // Validate Budget
      const budgetError = modal.querySelector('.error-text-budget');
      if (budgetSelect && !budgetSelect.value) {
        showError(budgetSelect, budgetError, 'Please select a budget range');
        isValid = false;
      } else {
        hideError(budgetSelect, budgetError);
      }
      
      // Validate Date
      const dateError = modal.querySelector('.error-text-date');
      if (dateInput && !dateInput.value) {
        showError(dateInput, dateError, 'Please select an event date');
        isValid = false;
      } else {
        hideError(dateInput, dateError);
      }
      
      if (isValid) {
        // Collect form data
        const formData = new FormData(modalForm);
        const data = Object.fromEntries(formData.entries());
        
        // Collect additional fields that might not be in FormData
        const organizationField = modalForm.querySelector('input[placeholder="Company or group"]');
        const eventLocationField = modalForm.querySelector('input[placeholder="City, State or Virtual"]');
        const desiredSpeakerField = modalForm.querySelector('.talent-name-input');
        const eventDescriptionField = modalForm.querySelector('textarea');
        
        if (organizationField) data.organization = organizationField.value;
        if (eventLocationField) data.eventLocation = eventLocationField.value;
        if (desiredSpeakerField) data.desiredSpeaker = desiredSpeakerField.value;
        if (eventDescriptionField) data.eventDescription = eventDescriptionField.value;
        
        // Collect device info
        data.device = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language
        };
        
        // Try to get location
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          data.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        } catch (err) {
          console.log("Could not get location:", err);
          data.location = null;
        }
        
        // Try to get IP (using a public API)
        try {
          const ipRes = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipRes.json();
          data.ip = ipData.ip;
        } catch (err) {
          console.log("Could not get IP:", err);
          data.ip = null;
        }
        
        // Submit to API
        try {
          const response = await fetch('/api/check-availability', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          
          if (response.ok) {
            alert('Thank you for your booking request! We will contact you soon.');
            closeModal();
          } else {
            alert('Something went wrong. Please try again later.');
          }
        } catch (err) {
          console.error("Error submitting form:", err);
          alert('Something went wrong. Please try again later.');
        }
      }
    });
  }

  // Global click listener for "Check Availability" or Card "Book Now" buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    // Check if the button is inside an anchor tag - if yes, let it navigate normally
    const isInsideLink = btn.closest('a');
    
    if (btn.textContent.includes('Check Availability') || (!isInsideLink && btn.textContent.includes('Book Now') && !btn.id)) {
      e.preventDefault();
      const card = btn.closest('article');
      if (card) {
        const name = card.querySelector('a.text-base')?.textContent;
        const image = card.querySelector('img')?.src;
        const fee = card.querySelector('.mt-auto span:last-child')?.textContent?.replace('Fee:', '').trim();
        openModal({ name, image, fee });
      }
    }
    
    if (btn.id === 'header-book-now') {
        e.preventDefault();
        openModal({ name: '', image: '/images/logo.svg', fee: '' });
    }
  });

  // Handle Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
}

function showError(field, errorEl, message) {
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
  if (field) {
    field.classList.add('border-red-500');
  }
}

function hideError(field, errorEl) {
  if (errorEl) {
    errorEl.classList.add('hidden');
  }
  if (field) {
    field.classList.remove('border-red-500');
  }
}

function clearErrors(modal) {
  const errorTexts = modal.querySelectorAll('.text-red-600');
  errorTexts.forEach(el => {
    el.classList.add('hidden');
    el.textContent = '';
  });
  
  const inputs = modal.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.classList.remove('border-red-500');
  });
}

async function parseTalentResponse(json) {
  if (!json) return null;
  if (Array.isArray(json)) return json[0] || null;
  if (json.data != null) {
    return Array.isArray(json.data) ? json.data[0] || null : json.data;
  }
  if (json.talent) return json.talent;
  return json;
}

async function fetchTalentBySlug(slug) {
  try {
    const slugUrls = [
      `${API_BASE_URL}/talents/${encodeURIComponent(slug)}`,
      `${API_BASE_URL}/talents/slug/${encodeURIComponent(slug)}`,
      `${API_BASE_URL}/talents?slug=${encodeURIComponent(slug)}`,
    ];

    for (const url of slugUrls) {
      const res = await fetch(url);
      if (res.ok) {
        const talent = parseTalentResponse(await res.json());
        if (talent) return talent;
      }
    }
    return null;
  } catch (err) {
    console.error(`Error fetching talent with slug ${slug}:`, err);
    return null;
  }
}

function generatePopularTopicCard(talent) {
  const fullName = getFullName(talent);
  const title = talent.title || "";
  const slug = talent.slug || fullName.toLowerCase().replace(/\s+/g, "-");
  const href = slug ? `talent.html?slug=${encodeURIComponent(slug)}` : talent.id ? `talent.html?id=${encodeURIComponent(talent.id)}` : "#";
  
  return `
    <a
      class="group relative flex min-h-[150px] items-center gap-3 overflow-hidden rounded-xl bg-white px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-[3px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-gray-200"
      href="${href}">
      <div
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-amber-50/40">
      </div>
      <div
        class="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-200 shadow-inner shadow-black/10">
        <img alt="${fullName}" loading="lazy" decoding="async" class="object-cover"
          style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          src="${talent.headshotUrl || ""}">
      </div>
      <div class="flex-1">
        <p class="text-lg font-semibold text-gray-900 group-hover:text-amber-600">${fullName}</p>
        <p class="mt-1 text-sm font-medium leading-relaxed text-gray-700 line-clamp-3">${title}</p>
      </div>
    </a>
  `;
}

// Function to filter talents by category
function filterTalentsByCategory(category) {
  return allTalents.filter(talent => {
    const hasInSpeakingCategories = talent.speakingCategories?.some(cat => cat.name === category);
    const hasInCategories = talent.categories?.some(cat => cat.category?.name === category);
    return hasInSpeakingCategories || hasInCategories;
  });
}

// Function to update active button styling
function setActiveButton(category) {
  // Update both mobile and desktop buttons
  const allButtons = document.querySelectorAll(`[data-category]`);
  
  allButtons.forEach(btn => {
    const btnCategory = btn.getAttribute("data-category");
    
    if (btnCategory === category) {
      // Set active state
      btn.setAttribute("aria-pressed", "true");
      
      // Check if it's a desktop or mobile button for styling
      if (btn.classList.contains("flex-1")) {
        // Desktop button
        btn.classList.add("border-[#EBAC2B]", "bg-[#EBAC2B]/15", "text-[#EBAC2B]", "shadow-[0_0_20px_rgba(235,172,43,0.15)]", "border-b-2");
        btn.classList.remove("border-white/12", "bg-white/6", "text-white/70");
      } else {
        // Mobile button
        btn.classList.add("bg-[#EBAC2B]/15", "text-[#EBAC2B]");
        btn.classList.remove("text-white/70");
      }
    } else {
      // Set inactive state
      btn.setAttribute("aria-pressed", "false");
      
      if (btn.classList.contains("flex-1")) {
        // Desktop button
        btn.classList.remove("border-[#EBAC2B]", "bg-[#EBAC2B]/15", "text-[#EBAC2B]", "shadow-[0_0_20px_rgba(235,172,43,0.15)]", "border-b-2");
        btn.classList.add("border-white/12", "bg-white/6", "text-white/70");
      } else {
        // Mobile button
        btn.classList.remove("bg-[#EBAC2B]/15", "text-[#EBAC2B]");
        btn.classList.add("text-white/70");
      }
    }
  });
}

// Function to update the header card
function updateHeaderCard(category) {
  const titleEl = document.getElementById("category-title");
  const exploreLink = document.getElementById("category-explore-link");
  const exploreText = document.getElementById("category-explore-text");
  
  // Update desktop elements
  if (titleEl) titleEl.textContent = category;
  
  // Update explore link URL (convert category to kebab case)
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  if (exploreLink) {
    exploreLink.href = `talents.html?category=${categorySlug}`;
  }
  
  if (exploreText) exploreText.textContent = category;
  
  // Update mobile elements
  const titleElMobile = document.getElementById("category-title-mobile");
  const exploreLinkMobile = document.getElementById("category-explore-link-mobile");
  const exploreTextMobile = document.getElementById("category-explore-text-mobile");
  
  if (titleElMobile) titleElMobile.textContent = category;
  if (exploreLinkMobile) {
    exploreLinkMobile.href = `talents.html?category=${categorySlug}`;
  }
  if (exploreTextMobile) exploreTextMobile.textContent = category;
}

// Function to render talents in both desktop and mobile views
function renderTalentsForCategory(category) {
  const filteredTalents = filterTalentsByCategory(category).slice(0, 8);
  
  console.log(`Found ${filteredTalents.length} ${category}:`, filteredTalents);
  
  // Render desktop view
  const container = document.getElementById("popular-topics-talents");
  if (container) {
    const headerCard = document.getElementById("category-header-card");
    container.innerHTML = "";
    if (headerCard) container.appendChild(headerCard);
    
    filteredTalents.forEach(talent => {
      container.innerHTML += generatePopularTopicCard(talent);
    });
  }
  
  // Render mobile view
  const mobileContainer = document.getElementById("popular-topics-talents-mobile");
  if (mobileContainer) {
    const cardsPerSlide = 3;
    let slidesHTML = "";
    
    for (let i = 0; i < filteredTalents.length; i += cardsPerSlide) {
      const slideTalents = filteredTalents.slice(i, i + cardsPerSlide);
      slidesHTML += `
        <div class="w-full flex-shrink-0 space-y-3 px-1">
          ${slideTalents.map(talent => {
            const fullName = getFullName(talent);
            const title = talent.title || "";
            const slug = talent.slug || fullName.toLowerCase().replace(/\s+/g, "-");
            const href = slug ? `talent.html?slug=${encodeURIComponent(slug)}` : talent.id ? `talent.html?id=${encodeURIComponent(talent.id)}` : "#";
            
            return `
              <a
                class="group relative flex min-h-[150px] items-center gap-3 rounded-xl bg-white px-3 py-0 shadow-[0_10px_22px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-[2px] hover:shadow-[0_18px_32px_rgba(0,0,0,0.25)] border border-gray-200"
                href="${href}">
                <div
                  class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-amber-50/40">
                </div>
                <div
                  class="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-200 shadow-inner shadow-black/10">
                  <img alt="${fullName}" loading="lazy" decoding="async" class="object-cover"
                    style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
                    src="${talent.headshotUrl || ""}">
                </div>
                <div class="flex-1">
                  <p class="text-base font-semibold text-gray-900 group-hover:text-amber-600">${fullName}</p>
                  <p class="mt-1 text-sm font-medium leading-relaxed text-gray-700 line-clamp-3">${title}</p>
                </div>
              </a>
            `;
          }).join("")}
        </div>
      `;
    }
    
    mobileContainer.innerHTML = slidesHTML;
  }
  
  // Re-initialize carousels
  initCarousels();
}

// Function to handle category button clicks
function handleCategoryClick(category) {
  // Update current index to match the clicked category
  currentCategoryIndex = categories.indexOf(category);
  if (currentCategoryIndex === -1) currentCategoryIndex = 0;
  
  setActiveButton(category);
  updateHeaderCard(category);
  renderTalentsForCategory(category);
  
  // Reset the auto-switch timer
  resetAutoSwitch();
}

// Toggle mobile category dropdown
function toggleMobileCategoryDropdown() {
  const dropdown = document.getElementById("mobile-category-dropdown");
  const icon = document.getElementById("mobile-category-icon");
  const toggleBtn = document.getElementById("mobile-category-toggle");
  
  if (!dropdown || !icon || !toggleBtn) return;
  
  const isOpen = dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px";
  
  if (isOpen) {
    dropdown.style.maxHeight = "0px";
    icon.style.transform = "rotate(0deg)";
    toggleBtn.setAttribute("aria-expanded", "false");
  } else {
    dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    icon.style.transform = "rotate(180deg)";
    toggleBtn.setAttribute("aria-expanded", "true");
  }
}

// Function to add event listeners to category buttons
function addCategoryButtonListeners() {
  // Toggle button listener
  const toggleBtn = document.getElementById("mobile-category-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleMobileCategoryDropdown);
  }
  
  const categoryButtons = document.querySelectorAll("[data-category]");
  
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      if (category) {
        handleCategoryClick(category);
        
        // Update mobile dropdown title and close it
        const mobileTitle = document.getElementById("mobile-category-title");
        if (mobileTitle) {
          mobileTitle.textContent = category;
        }
        
        const dropdown = document.getElementById("mobile-category-dropdown");
        const icon = document.getElementById("mobile-category-icon");
        const toggleBtnEl = document.getElementById("mobile-category-toggle");
        if (dropdown && icon && toggleBtnEl) {
          dropdown.style.maxHeight = "0px";
          icon.style.transform = "rotate(0deg)";
          toggleBtnEl.setAttribute("aria-expanded", "false");
        }
      }
    });
  });
}

async function fetchAllTalents() {
  try {
    const endpoints = [
      `${API_BASE_URL}/talents`,
      `${API_BASE_URL}/talents/all`
    ];
    
    for (const url of endpoints) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          let data = await res.json();
          
          // Parse the response properly to get the talents array
          let talents = [];
          if (Array.isArray(data)) {
            talents = data;
          } else if (data.talents && Array.isArray(data.talents)) {
            talents = data.talents;
          } else if (data.data && Array.isArray(data.data)) {
            talents = data.data;
          }
          
          if (talents.length > 0) {
            console.log("Fetched all talents successfully!", talents);
            allTalents = talents;
            
            // Add event listeners to category buttons
            addCategoryButtonListeners();
            
            // Initial render for "Business Speakers"
            handleCategoryClick("Business Speakers");
            
            return talents;
          }
        }
      } catch (e) {
        // Try next endpoint
        continue;
      }
    }
    console.log("Could not fetch all talents from any endpoint");
    return [];
  } catch (err) {
    console.error("Error fetching all talents:", err);
    return [];
  }
}

async function getArtists() {
  try {
    const slugs = [
      "steve-wozniak",
      "kevin-o'leary",
      "magic-johnson",
      "common",
      "ashanti",
      "robert-herjavec",
      "barbara-corcoran",
      "misty-copeland"
    ];

    const talents = await Promise.all(slugs.map(fetchTalentBySlug));
    const validTalents = talents.filter(t => t !== null);
    
    const talentsContainer = document.getElementById("talents-1");
    const talentsContainerMobile = document.getElementById("talents-1-mobile");
    
    if (talentsContainer) {
      talentsContainer.innerHTML = "";
      validTalents.forEach(function (speaker) {
        talentsContainer.innerHTML += generateSpeakers1(speaker);
      });
    }
    
    if (talentsContainerMobile) {
      talentsContainerMobile.innerHTML = "";
      validTalents.forEach(function (speaker) {
        talentsContainerMobile.innerHTML += generateSpeakers1(speaker, true);
      });
    }

    // Run custom initialization logic specifically to apply native scroll behaviors
    initCarousels();
    return validTalents;
  } catch (err) {
    console.error("Error fetching talents:", err);
  }
}

// Get specific talents
getArtists();

// Store all fetched talents globally
let allTalents = [];
let currentCategoryIndex = 0;
let autoSwitchInterval = null;

// List of all category names in order
const categories = [
  "Professional Speakers",
  "Business Speakers",
  "Diversity Speakers",
  "Technology Speakers",
  "Sports Motivational Speakers",
  "Politics/World Issue Speakers"
];

function startAutoSwitch() {
  // Clear any existing interval first
  if (autoSwitchInterval) {
    clearInterval(autoSwitchInterval);
  }
  
  autoSwitchInterval = setInterval(() => {
    currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    handleCategoryClick(categories[currentCategoryIndex]);
  }, 5000);
}

function resetAutoSwitch() {
  startAutoSwitch();
}

function generateBlogCard(blog) {
  // Helper to format date, fallback to empty string
  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  function getBlogUrl(blog) {
    if (blog.url) return blog.url;
    if (blog.slug) return `blog.html?slug=${encodeURIComponent(blog.slug)}`;
    if (blog.id) return `blog.html?id=${encodeURIComponent(blog.id)}`;
    return '#';
  }
  
  const blogHref = blog.slug 
    ? `blog.html?slug=${encodeURIComponent(blog.slug)}` 
    : blog.id 
      ? `blog.html?id=${encodeURIComponent(blog.id)}` 
      : '#';
  
  return `
    <div role="group" aria-roledescription="slide"
      class="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
      <article
        class="group relative flex flex-col bg-white dark:bg-[#0f0f0f] rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden hover:border-[#EBAC2B66] transition-colors duration-200">
        <a href="${blogHref}">
          <div class="relative overflow-hidden">
            <img alt="${blog.title || 'Blog post'}" loading="lazy" width="800" height="450"
              class="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
              style="color: transparent" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src="${blog.coverImage || blog.image || ''}" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent">
            </div>
          </div>
        </a>
        <div class="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div
            class="inline-flex items-center rounded-full px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-[#EBAC2B] text-black font-semibold text-xs border-0 shadow">
          </div>
        </div>
        <div class="px-5 pb-5 pt-4 space-y-1.5 flex flex-col flex-1">
          <p
            class="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#EBAC2B] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-2">
            ${formatDate(blog.publishedAt || blog.date)}
          </p>
          <a class="group"
            href="${blogHref}">
            <h3
              class="text-lg font-semibold leading-snug text-neutral-900 dark:text-[#EBAC2B] hover:text-primary-600 group-hover:text-primary-600 transition-colors line-clamp-2">
              ${blog.title || 'Blog Post'}
            </h3>
          </a>
          <p class="text-[13px] text-neutral-700 dark:text-white/80 leading-snug line-clamp-2 flex-1">
            ${blog.excerpt || blog.description || 'Check out this blog post!'}
          </p>
          <a class="inline-flex items-center gap-1.5 text-[12px] font-semibold text-black bg-[#EBAC2B] hover:bg-primary-600 rounded-full px-3 py-1 transition-all duration-200 shadow-[0_6px_18px_rgba(235,172,43,0.3)] self-end mt-auto"
            href="${blogHref}">Read
            more<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" class="lucide lucide-arrow-right h-3.5 w-3.5">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </article>
    </div>
  `;
}

async function fetchAndPopulateBlogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/latest`);
    if (!response.ok) {
      console.error('Failed to fetch blogs:', response.statusText);
      return;
    }
    
    let data = await response.json();
    let blogs = [];
    if (Array.isArray(data)) {
      blogs = data;
    } else if (data.blogs && Array.isArray(data.blogs)) {
      blogs = data.blogs;
    } else if (data.data && Array.isArray(data.data)) {
      blogs = data.data;
    }
    
    const slidesContainer = document.getElementById('blog-slides');
    if (slidesContainer) {
      slidesContainer.innerHTML = blogs.map(blog => generateBlogCard(blog)).join('');
      
      // Re-initialize carousel after adding new content
      initCarousels();
    }
  } catch (err) {
    console.error('Error fetching blogs:', err);
  }
}

// Add category button listeners on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  addCategoryButtonListeners();
  // Start auto switch when DOM is loaded
  startAutoSwitch();
  // Fetch blogs on load
  fetchAndPopulateBlogs();
});

// Fetch all talents on page load
fetchAllTalents();

function getFeeLabel(speaker) {
  if (typeof speaker.feeRange === "string") return speaker.feeRange;
  if (speaker.feeRangeLabel) return speaker.feeRangeLabel;
  if (speaker.feeRange && speaker.feeRange.label) return speaker.feeRange.label;
  return "Available Upon Request";
}

function getFullName(speaker) {
  return (speaker.fullName || `${speaker.firstName || ""} ${speaker.lastName || ""}`).trim();
}

function generateSpeakers1(speaker, isMobile = false) {
  const fullName = getFullName(speaker);
  const feeLabel = getFeeLabel(speaker);
  const bioSnippet = speaker.bio ? (speaker.bio.length > 100 ? speaker.bio.substring(0, 100) + "..." : speaker.bio) : "";
  const slug = speaker.slug || fullName.toLowerCase().replace(/\s+/g, "-");
  const profileUrl = slug ? `talent.html?slug=${encodeURIComponent(slug)}` : speaker.id ? `talent.html?id=${encodeURIComponent(speaker.id)}` : "#";
  const bookingUrl = slug ? `booking.html?slug=${encodeURIComponent(slug)}` : speaker.id ? `booking.html?id=${encodeURIComponent(speaker.id)}` : "#";
  
  return ` <div
                role="group"
                    aria-roledescription="slide"
                    class="min-w-0 shrink-0 grow-0 ${isMobile ? 'pl-2 pt-4' : 'basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4 pr-2 pt-6'}"
                    ${isMobile ? 'style="flex-basis: 60%;"' : ''}
                      >
                        <article
                          class="group relative flex h-full w-full flex-col gap-3 sm:gap-4 overflow-hidden rounded-xl bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform duration-200 active:scale-[0.98] active:opacity-90 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(0,0,0,0.12)] dark:bg-[#0f0f0f] dark:border-gray-800"
                        >
                          <div class="relative block">
                            <div class="relative aspect-square w-full">
                              <img
                                alt="${fullName}"
                                fetchpriority="high"
                                decoding="async"
                                data-nimg="fill"
                                class="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                                style="
                                  position: absolute;
                                  height: 100%;
                                  width: 100%;
                                  left: 0;
                                  top: 0;
                                  right: 0;
                                  bottom: 0;
                                  color: transparent;
                                "
                                sizes="(max-width: 768px) 60vw, 25vw"
                                srcset="${speaker.headshotUrl}"
                                src="${speaker.headshotUrl}"
                              />
                            </div>
                          </div>
                          <div
                            class="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <div
                              class="absolute inset-0 bg-neutral-900/75 z-0 dark:bg-neutral-900/80"
                            ></div>
                            <div
                              class="absolute inset-0 backdrop-blur-md z-0"
                            ></div>
                            <div
                              class="pointer-events-auto relative z-10 flex w-full max-w-[220px] flex-col items-stretch gap-2 px-3"
                            >
                              <button
                                class="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 h-10 rounded-md bg-primary-500 text-xs font-semibold text-neutral-900 shadow-md hover:bg-primary-600 dark:text-neutral-900"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-calendar-clock mr-2 h-4 w-4"
                                >
                                  <path
                                    d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"
                                  ></path>
                                  <path d="M16 2v4"></path>
                                  <path d="M8 2v4"></path>
                                  <path d="M3 10h5"></path>
                                  <path d="M17.5 17.5 16 16.3V14"></path>
                                  <circle cx="16" cy="16" r="6"></circle></svg
                                >Check Availability</button
                              ><a class="w-full" href="${profileUrl}"
                                ><button
                                  class="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 h-10 w-full rounded-md bg-white/95 text-xs font-semibold text-neutral-900 shadow-md hover:bg-white dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-100"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-eye mr-2 h-4 w-4"
                                  >
                                    <path
                                      d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                                    ></path>
                                    <circle cx="12" cy="12" r="3"></circle></svg
                                  >View Profile
                                </button></a
                              ><a
                                class="w-full"
                                href="${bookingUrl}"
                                ><button
                                  class="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground px-3 h-10 w-full rounded-md border border-white/80 bg-white/90 text-xs font-semibold text-neutral-900 shadow-md hover:bg-white dark:border-neutral-200 dark:bg-neutral-100 dark:text-neutral-900"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-arrow-right mr-2 h-4 w-4"
                                  >
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path></svg
                                  >Book Now
                                </button></a
                              >
                            </div>
                          </div>
                          <div
                            class="flex flex-col gap-1 sm:gap-1.5 text-left px-3 sm:px-4"
                          >
                            <a
                              class="text-base font-semibold text-neutral-900 dark:text-white"
                              href="${profileUrl}"
                              >${fullName}</a
                            >
                            <div
                              class="h-0.5 w-10 rounded-full"
                              style="background-color: #ebac2b"
                            ></div>
                            <p
                              class="text-[0.72rem] sm:text-[0.8rem] leading-snug font-semibold text-[#EBAC2B] dark:text-primary-300"
                            >
                              ${speaker.title}
                            </p>
                             ${bioSnippet ? `<p
                              class="text-[0.64rem] sm:text-[0.75rem] leading-snug text-neutral-600 dark:text-neutral-400"
                            >
                              ${bioSnippet}
                            </p>` : ""}
                            ${speaker.speakingCategories && speaker.speakingCategories.length > 0 ? `
                            <ul
                              class="mt-0.5 sm:mt-1 space-y-0.5 list-disc pl-4 marker:text-primary-500 text-[0.64rem] sm:text-[0.75rem] text-neutral-700 dark:text-neutral-200 leading-tight sm:leading-snug"
                            >
                              ${speaker.speakingCategories.slice(0, 2).map(cat => `<li class="leading-snug">
                                <a
                                  class="transition-colors hover:text-primary-600 dark:hover:text-primary-300"
                                  href="/category/${cat.slug}"
                                  >${cat.name}</a
                                >
                              </li>`).join("")}
                            </ul>` : ""}
                          </div>
                          <div
                            class="mt-auto flex flex-col items-start gap-1 px-4 pb-4"
                          >
                            <div
                              class="inline-flex items-center gap-2 text-[0.72rem] sm:text-[0.78rem] text-neutral-700 dark:text-neutral-300"
                            >
                              <span
                                class="h-1.5 w-1.5 rounded-full"
                                style="background-color: #ebac2b"
                              ></span
                              ><span
                                >Fee:
                                <!-- -->${feeLabel}</span
                        >
                </div>
            </div>
        </article>
    </div>`;
}
