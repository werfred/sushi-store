import * as Styles from '../../styles/sushiStyles'
import Seo from '../../components/Seo'
import Layout from '../../layout'
import BaseContainer from '../../components/BaseContainer'
import SingleSushi from '../../components/SingleSushi'
import ProductCardsList from '../../components/ProductCardsList'
import Heading from '../../components/Heading'


const SingleProductPage = (props) => {

  return (
    <>
      <Seo />
      <Layout>
        <Styles.SingleSushi>
          <BaseContainer>
            <SingleSushi singleSushi={props.singleSushi} />

            <Styles.RecommendationContainer>
              <Heading>Рекомендуємо вам також спробувати</Heading>
              <ProductCardsList sushi={props.recommendedSushi} />
            </Styles.RecommendationContainer>
          </BaseContainer>
        </Styles.SingleSushi>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const [singleSushiResponse, recommendedSushiResponse] = await Promise.all([
    fetch(`http://127.0.0.1:8000/api/sushi/${context.params.name}?format=json`),
    fetch(`http://127.0.0.1:8000/api/sushi/?format=json`)
  ])
  const [singleSushi, recommendedSushi] = await Promise.all([
    singleSushiResponse.json(),
    recommendedSushiResponse.json()
  ])

  return {
    props: {
      singleSushi: singleSushi,
      recommendedSushi: recommendedSushi.data
    }
  }
}

export default SingleProductPage
