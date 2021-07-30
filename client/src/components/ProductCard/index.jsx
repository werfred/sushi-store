import Link from 'next/link'
import {useDispatch} from 'react-redux'

import * as Styles from './styles'
import Button from '../Button'
import Typography from '../Typography'
import {setCartItemsAmountAction} from '../../store'


const ProductCard = (props) => {
  const dispatch = useDispatch()

  const AddToCartHandler = () => {
    dispatch(setCartItemsAmountAction())
  }

  return (
    <Styles.ProductCardContainer>
      <Link href={`/sushi/${props.slug}`} passHref>
        <Styles.ProductImage>
          <img src={props.image} alt={props.name} />
        </Styles.ProductImage>
      </Link>

      <Styles.ProductInfo>
        <Link href={`/sushi/${props.slug}`}>
          <a>
            <Typography size={'4'} fontWeight={'500'}>{props.name}</Typography>
          </a>
        </Link>
        <Link href={`/sushi/${props.slug}`}>
          <a>
            <Typography textColor={'#F3A229'} fontWeight={'600'}>{props.quantity} г</Typography>
            <Typography lineHeight={'1.5'}> - {props.description}</Typography>
          </a>
        </Link>
        <Styles.ProductBuy>
          <Button onClick={AddToCartHandler}><Typography fontWeight={'600'} textColor={'#fff'}>В корзину</Typography></Button>
          <Typography size={'4'} fontWeight={'600'}>{props.price} грн</Typography>
        </Styles.ProductBuy>
      </Styles.ProductInfo>

    </Styles.ProductCardContainer>
  )
}

export default ProductCard
