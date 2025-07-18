const words = ["university", "cat", "dog", "train", "apple",
  "python","java","meijo","information","document","icpc",
  "society","data","knowledge","cloud","tiger","lion",
  "print","scan","import","double","int","string",
  "answer","mention","input","computer","super","name",
  "google","powerpoint","excel","word","desktop","eclipse",
  "homework","remember","practice","english","chinese","french",
  "german","random","matplotlib","machine","expensive","recommend",
  "success","null","fail","true","translate","government",
  "key","assistant","baseball","basketball","volleyball","tennis",
  "soccer","proportion","innovation","technology","passion","universe",
  "index","chapter",
];
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

function endGame(score) {
  // ゲーム画面を非表示
  document.getElementById("game-area").style.display = "none";

  // スコアに応じたメッセージを作成
  const finalMessage = document.getElementById("final-message");
  let message = "";
  if (score >= 30) {
    message = "wonderful！You are engineer！";
  } else if (score >= 10) {
    message = "nice！Let's try harder";
  } else {
    message = "...  fight..";
  }

  finalMessage.textContent = `スコア: ${score}点\n${message}`;

  // 結果画面を表示
  document.getElementById("end-screen").style.display = "block";
}

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (inputElement.value === currentWord) {
      score++;
      scoreElement.textContent = "スコア: " + score;

      wordElement.textContent = "";
      inputElement.value = "";

      setTimeout(setNewWord, 100);
    }
  }
});


function spawnFlyingImage() {
  const img = document.createElement("img");

  const imageList = [
    "image/shika.png",
    "image/bear.png",
    "image/dog.png",
    "image/hitsuji.png",
    "image/hebi.png"
  ];

  const randomIndex = Math.floor(Math.random() * imageList.length);
  img.src = imageList[randomIndex];
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
  const speed = 100 + Math.random() * 100; // ピクセル/秒
  const duration = distance / speed;

  // 実際のアニメーション
  requestAnimationFrame(() => {
    img.style.transitionDuration = `${duration}s`;  // ここでduration指定
    // 少し遅らせて transform変更
    setTimeout(() => {
      img.style.transform = `translate(${dx}px, ${dy}px)`;
    }, 30);  
  });

  // 一定時間後に削除
  setTimeout(() => {
    container.removeChild(img);
  }, duration * 1000 + 500);
}

window.addEventListener("DOMContentLoaded", () => {
  setInterval(spawnFlyingImage, 1000);
});

document.getElementById("retry-button").addEventListener("click", () => {
  document.getElementById("end-screen").style.display = "none";
  startGame(currentTime);  // 時間を保持しておく変数があればそれを使う
});

document.getElementById("back-button").addEventListener("click", () => {
  // 最初のタイマー選択画面を表示、他は非表示に
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("timer-select").style.display = "block";
});
