import Seo from '../components/Seo'


const Home = (props) => {
  return (
    <>
      <Seo />
      <header>
        HEADER
      </header>

      <main>
        {JSON.stringify(props.data, null, '  ')}
      </main>

      <footer>
        FOOTER
      </footer>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://127.0.0.1:8000/api/sushi?format=json')
  const data = await response.json()
  return {
    props: data
  }
}


export default Home