import Seo from '../components/Seo'
import Layout from '../layout'
import BaseContainer from '../components/BaseContainer'
import ProductCardsList from '../components/ProductCardsList'


const Home = (props) => {
  return (
    <>
      <Seo />
      <Layout>
        <BaseContainer>
          <ProductCardsList data={props.data} />
        </BaseContainer>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://127.0.0.1:8000/api/sushi/?format=json')
  const data = await response.json()
  return {
    props: data
  }
}


export default Home
