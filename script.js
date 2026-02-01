const bagImage = document.querySelector('.bag_closed');
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
const muteIcon = document.getElementById('muteIcon');

// Create audio for mute button click
const boneCrackSound = new Audio('sounds/bone-crack.mp3');

// Set background music volume
let musicVolume = 0.3;
if (bgMusic) {
    bgMusic.volume = musicVolume;
    // Try to play the music
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(err => {
            console.log('Autoplay blocked:', err);
            // Play on first user interaction
            document.addEventListener('click', () => {
                bgMusic.play().catch(e => console.log('Play error:', e));
            }, { once: true });
        });
    }
}

let isMuted = false;

// Mute button functionality
muteBtn.addEventListener('click', () => {
    // Play bone crack sound
    const soundClone = boneCrackSound.cloneNode();
    soundClone.play().catch(err => console.log('Sound play error:', err));
    
    isMuted = !isMuted;
    if (isMuted) {
        bgMusic.volume = 0;
        muteIcon.src = 'images/turnon.jpg';
    } else {
        bgMusic.volume = musicVolume;
        muteIcon.src = 'images/shutup.jpg';
    }
});

let clickCount = 0;
const maxClicks = 4;
const snackImages = [
    'images/Bento.png',
    'images/Doritos.png',
    'images/Envelope.png',
    'images/Karamujou.png',
    'images/Lays.png',
    'images/Nerds.png',
    'images/Pretz.png'
];

// Create audio element for sound effects
const clickSound1 = new Audio('sounds/dogclicker.mp3');
const clickSound2 = new Audio('sounds/rizz-sound-effect.mp3');
const bagClickSound = new Audio('sounds/minecraft_click.mp3');
const bagOpenedSound = new Audio('sounds/bag_opened.mp3');

// Function to play random click sound
function playRandomClickSound() {
    const randomSound = Math.random() > 0.5 ? clickSound1 : clickSound2;
    const soundClone = randomSound.cloneNode();
    soundClone.play().catch(err => console.log('Sound play error:', err));
}

bagImage.addEventListener('click', handleBagClick);

function handleBagClick() {
    // Play bag click sound instantly (create new instance for each click)
    const soundClone = bagClickSound.cloneNode();
    soundClone.play().catch(err => console.log('Sound play error:', err));
    
    clickCount++;
    
    // Add wiggle animation
    bagImage.classList.remove('wiggle');
    // Trigger reflow to restart animation
    void bagImage.offsetWidth;
    bagImage.classList.add('wiggle');
    
    // Check if we've reached 4 clicks
    if (clickCount === maxClicks) {
        setTimeout(() => {
            // Play bag opened sound
            bagOpenedSound.currentTime = 0;
            bagOpenedSound.play().catch(err => console.log('Sound play error:', err));
            
            // Change to opened bag image
            bagImage.src = 'images/Bag_opened.png';
            bagImage.removeEventListener('click', handleBagClick);
            
            // Spawn snack images
            spawnSnacks();
        }, 500);
    }
}

function spawnSnacks() {
    // Get bag position
    const bagRect = bagImage.getBoundingClientRect();
    const bagCenterX = bagRect.left + bagRect.width / 2;
    const bagCenterY = bagRect.top + bagRect.height / 2;
    
    const snackSize = 140;
    const padding = 20;
    const maxX = window.innerWidth - snackSize - padding;
    const maxY = window.innerHeight * 0.35;
    const minX = padding;
    const minY = padding;
    
    // Create grid-based positions to avoid stacking
    const gridCols = 4;
    const gridRows = 2;
    const cellWidth = (maxX - minX) / gridCols;
    const cellHeight = (maxY - minY) / gridRows;
    
    // Shuffle positions to randomize grid cells
    const gridPositions = [];
    for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
            gridPositions.push({ row, col });
        }
    }
    
    // Fisher-Yates shuffle
    for (let i = gridPositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gridPositions[i], gridPositions[j]] = [gridPositions[j], gridPositions[i]];
    }
    
    snackImages.forEach((snackSrc, index) => {
        setTimeout(() => {
            const snack = document.createElement('img');
            snack.src = snackSrc;
            snack.className = 'snack';
            snack.style.position = 'fixed';
            snack.style.left = bagCenterX + 'px';
            snack.style.top = bagCenterY + 'px';
            snack.style.cursor = 'pointer';
            
            // Add click handler
            snack.addEventListener('click', () => {
                // Play random click sound
                playRandomClickSound();
                
                if (snackSrc.includes('Envelope.png')) {
                    // Navigate to envelope.html
                    window.location.href = 'envelope.html';
                } else {
                    // Remove snack
                    snack.remove();
                }
            });
            
            document.body.appendChild(snack);
            
            // Get grid cell for this snack
            const gridPos = gridPositions[index % gridPositions.length];
            
            // Calculate position with random offset within grid cell
            const cellX = minX + gridPos.col * cellWidth;
            const cellY = minY + gridPos.row * cellHeight;
            
            let finalX = cellX + Math.random() * (cellWidth - snackSize);
            let finalY = cellY + Math.random() * (cellHeight - snackSize);
            
            // Ensure within bounds
            finalX = Math.max(minX, Math.min(finalX, maxX));
            finalY = Math.max(minY, Math.min(finalY, maxY));
            
            // Animate to final position using keyframes dynamically
            const duration = 2 + Math.random() * 1; // 2-3 seconds
            const keyframes = `
                @keyframes snack-move-${index} {
                    0% { left: ${bagCenterX}px; top: ${bagCenterY}px; }
                    100% { left: ${finalX}px; top: ${finalY}px; }
                }
            `;
            
            // Inject keyframes into stylesheet
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            snack.style.animation = `snack-move-${index} ${duration}s ease-out forwards`;
        }, index * 100); // Stagger the snacks
    });
}
