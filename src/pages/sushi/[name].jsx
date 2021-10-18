import {useSelector} from 'react-redux'

import * as Styles from 'styles/sushiStyles'
import Seo from 'components/Seo'
import Layout from 'layout'
import BaseContainer from 'components/BaseContainer'
import Heading from 'components/Heading'
import ProductCardsList from 'components/ProductCardsList'
import SingleProduct from 'components/SingleProduct'


const SingleProductPage = (props) => {
  const translation = useSelector(state => state.currentTranslation)

  return (
    <>
      <Seo />
      <Layout>
        <Styles.SingleSushi>
          <BaseContainer>
            <SingleProduct singleSushi={props.singleSushi} />
            {props.recommendedSushi.length > 0 && (
              <Styles.RecommendationContainer>
                <Heading>{translation.sushi.alsoRecommendTrying}</Heading>
                <ProductCardsList sushi={props.recommendedSushi} />
              </Styles.RecommendationContainer>
            )}
          </BaseContainer>
        </Styles.SingleSushi>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sushi`)
  const sushi = await response.json()

  const paths = sushi.map((item) => ({
    params: {name: item.slug}
  }))

  return {paths, fallback: 'blocking'}
}

export async function getStaticProps(context) {
  const singleProductResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sushi/slug/${context.params.name}`)
  const singleProduct = await singleProductResponse.json()

  const recommendedProductsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sushi/?category=${singleProduct.categoryName.en}&exclude=${context.params.name}`)
  const recommendedProduct = await recommendedProductsResponse.json()

  return {
    props: {
      singleSushi: singleProduct,
      recommendedSushi: recommendedProduct
    },
    revalidate: 60
  }
}

export default SingleProductPage
