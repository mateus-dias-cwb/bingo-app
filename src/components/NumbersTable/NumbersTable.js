import styles from './numbers-table.styles.scss'

export default class NumbersTable extends HTMLElement {
  constructor() {
    super()

    this.numbersTotal = 100
    const storedRaffleNumbers = JSON.parse(window.localStorage.getItem("raffleNumbers"))
    this.raffleNumbers = storedRaffleNumbers ? storedRaffleNumbers : []

    this.attachShadow({mode: 'open'})
  }

  attachStyle() {
    const style = document.createElement("style")
    style.innerHTML = styles
    this.shadowRoot.append(style)
  }

  createNumbersTable() {
    for (let i = 0; i < this.numbersTotal; i++) {
      const number = document.createElement("div")
      number.classList.add("bingo-number")
      number.setAttribute("id", i)
      number.innerHTML = ('0' + i).slice(-2)
      if (this.raffleNumbers[i]) {
        if (this.raffleNumbers[i].marked) {
          number.classList.add("marked")
        }
      } else {
        this.raffleNumbers.push({number: i, marked: false})
      }

    }
  }
}
customElements.define('numbers-table', NumbersTable)