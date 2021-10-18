import * as Styles from './styles'
import CartItem from '../CartItem'
import Heading from '../Heading'
import Typography from '../Typography'
import {useDispatch, useSelector} from 'react-redux'
import {clearProductsCartAction} from 'store'

import Cart from '../../images/cart-icon.svg'
import TrashCan from '../../images/trash-can.svg'


const CartItems = () => {
  const dispatch = useDispatch()

  const translation = useSelector(state => state.currentTranslation)
  const cartProducts = useSelector(state => state.cartProducts)
  const cartItemsAmount = useSelector(state => state.cartItemsAmount)
  const cartPrice = useSelector(state => state.cartPrice)

  const clearCart = () => {
    dispatch(clearProductsCartAction())
  }

  return (
    <Styles.CartItems>
      <Styles.TopRow>
        <div>
          <Cart />
          <Heading>{translation.cartItems.cart}</Heading>
        </div>
        <Styles.EmptyCart onClick={clearCart}>
          <TrashCan />
          <Typography size={4} textColor={'var(--color-text)'}>{translation.cartItems.clearCart}</Typography>
        </Styles.EmptyCart>
      </Styles.TopRow>

      <Styles.CartItemsContainer>
        {cartProducts && cartProducts.map(item => (
          <CartItem
            key={item.id}
            singleSushi={item}
          />
        ))}
      </Styles.CartItemsContainer>

      <Styles.BottomRow>
        <div>
          <Typography size={5} fontWeight={500}>{translation.cartItems.totalAmount}: </Typography>
          <Typography size={5} fontWeight={500}
                      textColor={'var(--color-primary)'}>
            {cartItemsAmount} {translation.sushi.amount}
          </Typography>
        </div>
        <div>
          <Typography size={5} fontWeight={500}>{translation.cartItems.totalPrice}: </Typography>
          <Typography size={5} fontWeight={500}
                      textColor={'var(--color-primary)'}>
            {cartPrice}  {translation.sushi.grn}
          </Typography>
        </div>
      </Styles.BottomRow>
    </Styles.CartItems>
  )
}

export default CartItems
