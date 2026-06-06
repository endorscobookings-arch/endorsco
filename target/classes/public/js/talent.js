(function () {
  const DEFAULT_TALENT_SLUG = "common";

  document.addEventListener("DOMContentLoaded", () => {
    initCarousels();
    initModal();
    loadAndApplyTalent();
  });

  // API Configuration
  const API_BASE_URL = window.ENDORSCO_API_BASE || "/api";
  const API_BASE = `${API_BASE_URL}/talents`;

  function parseTalentResponse(json) {
    if (!json) return null;
    if (Array.isArray(json)) return json[0] || null;
    if (json.data != null) {
      return Array.isArray(json.data) ? json.data[0] || null : json.data;
    }
    if (json.talent) return json.talent;
    return json;
  }

  async function fetchFromApi(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      return parseTalentResponse(await res.json());
    } catch (_) {
      return null;
    }
  }

  async function fetchTalentFromApi(id, slug) {
    if (id) {
      const byId = await fetchFromApi(`${API_BASE}/${encodeURIComponent(id)}`);
      if (byId) return byId;
    }

    if (!slug) return null;

    const slugUrls = [
      `${API_BASE}/${encodeURIComponent(slug)}`,
      `${API_BASE}/slug/${encodeURIComponent(slug)}`,
      `${API_BASE}?slug=${encodeURIComponent(slug)}`,
    ];

    for (const url of slugUrls) {
      const talent = await fetchFromApi(url);
      if (talent) return talent;
    }

    return null;
  }

  async function loadAndApplyTalent() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const slug = params.get("slug") || (!id ? DEFAULT_TALENT_SLUG : null);

    let data = await fetchTalentFromApi(id, slug);

    if (!data && slug) {
      try {
        const res = await fetch(`js/data/talent-${slug}.json`);
        if (res.ok) data = await res.json();
      } catch (_) {}
    }

    if (!data) {
      console.warn("Could not load talent data", { id, slug });
      showTalentContent(); // Still show main content even if no data found
      return;
    }

    applyTalentData(data);
  }

  function getFullName(data) {
    return (data.fullName || `${data.firstName || ""} ${data.lastName || ""}`).trim();
  }

  function getFeeLabel(data) {
    if (typeof data.feeRange === "string") return data.feeRange;
    if (data.feeRangeLabel) return data.feeRangeLabel;
    if (data.feeRange && data.feeRange.label) return data.feeRange.label;
    return "Available Upon Request";
  }

  function getFeeMinMax(data) {
    const range = data.feeRange;
    if (range && typeof range === "object") {
      return { min: range.min, max: range.max };
    }
    return { min: null, max: null };
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function normalizeBookingText(text, data, fullName) {
    if (!text) return text;
    return text
      .replace(/Speaker Booking Agency/gi, "Endorsco")
      .replace(/Speakerbookingagency\.com/gi, "Endorsco")
      .replace(/1-888-752-5831/g, "+44-7351-271379")
      .replace(/bookings@speakerbookingagency\.com/gi, "booking@endorscobookings.com")
      .replace(
        /https?:\/\/www\.speakerbookingagency\.com\/booking-request\/[a-z0-9-]+/gi,
        `booking.html?id=${data.id}`
      )
      .replace(
        new RegExp(`${fullName}'s`, "gi"),
        `${fullName}'s`
      );
  }

  function showTalentContent() {
    const loadingScreen = document.getElementById("talent-loading-screen");
    const mainContent = document.getElementById("talent-main-content");
    
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
    if (mainContent) {
      mainContent.classList.remove("hidden");
    }
  }

  function applyTalentData(data) {
    const fullName = getFullName(data);
    const feeLabel = getFeeLabel(data);
    const { min: feeMin, max: feeMax } = getFeeMinMax(data);

    document.querySelectorAll(".talent-name-display").forEach((el) => {
      el.textContent = fullName;
    });

    const nameMain = document.getElementById("talent-name-main");
    if (nameMain) nameMain.textContent = fullName;

    document.querySelectorAll(".talent-job-title").forEach((el) => {
      el.textContent = data.title || "";
    });

    const profileImages = document.querySelectorAll(
      "#talent-profile-image, .talent-profile-image"
    );
    profileImages.forEach((img) => {
      if (!data.headshotUrl) return;
      img.src = data.headshotUrl;
      img.srcset = `${data.headshotUrl} 640w, ${data.headshotUrl} 1200w`;
      img.alt = `${fullName} - ${data.title || "Keynote Speaker"}`;
    });

    const mainProfileContainer = document.getElementById("talent-profile-image")?.parentElement;
    if (mainProfileContainer) {
      const existingBadge = mainProfileContainer.querySelector("[data-availability-badge]");
      if (existingBadge) existingBadge.remove();
      if (data.isActive || data.isAvailable) {
        const badge = document.createElement("div");
        badge.setAttribute("data-availability-badge", "true");
        badge.className =
          "flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg bg-emerald-500 text-white absolute top-2 right-2 z-10";
        badge.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big h-2 w-2 mr-0.5"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>Available';
        mainProfileContainer.appendChild(badge);
      }
    }

    document.querySelectorAll(".talent-fee-range").forEach((el) => {
      el.textContent = feeLabel;
    });

    const feeRangeSlug = slugify(feeLabel);
    document.querySelectorAll('a[href*="/talent/fee-ranges"]').forEach((link) => {
      if (link.href.includes("feeRange=")) {
        link.href = `/talents.html?feeRange=${feeRangeSlug}`;
      } else if (link.href.endsWith("/talent/fee-ranges")) {
        link.href = "/talents.html?feeRange=";
      }
    });

    const travelsFrom = document.getElementById("talent-travels-from");
    if (travelsFrom) travelsFrom.textContent = data.location || "N/A";

    if (data.location) {
      const locationSlug = data.locationSlug || slugify(data.location);
      document.querySelectorAll('a[href*="/talent/location"]').forEach((link) => {
        if (link.href.includes("/talent/location/")) {
          link.href = `/talents.html?location=${locationSlug}`;
        } else if (link.href.endsWith("/talent/location")) {
          link.href = "/talents.html?location=";
        }
      });
    }

    document.querySelectorAll(".talent-name-input").forEach((input) => {
      input.value = fullName;
    });

    const categoriesRoot = document.getElementById("talent-categories-root");
    if (categoriesRoot && Array.isArray(data.speakingCategories)) {
      categoriesRoot.innerHTML = "";
      data.speakingCategories.forEach((category) => {
        const a = document.createElement("a");
        a.href = `/talents.html?category=${category.slug}`;
        const div = document.createElement("div");
        div.className =
          "inline-flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-100 text-amber-800 border-0 px-3 py-1 text-sm font-medium cursor-pointer hover:bg-amber-200 transition-colors";
        div.textContent = category.name;
        a.appendChild(div);
        categoriesRoot.appendChild(a);
      });
    }

    const availableRoot = document.getElementById("talent-available-for-root");
    if (availableRoot && Array.isArray(data.availableFor)) {
      availableRoot.innerHTML = "";
      data.availableFor.forEach((item) => {
        const li = document.createElement("li");
        li.className = "flex items-center";
        li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big h-4 w-4 mr-2 text-emerald-500"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>${item}`;
        availableRoot.appendChild(li);
      });
    }

    const awardRoot = document.getElementById("talent-award-root");
    if (awardRoot && data.bio) {
      awardRoot.innerHTML = "";
      const p = document.createElement("p");
      p.className = "text-base md:text-lg leading-relaxed text-gray-900 mb-1";
      p.textContent = data.bio;
      awardRoot.appendChild(p);
    }

    renderSections(data, fullName);
    renderFaqs(data, fullName);
    renderBookingInfo(data, fullName);
    renderVideos(data, fullName);
    renderSimilarSpeakers(data);
    renderBlogs(data, fullName);

    const bookingLinks = document.querySelectorAll(
      "#talent-booking-link-top, #talent-booking-link-bottom, .talent-booking-link-top, #talent-booking-link-sidebar, .talent-booking-link"
    );
    bookingLinks.forEach((link) => {
      link.href = `/booking.html?id=${data.id}`;
    });

    document.querySelectorAll('a[href*="/booking-request/"]').forEach((link) => {
      link.href = `/booking.html?id=${data.id}`;
    });

    const pageTitle =
      data.metaTitle || `${fullName} | Speaking Fee & Talent Booking`;
    document.title = pageTitle;

    ["talent-title", "talent-og-title", "talent-twitter-title"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.tagName === "TITLE") el.textContent = pageTitle;
      else el.setAttribute("content", pageTitle);
    });

    const pageDesc =
      data.metaDesc ||
      `Book ${fullName}, ${data.title}. Contact Endorsco for ${fullName} speaking fee and availability.`;
    ["talent-meta-description", "talent-og-description", "talent-twitter-description"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) el.setAttribute("content", pageDesc);
      }
    );

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && data.slug) {
      canonical.href = `${window.location.origin}/talent.html?slug=${data.slug}`;
    }

    const ogUrl = document.getElementById("talent-og-url");
    if (ogUrl) ogUrl.setAttribute("content", window.location.href);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && data.headshotUrl) ogImage.setAttribute("content", data.headshotUrl);

    const twitterImg = document.getElementById("talent-twitter-image");
    if (twitterImg && data.headshotUrl) twitterImg.setAttribute("content", data.headshotUrl);

    const modalBudgetSelect = document.getElementById("modal-budget-select");
    if (modalBudgetSelect && feeLabel) {
      for (const option of modalBudgetSelect.options) {
        if (
          option.text.includes(feeLabel) ||
          feeLabel.includes(option.text) ||
          option.value === feeLabel
        ) {
          modalBudgetSelect.value = option.value;
          break;
        }
      }
    }

    const modalDateInput = document.getElementById("modal-event-date");
    if (modalDateInput) {
      modalDateInput.min = new Date().toISOString().split("T")[0];
    }

    updateSchema(data, fullName, feeLabel, feeMin, feeMax);
    initCarousels();
    showTalentContent();
  }

  function renderSections(data, fullName) {
    const root = document.getElementById("talent-sections-root");
    if (!root || !Array.isArray(data.sections)) return;

    root.innerHTML = "";
    data.sections.forEach((section) => {
      const titleKey = (section.sectionTitle || "").toLowerCase();
      if (titleKey.includes("booking information")) return;

      const block = document.createElement("div");
      block.className =
        "rounded-2xl border border-gray-200 bg-white shadow-sm p-6 dark:border-white/10 dark:bg-neutral-900";

      const heading = document.createElement("h3");
      heading.className = "text-lg font-bold text-gray-900 dark:text-white mb-4";
      heading.textContent = section.sectionTitle || "";
      block.appendChild(heading);

      const content = document.createElement("div");
      content.className =
        "prose prose-sm lg:prose text-gray-700 dark:text-gray-300 dark:prose-invert max-w-none";
      const html =
        section.sectionContentHtml ||
        (section.sectionContent
          ? `<p>${section.sectionContent.replace(/\n/g, "</p><p>")}</p>`
          : "");
      content.innerHTML = normalizeBookingText(html, data, fullName);
      block.appendChild(content);
      root.appendChild(block);
    });
  }

  function renderBookingInfo(data, fullName) {
    const root = document.getElementById("talent-booking-info-root");
    if (!root || !Array.isArray(data.sections)) return;

    const bookingSection = data.sections.find((s) =>
      (s.sectionTitle || "").toLowerCase().includes("booking information")
    );
    if (!bookingSection) return;

    const html =
      bookingSection.sectionContentHtml ||
      `<p>${bookingSection.sectionContent || ""}</p>`;
    root.innerHTML = normalizeBookingText(html, data, fullName);
  }

  function renderFaqs(data, fullName) {
    const faqRoot = document.getElementById("talent-faq-root");
    if (!faqRoot || !Array.isArray(data.faqs) || !data.faqs.length) return;

    const faqTitle = document.getElementById("talent-faq-title");
    if (faqTitle) faqTitle.textContent = `FAQ About ${fullName}`;

    faqRoot.innerHTML = "";

    data.faqs.forEach((faq) => {
      const faqItem = document.createElement("div");
      faqItem.className =
        "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-white/10 dark:bg-neutral-900";

      const answer = normalizeBookingText(faq.answer || "", data, fullName);

      faqItem.innerHTML = `
        <button type="button" aria-expanded="false" class="w-full flex items-center justify-between px-4 py-3 lg:px-5 lg:py-4 text-left">
          <span class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">${faq.question || "Question"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-5 w-5" style="color: rgb(235, 172, 43)"><path d="m6 9 6 6 6-6"></path></svg>
        </button>
        <div class="w-full" style="display: none;">
          <div class="w-full px-4 pb-4 lg:px-6 lg:pb-6">
            <div class="prose prose-sm lg:prose text-gray-700 dark:text-gray-300 dark:prose-invert">
              <p>${answer}</p>
            </div>
          </div>
        </div>`;
      faqRoot.appendChild(faqItem);
    });

    faqRoot.addEventListener("click", function (e) {
      const button = e.target.closest("button");
      if (!button) return;
      const content = button.nextElementSibling;
      const svg = button.querySelector("svg");
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      content.style.display = isExpanded ? "none" : "block";
      if (svg) {
        svg.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
        svg.style.transition = "transform 0.3s ease";
      }
      faqRoot.querySelectorAll("button[aria-expanded]").forEach((btn) => {
        if (btn === button || btn.getAttribute("aria-expanded") !== "true") return;
        btn.setAttribute("aria-expanded", "false");
        btn.nextElementSibling.style.display = "none";
        const otherSvg = btn.querySelector("svg");
        if (otherSvg) otherSvg.style.transform = "rotate(0deg)";
      });
    });
  }

  function renderVideos(data, fullName) {
    const videoSection = document.getElementById("talent-videos-section");
    const videoContainer = document.getElementById("talent-videos-carousel");
    const videos = data.youtubeVideos || data.videos || [];

    if (!videoSection || !videoContainer) return;

    if (!videos.length) {
      videoSection.style.display = "none";
      return;
    }

    videoSection.style.display = "block";
    videoContainer.innerHTML = "";

    videos.forEach((video, index) => {
      const videoId =
        video.videoId ||
        (video.url && video.url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1]);
      if (!videoId) return;

      const slide = document.createElement("div");
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.className =
        "min-w-0 shrink-0 grow-0 pl-4 basis-full sm:basis-1/2 lg:basis-1/3";
      slide.innerHTML = `
        <div class="bg-gray-900 rounded-xl overflow-hidden shadow-sm h-full flex flex-col dark:bg-neutral-950">
          <div class="relative w-full aspect-video bg-black">
            <iframe src="https://www.youtube.com/embed/${videoId}?rel=0"
              title="${video.title || `Video ${index + 1} - ${fullName}`}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
              allowfullscreen class="absolute inset-0 w-full h-full"></iframe>
          </div>
        </div>`;
      videoContainer.appendChild(slide);
    });

    const videoTitle = document.getElementById("talent-videos-title");
    if (videoTitle) videoTitle.textContent = `Featured ${fullName} Speaking Videos`;

    const videoSubtitle = document.getElementById("talent-videos-subtitle");
    if (videoSubtitle) {
      videoSubtitle.textContent = `Highlights and interviews featuring ${fullName}.`;
    }
  }

  function formatBlogDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }

  function generateBlogCard(blog) {
    const slugPath = blog.slug ? `/${blog.slug}` : "/blog";
    const img = blog.coverImage || "";
    const title = escapeHtml(blog.title);
    const excerpt = escapeHtml(blog.excerpt);
    const date = formatBlogDate(blog.publishedAt);

    return `
      <div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
        <div class="rounded-lg bg-card text-card-foreground h-full overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 dark:border-white/10 dark:bg-neutral-900">
          <div class="p-0 h-full flex flex-col">
            <a href="${slugPath}">
              <div class="relative h-[15rem] overflow-hidden">
                <img alt="${title}" loading="lazy" decoding="async" class="object-cover transition-transform duration-500 hover:scale-110 w-full h-full" src="${img}" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </a>
            <div class="flex-1 p-4 flex flex-col space-y-3 dark:bg-neutral-950">
              <a href="${slugPath}">
                <h3 class="text-base font-bold text-gray-900 line-clamp-2 transition-colors dark:text-white">${title}</h3>
              </a>
              <p class="text-sm text-gray-600 line-clamp-3 dark:text-gray-300">${excerpt}</p>
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-3 w-3 mr-1">
                    <path d="M8 2v4"></path><path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
                  </svg>
                  <span>${date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderBlogs(data, fullName) {
    const section = document.getElementById("talent-blogs-section");
    if (!section) return;

    const blogs = Array.isArray(data.blogs) ? data.blogs.filter((b) => b && b.title) : [];
    if (!blogs.length) {
      section.hidden = true;
      section.style.display = "none";
      return;
    }

    section.hidden = false;
    section.style.display = "block";

    const subtitle = document.getElementById("talent-blogs-subtitle");
    if (subtitle) {
      subtitle.textContent = `Articles mentioning ${fullName} or their categories.`;
    }

    const viewAll = document.getElementById("talent-blogs-view-all");
    const primaryCategory = data.speakingCategories?.[0]?.slug;
    if (viewAll) {
      viewAll.href = primaryCategory
        ? `/blog?category=${encodeURIComponent(primaryCategory)}`
        : "/blog";
    }

    const carousel = document.getElementById("talent-blogs-carousel");
    if (!carousel) return;

    carousel.innerHTML = "";
    blogs.forEach((blog) => {
      carousel.innerHTML += generateBlogCard(blog);
    });
    initCarousels();
  }

  function renderSimilarSpeakers(data) {
    const root = document.getElementById("related-artists-root");
    if (!root) return;

    const speakers = Array.isArray(data.similarSpeakers) ? data.similarSpeakers : [];
    if (!speakers.length) {
      fetchRelatedArtists(data.id);
      return;
    }

    root.innerHTML = "";
    speakers.slice(0, 6).forEach((artist) => {
      root.innerHTML += generateArtistCard(artist);
    });
    initCarousels();
  }

  function updateSchema(data, fullName, feeLabel, feeMin, feeMax) {
    const orgSchemaEl = document.getElementById("talent-schema-organization");
    if (orgSchemaEl) {
      try {
        const schema = JSON.parse(orgSchemaEl.textContent);
        schema.name = "Endorsco";
        orgSchemaEl.textContent = JSON.stringify(schema, null, 2);
      } catch (e) {
        console.error("Error updating Org Schema:", e);
      }
    }

    const personSchemaEl = document.getElementById("talent-schema-person");
    if (personSchemaEl) {
      const categories = (data.speakingCategories || []).map((c) => c.name);
      const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: fullName,
        url: window.location.href,
        jobTitle: data.title,
        description: data.bio,
        image: data.headshotUrl,
        address: data.location
          ? { "@type": "PostalAddress", addressLocality: data.location }
          : undefined,
        knowsAbout: categories.length ? categories : undefined,
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Book ${fullName} for Speaking Engagements`,
            provider: {
              "@type": "Organization",
              name: "Endorsco",
              url: window.location.origin,
            },
          },
          priceSpecification:
            feeMin != null && feeMax != null
              ? {
                  "@type": "PriceSpecification",
                  minPrice: feeMin,
                  maxPrice: feeMax,
                  priceCurrency: "USD",
                }
              : { "@type": "PriceSpecification", price: feeLabel },
        },
      };
      personSchemaEl.textContent = JSON.stringify(personSchema, null, 2);
    }

    const breadcrumbEl = document.getElementById("talent-schema-breadcrumb");
    if (breadcrumbEl) {
      breadcrumbEl.textContent = JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: window.location.origin + "/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Talents",
              item: window.location.origin + "/talents.html",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: fullName,
              item: window.location.href,
            },
          ],
        },
        null,
        2
      );
    }

    const faqSchemaEl = document.getElementById("talent-schema-faq");
    if (faqSchemaEl && Array.isArray(data.faqs)) {
      faqSchemaEl.textContent = JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: normalizeBookingText(faq.answer, data, fullName),
            },
          })),
        },
        null,
        2
      );
    }

    const websiteSchemaEl = document.getElementById("talent-schema-website");
    if (websiteSchemaEl) {
      websiteSchemaEl.textContent = JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: fullName,
          jobTitle: data.title,
          image: data.headshotUrl,
          description: data.bio,
          url: window.location.href,
        },
        null,
        2
      );
    }
  }

  async function fetchRelatedArtists(excludeId) {
    try {
      const res = await fetch(`${API_BASE_URL}/talents/price-high-to-low`);
      if (!res.ok) return;
      const allArtists = await res.json();
      let filtered = allArtists.filter((a) => String(a.id) !== String(excludeId));
      filtered.sort(() => 0.5 - Math.random());
      const selected = filtered.slice(0, 4);
      const root = document.getElementById("related-artists-root");
      if (!root) return;
      root.innerHTML = "";
      selected.forEach((artist) => {
        root.innerHTML += generateArtistCard(artist);
      });
      initCarousels();
    } catch (err) {
      console.error("Error fetching related artists:", err);
    }
  }

  function generateArtistCard(artist) {
    const name = getFullName(artist);
    const fee = getFeeLabel(artist);
    return `
      <div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
        <div class="h-full">
          <article class="h-full">
            <div class="shadow-sm group relative h-full w-full max-w-[16rem] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium active:scale-[0.98] active:opacity-90 dark:shadow-none mx-0">
              <div class="flex h-full flex-col">
                <div class="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img alt="${name} - Endorsco Talent Booking" class="object-cover transition duration-200 group-hover:scale-105" style="position:absolute;height:100%;width:100%;inset:0;color:transparent" src="${artist.headshotUrl || ""}" />
                </div>
                <div class="p-6 flex flex-1 flex-col gap-1.5 px-2.5 py-2.5 text-left">
                  <div class="space-y-0.5">
                    <a href="/talent.html?id=${artist.id}"><h3 class="text-base font-bold uppercase tracking-[0.04em] text-foreground dark:text-white">${name}</h3></a>
                    <p class="text-[13px] font-semibold text-neutral-700 dark:text-neutral-200 leading-snug line-clamp-2">${artist.title || ""}</p>
                  </div>
                  <div class="space-y-1 text-[11px] sm:text-[12px] text-neutral-700 dark:text-neutral-200 pt-1">
                    <div class="flex items-center gap-1.5 sm:gap-2">
                      <span class="font-semibold">Fee:</span>
                      <span class="underline text-primary-700 dark:text-primary-300">${fee}</span>
                    </div>
                    <div class="flex items-center gap-1.5 sm:gap-2">
                      <span class="font-semibold">Travels:</span>
                      <span>${artist.location || "N/A"}</span>
                    </div>
                  </div>
                  <div class="mt-auto flex flex-col gap-1.5 pt-1.5">
                    <a class="w-full" href="/talent.html?id=${artist.id}"><button class="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground px-4 py-2 w-full justify-center rounded-full text-sm font-semibold h-10 text-black bg-[#EBAC2B] hover:bg-primary-600">View Profile</button></a>
                    <a class="w-full inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full font-semibold h-10" href="/booking.html?id=${artist.id}" style="background-color:rgb(10,10,10);color:rgb(255,255,255)">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>`;
  }

  document.addEventListener("click", function (e) {
    const target = e.target.closest("button");
    if (!target) return;
    const isPrev =
      target.textContent.includes("Previous slide") ||
      target.querySelector("svg.lucide-arrow-left");
    const isNext =
      target.textContent.includes("Next slide") ||
      target.querySelector("svg.lucide-arrow-right");
    if (!isPrev && !isNext) return;
    e.preventDefault();
    const region = target.closest('[role="region"]');
    if (!region) return;
    const container = region.querySelector(
      ".carousel-scroll-container, .overflow-hidden, .overflow-x-auto, [data-scroll-container]"
    );
    if (!container) return;
    const item =
      container.querySelector('[role="group"]') ||
      container.firstElementChild?.firstElementChild;
    const scrollAmount = item ? item.clientWidth : container.clientWidth / 2;
    if (isPrev) {
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  });

  function initCarousels() {
    if (!document.getElementById("carousel-hide-scroll-style")) {
      const style = document.createElement("style");
      style.id = "carousel-hide-scroll-style";
      style.textContent = `
        .carousel-scroll-container { overflow-x: auto !important; scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none; }
        .carousel-scroll-container::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .animate-scale-in { animation: scaleIn 0.2s ease-out; }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;
      document.head.appendChild(style);
    }
    document.querySelectorAll('[role="region"]').forEach((region) => {
      const container = region.querySelector(
        ".overflow-hidden, .overflow-x-auto, [data-scroll-container]"
      );
      if (!container) return;
      container.classList.remove("overflow-hidden");
      container.classList.add("carousel-scroll-container");
      container.setAttribute("data-scroll-container", "true");
    });
  }

  function initModal() {
    const modal = document.getElementById("booking-modal");
    const openBtn = document.getElementById("check-availability-btn");
    const openBtn2 = document.getElementById("check-availability-btn-2");
    const closeBtn = document.getElementById("close-modal");
    const modalForm = modal?.querySelector("form");
    const dateInput = document.getElementById("modal-event-date");
    const budgetSelect = document.getElementById("modal-budget-select");
    
    if (!modal) return;
    
    [openBtn, openBtn2].forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });
    
    const closeModal = () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
      if (modalForm) modalForm.reset();
      clearErrors(modal);
    };
    
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("bg-black/50")) {
        closeModal();
      }
    });
    
    if (modalForm) {
      modalForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate Name
        const nameField = modalForm.querySelector('input[type="text"][placeholder="Full name"]');
        const nameError = modal.querySelector('.error-text-name');
        if (nameField && !nameField.value.trim()) {
          showError(nameField, nameError, "Please enter your name");
          isValid = false;
        } else {
          hideError(nameField, nameError);
        }
        
        // Validate Email
        const emailField = modalForm.querySelector('input[type="email"]');
        const emailError = modal.querySelector('.error-text-email');
        if (emailField && !emailField.value.trim()) {
          showError(emailField, emailError, "Please enter your email");
          isValid = false;
        } else if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
          showError(emailField, emailError, "Please enter a valid email");
          isValid = false;
        } else {
          hideError(emailField, emailError);
        }
        
        // Validate Phone
        const phoneField = modalForm.querySelector('input[type="tel"]');
        const phoneError = modal.querySelector('.error-text-phone');
        if (phoneField && !phoneField.value.trim()) {
          showError(phoneField, phoneError, "Please enter your phone number");
          isValid = false;
        } else {
          hideError(phoneField, phoneError);
        }
        
        // Validate Budget
        const budgetError = modal.querySelector('.error-text-budget');
        if (budgetSelect && !budgetSelect.value) {
          showError(budgetSelect, budgetError, "Please select a budget range");
          isValid = false;
        } else {
          hideError(budgetSelect, budgetError);
        }
        
        // Validate Date
        const dateError = modal.querySelector('.error-text-date');
        if (dateInput && !dateInput.value) {
          showError(dateInput, dateError, "Please select an event date");
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
})();
