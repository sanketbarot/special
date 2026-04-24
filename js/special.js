// ============================================
// SPECIAL ANNIVERSARY PAGE JS
// Sanket ❤️ Urvashi - 23 December 2026
// ============================================

// ===== Check If Anniversary Day =====
function checkAnniversaryDay() {
    const now = new Date();
    const anniversaryDate = new Date('December 23, 2026');

    const isAnniversaryDay =
        now.getFullYear()  === anniversaryDate.getFullYear() &&
        now.getMonth()     === anniversaryDate.getMonth() &&
        now.getDate()      === anniversaryDate.getDate();

    const notToday    = document.getElementById('notToday');
    const specialPage = document.getElementById('specialPage');

    if (isAnniversaryDay) {
        // ✅ It's the anniversary day!
        if (notToday)    notToday.style.display    = 'none';
        if (specialPage) specialPage.style.display = 'block';

        // Start all animations
        startFireworks();
        startConfetti();
        createFloatingHearts();
        updateYearsCounter();
        animateSpecialPage();
    } else {
        // ❌ Not the day yet - show locked page
        if (notToday)    notToday.style.display    = 'flex';
        if (specialPage) specialPage.style.display = 'none';

        // Show countdown to anniversary
        startUnlockCountdown();
    }
}

// ===== Unlock Countdown =====
function startUnlockCountdown() {
    const target = new Date('December 23, 2026 00:00:00').getTime();
    const el = document.getElementById('unlockCountdown');
    if (!el) return;

    function update() {
        const diff = target - Date.now();
        if (diff <= 0) {
            el.textContent = '🎊 Today is the day! Refresh the page! 🎊';
            return;
        }

        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        el.textContent =
            `⏳ Unlocks in: ${d}d ${h}h ${m}m ${s}s`;
    }

    update();
    setInterval(update, 1000);
}

// ===== Fireworks =====
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    const colors = [
        '#ff4081', '#e040fb', '#ff80ab',
        '#ffeb3b', '#ff9800', '#4caf50',
        '#2196f3', '#9c27b0', '#ff1744'
    ];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.tx = Math.random() * canvas.width;
            this.ty = Math.random() * canvas.height * 0.5;
            this.speed = Math.random() * 3 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            const angle = Math.atan2(this.ty - this.y, this.tx - this.x);
            this.vx = Math.cos(angle) * this.speed;
            this.vy = Math.sin(angle) * this.speed;
            this.trail = [];
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 10) this.trail.shift();
            this.x += this.vx;
            this.y += this.vy;

            const dist = Math.hypot(this.tx - this.x, this.ty - this.y);
            if (dist < 5) {
                this.explode();
                return false;
            }
            return true;
        }

        explode() {
            const count = 60;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const speed = Math.random() * 4 + 1;
                particles.push({
                    x: this.x,
                    y: this.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    color: this.color,
                    size: Math.random() * 3 + 1
                });
            }
        }

        draw() {
            ctx.beginPath();
            this.trail.forEach((point, i) => {
                ctx.globalAlpha = i / this.trail.length * 0.5;
                if (i === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    let lastFirework = 0;

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Launch new firework every 800ms
        if (Date.now() - lastFirework > 800) {
            fireworks.push(new Firework());
            lastFirework = Date.now();
        }

        // Update fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            if (!fireworks[i].update()) {
                fireworks.splice(i, 1);
            }
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08; // gravity
            p.alpha -= 0.015;
            p.vx *= 0.99;
            p.vy *= 0.99;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }

        ctx.globalAlpha = 1;
    }

    animate();

    // Resize
    window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }, { passive: true });
}

// ===== Confetti =====
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors   = [
        '#ff4081', '#e040fb', '#ffeb3b',
        '#4caf50', '#2196f3', '#ff9800',
        '#ff80ab', '#ce93d8'
    ];

    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 1,
            angle: Math.random() * 360,
            spin: Math.random() * 10 - 5,
            opacity: Math.random() * 0.7 + 0.3
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach(c => {
            c.y += c.speed;
            c.angle += c.spin;
            c.x += Math.sin(c.angle * Math.PI / 180) * 1.5;

            if (c.y > canvas.height) {
                c.y = -20;
                c.x = Math.random() * canvas.width;
            }

            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.angle * Math.PI / 180);
            ctx.globalAlpha = c.opacity;
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            ctx.restore();
        });

        ctx.globalAlpha = 1;
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }, { passive: true });
}

// ===== Floating Hearts =====
function createFloatingHearts() {
    const container = document.getElementById('floatingHeartsSpecial');
    if (!container) return;

    const hearts = ['❤️', '💕', '💖', '💗', '💘', '🌹', '✨'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('float-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 1.5 + 1}rem;
            animation-duration: ${Math.random() * 5 + 6}s;
            animation-delay: 0s;
        `;
        container.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 11000);
    }, 600);
}

// ===== Years Counter =====
function updateYearsCounter() {
    const firstMeet = new Date('March 5, 2019');
    const now = new Date();
    const years = now.getFullYear() - firstMeet.getFullYear();
    const el = document.getElementById('yearsNumber');
    if (el) el.textContent = years;
}

// ===== Animate Special Page =====
function animateSpecialPage() {
    const elements = document.querySelectorAll(
        '.st-item, .wish-card, .special-message-box'
    );

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

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    checkAnniversaryDay();
});