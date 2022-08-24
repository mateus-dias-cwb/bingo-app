export function generateNewNumber(max, array) {
  let newNumber = generateRandomNumber(max)
  do {
    newNumber = generateRandomNumber(max)
  } while  (!validateNewNumber(newNumber, array))
  return newNumber
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * (max))
}

function validateNewNumber(number, array) {
  const isValid = array.findIndex(item => {
    return item.value == number && item.marked ? true : false
  }) === -1 ? true : false
  return isValid
}

export function formatNumber(num) {
  return num < 100 ? ('0' + num).slice(-2) : num
}