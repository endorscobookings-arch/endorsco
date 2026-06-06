(function () {
    "use strict";

    // API Configuration
    const API_BASE_URL = window.ENDORSCO_API_BASE || "/api";
    const API_BASE = `${API_BASE_URL}/talents`;

    async function parseTalentResponse(json) {
        if (!json) return null;
        if (Array.isArray(json)) return json[0] || null;
        if (json.data != null) {
            return Array.isArray(json.data) ? json.data[0] || null : json.data;
        }
        if (json.talent) return json.talent;
        return json;
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

    async function fetchFromApi(url) {
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            return parseTalentResponse(await res.json());
        } catch (_) {
            return null;
        }
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

    function showTalentContent() {
        const loadingScreen = document.getElementById('talent-loading-screen');
        const mainContent = document.getElementById('talent-main-content');
        
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        if (mainContent) {
            mainContent.classList.remove('hidden');
        }
    }

    async function init() {
        const urlParams = new URLSearchParams(window.location.search);
        const artistId = urlParams.get('id');
        const slug = urlParams.get('slug');

        let data = await fetchTalentFromApi(artistId, slug);

        if (!data) {
            console.error('Could not load talent data', { id: artistId, slug });
            // Keep loading screen visible if no data
            initFormSubmission();
            return;
        }

        updatePageContent(data);
        showTalentContent();

        // Initialize form submission
        initFormSubmission();
    }

    function updatePageContent(data) {
        const fullName = getFullName(data);
        const feeLabel = getFeeLabel(data);

        // Update Page Title and Meta
        document.title = `Book ${fullName} | Endorsco`;
        const metaDesc = document.getElementById('booking-meta-description');
        if (metaDesc) {
            metaDesc.setAttribute('content', `Request a booking for ${fullName}. Endorsco provides transparent pricing and availability for ${data.title || "premier talent"}.`);
        }

        // Update Header/Subheader
        const headerName = document.getElementById('booking-header-name');
        if (headerName) headerName.textContent = fullName;
        
        const subheaderName = document.getElementById('booking-subheader-name');
        if (subheaderName) subheaderName.textContent = fullName;

        // Update Breadcrumb
        const breadcrumbLink = document.getElementById('booking-breadcrumb-link');
        if (breadcrumbLink) {
            breadcrumbLink.href = data.slug 
                ? `/talent.html?slug=${encodeURIComponent(data.slug)}` 
                : `/talent.html?id=${data.id}`;
        }

        // Update Artist Sidebar
        const artistImage = document.getElementById('booking-artist-image');
        if (artistImage) {
            artistImage.src = data.headshotUrl;
            artistImage.alt = `${fullName} - ${data.title || "Talent"}`;
        }

        const artistName = document.getElementById('booking-artist-name');
        if (artistName) artistName.textContent = fullName;

        const artistJob = document.getElementById('booking-artist-job');
        if (artistJob) artistJob.textContent = data.title;

        const artistLocation = document.getElementById('booking-artist-location');
        if (artistLocation) artistLocation.textContent = data.location || 'N/A';

        const artistFee = document.getElementById('booking-artist-fee');
        if (artistFee) artistFee.textContent = feeLabel;

        // Auto-fill Form
        const preferredSpeaker = document.getElementById('preferredSpeaker');
        if (preferredSpeaker) {
            preferredSpeaker.value = fullName;
        }

        const budgetSelect = document.getElementById('budget');
        if (budgetSelect && feeLabel) {
            // Try to match the booking fee to an option value
            for (let option of budgetSelect.options) {
                if (option.text.includes(feeLabel) || feeLabel.includes(option.text) || option.value === feeLabel) {
                    budgetSelect.value = option.value;
                    break;
                }
            }
        }

        // Set min date to today
        const dateInput = document.getElementById('event-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }

    function initFormSubmission() {
        const form = document.querySelector('form.space-y-6');
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

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

            console.log('Booking form data:', data);

            // Submit to API - /api/booking-requests/booking endpoint for dedicated booking page
          try {
            const response = await fetch(`${API_BASE_URL}/booking-requests/booking`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });

                if (response.ok) {
                    alert('Thank you for your booking request! We will contact you soon.');
                    form.reset();
                } else {
                    alert('Something went wrong. Please try again later.');
                }
            } catch (err) {
                console.error("Error submitting form:", err);
                alert('Something went wrong. Please try again later.');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
