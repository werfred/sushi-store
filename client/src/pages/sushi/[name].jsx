import {useDispatch} from 'react-redux'
import {useEffect} from 'react'

import * as Styles from '../../styles/sushiStyles'
import Seo from '../../components/Seo'
import Layout from '../../layout'
import BaseContainer from '../../components/BaseContainer'
import SingleSushi from '../../components/SingleSushi'
import Heading from '../../components/Heading'
import ProductCardsList from '../../components/ProductCardsList'
import {setLoadingAction} from '../../store'


const SingleProductPage = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoadingAction(false))
    }, 1000)
  }, [])

  return (
    <>
      <Seo />
      <Layout>
        <Styles.SingleSushi>
          <BaseContainer>
            <SingleSushi singleSushi={props.singleSushi} />
            <Styles.RecommendationContainer>
              <Heading>Також рекомендуємо спробувати</Heading>
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
    fetch(`http://127.0.0.1:8000/api/sushi/slug/${context.params.name}`),
    fetch(`http://127.0.0.1:8000/api/sushi/?limit=4`)
  ])
  const [singleSushi, recommendedSushi] = await Promise.all([
    singleSushiResponse.json(),
    recommendedSushiResponse.json()
  ])

  return {
    props: {
      singleSushi: singleSushi,
      recommendedSushi: recommendedSushi
    }
  }
}

export default SingleProductPage
