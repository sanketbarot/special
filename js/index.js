// ============================================
// INDEX JS - OPTIMIZED & FIXED
// Sanket ❤️ Urvashi
// ============================================

// ===== Heart Canvas =====
function initHeartCanvas() {
    const canvas = document.getElementById('heartCanvas');
    if (!canvas) return;

    // Skip on mobile or low-end devices
    if (window.innerWidth < 768 || navigator.hardwareConcurrency < 4) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const heartCount = 12;
    const hearts = [];

    const colors = [
        'rgba(255,64,129,',
        'rgba(224,64,251,',
        'rgba(255,128,171,'
    ];

    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 20,
            size: Math.random() * 10 + 6,
            speedY: Math.random() * 1 + 0.4,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.4 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    }

    for (let i = 0; i < heartCount; i++) {
        const h = createHeart();
        h.y = Math.random() * canvas.height;
        hearts.push(h);
    }

    function drawHeart(ctx, x, y, s) {
        ctx.beginPath();
        ctx.moveTo(x, y + s / 4);
        ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s / 4);
        ctx.bezierCurveTo(x - s / 2, y + s / 2, x, y + s * 0.7, x, y + s);
        ctx.bezierCurveTo(x, y + s * 0.7, x + s / 2, y + s / 2, x + s / 2, y + s / 4);
        ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + s / 4);
        ctx.closePath();
    }

    let animId = null;
    let lastTime = 0;
    const FPS_INTERVAL = 1000 / 30; // 30fps

    function animate(time) {
        animId = requestAnimationFrame(animate);

        if (time - lastTime < FPS_INTERVAL) return;
        lastTime = time;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach(h => {
            h.y -= h.speedY;
            h.x += h.speedX;
            h.opacity -= 0.0008;

            if (h.y < -20 || h.opacity <= 0) {
                Object.assign(h, createHeart());
            }

            ctx.fillStyle = h.color + h.opacity + ')';
            drawHeart(ctx, h.x, h.y, h.size);
            ctx.fill();
        });
    }

    // ✅ Fix: Proper pause/resume on visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animId) {
                cancelAnimationFrame(animId);
                animId = null;
            }
        } else {
            if (!animId) {
                lastTime = 0;
                animId = requestAnimationFrame(animate);
            }
        }
    });

    // ✅ Debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, 300);
    }, { passive: true });

    // Start animation
    animId = requestAnimationFrame(animate);
}

// ===== Rose Petals =====
function createRosePetals() {
    const container = document.getElementById('rosePetals');
    if (!container || window.innerWidth < 768) return;

    const colors = ['#ff4081', '#ff1744', '#e91e63'];
    let petalCount = 0;
    const maxPetals = 8;
    let intervalId = null;

    function startPetals() {
        if (intervalId) return;
        intervalId = setInterval(() => {
            if (petalCount >= maxPetals) return;

            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.cssText = `
                left: ${Math.random() * 100}%;
                width: ${Math.random() * 8 + 6}px;
                height: ${Math.random() * 8 + 6}px;
                animation-duration: ${Math.random() * 5 + 7}s;
                opacity: ${Math.random() * 0.4 + 0.2};
                background: radial-gradient(circle,
                    ${colors[Math.floor(Math.random() * colors.length)]},
                    transparent);
            `;
            container.appendChild(petal);
            petalCount++;

            setTimeout(() => {
                if (petal.parentNode) petal.remove();
                petalCount--;
            }, 12000);
        }, 1500);
    }

    // ✅ Fix: Restart interval when tab becomes visible again
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(intervalId);
            intervalId = null;
        } else {
            startPetals();
        }
    });

    startPetals();
}

// ===== Loading Screen =====
function setupLoading() {
    const loading = document.getElementById('loadingScreen');
    if (!loading) return;

    let hidden = false;

    // ✅ Fix: Flag prevents double call
    const hideLoading = () => {
        if (hidden) return;
        hidden = true;

        loading.style.transition = 'opacity 0.5s ease';
        loading.style.opacity = '0';

        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    };

    // Hide after 2s max
    const timer = setTimeout(hideLoading, 2000);

    window.addEventListener('load', () => {
        clearTimeout(timer);
        hideLoading();
    }, { once: true });
}

// ===== Countdown Timer =====
function startCountdown() {
    const target = new Date('December 23, 2026 00:00:00').getTime();

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');
    const status = document.getElementById('countdownStatus');

    if (!dEl) return;

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    // ✅ Fix: Store interval ID to clear when done
    let countdownInterval;

    function update() {
        const diff = target - Date.now();

        // Anniversary reached!
        if (diff <= 0) {
            dEl.textContent = '🎉';
            hEl.textContent = '🥳';
            mEl.textContent = '❤️';
            sEl.textContent = '💕';
            if (status) {
                status.textContent = '🎊 Happy Anniversary Sanket & Urvashi! 🎊';
                status.style.color = '#ff4081';
                status.style.fontSize = '1.3rem';
            }
            // ✅ Fix: Clear interval when done
            clearInterval(countdownInterval);
            launchCelebration();
            return;
        }

        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        dEl.textContent = pad(d);
        hEl.textContent = pad(h);
        mEl.textContent = pad(m);
        sEl.textContent = pad(s);

        if (status) {
            if (d === 0) {
                status.textContent = '🎉 Today is the day! Just hours away! ❤️';
            } else if (d === 1) {
                status.textContent = '💕 Only 1 day left! Tomorrow is our day!';
            } else if (d <= 7) {
                status.textContent = `💕 Only ${d} days left! So exciting! 🎊`;
            } else if (d <= 30) {
                status.textContent = `❤️ ${d} days to go! Can't wait!`;
            } else if (d <= 365) {
                status.textContent = `💖 ${d} days until our special anniversary!`;
            } else {
                const y = Math.floor(d / 365);
                const rem = d % 365;
                const mo = Math.floor(rem / 30);
                const remD = rem % 30;
                status.textContent =
                    `💝 ${y} year${y > 1 ? 's' : ''}, ${mo} month${mo > 1 ? 's' : ''} & ${remD} days to go!`;
            }
        }
    }

    update();
    countdownInterval = setInterval(update, 1000);
}

// ===== Celebration Effect =====
function launchCelebration() {
    const emojis = ['🎉', '🎊', '❤️', '💕', '💖', '🌹', '✨', '👑'];
    let count = 0;
    const max = 30;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    const interval = setInterval(() => {
        if (count >= max) {
            clearInterval(interval);
            return;
        }

        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.cssText = `
            position: fixed;
            top: -30px;
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        document.body.appendChild(emoji);
        count++;

        setTimeout(() => {
            if (emoji.parentNode) emoji.remove();
        }, 5000);
    }, 200);
}

// ===== Together Counter =====
function startTogetherCounter() {
    const firstMeet = new Date('March 5, 2019 00:00:00').getTime();

    const yEl  = document.getElementById('togetherYears');
    const mEl  = document.getElementById('togetherMonths');
    const dEl  = document.getElementById('togetherDays');
    const hEl  = document.getElementById('togetherHours');
    const tdEl = document.getElementById('totalDays');
    const hbEl = document.getElementById('totalHeartbeats');
    const kEl  = document.getElementById('totalKisses');
    const msEl = document.getElementById('meetSince');

    // ✅ Fix: Use || so function runs if ANY element exists
    if (!yEl && !mEl && !dEl && !tdEl && !msEl) return;

    function fmt(n) {
        if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B+';
        if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M+';
        if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K+';
        return n.toLocaleString();
    }

    function update() {
        const now = new Date();
        const diff = now.getTime() - firstMeet;

        // ✅ Fix: Accurate year/month/day calculation
        let years  = now.getFullYear() - 2019;
        let months = now.getMonth() - 2; // March = index 2
        let days   = now.getDate() - 5;

        if (days < 0) {
            months--;
            // Days in previous month
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

        // ✅ Fix: Hours together (total hours since met, not current hour)
        const totalHours = Math.floor(diff / 3600000);

        if (yEl)  yEl.textContent  = years;
        if (mEl)  mEl.textContent  = months;
        if (dEl)  dEl.textContent  = days;
        if (hEl)  hEl.textContent  = totalHours.toLocaleString(); // ✅ Fixed

        const totalDays = Math.floor(diff / 86400000);

        if (tdEl) tdEl.textContent = totalDays.toLocaleString();
        if (hbEl) hbEl.textContent = fmt(totalDays * 100000);
        if (kEl)  kEl.textContent  = (totalDays * 3).toLocaleString();
        if (msEl) msEl.textContent =
            `💕 ${years} years, ${months} months & ${days} days of love 💕`;
    }

    update();
    // Update every minute - saves CPU
    setInterval(update, 60000);
}

// ===== Love Meter =====
function animateLoveMeter() {
    const meter = document.getElementById('loveMeter');
    if (!meter) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Small delay for visual effect
                setTimeout(() => {
                    meter.style.transition = 'width 2.5s ease';
                    meter.style.width = '100%';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(meter);
}

// ===== Story Cards Animation =====
function animateStoryCards() {
    const cards = document.querySelectorAll('.story-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ===== Promise Items Animation =====
function animatePromises() {
    const items = document.querySelectorAll('.promise-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, i * 120);
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

// ===== Together Cards Animation =====
function animateTogetherCards() {
    const cards = document.querySelectorAll('.together-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, i * 120);
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

// ===== Stat Items Animation =====
function animateStatItems() {
    const items = document.querySelectorAll('.stat-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(25px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

// ===== Music Toggle =====
function setupMusic() {
    const toggle = document.getElementById('musicToggle');
    if (!toggle) return;

    let isPlaying = false;
    const icon = toggle.querySelector('span');

    toggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        toggle.classList.toggle('playing', isPlaying);
        if (icon) icon.textContent = isPlaying ? '🎶' : '🎵';
    });
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

// ===== Parallax - Lightweight =====
function setupParallax() {
    const rings = document.querySelectorAll('.ring');
    if (!rings.length || window.innerWidth < 768) return;

    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;

            rings.forEach((ring, i) => {
                const s = (i + 1) * 0.25;
                ring.style.transform =
                    `translate(calc(-50% + ${x * s}px), calc(-50% + ${y * s}px))`;
            });
            ticking = false;
        });
    }, { passive: true });
}

// ============================================
// ===== INITIALIZE =====
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Instant tasks
    setupLoading();
    startCountdown();
    startTogetherCounter();
    animateLoveMeter();
    setupScrollTop();
    setupMusic();

    // Animations
    animateStoryCards();
    animatePromises();
    animateTogetherCards();
    animateStatItems();

    // ✅ Defer heavy visual tasks by 500ms
    setTimeout(() => {
        initHeartCanvas();
        createRosePetals();
        setupParallax();
    }, 500);
});