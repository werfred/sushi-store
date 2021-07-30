import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from './styles'
import ProductCard from '../ProductCard'
import Heading from '../Heading'
import Typography from '../Typography'

import NotFound from '../../images/product_not-found.svg'
import {setLoadingAction} from '../../store'


const ProductCardsList = (props) => {
  const dispatch = useDispatch()
  const filteredProducts = useSelector(state => state.filteredProducts)

  const [productsToShow, setProductsToShow] = useState(props.sushi)

  useEffect(() => {
    setProductsToShow(filteredProducts)
    setTimeout(() => {
      dispatch(setLoadingAction(false))
    },  1500)
  }, [filteredProducts])

  return (
    <>
      {productsToShow.length > 0 ? (
        <>
          <Heading>Роли</Heading>
          <Styles.ProductCardsListContainer>
            {productsToShow.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                description={product.description}
                image={product.image}
                quantity={product.quantity}
                price={product.price}
                discount={product.discount}
              />
            ))}
          </Styles.ProductCardsListContainer>
        </>
      ) : (
        <Styles.ProductsNotFound>
          <Typography size={6}>На жаль, товарів які б задовольніли ваші налаштування, не знайдено</Typography>
          <Typography size={5}>Змініть налаштування фільтрів, або обновіть сторінку</Typography>
          <NotFound />
        </Styles.ProductsNotFound>
      )}
    </>
  )
}

export default ProductCardsList
