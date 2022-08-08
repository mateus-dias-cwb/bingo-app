import styles from "./bingo-card.styles.scss"

export default class BingoCard extends HTMLElement {
  constructor() {
    super()

    this.cardNumbers = []
    const card = this.createBingoCard()
    this.bingoCardSetUp(card, 25)

    // console.log(styles)
    const style = document.createElement("style")
    style.innerHTML = styles

    this.attachShadow({mode: "open"})
    this.shadowRoot.append(style)
    this.shadowRoot.append(card)
  }

  createBingoCard() {
    const card = document.createElement("div")
    card.classList.add("bingo-card")
    return card
  }

  createBingoNumber() {
    const number = document.createElement("div")
    number.classList.add("bingo-number")
    number.innerHTML = ('0' + this.generateNewNumber()).slice(-2)
    number.addEventListener("click", evt => {
      console.log(evt)
      number.classList.toggle("marked")
    })
    return number
  }

  generateNewNumber(min = 0, max = 101) {
    let newNumber = Math.floor(Math.random() * (max - min) + min)
    let newNumberIndex = this.cardNumbers.indexOf(newNumber)
    while (newNumberIndex != -1) {
      newNumber = Math.floor(Math.random() * (max - min) + min)
      newNumberIndex = this.cardNumbers.indexOf(newNumber)
    }
    this.cardNumbers.push(newNumber)
    return newNumber
  }

  bingoCardSetUp(card, cardSize) {
    for(let i = 0; i < cardSize; i++) {
      const number = this.createBingoNumber()
      card.append(number)
    }
  }
}
customElements.define("bingo-card", BingoCard)

