import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from '../styles/homeStyles'
import Seo from '../components/Seo'
import Layout from '../layout'
import BaseContainer from '../components/BaseContainer'
import ProductCardsList from '../components/ProductCardsList'
import Heading from '../components/Heading'
import CategoryFilter from '../components/CategoryFilter'
import Sorting from '../components/Sorting'
import {setFilteredProductsAction, setLoadingAction, setProductsAction} from '../store'
import PriceRangeFilter from '../components/PriceRangeFilter'
import Typography from '../components/Typography'

import NotFound from '../images/product_not-found.svg'


const Home = (props) => {
  const dispatch = useDispatch()
  const filteredProducts = useSelector(state => state.filteredProducts)

  useEffect(() => {
    dispatch(setProductsAction(props.sushi))
    dispatch(setFilteredProductsAction(props.sushi))
  }, [])


  if(filteredProducts.length === 0) {
    dispatch(setLoadingAction(true))
  } else {
    setTimeout(() => {
      dispatch(setLoadingAction(false))
    }, 1000)
  }

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
          <Heading>Роли</Heading>
          <ProductCardsList sushi={filteredProducts.length > 0 ? filteredProducts : props.sushi} />
        </BaseContainer>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const [sushiResponse, categoriesResponse] = await Promise.all([
    fetch(`http://127.0.0.1:8000/api/sushi/?format=json`),
    fetch(`http://127.0.0.1:8000/api/sushi/categories?format=json`)
  ])
  const [sushi, categories] = await Promise.all([
    sushiResponse.json(),
    categoriesResponse.json()
  ])

  return {
    props: {
      sushi: sushi.data,
      categories: categories.data
    },
    revalidate: 10
  }
}


export default Home
