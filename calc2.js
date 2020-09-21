const calculatorElt = document.getElementById("calc")
const operationElt = document.getElementById("operation");
const resultElt = document.querySelector(".result");
const operatorsElt = document.querySelectorAll(".operator")
const buttonsElt = document.querySelectorAll("button")
const backspace = "Backspace"
const enter = "Enter"
const equal = "="
const operators = ["+","-","/","*"]

let isFinished = false

document.addEventListener("keyup", e => {
  
  if(!isValid(e.key)) return

  console.log(e.key)
  handleEvent(e.key)
})

buttonsElt.forEach(button => {
  button.addEventListener("click", () => {
    handleEvent(button.textContent)
  })
})

function handleEvent(value) {

  if(isFinished) {
    isFinished = !isFinished
    operationElt.textContent = ""
  }
  
  if(value === backspace){
    resultElt.innerText = resultElt.innerText.slice(0,- 1)
    return
  }

  if(value === enter || value === equal){
    isFinished = true
    doOperation(operationElt.innerText, resultElt.innerText)
    return
  }

  if(operators.includes(value)){
    changeOperation(value)
    return
  }
  
  resultElt.innerText += value
}

function changeOperation(operator){

  const operationLastChar = operationElt.textContent.slice(-1,)
  if(operators.includes(operationLastChar)){
    operationElt.textContent = operationElt.textContent.slice(0,-1) + operator
    return
  }

  if(operationElt.textContent !== "") {
    doOperation(operationElt.textContent, resultElt.textContent)
    return
  }

  operationElt.textContent = resultElt.textContent + operator
  result.textContent = ""
}

function doOperation(value1,value2){

  if(!value2 || !value1) return

  const operator = value1.slice(-1,)
  let result
  value1 = Number.parseFloat(value1.slice(0,-1))
  value2 = Number.parseFloat(value2)
 
  switch (operator) {
    case "+":
      result = value1 + value2
    break;
    case "-":
      result = value1 - value2
    break;
    case "*":
      result = value1 * value2
    break;
    default:
      result = value1 / value2
    break;
  }
  show(operator, result)
}

function show(operator, result) {
  operationElt.textContent = isFinished ? result : result + operator
  resultElt.textContent = ""
}

function isValid(value) {
  const symbols = ["=","+","-","*","/","."]
  const regex = /^[0-9]|^(Enter)|^(Backspace)/
  return regex.test(value) || symbols.includes(value)
}