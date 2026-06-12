// Search functionality for modal

function openSearchDialog() {
  const dialog = document.getElementById('search-dialog');
  const backdrop = document.getElementById('search-dialog-backdrop');
  const input = document.getElementById('search-dialog-input');
  
  if (dialog && backdrop) {
    dialog.classList.remove('hidden');
    dialog.setAttribute('data-state', 'open');
    backdrop.classList.remove('hidden');
    backdrop.setAttribute('data-state', 'open');
    
    // Focus the input
    if (input) {
      setTimeout(() => {
        input.focus();
      }, 100);
    }
  }
}

function closeSearchDialog() {
  const dialog = document.getElementById('search-dialog');
  const backdrop = document.getElementById('search-dialog-backdrop');
  
  if (dialog && backdrop) {
    dialog.classList.add('hidden');
    dialog.setAttribute('data-state', 'closed');
    backdrop.classList.add('hidden');
    backdrop.setAttribute('data-state', 'closed');
  }
}

function clearSearchResults(welcomeClone) {
  const searchResultsContainer = document.getElementById('search-results-container');
  
  if (searchResultsContainer) {
    searchResultsContainer.innerHTML = '';
    
    if (welcomeClone) {
      const newWelcome = welcomeClone.cloneNode(true);
      searchResultsContainer.appendChild(newWelcome);
    }
  }
}

function getFeeLabel(speaker) {
  if (typeof speaker.feeRange === "string") return speaker.feeRange;
  if (speaker.feeRangeLabel) return speaker.feeRangeLabel;
  if (speaker.feeRange && speaker.feeRange.label) return speaker.feeRange.label;
  return "Available Upon Request";
}

function getFullName(speaker) {
  return (speaker.fullName || `${speaker.firstName || ""} ${speaker.lastName || ""}`).trim();
}

function renderSearchResultItem(speaker) {
  const fullName = getFullName(speaker);
  const feeLabel = getFeeLabel(speaker);
  const profileUrl = speaker.slug ? `talent.html?slug=${encodeURIComponent(speaker.slug)}` : '#';

  return `
    <a class="group flex items-center gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-primary-400 dark:hover:border-primary-500 dark:hover:shadow-primary-900/20 transition-all" href="${profileUrl}">
      <div class="w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0 ring-2 sm:ring-4 ring-neutral-100 group-hover:ring-primary-200 transition-all shadow-md">
        <img alt="${fullName}" fetchpriority="high" width="64" height="64" decoding="async" class="w-full h-full object-cover" src="${speaker.headshotUrl || ''}" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors text-sm sm:text-base">
          ${fullName}
        </h4>
        <div class="hidden md:flex flex-wrap items-center gap-1.5 sm:gap-3 mt-1 sm:mt-2">
          ${speaker.location ? `
            <span class="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1 sm:gap-1.5 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-3 w-3 sm:h-3.5 sm:w-3.5">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${speaker.location}
            </span>
          ` : ''}
          <span class="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1 sm:gap-1.5 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign h-3 w-3 sm:h-3.5 sm:w-3.5">
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            ${feeLabel}
          </span>
        </div>
      </div>
      <div class="flex-shrink-0 p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-primary-50 dark:bg-primary-900/30 group-hover:bg-primary-100 dark:group-hover:bg-primary-800/60 transition-colors border border-transparent">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-4 w-4 sm:h-5 sm:w-5 text-primary-600 dark:text-primary-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
          <path d="M7 7h10v10"></path>
          <path d="M7 17 17 7"></path>
        </svg>
      </div>
    </a>
  `;
}

function renderSearchResults(speakers, totalCount, query, page, append = false) {
  const container = document.getElementById('search-results-container');
  if (!container) return;

  if (!append) {
    container.innerHTML = '';
  }

  if (!container.innerHTML || !append) {
    container.innerHTML = `
      <div class="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-8">
        <div class="space-y-2 sm:space-y-4">
          <div class="flex items-center justify-between text-neutral-900 dark:text-neutral-50">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="p-1.5 sm:p-2 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-200 rounded-md sm:rounded-lg shadow-sm border border-primary-100 dark:border-primary-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-5 w-5">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 class="font-bold text-sm sm:text-lg">Speakers</h3>
              <div class="inline-flex items-center rounded-full border py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold px-1.5 sm:px-2.5 text-[10px] sm:text-xs">
                ${totalCount}
              </div>
            </div>
          </div>
          <div class="space-y-2" id="search-results-list"></div>
          <a class="flex items-center justify-center gap-2 py-2.5 mt-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-primary-600 hover:text-primary-700 bg-primary-50/80 hover:bg-primary-100 border border-primary-200/60 dark:text-primary-400 dark:hover:text-primary-300 dark:bg-primary-900/20 dark:hover:bg-primary-900/40 dark:border-primary-800/60" href="talents.html?search=${encodeURIComponent(query)}">
            View all speakers
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right h-3.5 w-3.5 sm:h-4 sm:w-4">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </a>
        </div>
      </div>
    `;
  }

  const resultsList = document.getElementById('search-results-list');
  if (resultsList) {
    speakers.forEach(speaker => {
      resultsList.innerHTML += renderSearchResultItem(speaker);
    });
  }
}

async function performModalSearch(query, page, append = false) {
  const container = document.getElementById('search-results-container');
  if (!container) return;

  // Show loading state
  if (!append) {
    container.innerHTML = `
      <div class="p-3 sm:p-4 lg:p-6 flex items-center justify-center">
        <div class="animate-pulse text-neutral-500">Loading...</div>
      </div>
    `;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/talents?search=${encodeURIComponent(query)}&page=${page}&limit=12`);
    
    if (!response.ok) {
      throw new Error('Search failed');
    }

    const data = await response.json();
    const speakers = data.data || [];
    const totalCount = data.pagination?.totalElements || speakers.length;

    if (speakers.length === 0 && page === 0) {
      container.innerHTML = `
        <div class="p-3 sm:p-4 lg:p-6 text-center text-neutral-500">
          No speakers found matching "${query}"
        </div>
      `;
      return;
    }

    renderSearchResults(speakers, totalCount, query, page, append);
  } catch (error) {
    console.error('Search error:', error);
    // Fallback: use data.json if API fails
    try {
      const fallbackResponse = await fetch('/data.json');
      const fallbackData = await fallbackResponse.json();
      const allSpeakers = fallbackData.data || [];
      
      // Filter local data
      const filteredSpeakers = allSpeakers.filter(speaker => {
        const fullName = getFullName(speaker).toLowerCase();
        const q = query.toLowerCase();
        return fullName.startsWith(q) || fullName.includes(` ${q}`);
      }).slice(0, 12);

      if (filteredSpeakers.length === 0) {
        container.innerHTML = `
          <div class="p-3 sm:p-4 lg:p-6 text-center text-neutral-500">
            No speakers found matching "${query}"
          </div>
        `;
        return;
      }

      renderSearchResults(filteredSpeakers, filteredSpeakers.length, query, 0, false);
    } catch (fallbackError) {
      container.innerHTML = `
        <div class="p-3 sm:p-4 lg:p-6 text-center text-red-500">
          Error loading search results
        </div>
      `;
    }
  }
}

// Initialize search button listeners
function initSearchDialog() {
  const searchBtnMobile = document.getElementById('search-btn-mobile');
  const searchBtnDesktop = document.getElementById('search-btn-desktop');
  const searchBtnHero = document.getElementById('search-btn-hero');
  const closeBtn = document.getElementById('search-dialog-close');
  const backdrop = document.getElementById('search-dialog-backdrop');
  const searchInput = document.getElementById('search-dialog-input');
  const welcomeEl = document.getElementById('search-welcome');
  
  // Save a clone of the initial welcome content
  let welcomeContentClone = null;
  if (welcomeEl) {
    welcomeContentClone = welcomeEl.cloneNode(true);
  }

  [searchBtnMobile, searchBtnDesktop, searchBtnHero].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearchDialog();
      });
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeSearchDialog();
      if (searchInput) searchInput.value = '';
      clearSearchResults(welcomeContentClone);
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeSearchDialog();
      if (searchInput) searchInput.value = '';
      clearSearchResults(welcomeContentClone);
    });
  }

  if (searchInput) {
    // On input change, just toggle welcome (no search)
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      
      const currentWelcome = document.getElementById('search-welcome');
      
      if (query) {
        if (currentWelcome) currentWelcome.classList.add('hidden');
      } else {
        clearSearchResults(welcomeContentClone);
      }
    });
    
    // Only search when user presses Enter
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
          performModalSearch(query, 0, false);
        }
      }
    });
  }

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearchDialog();
      if (searchInput) searchInput.value = '';
      clearSearchResults(welcomeContentClone);
    }
  });
}

function performSearch(query) {
  if (query) {
    // Navigate to talents page with search query
    window.location.href = `talents.html?search=${encodeURIComponent(query)}`;
  }
}

// Run initialization
document.addEventListener('DOMContentLoaded', () => {
  initSearchDialog();
});