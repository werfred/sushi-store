import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import Cookies from 'js-cookie'

import {translations} from 'components/Translations/constants/translations'


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['token', 'userData', 'resetToken', 'translations', 'currentTranslation']
}

const initialState = {
  isLoading: false,
  token: Cookies.get('token') || null,
  resetToken: null,
  userData: null,
  cartItemsAmount: 0,
  cartProducts: [],
  cartPrice: 0,
  products: [],
  filteredProducts: [],
  filteredProductsByCategory: [],
  currentCategory: 'All',
  currentModal: '',
  translations: translations,
  currentTranslation: translations.filter(t => t.locale === 'uk')[0]
}

const SET_LOADING = 'SET_LOADING'
const SET_TOKEN = 'SET_TOKEN'
const SET_RESET_TOKEN = 'SET_RESET_TOKEN'
const SET_USER_DATA = 'SET_USER_DATA'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS'
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'
const SET_FILTERED_PRODUCTS_BY_CATEGORY = 'SET_FILTERED_PRODUCTS_BY_CATEGORY'
const SET_CURRENT_MODAL = 'SET_CURRENT_MODAL'
const SET_PRODUCT_TO_CART = 'SET_PRODUCT_TO_CART'
const CLEAR_PRODUCTS_CART = 'CLEAR_PRODUCTS_CART'
const SET_CART_PRICE = 'SET_CART_PRICE'
const SET_CART_AMOUNT = 'SET_CART_AMOUNT'

const SET_TRANSLATIONS = 'SET_TRANSLATIONS'
const SET_CURRENT_TRANSLATION = 'SET_CURRENT_TRANSLATION'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {...state, isLoading: action.payload}

    case SET_TOKEN:
      return {...state, token: action.payload}

    case SET_RESET_TOKEN:
      return {...state, resetToken: action.payload}

    case SET_USER_DATA:
      return {...state, userData: action.payload}

    case SET_PRODUCTS:
      return {...state, products: action.payload}

    case SET_FILTERED_PRODUCTS:
      return {...state, filteredProducts: action.payload}

    case SET_FILTERED_PRODUCTS_BY_CATEGORY:
      return {...state, filteredProductsByCategory: action.payload}

    case SET_CURRENT_CATEGORY:
      return {...state, currentCategory: action.payload}

    case SET_CURRENT_MODAL:
      return {...state, currentModal: action.payload}

    case SET_PRODUCT_TO_CART:
      let cartProductsCopy = [...state.cartProducts]

      let objIndex = cartProductsCopy.findIndex(product => product.id === action.payload.id)
      if (objIndex >= 0) {
        if (action.payload.amount > 0) {
          cartProductsCopy[objIndex].amount = action.payload.amount
        } else {
          cartProductsCopy = cartProductsCopy.filter(product => product.id !== action.payload.id)
        }
        return {...state, cartProducts: [...cartProductsCopy]}
      } else {
        return {...state, cartProducts: [...cartProductsCopy, action.payload]}
      }

    case CLEAR_PRODUCTS_CART:
      return {...state, cartProducts: []}

    case SET_CART_AMOUNT:
      return {...state, cartItemsAmount: action.payload}

    case SET_CART_PRICE:
      return {...state, cartPrice: action.payload}

    case SET_TRANSLATIONS:
      return {...state, translations: [...action.payload]}

    case SET_CURRENT_TRANSLATION:
      return {...state, currentTranslation: action.payload}
    default:
      return state
  }
}

export const setLoadingAction = (payload) => ({type: SET_LOADING, payload})
export const setTokenAction = (payload) => ({type: SET_TOKEN, payload})
export const setResetTokenAction = (payload) => ({type: SET_RESET_TOKEN, payload})
export const setUserDataAction = (payload) => ({type: SET_USER_DATA, payload})
export const setCurrentModalAction = (payload) => ({type: SET_CURRENT_MODAL, payload})
export const setCartAmountAction = (payload) => ({type: SET_CART_AMOUNT, payload})
export const setCartPriceAction = (payload) => ({type: SET_CART_PRICE, payload})
export const setProductToCartAction = (payload) => ({type: SET_PRODUCT_TO_CART, payload})
export const clearProductsCartAction = (payload) => ({type: CLEAR_PRODUCTS_CART, payload})
export const setProductsAction = (payload) => ({type: SET_PRODUCTS, payload})
export const setFilteredProductsAction = (payload) => ({type: SET_FILTERED_PRODUCTS, payload})
export const setFilteredProductsByCategoryAction = (payload) => ({type: SET_FILTERED_PRODUCTS_BY_CATEGORY, payload})
export const setCurrentCategoryAction = (payload) => ({type: SET_CURRENT_CATEGORY, payload})

export const setCurrentTranslationAction = (payload) => ({type: SET_CURRENT_TRANSLATION, payload})
export const setTranslationsAction = (payload) => ({type: SET_TRANSLATIONS, payload})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)
