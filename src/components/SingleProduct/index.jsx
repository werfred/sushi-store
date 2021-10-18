import Link from 'next/link'
import {useRouter} from 'next/router'
import {useSelector} from 'react-redux'

import * as Styles from './styles'
import Button from '../Button'
import Typography from '../Typography'
import addToCart from '../../helper/addToCart'

import Arrow from '../../images/single-arrow.svg'


const SingleProduct = ({singleSushi}) => {
  const router = useRouter()
  const translation = useSelector(state => state.currentTranslation)
  const AddToCartHandler = () => addToCart(singleSushi)

  return (
    <Styles.ProductContainer>
      <Styles.ProductImage>
        <img src={singleSushi.image} alt={singleSushi.name[router.locale]} />
      </Styles.ProductImage>

      <Styles.ProductContent>
        <Styles.ProductName size={7} fontWeight={600}>
          {singleSushi.name[router.locale]}
        </Styles.ProductName>

        <Styles.ProductQuantity textColor={'var(--color-primary)'} size={5} fontWeight={500}>
          {singleSushi.quantity} {translation.sushi.g}
        </Styles.ProductQuantity>

        <Styles.Ingredients>
          {singleSushi.ingredients.map((ingredient, index) => (
            <Styles.Ingredient key={index}>
              <img src={ingredient.image} alt={ingredient.name[router.locale]} />
              <Typography size={2}>{ingredient.name[router.locale]}</Typography>
            </Styles.Ingredient>
          ))}
        </Styles.Ingredients>

        <Styles.ProductBuy>
          <Button onClick={AddToCartHandler}>
            <Typography fontWeight={'600'} textColor={'#fff'}>{translation.sushi.addToCart}</Typography>
          </Button>
          <Styles.Price size={5} fontWeight={500}>
            {singleSushi.price} {translation.sushi.grn}
          </Styles.Price>
        </Styles.ProductBuy>
      </Styles.ProductContent>
      <Link href={`/sushi/${singleSushi.prev_slug}`} passHref><Styles.PrevButton><Arrow /></Styles.PrevButton></Link>
      <Link href={`/sushi/${singleSushi.next_slug}`} passHref><Styles.NextButton><Arrow /></Styles.NextButton></Link>
    </Styles.ProductContainer>
  )
}


export default SingleProduct
