import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from '../styles/homeStyles'
import Seo from '../components/Seo'
import Layout from '../layout'
import BaseContainer from '../components/BaseContainer'
import ProductCardsList from '../components/ProductCardsList'
import CategoryFilter from '../components/CategoryFilter'
import Sorting from '../components/Sorting'
import {setFilteredProductsAction, setProductsAction} from 'store'
import PriceRangeFilter from '../components/PriceRangeFilter'
import Heading from '../components/Heading'
import Typography from '../components/Typography'

import NotFound from '../images/product_not-found.svg'


const Home = (props) => {
  const dispatch = useDispatch()
  const filteredProducts = useSelector(state => state.filteredProducts)

  const [productsToShow, setProductsToShow] = useState(props.sushi)

  useEffect(() => {
    setProductsToShow(filteredProducts)
  }, [filteredProducts])

  useEffect(() => {
    dispatch(setProductsAction(props.sushi))
    dispatch(setFilteredProductsAction(props.sushi))
  }, [])


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
          {productsToShow.length > 0 ? (
            <>
              <Heading>Роли</Heading>
              <ProductCardsList sushi={productsToShow} />
            </>
          ) : (
            <Styles.ProductsNotFound>
              <Typography size={6}>На жаль, товарів які б задовольняли ваші налаштування, не знайдено</Typography>
              <Typography size={5}>Змініть налаштування фільтрів, або обновіть сторінку</Typography>
              <NotFound />
            </Styles.ProductsNotFound>
          )}
        </BaseContainer>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const [sushiResponse, categoriesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sushi`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sushi/categories`)
  ])
  const [sushi, categories] = await Promise.all([
    sushiResponse.json(),
    categoriesResponse.json()
  ])

  return {
    props: {
      sushi: sushi,
      categories: categories
    },
    revalidate: 60,
  }
}


export default Home
