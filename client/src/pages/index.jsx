import {useDispatch, useSelector} from 'react-redux'

import * as Styles from '../styles/homeStyles'
import Seo from '../components/Seo'
import Layout from '../layout'
import BaseContainer from '../components/BaseContainer'
import ProductCardsList from '../components/ProductCardsList'
import Heading from '../components/Heading'
import Filters from '../components/Filters'
import Sorting from '../components/Sorting'
import {setProductsAction} from '../store'


const Home = (props) => {
  const dispatch = useDispatch()
  dispatch(setProductsAction(props.sushi))

  const filteredProducts = useSelector(state => state.filteredProducts)

  return (
    <>
      <Seo />
      <Layout>
        <BaseContainer>
          <Styles.FiltersArea>
            <Filters />
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
  const response = await fetch('http://127.0.0.1:8000/api/sushi/?format=json')
  const sushi = await response.json()

  return {
    props: {
      sushi: sushi.data
    }
  }
}


export default Home
