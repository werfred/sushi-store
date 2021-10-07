import {setProductToCartAction, store} from 'store'


const removeFromCart = (singleSushi, amount = singleSushi.amount - 1) => {
  const cartProducts = store.getState().cartProducts

  const currentProduct = cartProducts.filter((product) => product.id === singleSushi.id)[0]
  store.dispatch(setProductToCartAction({...currentProduct, amount: amount}))
}

export default removeFromCart
