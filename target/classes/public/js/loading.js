function showLoadingScreen() {
  const loadingScreen = document.getElementById('talent-loading-screen');
  const mainContent = document.getElementById('talent-main-content');
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
  }
  if (mainContent) {
    mainContent.classList.add('hidden');
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('talent-loading-screen');
  const mainContent = document.getElementById('talent-main-content');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
  if (mainContent) {
    mainContent.classList.remove('hidden');
  }
}

// Show loading initially
document.addEventListener('DOMContentLoaded', function() {
  showLoadingScreen();
  // Only auto-hide if no data-no-auto-hide is NOT set
  if (!document.body.hasAttribute('data-no-auto-hide')) {
    setTimeout(hideLoadingScreen, 500);
  }
});
