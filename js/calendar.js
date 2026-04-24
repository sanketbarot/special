// ============================================
// CALENDAR JS
// Sanket ❤️ Urvashi Special Dates
// ============================================

// ===== Special Dates Data =====
// ✅ Add/Edit your special dates here!
const specialDates = [
    {
        month: 3,   // March (1-12)
        day: 5,
        year: 2019, // specific year (or null for every year)
        title: 'We First Met! 💫',
        icon: '💫',
        color: '#ff4081',
        description: 'The most beautiful day when destiny brought Sanket and Urvashi together. This was the beginning of forever!',
        recurring: true // repeats every year
    },
    {
        month: 12,
        day: 23,
        year: 2026,
        title: 'Our Anniversary! 🎊',
        icon: '🎊',
        color: '#e040fb',
        description: 'Celebrating our beautiful journey of love! Every year on this day, we celebrate our forever!',
        recurring: true
    },
    {
        month: 2,
        day: 14,
        year: null,
        title: "Valentine's Day 💝",
        icon: '💝',
        color: '#ff4081',
        description: 'The day of love! Every Valentine\'s Day is extra special with you by my side.',
        recurring: true
    },
    {
        month: 1,
        day: 1,
        year: null,
        title: 'New Year Together 🎆',
        icon: '🎆',
        color: '#ffeb3b',
        description: 'Starting every new year with you is the best gift I could ask for!',
        recurring: true
    }
    // ✅ Add more dates like:
    // {
    //     month: 5, day: 10, year: null,
    //     title: 'Birthday 🎂', icon: '🎂',
    //     color: '#ff9800',
    //     description: 'Happy Birthday!',
    //     recurring: true
    // }
];

// ===== Calendar State =====
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear  = currentDate.getFullYear();

// ===== Months =====
const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

// ===== Create Stars =====
function createStarsCal() {
    const container = document.getElementById('starsCal');
    if (!container) return;

    const count = window.innerWidth < 768 ? 30 : 60;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        star.classList.add('star-cal');
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

// ===== Check if Date is Special =====
function getSpecialDate(month, day, year) {
    return specialDates.find(sd => {
        const monthMatch = sd.month === month + 1;
        const dayMatch   = sd.day === day;
        const yearMatch  = sd.year === null ||
                           sd.year === year ||
                           sd.recurring;
        return monthMatch && dayMatch && yearMatch;
    });
}

// ===== Render Calendar =====
function renderCalendar() {
    const grid      = document.getElementById('calGrid');
    const monthEl   = document.getElementById('monthName');
    const yearEl    = document.getElementById('yearName');
    if (!grid) return;

    if (monthEl) monthEl.textContent = monthNames[currentMonth];
    if (yearEl)  yearEl.textContent  = currentYear;

    grid.innerHTML = '';

    const firstDay  = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today     = new Date();

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.classList.add('cal-day', 'empty');
        grid.appendChild(empty);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('cal-day');

        const isToday = (
            d === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear  === today.getFullYear()
        );

        const special = getSpecialDate(currentMonth, d, currentYear);

        if (special) {
            dayEl.classList.add('special');
            dayEl.innerHTML = `
                <span class="day-num">${d}</span>
                <span class="day-icon">${special.icon}</span>
            `;
            dayEl.addEventListener('click', () => {
                showEventPopup(special, d, currentMonth, currentYear);
            });
        } else if (isToday) {
            dayEl.classList.add('today');
            dayEl.innerHTML = `<span class="day-num">${d}</span>`;
        } else {
            dayEl.classList.add('normal');
            dayEl.innerHTML = `<span class="day-num">${d}</span>`;
        }

        grid.appendChild(dayEl);
    }
}

// ===== Show Event Popup =====
function showEventPopup(special, day, month, year) {
    const popup     = document.getElementById('eventPopup');
    const iconEl    = document.getElementById('popupIcon');
    const titleEl   = document.getElementById('popupTitle');
    const dateEl    = document.getElementById('popupDate');
    const descEl    = document.getElementById('popupDesc');
    const daysEl    = document.getElementById('popupDays');

    if (!popup) return;

    const eventDate = new Date(year, month, day);
    const today     = new Date();
    const diff      = eventDate - today;
    const daysDiff  = Math.ceil(diff / 86400000);

    if (iconEl)  iconEl.textContent  = special.icon;
    if (titleEl) titleEl.textContent = special.title;
    if (dateEl)  dateEl.textContent  =
        `${day} ${monthNames[month]} ${year}`;
    if (descEl)  descEl.textContent  = special.description;

    if (daysEl) {
        if (daysDiff === 0) {
            daysEl.textContent = '🎉 Today is the day!';
        } else if (daysDiff > 0) {
            daysEl.textContent = `⏰ In ${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
        } else {
            const pastDays = Math.abs(daysDiff);
            daysEl.textContent = `💕 ${pastDays} day${pastDays > 1 ? 's' : ''} ago`;
        }
    }

    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== Close Popup =====
function setupPopupClose() {
    const popup   = document.getElementById('eventPopup');
    const closeBtn = document.getElementById('popupClose');
    if (!popup) return;

    function close() {
        popup.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', close);

    popup.addEventListener('click', (e) => {
        if (e.target === popup) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}

// ===== Dates List =====
function renderDatesList() {
    const list = document.getElementById('datesList');
    if (!list) return;

    const today = new Date();

    // Sort by next occurrence
    const sortedDates = specialDates.map(sd => {
        const thisYear = new Date(today.getFullYear(), sd.month - 1, sd.day);
        const nextYear = new Date(today.getFullYear() + 1, sd.month - 1, sd.day);
        const nextDate = thisYear >= today ? thisYear : nextYear;
        const daysDiff = Math.ceil((nextDate - today) / 86400000);
        return { ...sd, nextDate, daysDiff };
    }).sort((a, b) => a.daysDiff - b.daysDiff);

    sortedDates.forEach((sd, index) => {
        const item = document.createElement('div');
        item.classList.add('date-item');
        item.style.transition = `all 0.5s ease ${index * 100}ms`;

        const dateStr = `${sd.day} ${monthNames[sd.month - 1]}${sd.year ? ' ' + sd.year : ''}`;

        let daysText = '';
        if (sd.daysDiff === 0) {
            daysText = '🎉 Today!';
        } else if (sd.daysDiff === 1) {
            daysText = '⏰ Tomorrow!';
        } else {
            daysText = `In ${sd.daysDiff} days`;
        }

        item.innerHTML = `
            <div class="date-item-icon">${sd.icon}</div>
            <div class="date-item-info">
                <div class="date-item-title">${sd.title}</div>
                <div class="date-item-date">📅 ${dateStr}</div>
            </div>
            <div class="date-item-days">${daysText}</div>
        `;

        list.appendChild(item);

        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(item);
    });
}

// ===== Upcoming Date =====
function renderUpcoming() {
    const today = new Date();

    // Find next special date
    let nextDate = null;
    let minDays  = Infinity;

    specialDates.forEach(sd => {
        const thisYear = new Date(today.getFullYear(), sd.month - 1, sd.day);
        const nextYear = new Date(today.getFullYear() + 1, sd.month - 1, sd.day);
        const upcoming = thisYear >= today ? thisYear : nextYear;
        const days     = Math.ceil((upcoming - today) / 86400000);

        if (days < minDays) {
            minDays  = days;
            nextDate = { ...sd, upcoming, days };
        }
    });

    if (!nextDate) return;

    const iconEl      = document.getElementById('upcomingIcon');
    const titleEl     = document.getElementById('upcomingTitle');
    const dateEl      = document.getElementById('upcomingDate');
    const countdownEl = document.getElementById('upcomingCountdown');
    const descEl      = document.getElementById('upcomingDesc');

    if (iconEl)  iconEl.textContent  = nextDate.icon;
    if (titleEl) titleEl.textContent = nextDate.title;
    if (dateEl)  dateEl.textContent  =
        `${nextDate.day} ${monthNames[nextDate.month - 1]}`;
    if (descEl)  descEl.textContent  = nextDate.description;

    // Countdown
    function updateCountdown() {
        const diff = nextDate.upcoming - Date.now();
        if (!countdownEl) return;

        if (diff <= 0) {
            countdownEl.textContent = '🎉 Today is the day!';
            return;
        }

        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        countdownEl.textContent =
            `⏰ ${d}d ${h}h ${m}m ${s}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Navigation =====
function setupNavigation() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    prevBtn?.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextBtn?.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

// ============================================
// ===== INITIALIZE =====
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createStarsCal();
    renderCalendar();
    renderDatesList();
    renderUpcoming();
    setupNavigation();
    setupPopupClose();
});