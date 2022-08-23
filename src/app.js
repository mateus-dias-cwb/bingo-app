// import "./components/BingoCard/BingoCard"
import "./components/Raffler/Raffler"
import "./app.scss"

const bodyTag = document.querySelector("body")
const card = document.createElement("bingo-card")
const raffler = document.createElement('bingo-raffler')

bodyTag.append(card, raffler)