// Password Screen Logic
const pinInputs = document.querySelectorAll('.pin-input');
const unlockBtn = document.getElementById('unlockBtn');
const passwordScreen = document.getElementById('passwordScreen');
const mainContent = document.getElementById('mainContent');
const correctPin = '0208'; // MMDD format

// Auto-advance PIN inputs
pinInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            pinInputs[index - 1].focus();
        }
    });
});

// Unlock button
unlockBtn.addEventListener('click', () => {
    const enteredPin = Array.from(pinInputs).map(input => input.value).join('');
    if (enteredPin === correctPin) {
        passwordScreen.style.display = 'none';
        mainContent.style.display = 'block';
        // Hide the welcome container
        document.querySelector('.container').style.display = 'none';
        // Start with game page
        showPage('gamePage');
    } else {
        // Shake animation
        document.querySelector('.password-container').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.password-container').classList.remove('shake');
        }, 500);
        // Clear inputs
        pinInputs.forEach(input => input.value = '');
        pinInputs[0].focus();
    }
});

// Page management
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
    document.getElementById(pageId).classList.add('show');
}

// Debug start game
const debugStartBtn = document.getElementById('debugStartBtn');
debugStartBtn.addEventListener('click', () => {
    showPage('gamePage');
});

// Game Logic
let foundHearts = 0;
const totalHearts = 3;
const gameGrid = document.getElementById('gameGrid');
const gameStatus = document.getElementById('gameStatus');
const skipGameBtn = document.getElementById('skipGameBtn');

// Initialize game
function initGame() {
    gameGrid.innerHTML = '';
    foundHearts = 0;
    gameStatus.textContent = `Found ${foundHearts} / ${totalHearts}`;
    const positions = [];
    while (positions.length < totalHearts) {
        const pos = Math.floor(Math.random() * 9);
        if (!positions.includes(pos)) positions.push(pos);
    }
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.hasHeart = positions.includes(i) ? 'true' : 'false';
        tile.addEventListener('click', () => revealTile(tile));
        gameGrid.appendChild(tile);
    }
}

function revealTile(tile) {
    if (tile.classList.contains('revealed')) return;
    tile.classList.add('revealed');
    if (tile.dataset.hasHeart === 'true') {
        tile.textContent = '❤️';
        foundHearts++;
        gameStatus.textContent = `Found ${foundHearts} / ${totalHearts}`;
        if (foundHearts === totalHearts) {
            document.getElementById('nextToReasonsBtn').style.display = 'inline-block';
        }
    } else {
        tile.textContent = '❌';
        setTimeout(() => {
            tile.textContent = '';
            tile.classList.remove('revealed');
        }, 500);
    }
}

// Skip game
skipGameBtn.addEventListener('click', () => {
    showPage('reasonsPage');
});

// Next to reasons from game
document.getElementById('nextToReasonsBtn').addEventListener('click', () => {
    showPage('reasonsPage');
});

// Next to timer from reasons
document.getElementById('nextToTimerBtn').addEventListener('click', () => {
    showPage('timerPage');
    startTimer();
});

// Reasons to timer
document.getElementById('nextToTimerBtn').addEventListener('click', () => {
    showPage('timerPage');
    startTimer();
});

// Timer to letter
document.getElementById('readLetterBtn2').addEventListener('click', () => {
    showPage('letterPage');
    typeText();
});

// Interactive Reasons Logic
const reasonItems = document.querySelectorAll('.reason-item');

reasonItems.forEach(item => {
    item.addEventListener('click', () => {
        const reasonText = item.querySelector('.reason-text');
        if (reasonText.classList.contains('hidden')) {
            reasonText.textContent = item.dataset.reason;
            reasonText.classList.remove('hidden');
            reasonText.classList.add('revealed');
        } else {
            reasonText.classList.add('hidden');
            reasonText.classList.remove('revealed');
            reasonText.textContent = '';
        }
    });
});

// Timer function
function startTimer() {
    const startDate = new Date('2025-08-02T00:00:00'); // August 2, 2025
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Typing effect for letter
function typeText() {
    const text = `Even though distance keeps us apart, you are still the best and happiest part of my days. Thank you for being so patient with me, for your understanding and for loving me for who I am. Spending time and talking with you is my favourite activity, my heart is always in awe when I hear you. I am super grateful for all the memories we have created together and hope to make so many more with you. I love you more than words can say. I hope this messages shows you how much I love and care I have for you. `;
    const typedTextElement = document.getElementById('typed-text');
    typedTextElement.textContent = '';
    let index = 0;
    const typingSpeed = 50; // milliseconds per character

    function type() {
        if (index < text.length) {
            typedTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }
    type();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    pinInputs[0].focus();
    initGame();
});

