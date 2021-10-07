import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux'
import {useRef, useState} from 'react'
import {Transition} from 'react-transition-group'
import GoogleLogin from 'react-google-login'

import * as Styles from './styles'
import BaseContainer from '../BaseContainer'
import Typography from '../Typography'
import useOutsideClick from 'hooks/clickOutside'
import ModalsManager from 'components/Modals'
import {setCurrentModalAction, setUserDataAction} from 'store'
import {setTokenInCookie} from 'helper/setCookie'
import {logout} from 'helper/logout'
import {useRequest} from 'hooks/request'

import Phone from '../../images/phone-icon.svg'
import Location from '../../images/gps.svg'
import Account from '../../images/account.svg'
import Google from '../../images/google.svg'
import Cart from '../../images/cart-icon.svg'


const Nav = () => {
  const dispatch = useDispatch()
  const {request} = useRequest()
  const cartItemsAmount = useSelector(state => state.cartItemsAmount)
  const currentModal = useSelector(state => state.currentModal)
  const userData = useSelector(state => state.userData)
  const token = useSelector(state => state.token)

  const [open, setOpen] = useState(false)
  const accountContainer = useRef('')
  useOutsideClick(accountContainer, () => setOpen(false))

  const openModal = (modalName) => {
    dispatch(setCurrentModalAction(modalName))
  }

  const loginWithGoogle = async (googleData) => {
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/google-oauth`, 'POST', {token: googleData.token})
    if (response.status === 200) {
      const data = await response.json()
      setTokenInCookie(data.access)
    } else if (response.status === 204) {
      dispatch(setUserDataAction({googleName: googleData.googleName, googleEmail: googleData.googleEmail}))
      dispatch(setCurrentModalAction('modal-register'))
    }
  }

  const responseGoogleSuccess = (response) => {
    loginWithGoogle({
      token: response.tokenId,
      googleName: response.profileObj.name,
      googleEmail: response.profileObj.email
    })
  }

  const responseGoogleFailure = (response) => console.log(response)

  return (
    <>
      <Styles.Navigation>
        <BaseContainer>
          <Link href={'/'} passHref>
            <Styles.Logo>
              <picture>
                <source srcSet="/logo-small.svg" media="(max-width: 576px)" />
                <img src="/logo.svg" alt="SUSHI STORE" />
              </picture>
            </Styles.Logo>
          </Link>

          <Styles.PhoneNumber href={'tel: 380999999999'}>
            <Phone />
            <Typography size={2}>+38 (099) 999 99 99</Typography>
          </Styles.PhoneNumber>

          <Styles.Location href="https://www.google.com/maps/search/?api=1&query=49.58619434%2C34.55096394"
                           rel="noreferrer" target="_blank">
            <Location />
            <Typography size={2}>м. Полтава, вул. Європейська 10. <br /> Працюємо с 11:00 до 23:00</Typography>
          </Styles.Location>

          <Styles.Account>
            <Styles.AccountTitle onClick={() => setOpen(true)}>
              <Account />
              <Typography>{userData?.name || 'Особистий кабінет'}</Typography>
            </Styles.AccountTitle>

            <Transition
              in={open}
              appear={open}
              timeout={100}
              unmountOnExit>
              {(state) => (
                <Styles.AccountContainer state={state} ref={accountContainer}>
                  <Styles.AccountTitle onClick={() => setOpen(false)}>
                    <Account />
                    <Typography>{userData?.name || 'Особистий кабінет'}</Typography>
                  </Styles.AccountTitle>

                  {userData && token ? (
                    <Styles.MenuContainer>
                      <Link href={'/account'}>
                        <a><Typography size={4} fontWeight={500}>Персональні дані</Typography></a>
                      </Link>
                      <Link href={'/account/orders'}>
                        <a><Typography size={4} fontWeight={500}>Історія замовлень</Typography></a>
                      </Link>
                      <Styles.LogoutBtn active={false} onClick={logout}>
                        Вийти
                      </Styles.LogoutBtn>
                    </Styles.MenuContainer>
                  ) : (
                    <>
                      <Styles.LoginWithGoogleContainer>
                        <Typography>Увійти за допомогою</Typography>
                        <GoogleLogin
                          clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
                          render={renderProps => (
                            <Styles.GoogleButton
                              active={false}
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}>
                              <Google />
                            </Styles.GoogleButton>
                          )}
                          buttonText="Login"
                          onSuccess={responseGoogleSuccess}
                          onFailure={responseGoogleFailure}
                          cookiePolicy={'single_host_origin'}
                        />
                      </Styles.LoginWithGoogleContainer>

                      <Styles.AuthContainer>
                        <Typography>Або увійдіть на сайті</Typography>
                        <Styles.LoginBtn active={false}
                                         onClick={() => openModal('modal-login')}
                        >
                          Увійти
                        </Styles.LoginBtn>
                        <Styles.RegisterBtn onClick={() => openModal('modal-register')}
                                            fontWeight={600} textColor={'var(--color-primary)'}
                                            size={5}
                        >
                          Зареєструватися
                        </Styles.RegisterBtn>
                      </Styles.AuthContainer>
                    </>
                  )}
                </Styles.AccountContainer>
              )}

            </Transition>
          </Styles.Account>

          <Link href={'/cart'} passHref>
            <Styles.Cart>
              <Styles.ItemsInCart>{cartItemsAmount}</Styles.ItemsInCart>
              <Cart />
            </Styles.Cart>
          </Link>

        </BaseContainer>
      </Styles.Navigation>
      <ModalsManager closeFn={() => dispatch(setCurrentModalAction(''))} modal={currentModal} />
    </>
  )
}

export default Nav
