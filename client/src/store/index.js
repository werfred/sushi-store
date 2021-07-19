import {createStore} from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension'


const initialState = {
  isLoading: false
}


const SET_LOADING = 'SET_LOADING'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      if (action.payload){
        document.body.style.overflowY = 'hidden'
      } else {
        document.body.style.overflowY = 'scroll'
      }
      return {...state, isLoading: action.payload}
    default:
      return state
  }
}

export const setLoadingAction = (payload) => ({type: SET_LOADING, payload})

const store = createStore(reducer, composeWithDevTools())

export {store}
