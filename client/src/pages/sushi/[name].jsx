import * as Styles from '../../styles/sushiStyles'
import Seo from '../../components/Seo'
import Layout from '../../layout'
import BaseContainer from '../../components/BaseContainer'
import SingleSushi from '../../components/SingleSushi'
import RecommendedProductsCardList from '../../components/RecommendedProductsCardList'
import {useEffect} from 'react'
import {setLoadingAction} from '../../store'
import {useDispatch} from 'react-redux'


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
              <RecommendedProductsCardList sushi={props.recommendedSushi} />
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
