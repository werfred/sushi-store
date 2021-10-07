import {useCallback, useEffect} from 'react'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {PersistGate} from 'redux-persist/integration/react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import {GlobalStyles} from 'constants/globalStyles'
import Loader from '../components/Loader'
import {persistor, setCartAmountAction, setCartPriceAction, setLoadingAction, setUserDataAction, store} from 'store'
import {removeTokenFromCookie} from 'helper/setCookie'
import {useRequest} from 'hooks/request'


function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <GlobalStyles />
        <Loader />
        <General />
        <Component {...pageProps} />
        <ToastContainer limit={3} />
      </PersistGate>
    </Provider>
  )
}

// general logic
function General() {
  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cartProducts)
  const cartItemsAmount = useSelector(state => state.cartItemsAmount)
  const token = useSelector(state => state.token)

  const {request} = useRequest()

  useEffect(() => {
    if (cartProducts.length !== 0) {
      const cartAmount = cartProducts.reduce((sum, {amount}) => sum + amount, 0)
      const cartPrice = cartProducts.reduce((sum, {amount, price}) => sum + amount * price, 0)
      dispatch(setCartAmountAction(cartAmount))
      dispatch(setCartPriceAction(cartPrice))

      if (cartItemsAmount < cartAmount) {
        toast.success('Товар додано до кошика!', {
          theme: 'colored',
          position: 'bottom-right',
          autoClose: 3000
        })
      }
      if (cartItemsAmount > cartAmount) {
        toast.info('Товар прибрано з кошика!', {
          theme: 'colored',
          position: 'bottom-right',
          autoClose: 3000
        })
      }
    } else {
      dispatch(setCartAmountAction(0))
      dispatch(setCartPriceAction(0))
    }
  }, [cartProducts])

  const getUserData = async () => {
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, 'GET', null, {
      'Authorization': `Bearer ${token}`
    })
    dispatch(setUserDataAction(await response.json()))
  }

  useEffect(() => {
    if (token) {
      getUserData()
    }
  }, [token])

  return null
}

export default MyApp
