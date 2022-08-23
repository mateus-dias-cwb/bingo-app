export function setNumbers(key, array) {
  window.localStorage.setItem(key, JSON.stringify(array))
}
export function getNumbers(key) {
  return JSON.parse(window.localStorage.getItem(key))
}
export function removeNumbers(key) {
  window.localStorage.removeItem(key)
}