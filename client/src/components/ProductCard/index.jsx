import * as Styles from './styles'
import Button from '../Button'
import Typography from '../Typography'


const ProductCard = (props) => {
  return (
    <Styles.ProductCardContainer>
      <Styles.ProductImage>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={props.image} alt={props.name} />
      </Styles.ProductImage>

      <Styles.ProductInfo>
        <Typography size={'4'} fontWeight={'500'}>{props.name}</Typography>
        <div>
          <Typography textColor={'#F3A229'} fontWeight={'600'}>{props.quantity} г</Typography>
          <Typography lineHeight={'1.5'}>{props.description}</Typography>
        </div>

        <Styles.ProductBuy>
          <Button><Typography fontWeight={'600'} textColor={'#fff'}>В корзину</Typography></Button>
          <Styles.DiscountPrice discount={props.discount}>
            <Typography size={'4'} fontWeight={'600'}>{props.price} грн</Typography>
          </Styles.DiscountPrice>
        </Styles.ProductBuy>
      </Styles.ProductInfo>

    </Styles.ProductCardContainer>
  )
}

export default ProductCard
