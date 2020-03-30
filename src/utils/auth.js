import Cookies from 'js-cookie'
import store from '@/store'

const TokenKey = 'manage-token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
export function getMenuAuth (path) {
  console.log('menu-->', store.getters.menu)
  const item = getMenu(store.getters.menu, path)
  return item
}

export function getMenu (menu, path) {
  var ret = null
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    if (item.children && item.children.length > 0) {
      ret = getMenu(item.children, path)
      if (ret) {
        break
      }
    } else if (path === '/' + item.url) {
      ret = item
      break
    }
  }
  return ret
}
