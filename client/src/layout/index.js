import Nav from '../components/Nav'
import Footer from '../components/Footer'


const Layout = (props) => {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        {props.children}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
