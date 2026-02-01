const codeInput = document.getElementById('codeInput');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const closeBtn = document.getElementById('closeBtn');

// Codeword messages
const codewords = {
    'Meen': 'สวัสดีมีน ยินดีที่ได้รู้จักนะ',
    'noonlnwzaa': 'Hello, Noon',
    'Vtode': 'Hello',
    'test': 'Jeje',
    'alicewonderland': 'You are a wonderful person and I hope you achieve great things!',
    'jaaneko': 'Your dedication and hard work have been truly inspiring!',
    'soundii': 'Thank you for making our school days unforgettable!'
};

// Listen for input
codeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkCodeword();
    }
});

// Listen for input changes (optional - for real-time checking)
codeInput.addEventListener('input', (e) => {
    const input = e.target.value.toLowerCase().trim();
    
    if (codewords[input]) {
        checkCodeword();
    }
});

function checkCodeword() {
    const input = codeInput.value.toLowerCase().trim();
    
    if (codewords[input]) {
        showMessage(codewords[input]);
        codeInput.value = '';
    } else if (input) {
        showMessage('Invalid codeword. Try again!');
    }
}

function showMessage(message) {
    messageText.textContent = message;
    messageBox.classList.remove('hidden');
}

function hideMessage() {
    messageBox.classList.add('hidden');
}

closeBtn.addEventListener('click', hideMessage);

// Optional: Hide message when clicking outside
messageBox.addEventListener('click', (e) => {
    if (e.target === messageBox) {
        hideMessage();
    }
});

