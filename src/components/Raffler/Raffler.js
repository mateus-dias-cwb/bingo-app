import styles from './raffler.styles.scss'

export default class Raffler extends HTMLElement {
  constructor() {
    super()
    this.min = 0
    this.max = 100
    this.numbersTotal = 100
    const storedHostNumbers = JSON.parse(window.localStorage.getItem("hostNumbers"))
    this.hostNumbers = storedHostNumbers ? storedHostNumbers : []

    const numberDisplay = this.createNumberDisplay()
    const raffleButton = this.createRaffleButton()
    const raffleSection = this.createRaffleSection()
    raffleSection.append(numberDisplay, raffleButton)

    this.attachShadow({mode: "open"})
    this.attachStyle()
    this.shadowRoot.append(raffleSection)
  }

  attachStyle() {
    const style = document.createElement("style")
    style.innerHTML = styles
    this.shadowRoot.append(style)
  }

  createRaffleSection() {
    const raffleSection = document.createElement('section')
    raffleSection.classList.add('raffler')

    return raffleSection
  }

  createNumberDisplay() {
    const numberDisplay = document.createElement('div')
    numberDisplay.classList.add('number-display')
    numberDisplay.innerHTML = '01'

    return numberDisplay
  }

  createRaffleButton() {
    const raffleButton = document.createElement('button')
    raffleButton.classList.add('raffle-button')
    raffleButton.setAttribute('name', 'getNewNumber')
    raffleButton.setAttribute('type', 'button')
    raffleButton.setAttribute('value', '')
    raffleButton.innerHTML = 'Sortear'
    raffleButton.addEventListener('click', evt => {
      this.raffleNumber()
    })

    return raffleButton
  }

  createNumbers() {
    for (let i = 0; i < this.numbersTotal; i++) {
      if (!this.hostNumbers[i]) {
        this.hostNumbers.push({number: i, marked: false})
      }     
    }
    window.localStorage.setItem("hostBingoNumbers")
  }

  toggleMarked(number) {
    number.classList.toggle("marked")
    const hostNumbers = JSON.parse(window.localStorage.getItem("hostNumbers"))
    const num = hostNumbers[number.getAttribute("id")]
    num.marked = !num.marked
    window.localStorage.setItem("hostNumbers", JSON.stringify(hostNumbers))
  }

  raffleNumber() {

  }

  generateNewNumber() {
    let newNumber = Math.floor(Math.random() * (this.max - this.min) + this.min)
    let newNumberIndex = this.cardNumbers.findIndex(item => {
      if (item.number === newNumber)
        return true
    })
    while (newNumberIndex != -1) {
      newNumber = Math.floor(Math.random() * (this.max - this.min) + this.min)
      newNumberIndex = this.cardNumbers.findIndex(item => {
        if (item.number === newNumber)
          return true
      })
    }
    this.cardNumbers.push({number:newNumber,marked:false})
    return newNumber
  }

}
customElements.define('bingo-raffler', Raffler)
