import {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

import {setLoadingAction} from 'store'
import {logout} from 'helper/logout'


export const useRequest = () => {
  const dispatch = useDispatch()
  const translation = useSelector(state => state.currentTranslation)
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
        toast.error(translation.popupMessages.tooManyRequests, {theme: 'colored'})
      } else if (response.status === 409) {
        toast.info(translation.popupMessages.userAlreadyExists, {theme: 'colored'})
      } else if (response.status === 304) {
        toast.info(translation.popupMessages.notChanged, {theme: 'colored'})
      } else if (!response.ok) {
        toast.error(translation.popupMessages.somethingWentWrong, {theme: 'colored'})
      }

      dispatch(setLoadingAction(false))
      return response

    } catch (error) {
      dispatch(setLoadingAction(false))
      setError(error.message)
      throw error
    }
  }, [dispatch,
    translation.popupMessages.notChanged,
    translation.popupMessages.somethingWentWrong,
    translation.popupMessages.tooManyRequests,
    translation.popupMessages.userAlreadyExists
  ])

  return {request, error}
}
