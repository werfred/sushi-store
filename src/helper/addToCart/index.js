import {setProductToCartAction, store} from '../../store'


const addToCart = (singleSushi) => {
  const cartProducts = store.getState().cartProducts
  if (cartProducts.length !== 0) {
    const currentProduct = cartProducts.filter((product) => product.id === singleSushi.id)[0]
    if (currentProduct) {
      store.dispatch(setProductToCartAction({...currentProduct, amount: currentProduct.amount + 1}))
    } else {
      store.dispatch(setProductToCartAction({...singleSushi, amount: 1}))
    }
  } else {
    store.dispatch(setProductToCartAction({...singleSushi, amount: 1}))
  }
}

export default addToCart
