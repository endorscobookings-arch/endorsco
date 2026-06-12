// Booking Request form functionality
const API_BASE_URL = window.ENDORSCO_API_BASE || "/api";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  if (form) {
    // Initialize dropdown functionality
    const formatSelect = form.querySelectorAll('select')[0];
    const budgetSelect = form.querySelectorAll('select')[1];
    const formatButton = form.querySelectorAll('button[role="combobox"]')[0];
    const budgetButton = form.querySelectorAll('button[role="combobox"]')[1];
    const formatSpan = formatButton.querySelector('span');
    const budgetSpan = budgetButton.querySelector('span');

    // Setup listeners for dropdowns
    let selectedFormat = null;
    let selectedBudget = null;

    // When the form is submitted, collect values directly
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Collect all input values directly
      const inputs = form.querySelectorAll('input');
      const data = {};

      inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'email' || input.type === 'tel' || input.type === 'date') {
          // Get the label text to map to a field name
          const label = input.parentElement.querySelector('label');
          if (label) {
            let labelText = label.textContent.trim();
            let fieldName = '';
            if (labelText.startsWith('First Name')) fieldName = 'firstName';
            else if (labelText.startsWith('Last Name')) fieldName = 'lastName';
            else if (labelText.startsWith('Email Address')) fieldName = 'email';
            else if (labelText.startsWith('Phone Number')) fieldName = 'phone';
            else if (labelText.startsWith('Company')) fieldName = 'organization';
            else if (labelText.startsWith('Event Date')) fieldName = 'eventDate';
            else if (labelText.startsWith('Event Location')) fieldName = 'eventLocation';
            else if (labelText.startsWith('All Preferred')) fieldName = 'preferredSpeakers';

            if (fieldName) {
              data[fieldName] = input.value.trim();
            }
          }
        }
      });

      // Get textarea
      const textarea = form.querySelector('textarea');
      if (textarea) {
        const label = textarea.parentElement.querySelector('label');
        if (label && label.textContent.includes('Event Description')) {
          data.eventDescription = textarea.value.trim();
        }
      }

      // Get dropdown values (from hidden selects)
      if (formatSelect) {
        data.eventType = formatSelect.value;
      }
      if (budgetSelect) {
        data.budget = budgetSelect.value;
      }

      // Combine first and last name for full name if needed
      if (data.firstName && data.lastName) {
        data.name = `${data.firstName} ${data.lastName}`;
      }

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

      console.log('Booking request form data:', data);

      // Submit to API - /api/booking-requests/booking-request endpoint
        try {
          const response = await fetch(`${API_BASE_URL}/booking-requests/booking-request`, {
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
});
