(function () {
  var daysEl = document.getElementById("cd-days");
  var hoursEl = document.getElementById("cd-hours");
  var minsEl = document.getElementById("cd-mins");
  var secsEl = document.getElementById("cd-secs");
  var ageEl = document.getElementById("birthday-age");
  var countdownWrap = document.getElementById("birthday-countdown");

  if (!daysEl) return;

  var BIRTH_YEAR = 1976;
  var BIRTH_MONTH = 7;
  var BIRTH_DAY = 25;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function hadBirthdayThisYear(now) {
    return (
      now.getMonth() > BIRTH_MONTH ||
      (now.getMonth() === BIRTH_MONTH && now.getDate() >= BIRTH_DAY)
    );
  }

  function tick() {
    var now = new Date();
    var yearDiff = now.getFullYear() - BIRTH_YEAR;
    var currentAge = hadBirthdayThisYear(now) ? yearDiff : yearDiff - 1;
    var milestoneAge = currentAge + (hadBirthdayThisYear(now) ? 0 : 1);

    if (ageEl) ageEl.textContent = String(milestoneAge);

    var target = new Date(now.getFullYear(), BIRTH_MONTH, BIRTH_DAY, 0, 0, 0);
    if (now >= target) {
      target = new Date(now.getFullYear() + 1, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0);
    }

    var diff = target - now;
    if (diff <= 0) {
      if (countdownWrap) {
        countdownWrap.innerHTML =
          '<div class="rounded-xl border border-[#EBAC2B]/40 bg-[#EBAC2B]/10 px-6 py-4 text-[#EBAC2B] font-semibold text-lg">&#127874; Happy Birthday, Alexander!</div>';
      }
      return;
    }

    var days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    var hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    var mins = Math.floor(diff / 60000);
    diff -= mins * 60000;
    var secs = Math.floor(diff / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// Booking Modal Logic
(function() {
  const API_BASE_URL = window.ENDORSCO_API_BASE || "/api";

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
        if (budgetSelect && !budgetSelect.value && !budgetSelect.closest('.hidden')) {
          showError(budgetSelect, budgetError, 'Please select a budget range');
          isValid = false;
        } else {
          hideError(budgetSelect, budgetError);
        }
        
        // Validate Date
        const dateError = modal.querySelector('.error-text-date');
        if (dateInput && !dateInput.value && !dateInput.closest('.hidden')) {
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
          const eventLocationField = modalForm.querySelector('input[placeholder="City, State"]');
          const desiredSpeakerField = modalForm.querySelector('.talent-name-input');
          const eventDescriptionField = modalForm.querySelector('textarea');
          
          if (organizationField) data.organization = organizationField.value;
          if (eventLocationField) data.location = eventLocationField.value;
          if (desiredSpeakerField) data.talent = desiredSpeakerField.value;
          if (eventDescriptionField) data.reason = eventDescriptionField.value;
          
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
          
          // Submit to API - /api/whitelist endpoint for whitelist requests
          try {
            // Show loading state on the submit button
            const submitBtn = modalForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Submitting...';

            const response = await fetch(`${API_BASE_URL}/whitelist`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            if (response.ok) {
              // Show success message inside the modal instead of an alert
              const formContainer = modalForm.parentElement;
              const originalContent = formContainer.innerHTML;
              
              formContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full py-12 text-center px-4">
                  <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                  <p class="text-gray-600 mb-6">Thank you for joining the birthday whitelist for Alexander Skarsgård. We will be in touch soon.</p>
                  <button type="button" class="close-success-btn px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">Close</button>
                </div>
              `;

              // Handle closing from the success screen
              formContainer.querySelector('.close-success-btn').addEventListener('click', () => {
                closeModal();
                // Restore form after closing so it's ready for next time
                setTimeout(() => {
                  formContainer.innerHTML = originalContent;
                  // Re-attach event listener to the new form
                  initBookingModal(); 
                }, 300);
              });

            } else {
              let errorMsg = 'Something went wrong. Please try again later.';
              try {
                const errorData = await response.json();
                if (errorData.message) errorMsg = errorData.message;
              } catch(e) {}
              alert(errorMsg);
            }
          } catch (err) {
            console.error("Error submitting form:", err);
            alert('Network error. Please check your connection and try again.');
            
            // Restore button state on error
            const submitBtn = modalForm.querySelector('button[type="submit"]');
            if(submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit';
            }
          }
        }
      });
    }

    // Global click listener for "Book Now" buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-booking-modal-btn');
      if (!btn) return;

      e.preventDefault();
      openModal({ 
        name: 'Alexander Skarsgård', 
        image: '/_next/WhatsApp%20Image%202026-03-17%20at%202.58.38%20PM.jpeg', 
        fee: 'Available Upon Request' 
      });
    });

    // Handle Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
  }

  // Initialize modal when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookingModal);
  } else {
    initBookingModal();
  }
})();
