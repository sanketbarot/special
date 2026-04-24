// ============================================
// MEMORIES JS - FIXED & COMPLETE
// Sanket ❤️ Urvashi
// ============================================

// ===== Stars - Lightweight =====
function createStars() {
    const container = document.getElementById('starsBg');
    if (!container) return;

    const count = window.innerWidth < 768 ? 40 : 80;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        star.classList.add('star');
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${Math.random() * 3 + 2}s;
            animation-delay: ${Math.random() * 3}s;
        `;
        fragment.appendChild(star);
    }
    container.appendChild(fragment);
}

// ===== Hero Together =====
function updateHeroTogether() {
    const el = document.getElementById('heroTogether');
    if (!el) return;

    const now = new Date();

    let years  = now.getFullYear() - 2019;
    let months = now.getMonth() - 2;
    let days   = now.getDate() - 5;

    if (days < 0) {
        months--;
        const prevMonthDays = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        ).getDate();
        days += prevMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    el.textContent = `${years}Y ${months}M ${days}D`;
}

// ===== Love Stats =====
function startLoveStats() {
    const firstMeet = new Date('March 5, 2019 00:00:00').getTime();

    // ✅ Cache DOM elements outside update
    const el1 = document.getElementById('memTotalDays');
    const el2 = document.getElementById('memHeartbeats');
    const el3 = document.getElementById('memKisses');
    const el4 = document.getElementById('memNights');

    if (!el1 && !el2 && !el3 && !el4) return;

    function fmt(n) {
        if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B+';
        if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M+';
        if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K+';
        return n.toLocaleString();
    }

    function update() {
        const totalDays = Math.floor(
            (Date.now() - firstMeet) / 86400000
        );

        if (el1) el1.textContent = totalDays.toLocaleString();
        if (el2) el2.textContent = fmt(totalDays * 100000);
        if (el3) el3.textContent = (totalDays * 3).toLocaleString();
        if (el4) el4.textContent = totalDays.toLocaleString();

        updateHeroTogether();
    }

    update();
    setInterval(update, 60000);
}

// ===== Gallery Filter =====
function setupGalleryFilter() {
    const filterBtns   = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            let visibleIndex = 0;

            galleryItems.forEach(item => {
                const show = filter === 'all' ||
                    item.dataset.category === filter;

                if (show) {
                    item.style.display = '';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9) translateY(15px)';

                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, visibleIndex * 80);

                    visibleIndex++;
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Lightbox =====
function setupLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.95);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        flex-direction: column;
        gap: 15px;
    `;

    const img = document.createElement('img');
    img.id = 'lightboxImg';
    img.style.cssText = `
        max-width: 90%;
        max-height: 80vh;
        border-radius: 12px;
        border: 2px solid rgba(156,39,176,0.4);
        box-shadow: 0 20px 60px rgba(156,39,176,0.2);
        transition: opacity 0.3s ease;
    `;

    const caption = document.createElement('div');
    caption.id = 'lightboxCaption';
    caption.style.cssText = `
        text-align: center;
        color: #ce93d8;
        font-family: 'Dancing Script', cursive;
        font-size: 1.2rem;
        max-width: 600px;
        padding: 0 20px;
    `;

    const close = document.createElement('span');
    close.id = 'lightboxClose';
    close.textContent = '✕';
    close.style.cssText = `
        position: absolute;
        top: 20px; right: 25px;
        font-size: 1.5rem;
        color: #fff;
        cursor: pointer;
        width: 44px; height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(156,39,176,0.4);
        transition: background 0.3s ease;
        z-index: 1;
    `;

    close.addEventListener('mouseenter', () => {
        close.style.background = 'rgba(156,39,176,0.8)';
    });
    close.addEventListener('mouseleave', () => {
        close.style.background = 'rgba(156,39,176,0.4)';
    });

    const loader = document.createElement('div');
    loader.style.cssText = `
        color: #ce93d8;
        font-size: 2rem;
        display: none;
    `;
    loader.textContent = '⏳';

    lightbox.append(close, loader, img, caption);
    document.body.appendChild(lightbox);

    function openLightbox(item) {
        const imgEl = item.querySelector('img');
        const title = item.querySelector('h3')?.textContent || '';
        const desc  = item.querySelector('p')?.textContent || '';

        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        loader.style.display = 'block';
        img.style.opacity = '0';
        caption.textContent = '';

        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = tempImg.src;
            img.style.opacity = '1';
            loader.style.display = 'none';
            caption.innerHTML =
                `<strong>${title}</strong>${desc ?
                '<br><small>' + desc + '</small>' : ''}`;
        };
        tempImg.onerror = () => {
            loader.style.display = 'none';
            img.src = imgEl.src;
            img.style.opacity = '1';
        };
        tempImg.src = imgEl.src;
    }

    function closeLb() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        img.src = '';
        caption.textContent = '';
    }

    items.forEach(item => {
        item.addEventListener('click', () => openLightbox(item));
    });

    close.addEventListener('click', closeLb);

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLb();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' &&
            lightbox.style.display === 'flex') {
            closeLb();
        }
    });
}

// ===== Timeline =====
function setupTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    const line  = document.querySelector('.timeline-line');

    if (!items.length) return;

    // ✅ Set initial styles before observing
    items.forEach(item => {
        const isLeft = item.classList.contains('left');
        item.style.opacity = '0';
        item.style.transform = `translateX(${isLeft ? '-40px' : '40px'})`;
        item.style.transition = 'all 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(items).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(item => observer.observe(item));

    // Timeline line animation
    if (line) {
        line.style.height = '0%';

        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        line.style.transition = 'height 2s ease';
                        line.style.height = '100%';
                    }, 300);
                    lineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const timeline = document.querySelector('.timeline');
        if (timeline) lineObserver.observe(timeline);
    }
}

// ===== Gallery Items Animation =====
function setupGalleryAnimation() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9) translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(items).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1) translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => observer.observe(item));
}

// ===== Stat Cards Animation =====
function setupStatCardsAnimation() {
    const cards = document.querySelectorAll('.love-stat-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px) scale(0.95)';
        card.style.transition = 'all 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

// ===== Final Message Animation =====
function setupFinalMessageAnimation() {
    const msg = document.querySelector('.final-message');
    if (!msg) return;

    msg.style.opacity = '0';
    msg.style.transform = 'translateY(30px) scale(0.97)';
    msg.style.transition = 'all 0.7s ease';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(msg);
}

// ===== Hero Stats Animation =====
function setupHeroStatsAnimation() {
    const stats = document.querySelectorAll('.hero-stat');
    if (!stats.length) return;

    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 500 + (index * 150));
    });
}

// ============================================
// ===== INITIALIZE =====
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Background
    createStars();

    // Counters
    startLoveStats();

    // Gallery
    setupGalleryFilter();
    setupGalleryAnimation();
    setupLightbox();

    // Timeline
    setupTimeline();

    // Animations
    setupStatCardsAnimation();
    setupFinalMessageAnimation();
    setupHeroStatsAnimation();

    // ✅ REMOVED: setupScrollTop() - now in common.js
    // ✅ REMOVED: setupMusic() - now in music.js
});