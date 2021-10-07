import Link from 'next/link'
import Image from 'next/image'

import * as Styles from './styles'
import Typography from '../Typography'
import addToCart from '../../helper/addToCart'
import removeFromCart from '../../helper/removeFromCart'


const CartItem = ({singleSushi}) => {
  const addItemToCart = () => addToCart(singleSushi)

  const removeItemFromCart = () => removeFromCart(singleSushi)

  const removeWholeItemFromCart = () => removeFromCart(singleSushi, 0)

  return (
    <Styles.CartItemContainer>
      <Link href={`/sushi/${singleSushi.slug}`} passHref>
        <Styles.Description>
          <Image
            src={singleSushi.image}
            alt={singleSushi.name}
            width={184}
            height={96}
          />
          <Styles.Info>
            <Typography size={5} fontWeight={600}>{singleSushi.name}</Typography>
            <div>
              <Typography textColor={'#F3A229'} fontWeight={600}>{singleSushi.quantity} г</Typography>
              <Typography lineHeight={1.5}> - {singleSushi.description}</Typography>
            </div>
          </Styles.Info>
        </Styles.Description>
      </Link>

      <Styles.Amount>
        <Styles.RemoveAmountButton onClick={removeItemFromCart}>
          <Typography fontWeight={600} size={6}>-</Typography>
        </Styles.RemoveAmountButton>

        <Styles.AmountNumber>
          <Typography fontWeight={600} size={5}>{singleSushi.amount}</Typography>
        </Styles.AmountNumber>

        <Styles.AddAmountButton onClick={addItemToCart}>
          <Typography fontWeight={600} size={6}>+</Typography>
        </Styles.AddAmountButton>
      </Styles.Amount>

      <Styles.ItemPrice>
        <Typography fontWeight={600} size={5}>{singleSushi.price * singleSushi.amount} грн</Typography>
      </Styles.ItemPrice>


      <Styles.DeleteItemButton onClick={removeWholeItemFromCart}>
        <Typography fontWeight={600} size={6}>x</Typography>
      </Styles.DeleteItemButton>
    </Styles.CartItemContainer>
  )
}

export default CartItem
