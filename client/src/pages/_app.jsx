import {Provider} from 'react-redux'

import {GlobalStyles} from '../constants/globalStyles'
import Loader from '../components/Loader'
import {store} from '../store'


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
