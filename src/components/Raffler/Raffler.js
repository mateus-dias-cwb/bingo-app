import styles from './raffler.styles.scss'
import { generateNewNumber, formatNumber } from '../../controllers/numberGenerator'
import { setNumbers, getNumbers } from '../../controllers/numberStorage'

export default class Raffler extends HTMLElement {
  constructor() {
    super()

    this.numbersTotal = 100
    const storedHostNumbers = getNumbers('hostNumbers')
    this.hostNumbers = storedHostNumbers ? storedHostNumbers : this.generateHostNumbers()

    this.numbersTable = this.createNumbersTable()
    this.numberDisplay = this.createNumberDisplay()
    const raffleSection = this.createRaffleSection()
    raffleSection.append(this.numberDisplay, this.createRaffleButton())

    this.attachShadow({mode: 'open'})
    this.attachStyle()
    this.shadowRoot.append(raffleSection, this.numbersTable)
  }

  createRaffleSection() {
    const raffleSection = document.createElement('section')
    raffleSection.classList.add('raffler')

    return raffleSection
  }

  createNumberDisplay() {
    const numberDisplay = document.createElement('div')
    numberDisplay.classList.add('number-display')
    numberDisplay.innerHTML = '--'

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
    const numbersTable = document.createElement('section')
    numbersTable.classList.add('numbers-table')

    this.hostNumbers.forEach(item => {
      const number = document.createElement('div')
      number.classList.add('bingo-number')
      number.setAttribute('id', 'id' + item.value)
      number.innerHTML = formatNumber(item.value)
      if (item.marked) number.classList.add('marked')
      numbersTable.append(number)
    });
    
    return numbersTable
  }

  generateHostNumbers() {
    let newNumberArray = []
    for (let i = 1; i < this.numbersTotal + 1; i++) {
      newNumberArray.push({value: i, marked: false})
    }
    setNumbers('hostNumbers', newNumberArray)
    return newNumberArray
  }

  raffleNumber() {
    const number = generateNewNumber(this.numbersTotal, this.hostNumbers)
    this.markBingoNumber(number)
    this.numberDisplay.innerHTML = formatNumber(number)
  }

  markBingoNumber(value) {
    const number = this.numbersTable.querySelector('#id'+value)
    number.classList.add('marked')
    this.hostNumbers[value-1].marked = true
    setNumbers('hostNumbers', this.hostNumbers)
  }

  attachStyle() {
    const style = document.createElement('style')
    style.innerHTML = styles
    this.shadowRoot.append(style)
  }
}
customElements.define('bingo-raffler', Raffler)
