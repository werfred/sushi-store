import {Provider} from 'react-redux'

import {store} from '../store'
import {GlobalStyles} from '../constants/globalStyles'
import Loader from '../components/Loader'


function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Loader />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
