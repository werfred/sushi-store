import Cookies from 'js-cookie'
import {setTokenAction, store} from 'store'

export const setTokenInCookie = (token) => {
  Cookies.set('token', token, {path: '', expires: 2, secure: true})
  store.dispatch(setTokenAction(token))
}

export const removeTokenFromCookie = () => {
  Cookies.remove('token', {path: '', expires: 2, secure: true})
}
