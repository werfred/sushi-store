import {useEffect} from 'react'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {PersistGate} from 'redux-persist/integration/react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import {useRouter} from 'next/router'

import {GlobalStyles} from 'constants/globalStyles'
import {
  persistor,
  setCartAmountAction,
  setCartPriceAction,
  setCurrentTranslationAction,
  setUserDataAction,
  store
} from 'store'
import {useRequest} from 'hooks/request'
import Loader from '../components/Loader'
import Translations from 'components/Translations'
import * as ga from 'helper/googleAnalytics'


function MyApp({Component, pageProps}) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageView(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <GlobalStyles />
        <Loader />
        <General />
        <Translations />
        <Component {...pageProps} />
        <ToastContainer limit={2} pauseOnHover={false} autoClose={3000} />
      </PersistGate>
    </Provider>
  )
}

function General() {
  const router = useRouter()
  const dispatch = useDispatch()

  const cartProducts = useSelector(state => state.cartProducts)
  const cartItemsAmount = useSelector(state => state.cartItemsAmount)
  const token = useSelector(state => state.token)
  const translations = useSelector(state => state.translations)
  const translation = useSelector(state => state.currentTranslation)

  const {request} = useRequest()

  useEffect(() => {
    if (cartProducts.length !== 0) {
      const cartAmount = cartProducts.reduce((sum, {amount}) => sum + amount, 0)
      const cartPrice = cartProducts.reduce((sum, {amount, price}) => sum + amount * price, 0)
      dispatch(setCartAmountAction(cartAmount))
      dispatch(setCartPriceAction(cartPrice))

      if (cartItemsAmount < cartAmount) {
        toast.success(translation.popupMessages.addedToCart, {position: 'top-left'})
      }
      if (cartItemsAmount > cartAmount) {
        toast.info(translation.popupMessages.deletedFromCart, {position: 'top-left'})
      }
    } else {
      dispatch(setCartAmountAction(0))
      dispatch(setCartPriceAction(0))
    }
  }, [cartItemsAmount, cartProducts, dispatch, translation.popupMessages.addedToCart, translation.popupMessages.deletedFromCart])

  useEffect(() => {
    const getUserData = async () => {
      const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, 'GET', null, {
        'Authorization': `Bearer ${token}`
      })
      dispatch(setUserDataAction(await response.json()))
    }
    if (token) {
      getUserData().then()
    }
  }, [dispatch, request, token])

  useEffect(() => {
    const currentTranslation = translations.filter(translation => translation.locale === router.locale)
    dispatch(setCurrentTranslationAction(currentTranslation[0]))
  }, [dispatch, router.locale, translations])

  return null
}

export default MyApp
