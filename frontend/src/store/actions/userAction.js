import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,  
} from '../types/userConstants'
import axios from 'axios'

export const login = (phone, verifyCode) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = {
      headers: { 'Content-type': 'application/json' }
    }
    
    const { data } = await axios.post(
      '/api/users/login', 
      { phone, verifyCode }, config)

    dispatch({ 
      type: USER_LOGIN_SUCCESS, 
      payload: data 
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ 
      type: USER_LOGIN_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const signup = (phone, verifyCode) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST })
    const config = {
      headers: { 'Content-type': 'application/json' }
    }
    
    const { data } = await axios.post(
      '/api/users/signup', 
      { phone, verifyCode }, config)

    dispatch({ 
      type: USER_SIGNUP_SUCCESS, 
      payload: data 
    })
    dispatch({ 
      type: USER_LOGIN_SUCCESS, 
      payload: data 
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ 
      type: USER_SIGNUP_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/login'
}