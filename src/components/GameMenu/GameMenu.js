import styles from './game-menu.styles.scss'
import { navigateTo } from '../../router'

export default class GameMenu extends HTMLElement {
  constructor() {
    super()

    this.currentPage = window.location.pathname

    this.attachShadow({mode: 'open'})
    this.attachStyle()
    this.createMenu()
  }

  attachStyle() {
    const style = document.createElement("style")
    style.innerHTML = styles
    this.shadowRoot.append(style)
  }

  createMenu() {
    const menu = document.createElement('nav')
    menu.classList.add('game-menu')
    menu.append(
      this.createMenuItem('Sortear', '/sortear'),
      this.createMenuItem('Jogar', '/jogar')
    )
        
    this.shadowRoot.append(menu)
  }

  createMenuItem(label, pathname) {
    const menuItem = document.createElement('button')
    menuItem.classList.add('menu-item')
    if (this.currentPage == pathname){
      menuItem.classList.add('selected')
    }
    menuItem.innerHTML = label
    menuItem.addEventListener('click', evt => {
      navigateTo(pathname)
    })
    return menuItem
  }

}
customElements.define('game-menu', GameMenu)