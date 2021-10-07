import styled from 'styled-components'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


const MainContainer = styled.main`
  background-color: var(--color-white-bg);
  padding-top: 100px;
  min-height: calc(100vh - 80px);
  ${MEDIA_QUERIES.sm} {
    padding-top: 60px;
  }
`

const Layout = (props) => {
  return (
    <>
      <header>
        <Nav />
      </header>

      <MainContainer>
        {props.children}
      </MainContainer>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
