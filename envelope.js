const codeInput = document.getElementById('codeInput');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const closeBtn = document.getElementById('closeBtn');

// Codeword messages
const codewords = {
    'test': 'test works naja',
    'meenmala': "congrats ยินดีด้วยที่เรียนจบแล้ว ยินดีที่ได้รู้จักอีกครั้งนึงนะ ดีใจที่เราได้รู้จักกัน ขอบคุณที่ทำให้ชีวิตในค่ายที่น่าเบื่อของกุมีสีสันบ้าง ถึงจะเป็นการพาไปโดดเรียน แต่หมาล่าร้านนั้นอร่อยจริงตอน FE ขอบคุณที่เป็นเพื่อนคุยที่ดีมากมากเลย ไปมหาลัยแล้วก็ยังทักมาคุยกันได้เสมอ ขอให้โชคดีกับชีวิตในรั้วมหาลัย กุเชื่อว่ามันจะเหนื่อยแน่ ๆ แต่ก็สู้ ๆ ตั้งใจเรียน หาเวลาพักผ่อนนอนเยอะ ๆ โชคดีงับ",
    'neonoe': 'congratsss ไอเหี้ย กุคิดถึงมึงมากมากเพื่อน ไม่ได้เจอกันนานเลย ดีใจที่ได้เจอมึงวันนี้นะเว้ย รุ้สึกวันนี้ยังไม่ค่อยได้คุยกันเลย ไว้วันหลังค่อยมา catch up กันนะ ยินดีกะทุกอย่างที่มึงผ่านมาในมัธยม ถึงจะไม่ได้เจอกันแต่กุก้รุ้ว่ามึงพยายามทำนู้นนี่มาตลอด สู้ ๆ ต่อไปเพื่อน มหาลัยก็หาเวลาพักผ่อน ใช้ชีวิตให้สนุก กุภูมิใจมากมากที่เป็นเพื่อนกับมึง ถ้ามีอะไรที่กุพอช่วยได้ก็ทักมาได้ตลอด หลังนี้กุน่าจะว่างยาวยาว ชวนไปเที่ยว ดูหนัง ฟังเพลง คุย ปรึกษาปัญหาชีวิตได้ โชคดี รักเสมอ',
    'itonnaooo': 'congrats เพื่อนนน กุดีใจมากมากที่ได้รู้จักกับมึง กุจำได้ว่าตอนประถมที่มึงเข้ามาเป็นเด็กใหม่ มึงนี่ตัวจี้ดเลย ละตอนหลัง ๆ มึงก็เริ่มเฟรนลี่ขึ้นเยอะ กุดีใจกะมึงด้วยมาก ๆ ทั้งเรื่องความรัก การเรียน แล้วก็มหาลัยในอนาคต ยังไงก็สู้ ๆ ต่อไป หาโอกาสมา catch up กันบ้างก็ดี กุคิดถึงเพื่อนเพื่อนทุกคนชิบหาย วันนี้กุยังรุ้สึกไม่เต็มอิ่มเลย แต่ก็นั่นแหละดีใจที่เจอมึงในวันนี้ ขอให้ต่อไปมึงประสบความสำเร็จ เจอคนดีดีเข้ามาในชีวิตอีก มีปัญหาอะไรที่กุพอช่วยได้ก็ทักมาได้เพื่อน รักเสมอ ๆๆ ๆ',
    'hanaja': 'congrats ja ไอฮานะ งือ เรียนจบแล้ว กำลังจะไปมีชีวิตมหาลัย คิดถึงมึงนะ ดีใจที่ได้เจอกัน มึงเก่งมากมาก เพราะฉะนั้นในมหาลัยก็สู้ ๆ วันไหนท้อก็ยังมีเพื่อนมากมายคอยซัพพอร์ตมึงอยู่ข้างหลัง ถ้ามีอะไรที่กุพอช่วยได้ก็ยินดีเสมอ โชคดีง้าบ',
    'pearpear': '',
    'cakeeakake': '',
    'urmysunshine': '',
    'ivmheebrown': 'congrats เพื่อนวี ยินดีกับการจบการศึกษาของมึง เก่งมากผ่านอะไรมาเยอะเลย ทั้งค่ายทั้งแข่งทั้งเรียนที่โรงเรียน มึงเป็นเพื่อนที่ดีมากคนนึงของกุนะ ขอบคุณที่เข้ามาเป็นสีสันในชีวิต มาคุยกันในค่ายในแข่ง ถึงความรักแบบคนรักของมึงจะไม่ค่อยสมหวัง แต่ความรักแบบเพื่อนกุก้มีให้เต็มเปี่ยม มหาลัยก็สู้ ๆ ต่อไปเพื่อน ถ้ามีอะไรที่กุพอช่วยได้ก็ทักมาได้เสมอนะ ดูแลตัวเองดี ๆ โชคดี รักเสมอ ไว้เจอกันค้าบ',
    'justtt': '',
    'mookky': 'congrats na wei เก่งมาก เรียนจบแล้วโว้ย ก็ขอบคุณที่เป็นสีสันในค่าย FE ของกุ การมีมึงและมีนวันนั้นทำให้กุกะออมได้โดดเรียน สนุกมาก สู้ ๆ กับมหาลัยนะ แล้วก็หาเวลาพักผ่อน กินของอร่อยเยอะ ๆ มีอะไรที่กุพอช่วยได้ก็ทักมาได้ตลอด โชคดี ไว้เจอกันงับ',
    'chinny': '',
    'ljtv': '',
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
        showMessage('กำลังเขียน freindship ให้อยู่นะ ๆ ๆๆ ทักไอจีมาก่อนได้');
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

