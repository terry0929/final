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

    // ❌ 移除背景凍結效果
    const freezeLayer = document.querySelector('.freeze');
    if (freezeLayer) freezeLayer.remove();

    // 💥 加入單次震動動畫
    box.classList.add('shake');
    setTimeout(() => {
        box.classList.remove('shake');
    }, 600);

    box.style.transition = "0.2s";
    box.style.boxShadow = "0 0 10px red";
    box.style.backgroundColor = "#ffe6e6";

    const sound = document.getElementById('error-sound');
    sound.currentTime = 0;
    sound.volume = 1;
    sound.play();

    msg.innerHTML = `
    <h2 style='color:red;'>🔥 SYSTEM FAILURE DETECTED 🔥</h2>
    <p style='font-weight:bold;'>Your session has crashed unexpectedly.<br>Starting recovery process...</p>
  `;

    recovery.style.display = "block";
    progress.style.width = "0%";

    let percent = 0;
    let secondsLeft = 5;

    const interval = setInterval(() => {
        percent += 20;
        progress.style.width = percent + "%";
        secondsLeft--;

        countdown.innerText = `⚠️ 系統異常，將於 ${secondsLeft} 秒後強制重整...`;

        if (percent >= 100) {
            clearInterval(interval);
            location.reload();
        }
    }, 1000);
}
