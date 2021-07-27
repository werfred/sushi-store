import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'

import * as Styles from './styles'
import Button from '../Button'
import Typography from '../Typography'

import Arrow from '../../images/single-arrow.svg'
import {setCartItemsAmountAction} from '../../store'


const SingleSushi = ({singleSushi}) => {
  const dispatch = useDispatch()
  const filteredProducts = useSelector(state => state.filteredProducts)
  const [prevNextProducts, setPrevNextProducts] = useState([null, null])

  const getPrevNext = () => {
    let prev, next
    let index = 0

    if (filteredProducts.length > 0){
      filteredProducts.forEach((product, i)=> {
        if(product.id === singleSushi.id){
          index = i
        }
      })
      if(index !== 0) {
        prev = filteredProducts[index-1].slug
      }
      if(filteredProducts[index+1]) {
        next = filteredProducts[index+1].slug
      }
    } else {
      console.log('gg')
    }
    return [prev, next]
  }

  useEffect(() => {
    const prevNext = getPrevNext()
    setPrevNextProducts(prevNext)
  }, [singleSushi])

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
      {prevNextProducts[0] && <Link href={`/sushi/${prevNextProducts[0]}`} replace passHref><Styles.PrevButton><Arrow /></Styles.PrevButton></Link>}
      {prevNextProducts[1] && <Link href={`/sushi/${prevNextProducts[1]}`} replace passHref><Styles.NextButton><Arrow /></Styles.NextButton></Link>}
    </Styles.ProductContainer>
  )
}


export default SingleSushi
