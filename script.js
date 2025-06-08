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
