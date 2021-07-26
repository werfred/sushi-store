import {createStore} from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension'


const initialState = {
  isLoading: false,
  cartItemsAmount: 0,
  products: [],
  filteredProducts: []
}


const SET_LOADING = 'SET_LOADING'
const SET_CART_ITEMS_AMOUNT = 'SET_CART_ITEMS_AMOUNT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      if (action.payload){
        document.body.style.overflowY = 'hidden'
      } else {
        document.body.style.overflowY = 'scroll'
      }
      return {...state, isLoading: action.payload}

    case SET_CART_ITEMS_AMOUNT:
      return {...state, cartItemsAmount: state.cartItemsAmount+1}

    case SET_PRODUCTS:
      return {...state, products: action.payload}

    case SET_FILTERED_PRODUCTS:
      return {...state, filteredProducts: action.payload}
    default:
      return state
  }
}

export const setLoadingAction = (payload) => ({type: SET_LOADING, payload})
export const setCartItemsAmountAction = (payload) => ({type: SET_CART_ITEMS_AMOUNT, payload})
export const setProductsAction = (payload) => ({type: SET_PRODUCTS, payload})
export const setFilteredProductsAction = (payload) => ({type: SET_FILTERED_PRODUCTS, payload})

const store = createStore(reducer, composeWithDevTools())

export {store}
