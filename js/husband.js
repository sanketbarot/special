// ============================================
// HUSBAND JS - FIXED & COMPLETE
// Sanket ❤️ Urvashi
// ============================================

// ===== Particles - Lightweight =====
function createParticles() {
    const container = document.getElementById('particlesBg');
    if (!container || window.innerWidth < 768) return;

    const colors = ['#4a90d9', '#64b5f6', '#90caf9'];
    const count = 25;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 8px ${color};
            animation-duration: ${Math.random() * 8 + 6}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        fragment.appendChild(p);
    }
    container.appendChild(fragment);
}

// ===== Profile Float Animation =====
function setupProfileFloat() {
    const frame = document.querySelector('.profile-frame');
    if (!frame) return;

    let y = 0;
    let dir = 1;
    let floatId = null;

    function float() {
        y += 0.04 * dir;
        if (y >= 8) dir = -1;
        if (y <= 0) dir = 1;
        frame.style.transform = `translateY(${y}px)`;
        floatId = requestAnimationFrame(float);
    }

    // ✅ Pause when tab hidden - saves CPU
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(floatId);
            floatId = null;
        } else {
            if (!floatId) floatId = requestAnimationFrame(float);
        }
    });

    floatId = requestAnimationFrame(float);
}

// ===== Hero Stats Animation =====
function setupHeroStatsAnimation() {
    const stats = document.querySelectorAll('.quick-stat');
    if (!stats.length) return;

    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });
}

// ===== Letter Reveal =====
function setupLetterReveal() {
    const letterBody   = document.querySelector('.letter-body');
    const letterHeader = document.querySelector('.letter-header');
    const letterFooter = document.querySelector('.letter-footer');

    if (!letterBody) return;

    const paras = letterBody.querySelectorAll('p');

    // ✅ Set initial styles BEFORE observing (prevents flash)
    paras.forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(15px)';
        p.style.transition = 'all 0.5s ease';
    });

    if (letterHeader) {
        letterHeader.style.opacity = '0';
        letterHeader.style.transform = 'translateY(-15px)';
        letterHeader.style.transition = 'all 0.5s ease';
    }

    if (letterFooter) {
        letterFooter.style.opacity = '0';
        letterFooter.style.transform = 'translateY(15px)';
        letterFooter.style.transition = 'all 0.5s ease';
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // Animate header first
                if (letterHeader) {
                    setTimeout(() => {
                        letterHeader.style.opacity = '1';
                        letterHeader.style.transform = 'translateY(0)';
                    }, 100);
                }

                // Animate paragraphs with stagger
                paras.forEach((p, i) => {
                    setTimeout(() => {
                        p.style.opacity = '1';
                        p.style.transform = 'translateY(0)';
                    }, 300 + (i * 300));
                });

                // Animate footer after all paragraphs
                if (letterFooter) {
                    setTimeout(() => {
                        letterFooter.style.opacity = '1';
                        letterFooter.style.transform = 'translateY(0)';
                    }, 300 + (paras.length * 300) + 200);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(letterBody);
}

// ===== About Cards Animation =====
function setupAboutCardsAnimation() {
    const cards = document.querySelectorAll('.about-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px)';
        card.style.transition = 'all 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

// ===== Journey Cards Animation =====
function setupJourneyAnimation() {
    const cards = document.querySelectorAll('.journey-card');
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
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

// ===== Love Items Animation =====
function setupLoveItemsAnimation() {
    const items = document.querySelectorAll('.love-item');
    if (!items.length) return;

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-25px)';
        item.style.transition = 'all 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(items).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => observer.observe(item));
}

// ===== Promise Cards Animation =====
function setupPromiseAnimation() {
    const cards = document.querySelectorAll('.promise-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-25px)';
        card.style.transition = 'all 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

// ===== Letter Container Animation =====
function setupLetterContainer() {
    const container = document.querySelector('.letter-container');
    if (!container) return;

    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    container.style.transition = 'all 0.7s ease';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(container);
}

// ===== Love Item Hover Effects =====
function setupLoveItemHover() {
    const items = document.querySelectorAll('.love-item');

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = 'rgba(74, 144, 217, 0.5)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.borderColor = 'rgba(74, 144, 217, 0.1)';
        });
    });
}

// ============================================
// ===== INITIALIZE =====
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Background
    createParticles();

    // Hero
    setupProfileFloat();
    setupHeroStatsAnimation();

    // Sections
    setupAboutCardsAnimation();
    setupJourneyAnimation();
    setupLetterContainer();
    setupLetterReveal();
    setupLoveItemsAnimation();
    setupLoveItemHover();
    setupPromiseAnimation();

    // ✅ REMOVED: setupScrollTop() - now in common.js
    // ✅ REMOVED: setupMusic() - now in music.js
});