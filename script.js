const words = ["さくら", "ねこ", "うみ", "でんしゃ", "りんご"];
let currentWord = "";
let score = 0;

const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");

function setNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordElement.textContent = currentWord;
  inputElement.value = "";
}

inputElement.addEventListener("input", () => {
  if (inputElement.value === currentWord) {
    score++;
    scoreElement.textContent = "スコア: " + score;
    setNewWord();
  }
});

setNewWord(); // 最初の単語を表示
