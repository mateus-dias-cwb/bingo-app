import styles from './bingo-card.styles.scss'
import { formatNumber, generateNewNumber } from '../../controllers/numberGenerator'
import { getNumbers, setNumbers } from '../../controllers/numberStorage'

export default class BingoCard extends HTMLElement {
  constructor() {
    super()

    this.cardSize = 25
    this.cardMax = 100

    this.playerNumbers = []
    
    this.attachShadow({mode: 'open'})
    this.attachStyle()
    this.init()
  }

  static get observedAttributes() {
    return ['data-size', 'data-max'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue != newValue) {
      switch (name) {
        case 'data-size':
          this.cardSize = newValue
          break;
        case 'data-max':
          this.cardMax = newValue
          break;    
        default:
          break;
      }
    }
  }

  init() {
    this.generatePlayerNumbers()
    const card = this.createBingoCard()
    this.shadowRoot.append(card)
  }

  generatePlayerNumbers() {
    const storedData = getNumbers('playerNumbers')
    if (storedData) {
      this.playerNumbers = storedData
    }
    else {
      for(let i = 0; i < this.cardSize; i++) {
        this.playerNumbers.push({
          value:generateNewNumber(
            this.cardMax,
            this.playerNumbers
          ),
          marked:false
        })
      }
      setNumbers('playerNumbers', this.playerNumbers)
    }
  }

  createBingoCard() {
    const card = document.createElement('div')
    card.classList.add('bingo-card')
    this.bingoCardSetUp(card)
    return card
  }

  bingoCardSetUp(card) {
    for(let i = 0; i < this.cardSize; i++) {
      const numberTag = this.createBingoNumber(i)
      card.append(numberTag)
    }
  }

  createBingoNumber(num) {
    const number = document.createElement('div')
    number.classList.add('bingo-number')
    number.setAttribute('id', num)
    number.innerHTML = formatNumber(this.playerNumbers[num].value)
    if (this.playerNumbers[num].marked) {
      number.classList.add('marked')
    } else {
      number.classList.remove('marked')
    }
    number.addEventListener('click', evt => {
      this.toggleMarked(number)
    })
    return number
  }

  toggleMarked(number) {
    number.classList.toggle('marked')
    const playerNumbers = getNumbers('playerNumbers')
    const num = playerNumbers[number.getAttribute('id')]
    num.marked = !num.marked
    setNumbers('playerNumbers', playerNumbers)
  }

  attachStyle() {
    const style = document.createElement('style')
    style.innerHTML = styles
    this.shadowRoot.append(style)
  }
}
customElements.define('bingo-card', BingoCard)

