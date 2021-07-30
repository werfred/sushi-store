import Link from 'next/link'
import {useDispatch} from 'react-redux'

import * as Styles from './styles'
import Button from '../Button'
import Typography from '../Typography'

import Arrow from '../../images/single-arrow.svg'
import {setCartItemsAmountAction} from '../../store'


const SingleSushi = ({singleSushi}) => {
  const dispatch = useDispatch()

  const AddToCartHandler = () => {
    dispatch(setCartItemsAmountAction())
  }

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

        <Styles.Ingredients>
          {singleSushi.ingredients.map((ingredient, index) => (
            <Styles.Ingredient key={index}>
              <img src={ingredient.image} alt={ingredient.name} />
              <Typography size={2}>{ingredient.nameUkr}</Typography>
            </Styles.Ingredient>
          ))}
        </Styles.Ingredients>

        <Styles.ProductBuy>
          <Button onClick={AddToCartHandler}><Typography fontWeight={'600'} textColor={'#fff'}>В корзину</Typography></Button>
          <Styles.Price size={5} fontWeight={500}>
            {singleSushi.price} грн
          </Styles.Price>
        </Styles.ProductBuy>
      </Styles.ProductContent>
      <Link href={`/sushi/${singleSushi.prev_slug}`} passHref><Styles.PrevButton><Arrow /></Styles.PrevButton></Link>
      <Link href={`/sushi/${singleSushi.next_slug}`} passHref><Styles.NextButton><Arrow /></Styles.NextButton></Link>
    </Styles.ProductContainer>
  )
}


export default SingleSushi
