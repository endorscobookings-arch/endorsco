// API Configuration
const API_BASE_URL = window.ENDORSCO_API_BASE || "/api";

// Talents page state
let currentPage = 1;
let isLoading = false;
let hasMore = true;
const LIMIT = 12;
let currentCategory = null;
let currentSort = "most-popular";
let currentLocation = null;
let currentSearch = null;

// Map category slugs to display names
const categoryDisplayNames = {
  "professional-speakers": "Professional Talents",
  "business-speakers": "Business Talents",
  "diversity-inclusion": "Diversity & Inclusion Talents",
  "technology": "Technology Talents",
  "sports-motivational": "Sports Motivational Talents",
  "politics-world-issues": "Politics/World Issue Talents"
};

// Helper function to parse URL search params
function getSearchParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get("category") || null,
    sort: params.get("sort") || "most-popular",
    location: params.get("location") || null,
    search: params.get("search") || null,
  };
}

// Sorting display names
const sortingDisplayNames = {
  "most-popular": "Most Popular",
  "first-name-az": "First Name A-Z",
  "first-name-za": "First Name Z-A",
  "last-name-az": "Last Name A-Z",
  "last-name-za": "Last Name Z-A"
};

// Initialize sorting dropdown
function initSortingDropdown() {
  const sortingButton = document.getElementById("sorting-button");
  const sortingDropdown = document.getElementById("sorting-dropdown");
  const sortingDisplayName = document.getElementById("sorting-display-name");
  const sortOptions = document.querySelectorAll(".sort-option");
  
  if (sortingButton && sortingDropdown) {
    // Toggle dropdown on button click
    sortingButton.addEventListener("click", () => {
      const isExpanded = sortingButton.getAttribute("aria-expanded") === "true";
      sortingButton.setAttribute("aria-expanded", !isExpanded);
      sortingDropdown.classList.toggle("hidden");
    });
    
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!sortingButton.contains(e.target) && !sortingDropdown.contains(e.target)) {
        sortingButton.setAttribute("aria-expanded", "false");
        sortingDropdown.classList.add("hidden");
      }
    });
    
    // Handle sort option clicks
    sortOptions.forEach(option => {
      option.addEventListener("click", () => {
        const sortValue = option.getAttribute("data-value");
        currentSort = sortValue;
        
        // Update display name
        if (sortingDisplayName) {
          sortingDisplayName.textContent = sortingDisplayNames[sortValue] || sortValue;
        }
        
        // Reset and refetch talents
        currentPage = 1;
        const grid = document.getElementById("talents-grid");
        if (grid) grid.innerHTML = "";
        fetchTalents(1);
        
        // Close dropdown
        sortingButton.setAttribute("aria-expanded", "false");
        sortingDropdown.classList.add("hidden");
      });
    });
  }
}

// Fetch and initialize locations dropdown
async function initLocationsDropdown() {
  const locationsButton = document.getElementById("locations-button");
  const locationsDropdown = document.getElementById("locations-dropdown");
  const locationsDisplayName = document.getElementById("locations-display-name");
  const locationsOptionsContainer = document.getElementById("locations-options");
  
  if (!locationsButton || !locationsDropdown || !locationsOptionsContainer) {
    return;
  }
  
  try {
    // Fetch locations from API
    const response = await fetch(`${API_BASE_URL}/talents/locations`);
    if (!response.ok) throw new Error("Failed to fetch locations");
    const data = await response.json();
    const locations = data.data || data || [];
    
    // Populate the dropdown
    locationsOptionsContainer.innerHTML = "";
    
    // Add "All Locations" option
    const allOption = document.createElement("button");
    allOption.className = "location-option w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors";
    allOption.setAttribute("data-value", "");
    allOption.textContent = "All Locations";
    allOption.addEventListener("click", () => selectLocation(null, "Locations", locationsDisplayName, locationsButton, locationsDropdown));
    locationsOptionsContainer.appendChild(allOption);
    
    // Add location options
    locations.forEach(location => {
      const locationName = location.name || location;
      const locationSlug = location.slug || locationName.toLowerCase().replace(/\s+/g, "-");
      
      const locationOption = document.createElement("button");
      locationOption.className = "location-option w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors";
      locationOption.setAttribute("data-value", locationSlug);
      locationOption.textContent = locationName;
      locationOption.addEventListener("click", () => selectLocation(locationSlug, locationName, locationsDisplayName, locationsButton, locationsDropdown));
      locationsOptionsContainer.appendChild(locationOption);
    });
    
  } catch (error) {
    console.error("Error initializing locations dropdown:", error);
  }
  
  // Toggle dropdown on button click
  locationsButton.addEventListener("click", () => {
    const isExpanded = locationsButton.getAttribute("aria-expanded") === "true";
    locationsButton.setAttribute("aria-expanded", !isExpanded);
    locationsDropdown.classList.toggle("hidden");
  });
  
  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!locationsButton.contains(e.target) && !locationsDropdown.contains(e.target)) {
      locationsButton.setAttribute("aria-expanded", "false");
      locationsDropdown.classList.add("hidden");
    }
  });
}

// Handle location selection
function selectLocation(locationSlug, locationName, displayElement, buttonElement, dropdownElement) {
  currentLocation = locationSlug;
  
  // Update display name
  if (displayElement) {
    displayElement.textContent = locationName || "Locations";
  }
  
  // Reset and refetch talents
  currentPage = 1;
  const grid = document.getElementById("talents-grid");
  if (grid) grid.innerHTML = "";
  fetchTalents(1);
  
  // Close dropdown
  if (buttonElement) buttonElement.setAttribute("aria-expanded", "false");
  if (dropdownElement) dropdownElement.classList.add("hidden");
}

// Update category display and heading
function updateCategoryDisplay(categorySlug, searchQuery = null) {
  const categoryDisplayNameEl = document.getElementById("category-display-name");
  const pageHeadingEl = document.querySelector("h1.text-4xl.md\\:text-5xl");

  if (searchQuery) {
    if (categoryDisplayNameEl) {
      categoryDisplayNameEl.textContent = `Search results for "${searchQuery}"`;
    }
    if (pageHeadingEl) {
      pageHeadingEl.textContent = `Search results for "${searchQuery}"`;
    }
  } else if (categorySlug) {
    const displayName = categoryDisplayNames[categorySlug] || categorySlug.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    if (categoryDisplayNameEl) {
      categoryDisplayNameEl.textContent = displayName;
    }

    if (pageHeadingEl) {
      pageHeadingEl.textContent = `Browse ${displayName}`;
    }
  } else {
    // Default state
    if (categoryDisplayNameEl) {
      categoryDisplayNameEl.textContent = "Professional Talents";
    }

    if (pageHeadingEl) {
      pageHeadingEl.textContent = "Browse All Talents";
    }
  }
}

// Generate a single skeleton loading card HTML
function generateSkeletonCard() {
  return `
    <div class="w-full max-w-[360px] sm:max-w-none talent-skeleton">
      <article class="h-full">
        <div class="shadow-sm relative h-full w-full max-w-[16rem] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-soft dark:shadow-none mx-0">
          <div class="flex h-full flex-col">
            <div class="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
            <div class="p-6 flex flex-1 flex-col gap-1.5 px-2.5 py-2.5 text-left">
              <div class="space-y-0.5">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              </div>
              <div class="space-y-1 pt-1">
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              </div>
              <div class="mt-auto flex flex-col gap-1.5 pt-1.5">
                <div class="h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  `;
}

// Generate a single talent card HTML
function generateTalentCard(talent) {
  // Get the first category for the tag
  const primaryCategory =
    talent.speakingCategories && talent.speakingCategories.length > 0
      ? talent.speakingCategories[0]
      : null;

  const fullName =
    talent.fullName || `${talent.firstName || ""} ${talent.lastName || ""}`;
  const feeLabel =
    talent.feeRangeLabel ||
    (talent.feeRange && talent.feeRange.label) ||
    "Available Upon Request";

  return `
    <div class="w-full max-w-[360px] sm:max-w-none">
      <article class="h-full">
        <div
          class="shadow-sm group relative h-full w-full max-w-[16rem] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium active:scale-[0.98] active:opacity-90 dark:shadow-none mx-0"
        >
          <div class="flex h-full flex-col">
            <div class="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <img
                alt="${fullName} - Professional Speakers Booking"
                class="object-cover transition duration-200 group-hover:scale-105"
                style="
                  position: absolute;
                  height: 100%;
                  width: 100%;
                  inset: 0px;
                  color: transparent;
                  opacity: 0;
                  transition: opacity 0.3s ease-in-out;
                "
                src="${talent.headshotUrl || ""}"
                onload="this.style.opacity = '1'"
              />
            </div>
            <div class="p-6 flex flex-1 flex-col gap-1.5 px-2.5 py-2.5 text-left">
              <div class="space-y-0.5">
                <a href="talent.html?slug=${talent.slug || talent.id}">
                  <h3
                    class="text-base font-bold uppercase tracking-[0.04em] text-foreground dark:text-white"
                  >
                    ${fullName}
                  </h3>
                </a>
                <p
                  class="text-[13px] font-semibold text-neutral-700 dark:text-neutral-200 leading-snug line-clamp-2"
                >
                  ${talent.title || ""}
                </p>
              </div>
              <div
                class="space-y-1 text-[11px] sm:text-[12px] text-neutral-700 dark:text-neutral-200 pt-1"
              >
                ${
                  primaryCategory
                    ? `
                <div
                  class="flex flex-wrap gap-1 text-[11px] text-primary-700 dark:text-primary-300 leading-tight"
                >
                  <span>
                    <a
                      class="hover:underline"
                      href="talents.html?category=${primaryCategory.slug}"
                      >${primaryCategory.name}</a
                    >
                  </span>
                </div>
                `
                    : ""
                }
                <div class="flex items-center gap-1.5 sm:gap-2">
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
                    class="lucide lucide-dollar-sign h-3.5 w-3.5 text-neutral-800 dark:text-neutral-100"
                  >
                    <line
                      x1="12"
                      x2="12"
                      y1="2"
                      y2="22"
                    ></line>
                    <path
                      d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                    ></path>
                  </svg>
                  <span class="font-semibold">
                    <span class="hidden sm:inline">Speaking Fee:</span>
                    <span class="sm:hidden inline">Fee:</span>
                  </span>
                  <span
                    class="underline text-primary-700 dark:text-primary-300"
                    >${feeLabel}</span
                  >
                </div>
                <div class="flex items-center gap-1.5 sm:gap-2">
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
                    class="lucide lucide-map-pin h-3.5 w-3.5 text-neutral-800 dark:text-neutral-100"
                  >
                    <path
                      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                    ></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span class="font-semibold">
                    <span class="hidden sm:inline">Travels From:</span>
                    <span class="sm:hidden inline">Travels:</span>
                  </span>
                  <span
                    class="text-neutral-700 dark:text-neutral-200"
                    >${talent.location || ""}</span
                  >
                </div>
              </div>
              <div class="mt-auto flex flex-col gap-1.5 pt-1.5">
                <a
                  class="w-full"
                  href="talent.html?slug=${talent.slug || talent.id}"
                >
                  <button
                    class="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground px-4 py-2 w-full justify-center rounded-full text-sm font-semibold h-10 text-black bg-[#EBAC2B] hover:bg-primary-600"
                  >
                    View Profile
                  </button>
                </a>
                <a
                  class="w-full"
                  href="booking.html?slug=${talent.slug || talent.id}"
                >
                  <button
                    class="inline-flex items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 w-full justify-center rounded-full font-semibold h-10"
                    style="
                      background-color: rgb(10, 10, 10);
                      color: rgb(255, 255, 255);
                      box-shadow: rgba(235, 172, 43, 0.25) 0px 4px 12px;
                    "
                  >
                    Book Now
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
                      class="lucide lucide-arrow-right ml-2 h-4 w-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  `;
}

// Function to render a list of talents to the grid
function renderTalents(talents, append = false) {
  const grid = document.getElementById("talents-grid");
  if (!grid) return;

  const html = talents.map(generateTalentCard).join("");
  
  if (append) {
    // Find the sentinel and insert before it so sentinel stays at the end
    const sentinel = document.getElementById("talents-sentinel");
    if (sentinel) {
      sentinel.insertAdjacentHTML("beforebegin", html);
    } else {
      grid.insertAdjacentHTML("beforeend", html);
    }
  } else {
    grid.innerHTML = html;
  }
}

// Function to show loading indicator with skeleton cards
function showLoading(isAppend = false) {
  const grid = document.getElementById("talents-grid");
  if (!grid) return;

  // Generate LIMIT skeleton cards
  let skeletonsHtml = "";
  for (let i = 0; i < LIMIT; i++) {
    skeletonsHtml += generateSkeletonCard();
  }
  
  if (isAppend) {
    // Find the sentinel and insert before it
    const sentinel = document.getElementById("talents-sentinel");
    if (sentinel) {
      sentinel.insertAdjacentHTML("beforebegin", skeletonsHtml);
    } else {
      grid.insertAdjacentHTML("beforeend", skeletonsHtml);
    }
  } else {
    grid.insertAdjacentHTML("beforeend", skeletonsHtml);
  }
}

// Function to hide loading indicator
function hideLoading(isAppend = false) {
  const skeletons = document.querySelectorAll(".talent-skeleton");
  skeletons.forEach(skeleton => skeleton.remove());
}

// Map sort values to API endpoints
const sortToEndpointMap = {
  "most-popular": "", // Base endpoint
  "first-name-az": "/sort/first-name-asc",
  "first-name-za": "/sort/first-name-desc",
  "last-name-az": "/sort/last-name-asc",
  "last-name-za": "/sort/last-name-desc"
};

// Function to fetch talents from the API
async function fetchTalents(page = 1) {
  console.log(`fetchTalents called with page ${page}`);
  if (isLoading) {
    console.log("Already loading, skipping...");
    return;
  }

  const isAppend = page > 1;
  isLoading = true;
  showLoading(isAppend);

  try {
    // Build URL based on selected sort and location
    const sortEndpoint = sortToEndpointMap[currentSort] || "";
    const params = new URLSearchParams({
      page: page.toString(),
      limit: LIMIT.toString(),
    });

    if (currentSearch) {
      params.append("search", currentSearch);
    }

    let url;
    
    if (currentLocation) {
      // Use by-location endpoint when a location is selected
      params.append("location", currentLocation);
      if (currentCategory) {
        params.append("category", currentCategory);
      }
      url = `${API_BASE_URL}/talents/by-location${sortEndpoint}?${params.toString()}`;
    } else {
      // Use regular talents endpoint otherwise
      if (currentCategory) {
        params.append("category", currentCategory);
      }
      url = `${API_BASE_URL}/talents${sortEndpoint}?${params.toString()}`;
    }
    console.log("Fetching URL:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data);

    // Handle pagination
    if (data.pagination) {
      hasMore = page < data.pagination.totalPages;
    } else {
      // Fallback if no pagination data
      hasMore = data.data && data.data.length === LIMIT;
    }
    console.log("hasMore set to:", hasMore);

    // Hide loading before rendering
    hideLoading(isAppend);

    // Render the talents
    if (data.data && data.data.length > 0) {
      renderTalents(data.data, isAppend);
    } else if (page === 1) {
      // Show empty state if first page has no data
      const grid = document.getElementById("talents-grid");
      if (grid) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-12 text-neutral-600 dark:text-neutral-400">
            No talents found.
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Error fetching talents:", error);
    hideLoading(isAppend);

    // Show error message if first page fails
    if (page === 1) {
      const grid = document.getElementById("talents-grid");
      if (grid) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-12 text-red-600 dark:text-red-400">
            Oops! Something went wrong while loading talents. Please try again later.
          </div>
        `;
      }
    }
  } finally {
    isLoading = false;
  }
}

// Infinite scroll observer
function initInfiniteScroll() {
  console.log("initInfiniteScroll running!");
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      console.log("Sentinel intersection:", {
        isIntersecting: entry.isIntersecting,
        hasMore,
        isLoading
      });
      if (entry.isIntersecting && hasMore && !isLoading) {
        console.log("Triggering next page load!");
        currentPage += 1;
        fetchTalents(currentPage);
      }
    },
    { threshold: 0.1 }
  );

  // Create a sentinel element at the bottom of the grid
  const grid = document.getElementById("talents-grid");
  if (!grid) {
    console.log("talents-grid not found!");
    return;
  }

  const sentinel = document.createElement("div");
  sentinel.id = "talents-sentinel";
  sentinel.className = "col-span-full h-20";
  grid.appendChild(sentinel);
  console.log("Sentinel added to DOM:", sentinel);

  observer.observe(sentinel);
}

// Initialize the talents page
async function initTalentsPage() {
  console.log("initTalentsPage running!");
  // Get params from URL
  const searchParams = getSearchParams();
  currentCategory = searchParams.category;
  currentSearch = searchParams.search;
  // Add "-speakers" to category if it doesn't already have it
  if (currentCategory && !currentCategory.endsWith("-speakers")) {
    currentCategory = currentCategory + "-speakers";
  }
  currentSort = searchParams.sort;
  currentLocation = searchParams.location;

  // Update category display
  updateCategoryDisplay(currentCategory, currentSearch);
  
  // Initialize sorting and locations dropdowns
  initSortingDropdown();
  await initLocationsDropdown();
  
  // Update sorting display name if needed
  const sortingDisplayName = document.getElementById("sorting-display-name");
  if (sortingDisplayName) {
    sortingDisplayName.textContent = sortingDisplayNames[currentSort] || currentSort;
  }
  
  // Update location display name if needed
  if (currentLocation) {
    const locationsDisplayName = document.getElementById("locations-display-name");
    if (locationsDisplayName) {
      // Wait a bit for locations to load, then update display name
      setTimeout(() => {
        const locationOptions = document.querySelectorAll(".location-option");
        locationOptions.forEach(option => {
          if (option.getAttribute("data-value") === currentLocation) {
            locationsDisplayName.textContent = option.textContent;
          }
        });
      }, 500);
    }
  }

  // Reset state
  currentPage = 1;
  isLoading = false;
  hasMore = true;

  // Clear existing grid content before initial fetch
  const grid = document.getElementById("talents-grid");
  console.log("talents-grid element:", grid);
  if (grid) grid.innerHTML = "";

  // Initial fetch
  await fetchTalents(1);

  // Init infinite scroll after first page loads
  initInfiniteScroll();
}

// Start initialization after DOM loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTalentsPage);
} else {
  initTalentsPage();
}
