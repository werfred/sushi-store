import {removeTokenFromCookie} from 'helper/setCookie'
import {persistor} from 'store'


export const logout = () => {
  removeTokenFromCookie()
  persistor.purge()
  setTimeout(() => {
    location.reload()
  }, 200)
}
