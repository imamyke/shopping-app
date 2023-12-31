import { 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS, 
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAIL_REQUEST, 
  ORDER_DETAIL_SUCCESS, 
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST, 
  ORDER_PAY_SUCCESS, 
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_MY_LIST_REQUEST, 
  ORDER_MY_LIST_SUCCESS, 
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_RESET,
  ORDER_UPDATE_DELIVER_REQUEST,
  ORDER_UPDATE_DELIVER_SUCCESS,
  ORDER_UPDATE_DELIVER_FAIL,
  ORDER_UPDATE_DELIVER_RESET,
  ORDER_UPDATE_PAY_REQUEST,
  ORDER_UPDATE_PAY_SUCCESS,
  ORDER_UPDATE_PAY_FAIL,
  ORDER_UPDATE_PAY_RESET,
} from "../types/orderConstants"

export const orderCreateReducer = (
  state = { productList: [] }, 
  action
  ) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
      case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailReducer = (
  state = { loading: true, orderItems: [], shippingDetail: {} }, 
  action
  ) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAIL_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPayReducer = (
  state = {}, 
  action
  ) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderMyListReducer = (
  state = { orders: [] }, 
  action
  ) => {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST:
      return { loading: true }
    case ORDER_MY_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_MY_LIST_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_MY_LIST_RESET:
      return { orders: [] }
    default:
      return state
  }
}
export const orderAdminPayReducer = (
  state = {}, 
  action
  ) => {
  switch (action.type) {
    case ORDER_UPDATE_PAY_REQUEST:
      return { loading: true }
    case ORDER_UPDATE_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_UPDATE_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_UPDATE_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderAdminDeliverReducer = (
  state = {}, 
  action
  ) => {
  switch (action.type) {
    case ORDER_UPDATE_DELIVER_REQUEST:
      return { loading: true }
    case ORDER_UPDATE_DELIVER_SUCCESS:
      return { loading: false, success: true }
    case ORDER_UPDATE_DELIVER_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_UPDATE_DELIVER_RESET:
      return {}
    default:
      return state
  }
}