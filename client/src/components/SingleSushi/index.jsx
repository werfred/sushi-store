import * as Styles from './styles'
import Button from '../Button'
import Typography from '../Typography'


const SingleSushi = ({singleSushi}) => {

  return (
    <Styles.ProductContainer>
      <Styles.ProductImage>
        <img src={singleSushi.image} alt={singleSushi.name} />
      </Styles.ProductImage>

      <Styles.ProductContent>
        <Styles.ProductName size={7} fontWeight={600}>
          {singleSushi.name}
        </Styles.ProductName>

        <Styles.ProductQuantity textColor={'var(--color-primary)'} size={5} fontWeight={500}>
          {singleSushi.quantity} г
        </Styles.ProductQuantity>

        <Styles.ProductBuy>
          <Button><Typography fontWeight={'600'} textColor={'#fff'}>В корзину</Typography></Button>
          <Styles.Price size={5} fontWeight={500}>
            {singleSushi.price} грн
          </Styles.Price>
        </Styles.ProductBuy>
      </Styles.ProductContent>

    </Styles.ProductContainer>
  )
}

export default SingleSushi
