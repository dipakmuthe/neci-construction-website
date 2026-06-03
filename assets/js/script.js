/**
 * NECI Construction — Global site scripts
 */
(function () {
    'use strict';

    document.documentElement.classList.add('js');

    var IMAGE_FALLBACK = 'assets/images/hero/banner1.jpg';

    /* ----- Broken image fallback ----- */
    function bindImageFallbacks() {
        document.querySelectorAll('img[src]').forEach(function (img) {
            if (img.dataset.fallbackBound) return;
            img.dataset.fallbackBound = '1';
            img.addEventListener('error', function () {
                if (img.dataset.fallbackApplied === '1') return;
                if (img.src.indexOf(IMAGE_FALLBACK) !== -1) return;
                img.dataset.fallbackApplied = '1';
                img.src = IMAGE_FALLBACK;
            });
        });
    }

    bindImageFallbacks();

    /* ----- AOS ----- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            once: true,
            offset: 48,
            easing: 'ease-out-cubic',
            disable: function () {
                return window.innerWidth < 768;
            }
        });
    } else {
        document.querySelectorAll('[data-aos]').forEach(function (el) {
            el.classList.add('aos-animate');
        });
    }

    /* ----- Navbar scroll state ----- */
    var navbar = document.querySelector('.custom-navbar');
    var scrollThreshold = 40;

    function updateNavbarScroll() {
        if (!navbar) return;
        navbar.classList.toggle('navbar-scrolled', window.scrollY > scrollThreshold);
    }

    updateNavbarScroll();
    window.addEventListener('scroll', updateNavbarScroll, { passive: true });

    /* ----- Mega dropdown ----- */
    var megaDropdown = document.querySelector('.mega-dropdown');
    var megaMenu = megaDropdown ? megaDropdown.querySelector('.mega-menu') : null;
    var megaToggleBtn = megaDropdown ? megaDropdown.querySelector('.mega-mobile-toggle') : null;
    var navbarContainer = document.querySelector('.custom-navbar > .container');
    var customNavbar = document.querySelector('.custom-navbar');
    var desktopMq = window.matchMedia('(min-width: 992px)');

    function closeMegaMenu() {
        if (megaMenu) {
            megaMenu.classList.remove('show');
        }
        if (megaToggleBtn) megaToggleBtn.setAttribute('aria-expanded', 'false');
    }

    function openMegaMenu() {
        if (megaMenu) {
            megaMenu.classList.add('show');
        }
        if (megaToggleBtn) megaToggleBtn.setAttribute('aria-expanded', 'true');
    }

    var megaCloseTimer = null;
    var megaOpenDelay = 50; // Snappier response

    function scheduleCloseMega() {
        clearTimeout(megaCloseTimer);
        megaCloseTimer = window.setTimeout(closeMegaMenu, 220);
    }

    function cancelCloseMega() {
        clearTimeout(megaCloseTimer);
    }

    if (megaDropdown && megaMenu) {
        megaDropdown.addEventListener('mouseenter', function () {
            if (!desktopMq.matches) return;
            cancelCloseMega();
            window.setTimeout(function () {
                if (megaDropdown.matches(':hover')) openMegaMenu();
            }, megaOpenDelay);
        });

        megaDropdown.addEventListener('mouseleave', function () {
            if (desktopMq.matches) scheduleCloseMega();
        });

        megaMenu.addEventListener('mouseenter', cancelCloseMega);
        megaMenu.addEventListener('mouseleave', function () {
            if (desktopMq.matches) scheduleCloseMega();
        });

        if (megaToggleBtn) {
            megaToggleBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (megaMenu.classList.contains('show')) closeMegaMenu();
                else openMegaMenu();
            });
        }

        document.addEventListener('click', function (e) {
            if (!desktopMq.matches && megaMenu.classList.contains('show') && !megaDropdown.contains(e.target)) {
                closeMegaMenu();
            }
        });

        desktopMq.addEventListener('change', function () {
            closeMegaMenu();
        });
    }

    /* ----- Mobile nav: close after navigation ----- */
    var navCollapse = document.getElementById('navbarNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
        var collapseInstance = bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });

        document.querySelectorAll('.navbar-nav .nav-link, .mega-menu a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
                    collapseInstance.hide();
                }
                closeMegaMenu();
            });
        });
    }

    /* ----- Scroll reveal ----- */
    var REVEAL_SELECTORS = [
        '.why-choose-section .choose-card',
        '.service-card',
        '#gallery .gallery-grid > [class*="col-"]',
        '.photos-gallery .gallery-item',
        '.stat-box',
        '.why-card',
        '.mission-box',
        '.fact-box',
        '.gallery-card',
        '.catalog-product-card',
        '.gallery-filters',
        '.section-heading',
        '.premium-about-image',
        '.premium-about-content',
        '.info-text-content',
        '.info-video-wrapper',
        '.info-feature-item'
    ].join(', ');

    function shouldSkipReveal(el) {
        if (el.closest('[data-aos]') || el.hasAttribute('data-aos')) return true;
        if (el.closest('.hero, .about-hero, .gallery-hero, .contact-hero')) return true;
        return false;
    }

    function initReveal() {
        document.querySelectorAll(REVEAL_SELECTORS).forEach(function (el, i) {
            if (shouldSkipReveal(el) || el.classList.contains('reveal')) return;
            el.classList.add('reveal');
            el.style.transitionDelay = Math.min(i * 0.05, 0.3) + 's';
        });

        var revealEls = document.querySelectorAll('.reveal');

        function markVisible(el) {
            el.classList.add('is-visible');
        }

        if (!revealEls.length) return;

        if ('IntersectionObserver' in window) {
            var revealObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            markVisible(entry.target);
                            revealObserver.unobserve(entry.target);
                        }
                    });
                },
                { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.08 }
            );

            revealEls.forEach(function (el) {
                var rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                    markVisible(el);
                } else {
                    revealObserver.observe(el);
                }
            });
        } else {
            revealEls.forEach(markVisible);
        }

        /* Safety: never leave content hidden */
        window.setTimeout(function () {
            document.querySelectorAll('.reveal:not(.is-visible)').forEach(markVisible);
        }, 2200);
    }

    initReveal();

    /* ----- Dynamic images (services catalog renders) ----- */
    if (typeof MutationObserver !== 'undefined') {
        var imgBindTimer;
        var imgObserver = new MutationObserver(function () {
            clearTimeout(imgBindTimer);
            imgBindTimer = window.setTimeout(bindImageFallbacks, 120);
        });
        imgObserver.observe(document.body, { childList: true, subtree: true });
    }

    /* ----- Resize: refresh AOS ----- */
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (typeof AOS !== 'undefined') AOS.refresh();
        }, 200);
    });

    /* ----- Hero Parallax Effect ----- */
    window.addEventListener('scroll', function() {
        var hero = document.querySelector('.hero');
        var video = document.querySelector('.hero-video');
        if (hero) {
            var scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
            if (video) {
                video.style.transform = 'translate(-50%, calc(-50% + ' + (scrollPosition * 0.25) + 'px))';
            }
        }
    }, { passive: true });

    /* ----- Mobile Mega Menu Accordion ----- */
    function initMobileAccordion() {
        var isMobile = window.innerWidth < 992;
        
        if (!isMobile) return;

        var menuBlocks = document.querySelectorAll('.mega-menu-block');
        
        menuBlocks.forEach(function(block) {
            var title = block.querySelector('.mega-category-title, h5');
            
            if (!title) return;
            
            // Remove existing click handlers
            var newTitle = title.cloneNode(true);
            title.parentNode.replaceChild(newTitle, title);
            
            newTitle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var isActive = block.classList.contains('active');
                
                // Close all other blocks
                menuBlocks.forEach(function(otherBlock) {
                    if (otherBlock !== block) {
                        otherBlock.classList.remove('active');
                    }
                });
                
                // Toggle current block
                if (isActive) {
                    block.classList.remove('active');
                } else {
                    block.classList.add('active');
                }
            });
        });
    }

    // Initialize on load
    window.setTimeout(initMobileAccordion, 500);

    // Re-initialize on resize
    var accordionResizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(accordionResizeTimer);
        accordionResizeTimer = setTimeout(initMobileAccordion, 200);
    });

})();
