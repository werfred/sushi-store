import {GlobalStyles} from '../constants/globalStyles'


function MyApp({Component, pageProps}) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
