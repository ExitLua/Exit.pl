function typeEffect() {
    const textElement = document.getElementById('typewriter');
    const fullText = "Lua Developer";
    let currentText = "L";
    let isDeleting = false;

    function step() {
        if (!textElement) return; // Zabezpieczenie przed błędem
        textElement.textContent = currentText;
        let speed = isDeleting ? 100 : 200;

        if (!isDeleting && currentText === fullText) {
            isDeleting = true;
            setTimeout(step, 3000); 
            return;
        }

        if (isDeleting && currentText === "L") {
            isDeleting = false;
            setTimeout(step, 2000);
            return;
        }

        if (!isDeleting) {
            currentText = fullText.substring(0, currentText.length + 1);
        } else {
            currentText = fullText.substring(0, currentText.length - 1);
        }

        setTimeout(step, speed);
    }
    step();
}

// Główna funkcja startowa po kliknięciu w overlay
function startPage() {
    const overlay = document.getElementById('overlay');
    const audio = document.getElementById('bg-audio');
    const playBtn = document.getElementById('play-pause');
    const avatar = document.querySelector('.avatar');

    // 1. Chowamy overlay
    if (overlay) {
        overlay.classList.add('overlay-hidden');
    }

    // 2. Odpalamy audio
    if (audio) {
        audio.play().catch(e => console.log("Autoplay blocked"));
        if (playBtn) playBtn.textContent = "PAUSE";
    }

    // 3. Odpalamy efekty wizualne
    if (avatar) avatar.style.opacity = '1';
    typeEffect();
}

window.addEventListener('load', () => {
    const audio = document.getElementById('bg-audio');
    const playBtn = document.getElementById('play-pause');
    const volumeSlider = document.getElementById('volume-slider');

    // OBSŁUGA PRZYCISKU PLAY/PAUSE
    if (playBtn && audio) {
        playBtn.addEventListener('click', (e) => {
            // e.stopPropagation() jest kluczowe, żeby kliknięcie w przycisk 
            // nie odpalało ponownie funkcji startPage (jeśli przycisk jest na overlayu)
            e.stopPropagation(); 

            if (audio.paused) {
                audio.play();
                playBtn.textContent = "PAUSE";
            } else {
                audio.pause();
                playBtn.textContent = "START";
            }
        });
    }

    // OBSŁUGA GŁOŚNOŚCI
    if (volumeSlider && audio) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });
    }
});

window.addEventListener('load', () => {
    const trackName = document.getElementById('track-name');
    if (trackName) {
        // Dublujemy tekst, aby pętla marquee była płynna
        trackName.innerHTML = trackName.innerHTML + " &nbsp;&nbsp;&nbsp;&nbsp; " + trackName.innerHTML;
    }
});