import host from './templates/host.html'
import player from './templates/player.html'
import index from './templates/index.html'

const routes = {
  '/' : index,
  '/jogar' : player,
  '/sortear' : host
}

export function navigateTo(pathname) {
  const body = document.querySelector('body')
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )

  body.innerHTML = routes[pathname]  
}