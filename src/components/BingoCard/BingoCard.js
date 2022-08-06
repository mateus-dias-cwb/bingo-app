export default class BingoCard extends HTMLElement {
  constructor() {
    super()

    const card = this.createBingoCard()
    this.bingoCardSetUp(card, 25)

    this.attachShadow({mode: "open"})
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
    number.innerHTML = "#"
    number.addEventListener("onClick", evt => {
      this.classList.toggle("bingo-card--marked")
    })
    return number
  }

  bingoCardSetUp(card, cardSize) {
    for(let i = 0; i < cardSize; i++) {
      console.log("hello")
      const number = this.createBingoNumber()
      card.append(number)
    }
  }
}
customElements.define("bingo-card", BingoCard)

