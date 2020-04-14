createButton();
const buttons = document.querySelectorAll(".calc-btn");
const calculator = document.getElementById("calc")
let result = document.querySelector(".result");
let operation = document.querySelector(".operation");
const operators = /\+|\/|\*|-/;
const operatorBtns = document.querySelectorAll(".calc-btn-operator");
let equalBtnPressed = false;
let isFloat = false;
result.innerHTML = "";

document.addEventListener("keydown", e => {
  if (/\d|Backspace|Enter/.test(e.key)) {
    afficheNombre(e.key);
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", e => {
    afficheNombre(button.innerHTML);
  });
});

function afficheNombre(nombre) {
  if (nombre === "=" || nombre === "Enter") {
    if (operation.innerHTML === "" || result.innerHTML === "") {
      return;
    }
    equalBtnPressed = true;
    performOperation();
    result.innerHTML = operation.innerHTML;
    operation.innerHTML = "";
    return;
  }

  if (nombre === "&lt;" || nombre === "Backspace") {
    let char = result.innerHTML.charAt(result.innerHTML.length - 1);
    let index = result.innerHTML.lastIndexOf(char);
    let tab = Array.from(result.innerHTML);
    tab[index] = "";
    result.innerHTML = tab.join("");
    if (result.innerHTML.length === 0) {
      result.innerHTML = "";
    }
    preventDivisionByZero();
    return;
  }

  if (nombre === "C") {
    result.innerHTML = "";
    operation.innerHTML = "";
    preventDivisionByZero();
    return;
  }

  if (equalBtnPressed) {
    result.innerHTML = "";
    equalBtnPressed = false;
  }

  if (nombre === "-") {
    managingNegativeNumber();
    return;
  }

  if (nombre === "+" || nombre === "/" || nombre === "*") {
    if (result.innerHTML === "") {
      changeOperator(nombre);
      return;
    }
    if (mustPerformOperation()) {
      performOperation();
      result.innerHTML = "";
      return;
    }

    operation.innerHTML = result.innerHTML + nombre;
    result.innerHTML = "";
  } else {
    result.innerHTML += nombre;
  }
  preventDivisionByZero();
}

function preventDivisionByZero() {
  if (operation.innerHTML === "") {
    return;
  }
  if (
    (/\//.test(operation.innerHTML) && result.innerHTML === "0") ||
    (/\//.test(operation.innerHTML) && result.innerHTML === "0.") ||
    (/\//.test(operation.innerHTML) && /^\..*/.test(result.innerHTML))
  ) {
    operatorBtns.forEach((operator) => {
      operator.classList.add("disable-btn");
    });
  } else {
    operatorBtns.forEach((operator) => {
      operator.classList.remove("disable-btn");
    });
  }
}

function mustPerformOperation() {
  return operators.test(operation.innerHTML);
}

function performOperation() {
  isFloat = false;
  const operator = operation.innerHTML.slice(operation.innerHTML.length - 1);
  const leftSide = floatOrInt(operation.innerHTML);
  const rightSide = floatOrInt(result.innerHTML);

  switch (operator) {
    case "+":
      operation.innerHTML = leftSide + rightSide;
      break;
    case "-":
      operation.innerHTML = leftSide - rightSide;
      break;
    case "*":
      operation.innerHTML = leftSide * rightSide;
      break;
    case "/":
      operation.innerHTML = leftSide / rightSide;
      break;
  }
  if (isFloat || /\./.test(operation.innerHTML)) {
    operation.innerHTML = parseFloat(operation.innerHTML).toFixed(4);
  }
  if (!equalBtnPressed) {
    operation.innerHTML += operator;
  }
}

function floatOrInt(params) {
  if (/\./.test(operation.innerHTML) || /\./.test(result.innerHTML)) {
    isFloat = true;
    return parseFloat(params);
  } else {
    return parseInt(params);
  }
}

function managingNegativeNumber() {
  if (result.innerHTML === "") {
    if (operation.innerHTML === "") {
      result.innerHTML += "-";
    } else {
      changeOperator("-");
    }
  } else {
    if (operation.innerHTML != "") {
      performOperation();
      result.innerHTML = "";
      return;
    }
    operation.innerHTML = result.innerHTML + "-";
    result.innerHTML = "";
  }
}

function changeOperator(newOperator) {
  let str = Array.from(operation.innerHTML);
  str[operation.innerHTML.length - 1] = newOperator;
  operation.innerHTML = str.join("");
}

function createButton() {

   for (let i = 0; i < 10; i++) {
      const button = document.createElement("button");
      button.classList.add("calc-btn", `calc-btn-${i}`);
      button.innerText = i
      calc.appendChild(button)
   }
}
