const keys = document.querySelectorAll(".keys");
const resultEls = document.querySelectorAll(".result div");

const targetArray = ["A", "B", "C", "D"];

const keyMap = new Map();

keys.forEach((key) => {
  keyMap.set(key.innerText, key);
  keyMap.set(key.innerText.toLowerCase(), key);
});

const resetResult = (e) => {
  e.target.classList.add("reset");
  e.target.textContent = "0";
};

resultEls.forEach((item) => {
  item.addEventListener("transitionend", resetResult);
});

let resultIndex = 0;

const handleKey = (e) => {
  const keyEl = keyMap.get(e.key);

  if (!keyEl) return;

  //   e.preventDefault();

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
