import {
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, 
  PRODUCT_DETAILS_SUCCESS, 
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_ADD_COLLECTION,
  PRODUCT_REMOVE_COLLECTION,
  PRODUCT_REMOVE_COLLECTIONS
} from '../types/productConstants'

export const productListReducer = (
  state = { productList: [] }, 
  action
  ) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, productList: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, productList: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
  ) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: [] }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const productReviewCreateReducer = (
  state = {},
  action
  ) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
export const productTopRatedReducer = (
  state = { products: [] }, 
  action
  ) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const productCollectReducer = (
  state = { collectionItems: [] }, 
  action
  ) => {
  switch (action.type) {
    case PRODUCT_ADD_COLLECTION:
      const item = action.payload
      const existItem = state.collectionItems.find(collectionItem => collectionItem.product === item.product)
      
      if (existItem) {
        return {
          ...state,
          collectionItems: state.collectionItems.map(collectionItem => collectionItem.product === existItem.product ? item : collectionItem)
        }
      } else {
        return {
          ...state,
          collectionItems: [...state.collectionItems, item]
        }
      }
    case PRODUCT_REMOVE_COLLECTION:
      return {
        ...state,
        collectionItems: state.collectionItems.filter(collectionItem => collectionItem.product !== action.payload)
      }
    // case PRODUCT_REMOVE_COLLECTIONS:
    //   return {
    //     ...state,
    //     collectionItems: []
    //   }
    default:
      return state
  }
}