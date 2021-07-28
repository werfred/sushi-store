import Link from 'next/link'
import {useSelector} from 'react-redux'

import * as Styles from './styles'
import BaseContainer from '../BaseContainer'
import Typography from '../Typography'

import Logo from '../../images/logo.svg'
import Phone from '../../images/phone-icon.svg'
import Location from '../../images/location-icon.svg'
import Cart from '../../images/cart-icon.svg'


const Nav = () => {
  const cartItemsAmount = useSelector(state => state.cartItemsAmount)

  return (
    <Styles.Navigation>
      <BaseContainer>
        <a href={'/'}>
          <Logo />
        </a>

        <Styles.PhoneNumber href={'tel: 380999999999'}>
          <Phone />
          <Typography>+38 (099) 999 99 99</Typography>
        </Styles.PhoneNumber>

        <Styles.Location href="https://www.google.com/maps/search/?api=1&query=49.58619434%2C34.55096394" rel="noreferrer" target="_blank">
          <Location />
          <Typography size={2}>м. Полтава, вул. Європейська 10. <br /> Працюємо с 11:00 до 23:00</Typography>
        </Styles.Location>

        <Styles.Cart href={'/cart'}>
          <Styles.ItemsInCart>{cartItemsAmount}</Styles.ItemsInCart>
          <Cart />
        </Styles.Cart>

      </BaseContainer>
    </Styles.Navigation>

  )
}

export default Nav
