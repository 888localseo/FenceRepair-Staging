document.addEventListener('DOMContentLoaded', function () {
  // Update footer year automatically
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Hamburger Menu Toggle with ARIA support
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
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
  function addTracking(selector, eventName) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (el) {
      el.addEventListener('click', function () {
        trackEvent(eventName);
      });
    });
  }
  addTracking('.cta-phone-header', 'click_phone_header');
  addTracking('.cta-booknow-header', 'click_booknow_button_header');

  // Modal Functionality for Gallery Images
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
        closeBtn.focus();
      }
    });
  });

  function closeModal() {
    modal.style.display = 'none';
    modalImg.src = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});
