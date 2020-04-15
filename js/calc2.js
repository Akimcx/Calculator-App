createButton();
const buttons = document.querySelectorAll(".calc-btn");
const calculator = document.getElementById("calc")
const operators = document.querySelectorAll(".calc-btn-operator")
const resultCss = document.querySelector(".result");
const operationCss = document.querySelector(".operation");
let result = resultCss.innerText
let operation = operationCss.innerText

document.addEventListener("keypress", e => {
  handleEvent(e.key)
})

buttons.forEach(button => {
  button.addEventListener("click", e => {
    handleEvent(button.innerText)
  })
})

function handleEvent(text) {
  const operator = operation.charAt(operation.length - 1)
  if(text === "Enter") {
    if(operation.length == 0 || result.length == 0) return
    doOperation()
    return
  }

  if(text === "C"){
    result = ""
    operation = ""
    return
  }

  if(text === "<"){
    result = result.replace(result.charAt(result.length - 1), "")
    return
  }

  if("/*-+".includes(text)){
    if(result.length == 0 && operation.length == 0) return
    if(result.length == 0 && operation.length != 0){
      operation = operation.replace(operator,text)
      show()
      return
    }
    if(operation.length == 0){
      operation = result + text
      show()
    } else {
      doOperation()
    }
    result = ""
    show()
    return
  }
  if(text === "." && result.includes(".")) return
  result += text
  show()
}

function show() {
  resultCss.innerText = result
  operationCss.innerText = operation
}

function createButton() {

  for (let i = 0; i < 10; i++) {
     const button = document.createElement("button");
     button.classList.add("calc-btn", `calc-btn-${i}`);
     button.innerText = i
     calc.appendChild(button)
  }
}

function doOperation(){

 const operator = operation.charAt(operation.length - 1)
 switch (operator) {
   case "+":
     result = addition(parseFloat(operation),parseFloat(result))
   break;
   case "-":
     result = soustraction(parseFloat(operation),parseFloat(result))
   break;
   case "*":
     result = multiplication(parseFloat(operation),parseFloat(result))
   break;
   default:
     result = division(parseFloat(operation),parseFloat(result))
   break;
 }
 operation = ""
 show()
}

function addition(leftHand, rightHand) {
  return leftHand + rightHand
}
function soustraction(leftHand, rightHand) {
  return leftHand - rightHand
}
function multiplication(leftHand, rightHand) {
  return leftHand * rightHand
}
function division(leftHand, rightHand) {
  return leftHand / rightHand
}
