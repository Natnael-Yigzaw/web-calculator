const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let output = "";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculate(btnvalue) {
  if (btnvalue === "=" && output !== "") {
    try {
      output = eval(output.replace("%", "/100"));
      display.value = formatNumberWithCommas(output);
    } catch (error) {
      display.value = "Error";
    }
  } else if (btnvalue === "AC") {
    output = "";
  } else if (btnvalue === "CE") {
    output = output.toString().slice(0, -1);
  } else if (btnvalue === "DEL") {
    output = "";
  } else if (btnvalue === "sqrt") {
    output = Math.sqrt(parseFloat(output)) || "";
  } else if (btnvalue === "^") {
    output += "^";
  } else {
    output += btnvalue;
  }

  display.value = formatNumberWithCommas(output);
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  const btn = document.querySelector(`[data-value="${key}"]`);

  if (btn) {
    e.preventDefault();
    btn.click();
  } else if (key === "Enter") {
    const equalsButton = document.querySelector('[data-value="="]');
    if (equalsButton) {
      equalsButton.click();
    }
  }
});
