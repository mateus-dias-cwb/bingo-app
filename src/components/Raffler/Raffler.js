import styles from './raffler.styles.scss'

export default class Raffler extends HTMLElement {
  constructor() {
    super()
    this.numbersTotal = 100
    const storedHostNumbers = JSON.parse(window.localStorage.getItem("hostNumbers"))
    this.hostNumbers = storedHostNumbers ? storedHostNumbers : this.generateHostNumbers()

    this.numbersTable = this.createNumbersTable()
    this.numberDisplay = this.createNumberDisplay()
    const raffleButton = this.createRaffleButton()
    const raffleSection = this.createRaffleSection()
    raffleSection.append(this.numberDisplay, raffleButton)

    this.attachShadow({mode: "open"})
    this.attachStyle()
    this.shadowRoot.append(raffleSection, this.numbersTable)
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

  createNumbersTable() {
    const numbersTable = document.createElement("section")
    numbersTable.classList.add("numbers-table")

    this.hostNumbers.forEach(item => {
      const number = document.createElement("div")
      number.classList.add("bingo-number")
      number.setAttribute("id", "id"+item.value)
      number.innerHTML = item.value < 100 ? ('0' + item.value).slice(-2) : item.value
      if (item.marked) number.classList.add("marked")
      numbersTable.append(number)
    });
    
    return numbersTable
  }

  generateHostNumbers() {
    let newNumberArray = []
    for (let i = 1; i < this.numbersTotal + 1; i++) {
      newNumberArray.push({value: i, marked: false})
    }
    window.localStorage.setItem("hostNumbers", JSON.stringify(newNumberArray))
    return newNumberArray
  }

  raffleNumber() {
    const number = this.generateNewNumber()
    this.markBingoNumber(number)
    this.numberDisplay.innerHTML = number
  }

  markBingoNumber(value) {
    const number = this.numbersTable.querySelector('#id'+value)
    number.classList.add('marked')
    this.hostNumbers[value-1].marked = true
    window.localStorage.setItem("hostNumbers", JSON.stringify(this.hostNumbers))
  }

  generateNewNumber() {
    let newNumber = this.generateRandomNumber()
    do {
      newNumber = this.generateRandomNumber()
      console.log({
        "newNumber": newNumber,
        "isValid": this.validateNewNumber(newNumber)
      })
    } while  (!this.validateNewNumber(newNumber))
    return newNumber
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (this.numbersTotal))
  }

  validateNewNumber(number) {
    const isValid = this.hostNumbers.findIndex(item => {
      return item.value == number && item.marked ? true : false
    }) === -1 ? true : false
    return isValid
  }

  

}
customElements.define('bingo-raffler', Raffler)
