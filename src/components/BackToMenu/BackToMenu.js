import styles from './back-to-menu.styles.scss'
import { navigateTo } from '../../router'

export default class BackToMenu extends HTMLElement {
  constructor() {
    super()

    this.currentPage = window.location.pathname

    this.attachShadow({mode: 'open'})
    this.attachStyle()
    this.createButton()
  }

  attachStyle() {
    const style = document.createElement("style")
    style.innerHTML = styles
    this.shadowRoot.append(style)
  }

  createButton() {  
    const menuIcon = document.createElement('span')
    menuIcon.classList.add('menuIcon')

    const menuLabel = document.createElement('span')
    menuLabel.classList.add('menuLabel')
    menuLabel.innerHTML = "Menu"
    
    const menuBtn = document.createElement('button')
    menuBtn.classList.add('back-to-menu-btn')
    menuBtn.append(menuIcon)
    menuBtn.append(menuLabel)
    menuBtn.addEventListener('click', evt => {
      navigateTo('/')
    })

    this.shadowRoot.append(menuBtn)    
  }

}
customElements.define('back-to-menu', BackToMenu)