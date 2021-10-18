import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useSelector} from 'react-redux'

import * as Styles from './styles'
import Button from '../Button'
import Typography from '../Typography'
import addToCart from '../../helper/addToCart'


const ProductCard = ({singleSushi}) => {
  const router = useRouter()
  const translation = useSelector(state => state.currentTranslation)

  const AddToCartHandler = () => addToCart(singleSushi)


  return (
    <Styles.ProductCardContainer>
      <Link href={`/sushi/${singleSushi.slug}`} passHref>
        <Styles.ProductImage>
          <Image
            src={singleSushi.image}
            alt={singleSushi.name[router.locale]}
            width={216}
            height={126}
          />
        </Styles.ProductImage>
      </Link>

      <Styles.ProductInfo>
        <Link href={`/sushi/${singleSushi.slug}`}>
          <a>
            <Typography size={'4'} fontWeight={'500'}>{singleSushi.name[router.locale]}</Typography>
          </a>
        </Link>
        <Link href={`/sushi/${singleSushi.slug}`}>
          <a>
            <Typography textColor={'#F3A229'} fontWeight={'600'}>{singleSushi.quantity} {translation.sushi.g}</Typography>
            <Typography lineHeight={'1.5'}> - {singleSushi.description[router.locale]}</Typography>
          </a>
        </Link>
        <Styles.ProductBuy>
          <Button onClick={AddToCartHandler}>
            <Typography fontWeight={'600'} textColor={'#fff'}>{translation.sushi.addToCart}</Typography>
          </Button>
          <Typography size={'4'} fontWeight={'600'}>{singleSushi.price} {translation.sushi.grn}</Typography>
        </Styles.ProductBuy>
      </Styles.ProductInfo>

    </Styles.ProductCardContainer>
  )
}

export default ProductCard
