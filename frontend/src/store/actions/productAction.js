import axios from 'axios'
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
} from "../types/productConstants"

export const productListAction = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ 
      type: PRODUCT_LIST_REQUEST
    })

    const { data } = await axios.get(`/api/products?keyword=${keyword}`)
    dispatch({ 
      type: PRODUCT_LIST_SUCCESS, 
      payload: data 
    })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_LIST_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const productDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ 
      type: PRODUCT_DETAILS_REQUEST
    })

    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ 
      type: PRODUCT_DETAILS_SUCCESS, 
      payload: data 
    })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_DETAILS_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}
export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(`/api/products/${productId}/reviews`, review, config)

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_CREATE_REVIEW_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}
export const productTopRated = () => async (dispatch) => {
  try {
    dispatch({ 
      type: PRODUCT_TOP_REQUEST
    })

    const { data } = await axios.get(`/api/products/top`)
    dispatch({ 
      type: PRODUCT_TOP_SUCCESS, 
      payload: data 
    })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_TOP_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const addToCollectionAction = (id) => 
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: PRODUCT_ADD_COLLECTION,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
      }
    })
    localStorage.setItem('collectionItems', JSON.stringify(getState().productCollection.collectionItems))
}

export const removeFromCollectionAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_REMOVE_COLLECTION,
    payload: id
  })
  
  localStorage.setItem('collectionItems', JSON.stringify(getState().productCollection.collectionItems))
}