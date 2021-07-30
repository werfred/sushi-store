import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import * as Styles from '../styles/homeStyles'
import Seo from '../components/Seo'
import Layout from '../layout'
import BaseContainer from '../components/BaseContainer'
import ProductCardsList from '../components/ProductCardsList'
import CategoryFilter from '../components/CategoryFilter'
import Sorting from '../components/Sorting'
import {setFilteredProductsAction, setProductsAction} from '../store'
import PriceRangeFilter from '../components/PriceRangeFilter'


const Home = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProductsAction(props.sushi))
    dispatch(setFilteredProductsAction(props.sushi))
  }, [props.sushi])


  return (
    <>
      <Seo />
      <Layout>
        <BaseContainer>
          <Styles.FiltersArea>
            <Styles.Filters>
              <CategoryFilter categories={props.categories} />
              <PriceRangeFilter />
            </Styles.Filters>
            <Sorting />
          </Styles.FiltersArea>
          <ProductCardsList sushi={props.sushi} />
        </BaseContainer>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const [sushiResponse, categoriesResponse] = await Promise.all([
    fetch(`http://127.0.0.1:8000/api/sushi`),
    fetch(`http://127.0.0.1:8000/api/sushi/categories`)
  ])
  const [sushi, categories] = await Promise.all([
    sushiResponse.json(),
    categoriesResponse.json()
  ])

  return {
    props: {
      sushi: sushi,
      categories: categories
    }
  }
}


export default Home
