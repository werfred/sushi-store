import * as Styles from './styles'
import ProductCard from '../ProductCard'
import Heading from '../Heading'


const RecommendedProductsCardList = (props) => {
  const products = props.sushi

  return (
    <>
      <Heading>Рекомендуємо вам також спробувати</Heading>
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
    </>
  )
}

export default RecommendedProductsCardList
