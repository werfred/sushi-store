import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'

import * as Styles from '../styles/cartStyles'
import Seo from '../components/Seo'
import Layout from '../layout'
import BaseContainer from '../components/BaseContainer'
import Typography from '../components/Typography'
import Button from '../components/Button'
import CartItems from '../components/CartItems'
import OrderForm from 'components/OrderForm'
import {CartPageContainer} from 'styles/cartStyles'

import EmptyCart from '../images/empty-cart.svg'


const CartPage = () => {
  const router = useRouter()

  const cartProducts = useSelector(state => state.cartProducts)

  const backToHome = () => {
    router.push('/')
  }

  return (
    <>
      <Seo />
      <Layout>
        <BaseContainer>
          <CartPageContainer>
            {cartProducts.length === 0 ? (
              <Styles.EmptyCartContainer>
                <Styles.Info>
                  <Typography size={6} lineHeight={2} fontWeight={700}>Ваш кошик пустий</Typography>
                  <Typography size={4} lineHeight={1.5}>Найімовірніше, ви ще не додали в кошик жодної порції
                    ролів.</Typography>
                  <Typography size={4} lineHeight={1.5}>Для того, щоб зробити замовлення, перейдіть на головну
                    сторінку.</Typography>
                </Styles.Info>
                <EmptyCart />
                <Styles.ButtonsContainer>
                  <Button active={false} onClick={backToHome}>← Назад на головну</Button>
                  <Button onClick={() => router.push(`/account/orders`)}>На сторінку замовлень</Button>
                </Styles.ButtonsContainer>
              </Styles.EmptyCartContainer>
            ) : (
              <Styles.CartContainer>
                <CartItems />
                <OrderForm />
              </Styles.CartContainer>
            )}
          </CartPageContainer>
        </BaseContainer>
      </Layout>
    </>
  )
}

export default CartPage
