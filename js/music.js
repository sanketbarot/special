// ============================================
// MUSIC PLAYER JS
// Sanket ❤️ Urvashi
// ============================================

// ===== Song List =====
// ✅ Add your songs here
const songs = [
    {
        title: 'Tum Hi Ho',
        artist: 'Arijit Singh',
        src: 'music/tum-hi-ho.mp3',
        emoji: '🌹'
    },
    {
        title: 'Tera Ban Jaunga',
        artist: 'Akhil Sachdeva',
        src: 'music/tera-ban-jaunga.mp3',
        emoji: '💕'
    },
    {
        title: 'Pehla Nasha',
        artist: 'Udit Narayan',
        src: 'music/pehla-nasha.mp3',
        emoji: '❤️'
    },
    {
        title: 'Raabta',
        artist: 'Arijit Singh',
        src: 'music/raabta.mp3',
        emoji: '💖'
    },
    {
        title: 'Our Love Song',
        artist: 'Sanket & Urvashi',
        src: 'music/love-song.mp3',
        emoji: '🎵'
    }
];

// ===== Player State =====
let currentSongIndex = 0;
let isPlaying = false;
let audio = null;
let playerVisible = false;

// ===== Init Player =====
function initMusicPlayer() {
    audio = document.getElementById('bgMusic');
    if (!audio) return;

    const player    = document.getElementById('musicPlayer');
    const playBtn   = document.getElementById('playBtn');
    const prevBtn   = document.getElementById('prevBtn');
    const nextBtn   = document.getElementById('nextBtn');
    const progress  = document.getElementById('musicProgress');
    const progBar   = document.getElementById('progressBar');
    const curTime   = document.getElementById('currentTime');
    const totTime   = document.getElementById('totalTime');
    const volSlider = document.getElementById('volumeSlider');
    const musicIcon = document.getElementById('musicIcon');
    const titleEl   = document.getElementById('musicTitle');
    const artistEl  = document.getElementById('musicArtist');

    if (!player || !playBtn) return;

    // ✅ Load first song
    loadSong(currentSongIndex);

    // ✅ Show player after 2 seconds
    setTimeout(() => {
        player.classList.add('visible');
        playerVisible = true;
    }, 2000);

    // ===== Play / Pause =====
    playBtn.addEventListener('click', togglePlay);

    // ===== Previous Song =====
    prevBtn?.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) audio.play().catch(() => {});
    });

    // ===== Next Song =====
    nextBtn?.addEventListener('click', () => {
        nextSong();
    });

    // ===== Auto next song =====
    audio.addEventListener('ended', () => {
        nextSong();
    });

    // ===== Update Progress =====
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;

        const pct = (audio.currentTime / audio.duration) * 100;
        if (progBar) progBar.style.width = pct + '%';
        if (curTime) curTime.textContent = formatTime(audio.currentTime);
    });

    // ===== Load Duration =====
    audio.addEventListener('loadedmetadata', () => {
        if (totTime) totTime.textContent = formatTime(audio.duration);
    });

    // ===== Click Progress Bar to Seek =====
    progress?.addEventListener('click', (e) => {
        if (!audio.duration) return;
        const rect = progress.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = clickX / rect.width;
        audio.currentTime = pct * audio.duration;
    });

    // ===== Volume =====
    volSlider?.addEventListener('input', () => {
        audio.volume = volSlider.value / 100;
    });

    // ✅ Set initial volume
    audio.volume = 0.5;

    // ===== Pause when tab hidden =====
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            audio.pause();
            updatePlayBtn(false);
        }
    });

    // ===== Load Song Function =====
    function loadSong(index) {
        const song = songs[index];
        if (!song) return;

        // Update UI
        if (titleEl)  titleEl.textContent  = song.title;
        if (artistEl) artistEl.textContent = song.artist;
        if (musicIcon) musicIcon.textContent = song.emoji || '🎵';

        // Update audio source
        audio.src = song.src;
        audio.load();

        // Reset progress
        if (progBar) progBar.style.width = '0%';
        if (curTime) curTime.textContent = '0:00';
        if (totTime) totTime.textContent = '0:00';
    }

    // ===== Next Song =====
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play().catch(() => {});
        }
    }

    // ===== Toggle Play =====
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            updatePlayBtn(false);
        } else {
            audio.play()
                .then(() => {
                    updatePlayBtn(true);
                })
                .catch((err) => {
                    console.log('Autoplay blocked:', err);
                    updatePlayBtn(false);
                });
        }
    }

    // ===== Update Play Button =====
    function updatePlayBtn(playing) {
        isPlaying = playing;
        if (playBtn)   playBtn.textContent = playing ? '⏸️' : '▶️';
        if (musicIcon) {
            musicIcon.classList.toggle('playing', playing);
        }
    }

    // ===== Format Time =====
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    // ===== Keyboard Controls =====
    document.addEventListener('keydown', (e) => {
        // Space = play/pause (only if not typing)
        if (e.code === 'Space' &&
            e.target.tagName !== 'INPUT' &&
            e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            togglePlay();
        }
        // Arrow keys = prev/next
        if (e.code === 'ArrowLeft') {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
            if (isPlaying) audio.play().catch(() => {});
        }
        if (e.code === 'ArrowRight') {
            nextSong();
        }
    });
}

// ============================================
// ===== INITIALIZE =====
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
});