<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>Typing Game + Animal Animation</title>
<style>
  /* ★ ゲーム全体のレイアウト用 */
  #game-area { display:none; text-align:center; margin-top:20px; }

  /* ★ 走る動物（絵文字を使う例） */
  #animal {
    position: absolute;          /* @keyframes で left を動かすので絶対配置 */
    top: 40%;                    /* お好みで */
    font-size: 48px;             /* 絵文字を大きめに */
    pointer-events: none;        /* クリック無効化（不要なら省略） */
    /* アニメーションは初めは OFF（後で JS で付け外し） */
  }

  /* ★ アニメーションクラス */
  .run {
    animation: moveAnimal 5s linear forwards;  /* forwards: 最後の位置で止める */
  }

  /* ★ キーフレーム */
  @keyframes moveAnimal {
    0%   { left: -150px; }
    100% { left: 110%; }          /* 画面の外まで走り去る */
  }
</style>
</head>

<body>
  <!-- タイマー選択 -->
  <div id="timer-select">
    <button onclick="startGame(30)">30秒</button>
    <button onclick="startGame(60)">60秒</button>
  </div>

  <!-- ゲーム画面 -->
  <div id="game-area">
    <p id="word" style="font-size:32px; margin:20px;"></p>
    <input id="input" autocomplete="off">
    <p id="score">スコア: 0</p>
    <p id="time">残り時間: 0秒</p>
  </div>

  <!-- 走る動物（絵文字🦊にしていますが画像でも可） -->
  <div id="animal">🦊</div>

<script>
/* ★ 既存のタイピングゲーム JS（質問でいただいた内容） */
const words = ["university", "cat", "dog", "train", "apple"];
let currentWord = "";
let score = 0;
let timeLeft = 0;
let timerId = null;

const wordElement  = document.getElementById("word");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timeElement  = document.getElementById("time");
const gameArea     = document.getElementById("game-area");
const timerSelect  = document.getElementById("timer-select");
const animal       = document.getElementById("animal");   // ★ 追加

function startGame(seconds) {
  timeLeft = seconds;
  score = 0;
  scoreElement.textContent = "スコア: 0";
  timeElement.textContent = `残り時間: ${timeLeft}秒`;

  timerSelect.style.display = "none";
  gameArea.style.display   = "block";
  animal.style.display     = "none";  // 初期は隠しておく

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

      /* ★ 正解したら動物を走らせる */
      triggerAnimalRun();

      wordElement.textContent = "";
      inputElement.value = "";

      setTimeout(setNewWord, 500);
    }
  }
});

/* ★ アニメーションを付け外しする関数 */
function triggerAnimalRun() {
  animal.style.display = "block";      // 表示
  animal.classList.remove("run");      // 以前のアニメをリセット
  void animal.offsetWidth;             // reflow で強制リセット
  animal.classList.add("run");         // アニメ開始

  /* アニメが終わったら自動で隠す（5秒に合わせる） */
  setTimeout(() => { animal.style.display = "none"; }, 5000);
}
</script>
</body>
</html>
