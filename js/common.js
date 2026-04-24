// ============================================
// COMMON JS - FIXED & OPTIMIZED
// Sanket ❤️ Urvashi
// ============================================

// ===== Hamburger Menu =====
function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    function openMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('active') &&
            !hamburger.contains(e.target) &&
            !navLinks.contains(e.target)
        ) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' &&
            navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // ✅ Touch swipe left to close menu
    let touchStartX = 0;

    navLinks.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    navLinks.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 70) {
            closeMenu();
        }
    }, { passive: true });

    // ✅ Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    }, { passive: true });
}

// ===== Navbar Scroll =====
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ✅ Check on load
    handleScroll();
}

// ===== Scroll Animations =====
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    // Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(elements).indexOf(entry.target);
                const delay = Math.min(index * 100, 500);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===== Click Hearts =====
function setupClickHearts() {
    // ✅ Desktop only
    if (window.innerWidth < 768) return;

    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    let lastClick = 0;

    document.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastClick < 300) return;
        lastClick = now;

        if (
            e.target.tagName === 'A'       ||
            e.target.tagName === 'BUTTON'  ||
            e.target.closest('.navbar')    ||
            e.target.closest('#lightbox')  ||
            e.target.closest('.music-player') ||
            e.target.closest('.hamburger')
        ) return;

        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            font-size: 18px;
            z-index: 9999;
            user-select: none;
            will-change: transform, opacity;
        `;
        document.body.appendChild(heart);

        const dy = -(Math.random() * 60 + 30);
        const dx = (Math.random() - 0.5) * 60;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                heart.style.transition = 'all 0.8s ease-out';
                heart.style.transform =
                    `translate(${dx}px, ${dy}px) scale(0) rotate(${Math.random() * 30 - 15}deg)`;
                heart.style.opacity = '0';
            });
        });

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 850);

    }, { passive: true });
}

// ===== Auto Active Nav =====
function setupActiveNav() {
    let page = window.location.pathname.split('/').pop();

    if (!page || page === '') {
        page = 'index.html';
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        if (
            href === page ||
            (page === 'index.html' && href === './') ||
            (page === '' && href === 'index.html')
        ) {
            link.classList.add('active');
        }
    });
}

// ===== Smooth Scroll for Anchor Links =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight =
                    document.getElementById('navbar')?.offsetHeight || 70;
                const top =
                    target.getBoundingClientRect().top +
                    window.scrollY - navHeight - 10;

                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ===== Scroll to Top - COMMON ===== ✅
function setupScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// ===== INITIALIZE =====
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setupHamburger();
    setupNavbarScroll();
    setupScrollAnimations();
    setupClickHearts();
    setupActiveNav();
    setupSmoothScroll();
    setupScrollTop(); // ✅ Works on ALL pages now
});