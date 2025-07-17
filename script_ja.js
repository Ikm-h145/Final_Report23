const words = ["こんにちは", "ありがとう", "さようなら", "いただきます", "すみません"];
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
  inputElement.disabled = false;
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

// 飛ぶ画像（背景の演出）
function spawnFlyingImage() {
  const img = document.createElement("img");
  img.src = "image/animal_dance.png"; // 任意の画像
  img.classList.add("flying-image");

  const container = document.getElementById("game-area");

  const startSide = Math.floor(Math.random() * 4);
  const screenWidth = document.documentElement.scrollWidth;
  const screenHeight = document.documentElement.scrollHeight;
  let startX, startY;

  if (startSide === 0) {
    startX = Math.random() * screenWidth;
    startY = -60;
  } else if (startSide === 1) {
    startX = screenWidth + 60;
    startY = Math.random() * screenHeight;
  } else if (startSide === 2) {
    startX = Math.random() * screenWidth;
    startY = screenHeight + 60;
  } else {
    startX = -60;
    startY = Math.random() * screenHeight;
  }

  img.style.left = `${startX}px`;
  img.style.top = `${startY}px`;

  container.appendChild(img);

  const endX = Math.random() * screenWidth;
  const endY = Math.random() * screenHeight;
  const dx = endX - startX;
  const dy = endY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const speed = 100 + Math.random() * 200;
  const duration = distance / speed;

  requestAnimationFrame(() => {
    img.style.transitionDuration = `${duration}s`;
    setTimeout(() => {
      img.style.transform = `translate(${dx}px, ${dy}px)`;
    }, 20);
  });

  setTimeout(() => {
    container.removeChild(img);
  }, duration * 1000 + 500);
}

window.addEventListener("DOMContentLoaded", () => {
  setInterval(spawnFlyingImage, 1000);
});
