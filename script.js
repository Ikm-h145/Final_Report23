const words = ["university", "cat", "dog", "train", "apple"];
let currentWord = "";
let score = 0;
let timeLeft = 0;
let timerId = null;

const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const gameArea = document.getElementById("game-area");
const timerSelect = document.getElementById("timer-select");

function startGame(seconds) {
  timeLeft = seconds;
  score = 0;
  scoreElement.textContent = "スコア: 0";
  timeElement.textContent = `残り時間: ${timeLeft}秒`;

  timerSelect.style.display = "none";
  gameArea.style.display = "block";

  setNewWord();
  inputElement.value = "";
  inputElement.focus();

  timerId = setInterval(() => {
    timeLeft--;
    timeElement.textContent = `残り時間: ${timeLeft}秒`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      endGame();
    }
  }, 1000);
}

function setNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordElement.textContent = currentWord;
}

function endGame() {
  wordElement.textContent = "ゲーム終了！";
  inputElement.disabled = true;
}

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (inputElement.value === currentWord) {
      score++;
      scoreElement.textContent = "スコア: " + score;

      wordElement.textContent = "";
      inputElement.value = "";

      setTimeout(setNewWord, 500);
    }
  }
});
function spawnFlyingImage() {
  const img = document.createElement("img");
  img.src = "image/hitsuji.png"; // 好きな画像に置き換えてください
  img.classList.add("flying-image");

  const container = document.getElementById("background-container");

  // スタート位置（画面の外側）
  const startSide = Math.floor(Math.random() * 4); // 0:top, 1:right, 2:bottom, 3:left
  const screenWidth = document.documentElement.scrollWidth;
  const screenHeight = document.documentElement.scrollHeight;
  let startX, startY;

  if (startSide === 0) { // 上から
    startX = Math.random() * screenWidth;
    startY = -60;
  } else if (startSide === 1) { // 右から
    startX = screenWidth + 60;
    startY = Math.random() * screenHeight;
  } else if (startSide === 2) { // 下から
    startX = Math.random() * screenWidth;
    startY = screenHeight + 60;
  } else { // 左から
    startX = -60;
    startY = Math.random() * screenHeight;
  }

  img.style.left = `${startX}px`;
  img.style.top = `${startY}px`;

  container.appendChild(img);

  // ゴール位置（画面内を突っ切る）
  const endX = Math.random() * screenWidth;
  const endY = Math.random() * screenHeight;

  // 移動距離に応じて速度を調整（大きいほどゆっくり）
  const dx = endX - startX;
  const dy = endY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const speed = 100 + Math.random() * 200; // ピクセル/秒
  const duration = distance / speed;

  // 実際のアニメーション
  requestAnimationFrame(() => {
    img.style.transitionDuration = `${duration}s`;  // ここでduration指定
    // 少し遅らせて transform変更
    setTimeout(() => {
      img.style.transform = `translate(${dx}px, ${dy}px)`;
    }, 20);  // 20msぐらい待つのがおすすめ
  });

  // 一定時間後に削除
  setTimeout(() => {
    container.removeChild(img);
  }, duration * 1000 + 500);
}
window.addEventListener("DOMContentLoaded", () => {
  setInterval(spawnFlyingImage, 1000);
});