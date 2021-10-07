import Link from 'next/link'
import Image from 'next/image'

import * as Styles from './styles'
import Button from '../Button'
import Typography from '../Typography'
import addToCart from '../../helper/addToCart'


const ProductCard = ({singleSushi}) => {
  const AddToCartHandler = () => addToCart(singleSushi)

  return (
    <Styles.ProductCardContainer>
      <Link href={`/sushi/${singleSushi.slug}`} passHref>
        <Styles.ProductImage>
          <Image
            src={singleSushi.image}
            alt={singleSushi.name}
            width={216}
            height={126}
          />
        </Styles.ProductImage>
      </Link>

      <Styles.ProductInfo>
        <Link href={`/sushi/${singleSushi.slug}`}>
          <a>
            <Typography size={'4'} fontWeight={'500'}>{singleSushi.name}</Typography>
          </a>
        </Link>
        <Link href={`/sushi/${singleSushi.slug}`}>
          <a>
            <Typography textColor={'#F3A229'} fontWeight={'600'}>{singleSushi.quantity} г</Typography>
            <Typography lineHeight={'1.5'}> - {singleSushi.description}</Typography>
          </a>
        </Link>
        <Styles.ProductBuy>
          <Button onClick={AddToCartHandler}><Typography fontWeight={'600'} textColor={'#fff'}>В
            корзину</Typography></Button>
          <Typography size={'4'} fontWeight={'600'}>{singleSushi.price} грн</Typography>
        </Styles.ProductBuy>
      </Styles.ProductInfo>

    </Styles.ProductCardContainer>
  )
}

export default ProductCard
