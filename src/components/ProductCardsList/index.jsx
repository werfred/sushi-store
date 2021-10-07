import * as Styles from './styles'
import ProductCard from '../ProductCard'


const ProductCardsList = (props) => {
  const products = props.sushi

  return (
    <Styles.ProductCardsListContainer>
      {products.map(product => (
        <ProductCard
          key={product.id}
          singleSushi={product}
        />
      ))}
    </Styles.ProductCardsListContainer>
  )
}

export default ProductCardsList
