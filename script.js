document.addEventListener('DOMContentLoaded', function () {
  // Update footer year automatically
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Hamburger Menu Toggle for Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // GA4 Event Tracking Function
  function trackEvent(eventName) {
    if (typeof gtag === 'function') {
      gtag('event', eventName);
    } else {
      console.log('GA4 Event Triggered:', eventName);
    }
  }

  // Helper to add tracking to multiple elements
  function addTracking(selector, eventName) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (el) {
      el.addEventListener('click', function () {
        trackEvent(eventName);
      });
    });
  }

  // Attach GA4 event tracking for CTAs
  addTracking('.cta-phone-header', 'click_phone_header');
  addTracking('.cta-booknow-header', 'click_booknow_button_header');
  addTracking('.cta-phone-body', 'click_phone_body');
  addTracking('.cta-booknow-body', 'click_booknow_button_body');
  addTracking('.cta-phone-footer', 'click_phone_footer');
  addTracking('.cta-booknow-footer', 'click_booknow_button_footer');

  // Modal Functionality for Image Gallery
  const galleryImages = document.querySelectorAll('.image-gallery img');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal .close');

  // Open modal when a gallery image is clicked
  galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
      const highResSrc = img.getAttribute('data-highres');
      if (highResSrc) {
        modalImg.src = highResSrc;
        modal.style.display = 'block';
      }
    });
  });

  // Close modal when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }

  // Close modal when clicking outside the modal image
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});
