codeword codeInput = document.getElementById('codeInput');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const closeBtn = document.getElementById('closeBtn');

// Codeword messages
const codewords = {
    'meenmala': 'congrats ยินดีด้วยที่เรียนจบแล้ว ยินดีที่ได้รู้จักอีกครั้งนึงนะ ดีใจที่เราได้รู้จักกัน ขอบคุณที่ทำให้ชีวิตในค่ายที่น่าเบื่อของกุมีสีสันบ้าง ถึงจะเป็นการพาไปโดดเรียน แต่หมาล่าร้านนั้นอร่อยจริงตอน FE ขอบคุณที่เป็นเพื่อนคุยที่ดีมากมากเลย ไปมหาลัยแล้วก็ยังทักมาคุยกันได้เสมอ ขอให้โชคดีกับชีวิตในรั้วมหาลัย กุเชื่อว่ามันจะเหนื่อยแน่ ๆ แต่ก็สู้ ๆ ตั้งใจเรียน หาเวลาพักผ่อนนอนเยอะ ๆ โชคดีงับ',
    'noonlnwzaa': 'Hello, Noon',
    'vtodecho': 'Hello',
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
        showMessage('รอก่อน ๆๆๆ กำลังเขียนเฟรนชิพให้นะ ทักไอจีมาได้');
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

