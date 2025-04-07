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

  // GA4 Event Tracking Function (for sticky top CTAs)
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
      }
    });
  });
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Tabs Functionality for Tabbed Interfaces
  const tabContainers = document.querySelectorAll('.tabs');
  tabContainers.forEach(function (container) {
    const tabLinks = container.querySelectorAll('.tab-links li');
    const tabContents = container.querySelectorAll('.tab-content .tab');
    tabLinks.forEach(function (linkItem) {
      linkItem.addEventListener('click', function (e) {
        e.preventDefault();
        // Remove active class from all links and tabs
        tabLinks.forEach(li => li.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));
        // Add active class to the clicked link
        linkItem.classList.add('active');
        // Get the target tab id from the anchor href
        const target = linkItem.querySelector('a').getAttribute('href');
        const targetTab = container.querySelector(target);
        if (targetTab) {
          targetTab.classList.add('active');
        }
      });
    });
  });

  // Accordion Functionality for Expandable Sections
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      header.classList.toggle('active');
      const content = header.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });

  // Slider Functionality for Testimonial Slider
  const slider = document.querySelector('.slider');
  if (slider) {
    const slides = slider.querySelectorAll('.slide');
    let currentSlide = 0;
    function showSlide(index) {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === index);
      });
    }
    showSlide(currentSlide);
    setInterval(function () {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // Counter Animations for Circle and Bar Counters
  const counters = document.querySelectorAll('.circle-counter, .bar-counter');
  function animateCounter(el) {
    const percentage = el.getAttribute('data-percentage');
    if (percentage) {
      if (el.classList.contains('circle-counter')) {
        let current = 0;
        const step = Math.ceil(percentage / 100);
        const interval = setInterval(function () {
          current += step;
          if (current >= percentage) {
            current = percentage;
            clearInterval(interval);
          }
          el.textContent = current + '%';
        }, 20);
      } else if (el.classList.contains('bar-counter')) {
        const barFill = el.querySelector('.bar-fill');
        if (barFill) {
          barFill.style.width = percentage + '%';
        }
      }
    }
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  } else {
    counters.forEach(function (counter) {
      animateCounter(counter);
    });
  }
});
