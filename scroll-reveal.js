// ===== SCROLL-REVEAL ENGINE =====
// Works on all pages. Animates elements on scroll down AND re-hides on scroll up.
(function () {
    const AUTO_TARGETS = [
        '.tentang-content .tentang-label',
        '.tentang-content .tentang-title',
        '.tentang-content .tentang-desc',
        '.tentang-logo',
        '.section-title h2',
        '.section-title p',
        '.card', // Catch all cards on any page
        '.gallery-slide',
        '.gallery-carousel',
        '.carousel-dots',
        '.footer-brand',
        '.footer-links',
        '.reveal-item',
        '.animate-fade-up', // Catch old classes
        '.member-card', // anggota.html
        '.member-img-wrap', // foto anggota
        '.club-image img', // foto di komunitas/acara
        // Community & event pages
        '.club-page .club-title',
        '.club-page .club-subtitle',
        '.club-hero-image',
        '.club-section',
        '.club-cta',
        '.club-nav',
        '.event-card',
        '.community-card',
        '.rundown-item', // acara
        '.event-info-item', // acara
        '.doc-item', // acara
        // General elements inside containers
        '.container h1',
        '.container h2',
        '.container h3',
        '.container p:not(.member-desc)',
        '.container .btn',
        '.club-content p',
        '.club-content h2',
        '.club-content h3',
        '.club-content li'
    ];

    const seen = new WeakSet();

    function prepareEl(el, i) {
        if (seen.has(el)) return;
        seen.add(el);
        el.style.opacity = '0';
        el.style.transform = 'translateY(-40px)';
        el.style.transition =
            'opacity 0.65s cubic-bezier(0.22,1,0.36,1) ' + (i * 0.08) + 's, ' +
            'transform 0.65s cubic-bezier(0.22,1,0.36,1) ' + (i * 0.08) + 's';
    }

    function showEl(el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }

    function hideEl(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-40px)';
    }

    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll(AUTO_TARGETS.join(',')).forEach(showEl);
        return;
    }

    // Keep observing (don't unobserve) so we can re-hide on scroll up
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                showEl(e.target);
            } else {
                hideEl(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    // Group by parent for stagger delays
    var containers = new Map();
    AUTO_TARGETS.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            var parent = el.parentElement;
            if (!containers.has(parent)) containers.set(parent, []);
            containers.get(parent).push(el);
        });
    });

    containers.forEach(function (els) {
        els.forEach(function (el, i) {
            prepareEl(el, i);
            observer.observe(el);
        });
    });
})();
