document.addEventListener('DOMContentLoaded', function () {
  // Update footer year automatically
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Hamburger Menu Toggle for Mobile Navigation with ARIA support
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      // Update aria-expanded attribute
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // GA4 Event Tracking Function (only for sticky top CTAs)
  function trackEvent(eventName) {
    if (typeof gtag === 'function') {
      gtag('event', eventName);
    } else {
      console.log('GA4 Event Triggered:', eventName);
    }
  }

  function addTracking(selector, eventName) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (el) {
      el.addEventListener('click', function () {
        trackEvent(eventName);
      });
    });
  }

  // Attach GA4 event tracking for sticky top CTAs only
  addTracking('.cta-phone-header', 'click_phone_header');
  addTracking('.cta-booknow-header', 'click_booknow_button_header');

  // Modal Functionality for Image Gallery
  const galleryImages = document.querySelectorAll('.image-gallery img');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal .close');

  galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
      const highResSrc = img.getAttribute('data-highres');
      if (highResSrc) {
        modalImg.src = highResSrc;
        modal.style.display = 'block';
        // Set focus to close button for accessibility
        closeBtn.focus();
      }
    });
  });

  function closeModal() {
    modal.style.display = 'none';
    modalImg.src = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closeModal();
    });
  }

  // Close modal when clicking outside the image
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});
