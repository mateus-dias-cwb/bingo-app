import "./components/BingoCard/BingoCard"
// import "./components/Raffler/Raffler"
import "./components/Resetter/Resetter"
import "./app.scss"

const bodyTag = document.querySelector("body")
const card = document.createElement("bingo-card")
card.dataset.size = 25
card.dataset.max = 100
// card.init()
const raffler = document.createElement('bingo-raffler')
const resetter = document.createElement('game-resetter')

bodyTag.append(card, raffler, resetter)

