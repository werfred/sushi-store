import * as Styles from './styles'
import ProductCard from '../ProductCard'


const ProductCardsList = (props) => {
  const products = props.sushi

  return (
    <Styles.ProductCardsListContainer>
      {products.map(product => (
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
  )
}

export default ProductCardsList
