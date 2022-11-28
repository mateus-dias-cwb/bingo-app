export function generateNewNumber(max, array) {
  let newNumber = generateRandomNumber(max)
  do {
    newNumber = generateRandomNumber(max)
  } while (!validateNewNumber(newNumber, array))
  return newNumber
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * (max))
}

function validateNewNumber(number, array) {
  return array.findIndex(item => {
    const validation = (item.value == number) && item.marked ? true : false
    return validation
  }) === -1 ? true : false
}

export function formatNumber(num) {
  return num < 100 ? ('0' + num).slice(-2) : num
}