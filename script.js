const keys = document.querySelectorAll(".keys");
const resultEls = document.querySelectorAll(".result div");
const countDown = document.querySelector(".countdown");

const resetResult = (e) => {
  e.target.classList.add("reset");
  e.target.textContent = "0";
};

let timeLeft = 60;

const updateTime = () => {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countDown.innerHTML = `${minutes}:${seconds}`;

  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(interval);
    resetResult;
    return;
  }
};

const interval = setInterval(updateTime, 1000);

const checkResult = () => {
  let won = true;

  resultEls.forEach((resultEl) => {
    if (resultEl.style.backgroundColor === "red") {
      won = false;
    }
  });

  if (won) {
    alert("You won!");
    updateTime;
  } else {
    alert("You lost!");
    updateTime;
  }
};

const targetArray = ["A", "B", "C", "D"];

const keyMap = new Map();

keys.forEach((key) => {
  keyMap.set(key.innerText, key);
  keyMap.set(key.innerText.toLowerCase(), key);
});

resultEls.forEach((item) => {
  item.addEventListener("transitionend", resetResult);
});

let resultIndex = 0;

const handleKey = (e) => {
  const keyEl = keyMap.get(e.key);

  if (!keyEl) return;

  keyEl.classList.toggle("active", e.type === "keydown");

  if (e.type === "keydown") {
    const key = e.key.toUpperCase();

    if (/^[A-Z0-9]$/.test(key)) {
      resultEls[resultIndex].textContent = key;

      resultIndex++;

      if (resultIndex === resultEls.length) {
        resultEls.forEach((resultEl, index) => {
          if (resultEl.textContent === targetArray[index]) {
            resultEl.style.backgroundColor = "green";
          } else {
            resultEl.style.backgroundColor = "red";
          }
        });

        resultEls.forEach((el) => {
          el.classList.remove("reset");
        });

        resultIndex = 0;
      }
    }
  }
};

window.addEventListener("keydown", handleKey);
window.addEventListener("keyup", handleKey);
