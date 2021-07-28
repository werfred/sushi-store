import {useEffect, useState} from 'react'
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

  const [productsToShow, setProductsToShow] = useState([])
  useEffect(() => {
    dispatch(setProductsAction(props.sushi))
    dispatch(setFilteredProductsAction(props.sushi))

    // dispatch(setLoadingAction(true))
    //
    // setTimeout(() => {
    //   dispatch(setLoadingAction(false))
    // }, 1000)
  }, [])

  useEffect(() => {
    setProductsToShow(filteredProducts)
  }, [filteredProducts])


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
          <ProductCardsList sushi={productsToShow} />
          {/*{productsToShow.length > 0 ? (*/}
          {/*  <>*/}
          {/*    <Heading>Роли</Heading>*/}
          {/*    <ProductCardsList sushi={productsToShow} />*/}
          {/*  </>*/}
          {/*) : (*/}
          {/*  <Styles.ProductsNotFound>*/}
          {/*    <Typography size={6}>На жаль, товарів які б задовольніли ваші налаштування, не знайдено</Typography>*/}
          {/*    <Typography size={5}>Змініть налаштування фільтрів, або обновіть сторінку</Typography>*/}
          {/*    <NotFound />*/}
          {/*  </Styles.ProductsNotFound>*/}
          {/*)}*/}
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
