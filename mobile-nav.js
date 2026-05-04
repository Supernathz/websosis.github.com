// Mobile Navigation Logic
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (!hamburger || !mobileNav || !mobileOverlay) return;

  function openMenu() {
    hamburger.classList.add('active');
    mobileNav.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    document.body._scrollY = window.scrollY;
    document.body.style.top = `-${window.scrollY}px`;
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    const scrollY = document.body._scrollY || 0;
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
  }

  hamburger.addEventListener('click', function () {
    if (mobileNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileOverlay.addEventListener('click', closeMenu);

  // Close on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991 && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });
});

// Toggle mobile dropdown (accordion)
function toggleMobileDropdown(event, id) {
  event.preventDefault();
  const dropdown = document.getElementById(id);
  const link = event.currentTarget;

  if (dropdown.classList.contains('open')) {
    dropdown.classList.remove('open');
    link.classList.remove('expanded');
  } else {
    // Close other dropdowns
    document.querySelectorAll('.mobile-dropdown.open').forEach(function (dd) {
      dd.classList.remove('open');
    });
    document.querySelectorAll('.mobile-nav-link.expanded').forEach(function (l) {
      l.classList.remove('expanded');
    });
    dropdown.classList.add('open');
    link.classList.add('expanded');
  }
}
