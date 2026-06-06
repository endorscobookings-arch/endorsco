// Contact form functionality
const API_BASE_URL = window.ENDORSCO_API_BASE || "/api";

document.addEventListener('DOMContentLoaded', function() {
  const dropdownButton = document.getElementById('topic-dropdown-button');
  const dropdownMenu = document.getElementById('topic-dropdown-menu');
  const dropdownSelected = document.getElementById('topic-dropdown-selected');
  const dropdownChevron = document.getElementById('topic-dropdown-chevron');
  const topicSelect = document.getElementById('topic-select');
  const dropdownOptions = dropdownMenu.querySelectorAll('button[data-value]');

  // Toggle dropdown open/closed
  dropdownButton.addEventListener('click', function() {
    const isOpen = !dropdownMenu.classList.contains('hidden');
    
    if (isOpen) {
      dropdownMenu.classList.add('hidden');
      dropdownButton.setAttribute('aria-expanded', 'false');
      dropdownChevron.style.transform = 'rotate(0deg)';
    } else {
      dropdownMenu.classList.remove('hidden');
      dropdownButton.setAttribute('aria-expanded', 'true');
      dropdownChevron.style.transform = 'rotate(180deg)';
    }
  });

  // Handle option selection
  dropdownOptions.forEach(option => {
    option.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      
      // Update the displayed text
      dropdownSelected.textContent = value;
      
      // Update the hidden select element
      topicSelect.value = value;
      
      // Close the dropdown
      dropdownMenu.classList.add('hidden');
      dropdownButton.setAttribute('aria-expanded', 'false');
      dropdownChevron.style.transform = 'rotate(0deg)';
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    const container = document.getElementById('topic-dropdown-container');
    if (!container.contains(event.target)) {
      dropdownMenu.classList.add('hidden');
      dropdownButton.setAttribute('aria-expanded', 'false');
      dropdownChevron.style.transform = 'rotate(0deg)';
    }
  });

  // Handle form submission
  const form = document.querySelector('form');
  if (form) {
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

      console.log('Contact form data:', data);

      // Submit to API - /api/contact-inquiries endpoint
      try {
        const response = await fetch(`${API_BASE_URL}/contact-inquiries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Thank you for your message! We will contact you soon.');
          form.reset();
          // Reset dropdown
          dropdownSelected.textContent = 'Choose an option';
          topicSelect.value = '';
        } else {
          alert('Something went wrong. Please try again later.');
        }
      } catch (err) {
        console.error("Error submitting form:", err);
        alert('Something went wrong. Please try again later.');
      }
    });
  }
});
