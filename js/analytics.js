// ============================================
// ANALYTICS JS
// Sanket ❤️ Urvashi Anniversary Website
// ============================================

// ✅ Your Real Measurement ID
const GA_ID = 'G-T43XEEP1G7';

// ===== Track Page Views =====
function trackPageView(pageName) {
    if (typeof gtag === 'undefined') return;
    gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href
    });
}

// ===== Track Music Events =====
function trackMusic(action, songName) {
    if (typeof gtag === 'undefined') return;
    gtag('event', 'music_' + action, {
        event_category: 'Music Player',
        event_label: songName || 'Unknown Song',
        value: 1
    });
}

// ===== Track Gallery Events =====
function trackGallery(action, photoName) {
    if (typeof gtag === 'undefined') return;
    gtag('event', 'gallery_' + action, {
        event_category: 'Photo Gallery',
        event_label: photoName || 'Photo',
        value: 1
    });
}

// ===== Track Button Clicks =====
function trackButton(buttonName, page) {
    if (typeof gtag === 'undefined') return;
    gtag('event', 'button_click', {
        event_category: 'Navigation',
        event_label: buttonName,
        page: page || window.location.pathname
    });
}

// ===== Track Time Spent =====
function trackTimeSpent() {
    const startTime = Date.now();

    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (typeof gtag === 'undefined') return;
        gtag('event', 'time_spent', {
            event_category: 'Engagement',
            event_label: document.title,
            value: timeSpent
        });
    });
}

// ===== Track Scroll Depth =====
function trackScrollDepth() {
    const depths = [25, 50, 75, 100];
    const tracked = new Set();

    window.addEventListener('scroll', () => {
        const docHeight = document.body.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const scrollPct = Math.round((window.scrollY / docHeight) * 100);

        depths.forEach(depth => {
            if (scrollPct >= depth && !tracked.has(depth)) {
                tracked.add(depth);
                if (typeof gtag === 'undefined') return;
                gtag('event', 'scroll_depth', {
                    event_category: 'Scroll',
                    event_label: depth + '%',
                    value: depth
                });
            }
        });
    }, { passive: true });
}

// ===== Track Countdown View =====
function trackCountdown() {
    const countdown = document.getElementById('countdownSection');
    if (!countdown) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'countdown_viewed', {
                        event_category: 'Engagement',
                        event_label: 'Anniversary Countdown'
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(countdown);
}

// ===== Track CTA Button Clicks =====
function trackCTAButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof gtag === 'undefined') return;
            gtag('event', 'cta_click', {
                event_category: 'CTA',
                event_label: btn.textContent.trim(),
                page: window.location.pathname
            });
        });
    });
}

// ===== Track Gallery Filter =====
function trackGalleryFilter() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof gtag === 'undefined') return;
            gtag('event', 'gallery_filter', {
                event_category: 'Gallery',
                event_label: btn.textContent.trim()
            });
        });
    });
}

// ===== Track Love Meter View =====
function trackLoveMeter() {
    const meter = document.getElementById('loveMeter');
    if (!meter) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'love_meter_viewed', {
                        event_category: 'Engagement',
                        event_label: 'Love Meter'
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(meter);
}

// ===== Track Nav Links =====
function trackNavLinks() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'undefined') return;
            gtag('event', 'nav_click', {
                event_category: 'Navigation',
                event_label: link.textContent.trim(),
                destination: link.getAttribute('href')
            });
        });
    });
}

// ===== Track Music Player =====
function trackMusicPlayer() {
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (typeof gtag === 'undefined') return;
            gtag('event', 'music_toggle', {
                event_category: 'Music',
                event_label: 'Play/Pause Button'
            });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (typeof gtag === 'undefined') return;
            gtag('event', 'music_prev', {
                event_category: 'Music',
                event_label: 'Previous Song'
            });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (typeof gtag === 'undefined') return;
            gtag('event', 'music_next', {
                event_category: 'Music',
                event_label: 'Next Song'
            });
        });
    }
}

// ===== Track Gallery Lightbox =====
function trackLightbox() {
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3')?.textContent || `Photo ${index + 1}`;
            if (typeof gtag === 'undefined') return;
            gtag('event', 'lightbox_open', {
                event_category: 'Gallery',
                event_label: title
            });
        });
    });
}

// ===== Track Together Section View =====
function trackTogetherSection() {
    const section = document.getElementById('togetherSection');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'together_section_viewed', {
                        event_category: 'Engagement',
                        event_label: 'Together Since Section'
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(section);
}

// ============================================
// ===== INITIALIZE ALL TRACKING =====
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Core tracking
    trackTimeSpent();
    trackScrollDepth();
    trackNavLinks();
    trackCTAButtons();
    trackMusicPlayer();

    // Page specific tracking
    trackCountdown();
    trackLoveMeter();
    trackGalleryFilter();
    trackLightbox();
    trackTogetherSection();

    console.log('📊 Analytics G-T43XEEP1G7 initialized!');
});