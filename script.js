const keys = document.querySelectorAll(".keys");
const resultEls = document.querySelectorAll(".result div");
const countDown = document.querySelector(".countdown");

const targetArray = ["A", "B", "C", "5"]; // not randomized for now to make fixing bugs easier
const keyMap = new Map(); // de altfel ma chinuiam cu multe ifs/switch cases

let won = 0;
let resultIndex = 0;
let timeLeft = 60;

const resetResult = (e) => {
  e.target.classList.add("reset");
  //   e.target.textContent = "0";
  //  nu merge normal sa fie resetate la 0
};

resultEls.forEach((item) => {
  item.addEventListener("transitionend", resetResult);
});

const showAlert = (str) => {
  let delay = 0;

  const alertInterval = setInterval(() => {
    delay++;
    if (delay === 1) {
      clearInterval(alertInterval);
      alert(str);
    }
  }, 1000);
};

const updateTime = () => {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;
  countDown.innerHTML = `${minutes}:${seconds}`;

  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(interval);
    return;
  } else if (timeLeft === 0) {
    timeLeft = 60;
    showAlert("You lost! The bomb has exploded!");
  }
};

const interval = setInterval(updateTime, 1000);

keys.forEach((key) => {
  keyMap.set(key.innerText, key);
  keyMap.set(key.innerText.toLowerCase(), key);
});

const handleKey = (e) => {
  const keyEl = keyMap.get(e.key);

  if (!keyEl) return;

  keyEl.classList.toggle("active", e.type === "keydown");

  if (e.type === "keydown") {
    const key = e.key.toUpperCase();

    if (/^[A-Z0-9]$/.test(key)) {
      resultEls[resultIndex].textContent = key;
      won = 0;
      if (resultIndex < resultEls.length - 1) {
        resultIndex++;
      } else {
        resultEls.forEach((el, index) => {
          if (el.textContent === targetArray[index]) {
            el.style.backgroundColor = "green";
            won++;
          } else {
            el.style.backgroundColor = "red";
          }
        });

        if (won === 4) {
          timeLeft = 60;
          updateTime();
          showAlert("You won! The bomb has been diffused!");
        }

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
