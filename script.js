// 錯誤訊息輪播
const errorMessages = [
    'Oops! Something went wrong.',
    'System Failure Detected!',
    'Temporary Server Crash!',
    'Critical Error: Please Wait...',
    'Error 503: Service Unavailable'
];

let current = 0;
const titleElement = document.querySelector('.error-box h2');

setInterval(() => {
    current = (current + 1) % errorMessages.length;
    titleElement.textContent = errorMessages[current];
}, 2000);

// 禁止鍵盤滑鼠輸入（模擬鎖死）
document.addEventListener('keydown', (e) => e.preventDefault());
document.addEventListener('mousemove', (e) => e.preventDefault());

// 點擊錯誤按鈕觸發修復動畫
function triggerGlitch() {
    const box = document.querySelector('.error-box');
    const msg = document.getElementById('error-message');
    const recovery = document.getElementById('recovery-box');
    const progress = document.getElementById('progress-bar');
    const countdown = document.getElementById('countdown-text');

    box.style.transition = "0.2s";
    box.style.boxShadow = "0 0 10px red";
    box.style.backgroundColor = "#ffe6e6";

    msg.innerHTML = `
        <h2 style='color:red;'>🔥 SYSTEM FAILURE DETECTED 🔥</h2>
        <p style='font-weight:bold;'>Your session has crashed unexpectedly.<br>Starting recovery process...</p>
    `;

    recovery.style.display = "block";
    progress.style.width = "0%";
    countdown.innerText = "系統將在 5 秒後自動重新載入…";

    let percent = 0;
    let secondsLeft = 5;
    const freezeOverlay = document.createElement('div');
    freezeOverlay.classList.add('freeze');
    document.body.appendChild(freezeOverlay);

    const interval = setInterval(() => {
        percent += 20;
        progress.style.width = percent + "%";

        secondsLeft--;
        countdown.innerText = `系統將在 ${secondsLeft} 秒後自動重新載入…`;

        if (percent >= 100) {
            clearInterval(interval);
            location.reload();
        }
    }, 1000);
}

window.addEventListener('load', () => {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // 設定尺寸
    canvas.width = window.innerWidth;
    canvas.height = 150;

    const letters = "01".split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);
});

// 🧊 啟動凍結層
const freezeOverlay = document.createElement('div');
freezeOverlay.classList.add('freeze');
document.body.appendChild(freezeOverlay);

