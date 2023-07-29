import { 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS, 
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
} from "../types/orderConstants"
import {
  CART_REMOVE_ITEMS
} from "../types/cartConstants"
import axios from 'axios'

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: ORDER_CREATE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(`/api/orders`, order, config)

    // 提交給前端取用 data
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    dispatch({ type: CART_REMOVE_ITEMS })

    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({ 
      type: ORDER_CREATE_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}
