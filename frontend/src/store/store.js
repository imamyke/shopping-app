import {combineReducers, legacy_createStore as createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { 
  userLoginReducer, 
  userSignupReducer, 
  userDetailReducer, 
  userUpdateProfileReducer 
} from './reducers'

// initialState
const UserInfoStorage = JSON.parse(localStorage.getItem('userInfo')) || null
const initialState = {
  userLogin: { userInfo: UserInfoStorage}
}

// reducer
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateProfileReducer
})

// enhancer
const middlewares = [thunk]

// store
const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store