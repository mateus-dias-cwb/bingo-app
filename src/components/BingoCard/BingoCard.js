import styles from "./bingo-card.styles.scss"

export default class BingoCard extends HTMLElement {
  constructor() {
    super()

    const storedCardNumbers = JSON.parse(window.localStorage.getItem("bingoNumbers"))
    this.cardNumbers = storedCardNumbers ? storedCardNumbers : []
    const card = this.createBingoCard()
    this.bingoCardSetUp(card, 25)

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

  createBingoNumber(num=null, i=null) {
    const number = document.createElement("div")
    number.classList.add("bingo-number")
    number.setAttribute("id", i)
    if (num) {
      number.innerHTML = ('0' + num.number).slice(-2)
      if (num.marked) {
        number.classList.add("marked")
      } else {
        number.classList.remove("marked")
      }
    } else {
      number.innerHTML = ('0' + this.generateNewNumber()).slice(-2)
    }
    number.addEventListener("click", evt => {
      number.classList.toggle("marked")
      const bingoNumbers = JSON.parse(window.localStorage.getItem("bingoNumbers"))
      const num = bingoNumbers[number.getAttribute("id")]
      num.marked = !num.marked
      window.localStorage.setItem("bingoNumbers", JSON.stringify(bingoNumbers))
    })
    return number
  }

  generateNewNumber(min = 0, max = 101) {
    let newNumber = Math.floor(Math.random() * (max - min) + min)
    let newNumberIndex = this.cardNumbers.findIndex(item => {
      if (item.number === newNumber)
        return true
    })
    while (newNumberIndex != -1) {
      newNumber = Math.floor(Math.random() * (max - min) + min)
      newNumberIndex = this.cardNumbers.findIndex(item => {
        if (item.number === newNumber)
          return true
      })
    }
    this.cardNumbers.push({number:newNumber,marked:false})
    return newNumber
  }

  bingoCardSetUp(card, cardSize) {
    for(let i = 0; i < cardSize; i++) {
      const number = this.createBingoNumber(this.cardNumbers[i], i)
      card.append(number)
    }
    
    window.localStorage.setItem("bingoNumbers", JSON.stringify(this.cardNumbers))
  }
}
customElements.define("bingo-card", BingoCard)

