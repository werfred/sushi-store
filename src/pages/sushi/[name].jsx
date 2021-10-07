import * as Styles from '../../styles/sushiStyles'
import Seo from '../../components/Seo'
import Layout from '../../layout'
import BaseContainer from '../../components/BaseContainer'
import Heading from '../../components/Heading'
import ProductCardsList from '../../components/ProductCardsList'
import SingleProduct from '../../components/SingleProduct'


const SingleProductPage = (props) => {
  return (
    <>
      <Seo />
      <Layout>
        <Styles.SingleSushi>
          <BaseContainer>
            <SingleProduct singleSushi={props.singleSushi} />
            {props.recommendedSushi.length > 0 && (
              <Styles.RecommendationContainer>
                <Heading>Також рекомендуємо спробувати</Heading>
                <ProductCardsList sushi={props.recommendedSushi} />
              </Styles.RecommendationContainer>
            )}
          </BaseContainer>
        </Styles.SingleSushi>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const singleProductResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sushi/slug/${context.params.name}`)
  const singleProduct = await singleProductResponse.json()

  const recommendedProductsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sushi/?category=${singleProduct.categoryNames.categoryName}&exclude=${context.params.name}`)
  const recommendedProduct = await recommendedProductsResponse.json()

  return {
    props: {
      singleSushi: singleProduct,
      recommendedSushi: recommendedProduct
    }
  }
}

export default SingleProductPage
