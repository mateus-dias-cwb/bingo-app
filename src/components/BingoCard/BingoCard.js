import styles from "./bingo-card.styles.scss"

export default class BingoCard extends HTMLElement {
  constructor() {
    super()

    this.playerCard = {
      size: 25,
      maxValue: 100
    }
    this.playerNumbers = []
    this.generatePlayerNumbers()
    const card = this.createBingoCard()
    this.bingoCardSetUp(card)
    
    this.attachShadow({mode: "open"})
    this.attachStyle()
    this.shadowRoot.append(card)
  }

  attachStyle() {
    const style = document.createElement("style")
    style.innerHTML = styles
    this.shadowRoot.append(style)
  }

  generatePlayerNumbers() {
    const storedData = JSON.parse(window.localStorage.getItem("playerNumbers"))
    if (storedData) {
      this.playerNumbers = storedData
    }
    else {
      for(let i = 0; i < this.playerCard.size; i++) {
        this.playerNumbers.push({value:this.generateNewNumber(),marked:false})
      }
      window.localStorage.setItem("playerNumbers", JSON.stringify(this.playerNumbers))
    }
  }

  createBingoCard() {
    const card = document.createElement("div")
    card.classList.add("bingo-card")
    return card
  }

  createBingoNumber(i) {
    const number = document.createElement("div")
    number.classList.add("bingo-number")
    number.setAttribute("id", i)
    number.innerHTML = ('0' + this.playerNumbers[i].value).slice(-2)
    if (this.playerNumbers[i].marked) {
      number.classList.add("marked")
    } else {
      number.classList.remove("marked")
    }
    number.addEventListener("click", evt => {
      this.toggleMarked(number)
    })
    return number
  }

  toggleMarked(number) {
    number.classList.toggle("marked")
    const playerNumbers = JSON.parse(window.localStorage.getItem("playerNumbers"))
    const num = playerNumbers[number.getAttribute("id")]
    num.marked = !num.marked
    window.localStorage.setItem("playerNumbers", JSON.stringify(playerNumbers))
  }

  generateNewNumber() {
    let newNumber = this.generateRandomNumber()
    do {
      newNumber = this.generateRandomNumber()
    } while  (this.validateNewNumber(newNumber))
    return newNumber
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (this.playerCard.maxValue))
  }

  validateNewNumber(number) {
    const isValid = this.playerNumbers.findIndex(item => {
      return item.value == number ? true : false
    }) === -1 ? true : false
    return !isValid
  }

  bingoCardSetUp(card) {
    for(let i = 0; i < this.playerCard.size; i++) {
      const number = this.createBingoNumber(i)
      card.append(number)
    }
  }
}
customElements.define("bingo-card", BingoCard)

