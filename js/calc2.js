let calc = function() {
   createAndAddNumbers();
   const buttons = document.querySelectorAll(".calc-btn");
   let label = document.querySelector(".label");
   let queue = document.querySelector(".queue");
   const operators = /\+|\/|\*|-/;
   const operatorBtns = document.querySelectorAll(".calc-btn-operator");
   let equalBtnPressed = false;
   let isFloat = false;
   label.innerHTML = "";

   document.addEventListener("keydown", e => {
      if (/\d|Backspace|Enter/.test(e.key)) {
         afficheNombre(e.key);
      }
   });

   buttons.forEach(button => {
      button.addEventListener("click", e => {
         afficheNombre(button.innerHTML);
      });
   });

   function afficheNombre(nombre) {
      if (nombre === "=" || nombre === "Enter") {
         if (queue.innerHTML === "" || label.innerHTML === "") {
            return;
         }
         equalBtnPressed = true;
         performOperation();
         label.innerHTML = queue.innerHTML;
         queue.innerHTML = "";
         return;
      }

      if (nombre === "&lt;" || nombre === "Backspace") {
         let char = label.innerHTML.charAt(label.innerHTML.length - 1);
         let index = label.innerHTML.lastIndexOf(char);
         let tab = Array.from(label.innerHTML);
         tab[index] = "";
         label.innerHTML = tab.join("");
         if (label.innerHTML.length === 0) {
            label.innerHTML = "";
         }
         preventDivisionByZero();
         return;
      }

      if (nombre === "C") {
         label.innerHTML = "";
         queue.innerHTML = "";
         preventDivisionByZero();
         return;
      }

      if (equalBtnPressed) {
         label.innerHTML = "";
         equalBtnPressed = false;
      }

      if (nombre === "-") {
         managingNegativeNumber();
         return;
      }

      if (nombre === "+" || nombre === "/" || nombre === "*") {
         if (label.innerHTML === "") {
            changeOperator(nombre);
            return;
         }
         if (mustPerformOperation()) {
            performOperation();
            label.innerHTML = "";
            return;
         }

         queue.innerHTML = label.innerHTML + nombre;
         label.innerHTML = "";
      } else {
         label.innerHTML += nombre;
      }
      preventDivisionByZero();
   }

   function preventDivisionByZero() {
      if (queue.innerHTML === "") {
         return;
      }
      if (
         (/\//.test(queue.innerHTML) && label.innerHTML === "0") ||
         (/\//.test(queue.innerHTML) && label.innerHTML === "0.") ||
         (/\//.test(queue.innerHTML) && /^\..*/.test(label.innerHTML))
      ) {
         operatorBtns.forEach(operator => {
            operator.classList.add("disable-btn");
         });
      } else {
         operatorBtns.forEach(operator => {
            operator.classList.remove("disable-btn");
         });
      }
   }

   function mustPerformOperation() {
      return operators.test(queue.innerHTML);
   }

   function performOperation() {
      isFloat = false;
      const operator = queue.innerHTML.slice(queue.innerHTML.length - 1);
      const leftSide = floatOrInt(queue.innerHTML);
      const rightSide = floatOrInt(label.innerHTML);

      switch (operator) {
         case "+":
            queue.innerHTML = leftSide + rightSide;
            break;
         case "-":
            queue.innerHTML = leftSide - rightSide;
            break;
         case "*":
            queue.innerHTML = leftSide * rightSide;
            break;
         case "/":
            queue.innerHTML = leftSide / rightSide;
            break;
      }
      if (isFloat || /\./.test(queue.innerHTML)) {
         queue.innerHTML = parseFloat(queue.innerHTML).toFixed(4);
      }
      if (!equalBtnPressed) {
         queue.innerHTML += operator;
      }
   }

   function floatOrInt(params) {
      if (/\./.test(queue.innerHTML) || /\./.test(label.innerHTML)) {
         isFloat = true;
         return parseFloat(params);
      } else {
         return parseInt(params);
      }
   }

   function managingNegativeNumber() {
      if (label.innerHTML === "") {
         if (queue.innerHTML === "") {
            label.innerHTML += "-";
         } else {
            changeOperator("-");
         }
      } else {
         if (queue.innerHTML != "") {
            performOperation();
            label.innerHTML = "";
            return;
         }
         queue.innerHTML = label.innerHTML + "-";
         label.innerHTML = "";
      }
   }

   function changeOperator(newOperator) {
      let str = Array.from(queue.innerHTML);
      str[queue.innerHTML.length - 1] = newOperator;
      queue.innerHTML = str.join("");
   }

   function createAndAddNumbers() {
      for (let i = 0; i < 10; i++) {
         let button = createButton(i, `calc-btn-${i}`);
         let calc = document.querySelector(".calc");
         calc.appendChild(button);
      }
   }

   function createButton(text, className) {
      let button = document.createElement("button");
      button.innerText = text;
      button.classList.add("calc-btn");
      button.classList.add(className);
      return button;
   }
};

calc();
// let calc = function() {
//    const buttons = document.querySelectorAll(".calc-btn");
//    let label = document.querySelector(".label");
//    let queue = document.querySelector(".queue");
//    const operators = /\+|\/|\*|-/;
//    const operatorBtns = document.querySelectorAll(".calc-btn-operator");
//    let equalBtnPressed = false;
//    let isFloat = false;
//    label.innerHTML = "";

//    buttons.forEach(button => {
//       button.addEventListener("click", () => {
//          if (button.innerHTML === "=") {
//             if (queue.innerHTML === "" || label.innerHTML === "") {
//                return;
//             }
//             equalBtnPressed = true;
//             performOperation();
//             label.innerHTML = queue.innerHTML;
//             queue.innerHTML = "";
//             return;
//          }

//          if (button.innerHTML === "&lt;") {
//             let char = label.innerHTML.charAt(label.innerHTML.length - 1);
//             label.innerHTML = label.innerHTML.replace(char, "");
//             if (label.innerHTML.length === 0) {
//                label.innerHTML = "";
//             }
//             preventDivisionByZero();
//             return;
//          }

//          if (button.innerHTML === "C") {
//             label.innerHTML = "";
//             queue.innerHTML = "";
//             preventDivisionByZero();
//             return;
//          }

//          if (equalBtnPressed) {
//             label.innerHTML = "";
//             equalBtnPressed = false;
//          }

//          if (button.innerHTML === "-") {
//             managingNegativeNumber();
//             return;
//          }

//          if (
//             button.innerHTML === "+" ||
//             button.innerHTML === "/" ||
//             button.innerHTML === "*"
//          ) {
//             if (label.innerHTML === "") {
//                changeOperator(button.innerHTML);
//                return;
//             }
//             if (mustPerformOperation()) {
//                performOperation();
//                label.innerHTML = "";
//                return;
//             }

//             queue.innerHTML = label.innerHTML + button.innerHTML;
//             label.innerHTML = "";
//          } else {
//             label.innerHTML += button.innerHTML;
//          }
//          preventDivisionByZero();
//       });
//    });

//    function preventDivisionByZero() {
//       if (queue.innerHTML === "") {
//          return;
//       }
//       if (
//          (/\//.test(queue.innerHTML) && label.innerHTML === "0") ||
//          (/\//.test(queue.innerHTML) && label.innerHTML === "0.") ||
//          (/\//.test(queue.innerHTML) && /^\..*/.test(label.innerHTML))
//       ) {
//          operatorBtns.forEach(operator => {
//             operator.classList.add("disable-btn");
//          });
//       } else {
//          operatorBtns.forEach(operator => {
//             operator.classList.remove("disable-btn");
//          });
//       }
//    }

//    function mustPerformOperation() {
//       return operators.test(queue.innerHTML);
//    }

//    function performOperation() {
//       isFloat = false;
//       const operator = queue.innerHTML.slice(queue.innerHTML.length - 1);
//       const leftSide = floatOrInt(queue.innerHTML);
//       const rightSide = floatOrInt(label.innerHTML);

//       switch (operator) {
//          case "+":
//             queue.innerHTML = leftSide + rightSide;
//             break;
//          case "-":
//             queue.innerHTML = leftSide - rightSide;
//             break;
//          case "*":
//             queue.innerHTML = leftSide * rightSide;
//             break;
//          case "/":
//             queue.innerHTML = leftSide / rightSide;
//             break;
//       }
//       if (isFloat || /\./.test(queue.innerHTML)) {
//          queue.innerHTML = parseFloat(queue.innerHTML).toFixed(4);
//       }
//       if (!equalBtnPressed) {
//          queue.innerHTML += operator;
//       }
//    }

//    function floatOrInt(params) {
//       if (/\./.test(queue.innerHTML) || /\./.test(label.innerHTML)) {
//          isFloat = true;
//          return parseFloat(params);
//       } else {
//          return parseInt(params);
//       }
//    }

//    function managingNegativeNumber() {
//       if (label.innerHTML === "") {
//          if (queue.innerHTML === "") {
//             label.innerHTML += "-";
//          } else {
//             changeOperator("-");
//          }
//       } else {
//          if (queue.innerHTML != "") {
//             performOperation();
//             label.innerHTML = "";
//             return;
//          }
//          queue.innerHTML = label.innerHTML + "-";
//          label.innerHTML = "";
//       }
//    }

//    function changeOperator(newOperator) {
//       let str = Array.from(queue.innerHTML);
//       str[queue.innerHTML.length - 1] = newOperator;
//       queue.innerHTML = str.join("");
//    }
// };

// calc();
