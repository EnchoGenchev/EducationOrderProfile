document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.getElementById('profile-link');
    const mainContent = document.getElementById('main-content');
  
    profileLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.innerHTML = '<p>Profile link clicked!</p>'; // Simple test
    });
  });