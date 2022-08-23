import styles from './resetter.styles.scss'
import { removeNumbers } from '../../numberStorage'

export default class Resetter extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'})
    this.attachStyle()
    this.createResetter()
  }

  attachStyle() {
    const style = document.createElement("style")
    style.innerHTML = styles
    this.shadowRoot.append(style)
  }

  createResetter() {
    const resetter = document.createElement('button')
    resetter.classList.add('resetter-btn')
    resetter.innerHTML = 'Reset'
    resetter.addEventListener('click', evt => {
      removeNumbers('hostNumbers')
      removeNumbers('playerNumbers')
    })
    this.shadowRoot.append(resetter)
  }
}
customElements.define('game-resetter', Resetter)