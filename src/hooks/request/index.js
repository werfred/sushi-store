import {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

import {setLoadingAction} from 'store'
import {logout} from 'helper/logout'


export const useRequest = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    dispatch(setLoadingAction(true))
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, {method, body, headers, referrerPolicy: 'no-referrer'})

      if (response.status === 401) {
        logout()
      } else if (response.status === 429) {
        toast.error('Занадто багато запитів, спробуйте пізніше', {theme: 'colored'})
      } else if (response.status === 409) {
        toast.info('Користувач з таким email уже існує', {theme: 'colored'})
      } else if (response.status === 304) {
        toast.info('Ваш пароль не змінився', {theme: 'colored'})
      } else if (!response.ok) {
        toast.error('Щось пішло не так', {theme: 'colored'})
      }

      setTimeout(() => {
        dispatch(setLoadingAction(false))
      }, 500)
      return response

    } catch (error) {
      dispatch(setLoadingAction(false))
      setError(error.message)
      throw error
    }
  }, [])

  return {request, error}
}
