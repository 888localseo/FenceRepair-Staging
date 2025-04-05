document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.querySelector('nav ul');
    toggle.addEventListener('click', function () {
      nav.classList.toggle('show');
    });
  });
  