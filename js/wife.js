// ============================================
// WIFE JS - FIXED & COMPLETE
// Sanket ❤️ Urvashi
// ============================================

// ===== Sparkles - Lightweight =====
function createSparkles() {
    const container = document.getElementById('sparklesBg');
    if (!container || window.innerWidth < 768) return;

    const colors = ['#ff4081', '#ff80ab', '#e040fb'];
    const count = 30;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.classList.add('sparkle');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        s.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 8px ${color};
            animation-duration: ${Math.random() * 3 + 2}s;
            animation-delay: ${Math.random() * 3}s;
        `;
        fragment.appendChild(s);
    }
    container.appendChild(fragment);
}

// ===== Floating Roses - Fixed =====
function createFloatingRoses() {
    const container = document.getElementById('floatingRoses');
    if (!container || window.innerWidth < 768) return;

    const roses = ['🌹', '🌸', '🌷', '💕', '🌺'];
    let count = 0;
    const max = 5;
    let intervalId = null;

    function addRose() {
        if (count >= max) return;

        const rose = document.createElement('div');
        rose.classList.add('rose');
        rose.textContent = roses[Math.floor(Math.random() * roses.length)];
        rose.style.cssText = `
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 0.8 + 0.8}rem;
            animation-duration: ${Math.random() * 5 + 7}s;
        `;
        container.appendChild(rose);
        count++;

        setTimeout(() => {
            if (rose.parentNode) rose.remove();
            count--;
        }, 12000);
    }

    function startRoses() {
        if (intervalId) return;
        intervalId = setInterval(addRose, 2000);
    }

    function stopRoses() {
        clearInterval(intervalId);
        intervalId = null;
    }

    // ✅ Fix: Restart roses when tab becomes visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopRoses();
        } else {
            startRoses();
        }
    });

    startRoses();
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

// ===== Tags Animation =====
function setupTagsAnimation() {
    const tags = document.querySelectorAll('.tag');
    if (!tags.length) return;

    tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        tag.style.transition = 'all 0.4s ease';

        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, 1000 + (index * 100));
    });
}

// ===== Profile Float Animation =====
function setupProfileFloat() {
    const frame = document.querySelector('.pink-frame');
    if (!frame) return;

    let y = 0;
    let dir = 1;
    let floatId = null;

    function float() {
        y += 0.04 * dir;
        if (y >= 8)  dir = -1;
        if (y <= 0)  dir = 1;
        frame.style.transform = `translateY(${y}px)`;
        floatId = requestAnimationFrame(float);
    }

    // ✅ Pause when tab hidden
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

// ===== Queen Cards Animation =====
function setupQueenCardsAnimation() {
    const cards = document.querySelectorAll('.queen-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ✅ Fix: Get index from cards NodeList not entries
                const index = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px) scale(0.95)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// ===== Queen Cards Hover Effect =====
function setupQueenCardsHover() {
    const cards = document.querySelectorAll('.queen-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background =
                `radial-gradient(circle at ${x}px ${y}px,
                rgba(255,64,129,0.15),
                rgba(0,0,0,0.4))`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background =
                'linear-gradient(145deg, rgba(255,64,129,0.08), rgba(0,0,0,0.4))';
        });
    });
}

// ===== Why Love Items Animation =====
function setupWhyLoveAnimation() {
    const items = document.querySelectorAll('.why-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ✅ Fix: Correct index from NodeList
                const index = Array.from(items).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-25px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

// ===== Poem Animation - Fixed =====
function setupPoemAnimation() {
    const poemCard = document.querySelector('.poem-card');
    if (!poemCard) return;

    const lines = poemCard.querySelectorAll('.poem-line');
    if (!lines.length) return;

    // ✅ Fix: Set initial styles BEFORE observing (no flash)
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = 'all 0.4s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lines.forEach((line, i) => {
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateX(0)';
                    }, i * 200);
                });

                // Animate signature after lines
                const sig = poemCard.querySelector('.poem-signature');
                if (sig) {
                    sig.style.opacity = '0';
                    sig.style.transform = 'scale(0.8)';
                    sig.style.transition = 'all 0.5s ease';
                    setTimeout(() => {
                        sig.style.opacity = '1';
                        sig.style.transform = 'scale(1)';
                    }, lines.length * 200 + 300);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(poemCard);
}

// ===== Message Card Animation =====
function setupMessageAnimation() {
    const card = document.querySelector('.message-card');
    if (!card) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate envelope
                const envTop = card.querySelector('.envelope-top');
                if (envTop) {
                    envTop.style.opacity = '0';
                    envTop.style.transform = 'scaleY(0)';
                    envTop.style.transformOrigin = 'top';
                    envTop.style.transition = 'all 0.5s ease';
                    setTimeout(() => {
                        envTop.style.opacity = '1';
                        envTop.style.transform = 'scaleY(1)';
                    }, 100);
                }

                // Animate paper
                const paper = card.querySelector('.message-paper');
                if (paper) {
                    paper.style.opacity = '0';
                    paper.style.transform = 'translateY(20px)';
                    paper.style.transition = 'all 0.6s ease';
                    setTimeout(() => {
                        paper.style.opacity = '1';
                        paper.style.transform = 'translateY(0)';
                    }, 400);

                    // Animate paragraphs
                    const paras = paper.querySelectorAll('p');
                    paras.forEach((p, i) => {
                        p.style.opacity = '0';
                        p.style.transform = 'translateY(12px)';
                        p.style.transition = 'all 0.5s ease';
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }, 700 + (i * 250));
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(card);
}

// ===== Traits Animation =====
function setupTraitsAnimation() {
    const traits = document.querySelectorAll('.trait-item');
    if (!traits.length) return;

    // ✅ Fix: Set initial styles before observing
    traits.forEach(trait => {
        trait.style.opacity = '0';
        trait.style.transform = 'scale(0.85) translateY(15px)';
        trait.style.transition = 'all 0.4s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ✅ Fix: Get correct index from NodeList
                const index = Array.from(traits).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1) translateY(0)';
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    traits.forEach(trait => observer.observe(trait));
}

// ===== Cards Animation - Fixed =====
function setupCardsAnimation() {
    const items = document.querySelectorAll(
        '.queen-card, .why-item, .trait-item'
    );
    if (!items.length) return;

    // ✅ Fix: Set initial styles before observing
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.97)';
        item.style.transition = 'all 0.45s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ✅ Fix: Get correct index from items NodeList
                const index = Array.from(items).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    items.forEach(item => observer.observe(item));
}

// ===== Scroll to Top =====
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
    // Background effects
    createSparkles();
    createFloatingRoses();

    // Hero animations (delayed for visual effect)
    setupHeroStatsAnimation();
    setupTagsAnimation();
    setupProfileFloat();

    // Section animations
    setupQueenCardsAnimation();
    setupQueenCardsHover();
    setupWhyLoveAnimation();
    setupPoemAnimation();
    setupMessageAnimation();
    setupTraitsAnimation();

    // Note: setupCardsAnimation covers queen-card, why-item, trait-item
    // Run it OR the individual ones above - not both
    // setupCardsAnimation(); // ← commented out to avoid duplicate

    // UI
    setupScrollTop();
});