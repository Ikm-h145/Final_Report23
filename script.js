const words = ["apple", "cat", "dog", "train", "computer"];
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

inputElement.addEventListener("keydown", (event) => {
  if(event.key =="Enter"){
    if (inputElement.value === currentWord) {
      score++;
      scoreElement.textContent = "スコア: " + score;

      wordElement.textContent = "";
      inputElement.value = "";          
      setTimeout(setNewWord,500);
    }
  }
});

setNewWord(); // 最初の単語を表示
