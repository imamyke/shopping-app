import styled from 'styled-components'
import clsx from 'clsx'
import { DefaultNavbar } from '../components'
import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { Toast, Grid, Stepper, Tag } from "antd-mobile"
import { EditSFill } from 'antd-mobile-icons'
import { useDispatch, useSelector } from 'react-redux'
import { 
  addToCartAction, 
  savePaymentMethodsAction,
  saveShippingAddressAction,
  createOrderAction 
} from "../store/actions"
import { ORDER_CREATE_RESET } from '../store/types/orderConstants'

const FillOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const cart = useSelector(state => state.cart)
  const { cartItems, shippingAddress, paymentMethod: payment } = cart

  const [paymentMethod, setPaymentMethod] = useState(payment)
  const [name, setName] = useState(shippingAddress.name)
  const [phone, setPhone] = useState(shippingAddress.phone)
  const [address, setAddress] = useState(shippingAddress.address)
  const [edit, setEdit] = useState(false)
  const handleSubmitOrder = () => {
    if (!name || !phone || !address) {
      navigate('/fillorder')
      Toast.show({
        content: '请输入正确的收货信息',
        duration:'2000'
      })
      return
    } else if (!Object.keys(paymentMethod).length){
      Toast.show({
        content: '请输入支付方式',
        duration:'2000'
      })
    } else {
      // 總價: 
      cart.totalPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
      
      dispatch(createOrderAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        totalPrice: cart.totalPrice
      }))
    }
  }


  const handleAddToCart = (id, qty) => {
    dispatch(addToCartAction(id, qty))
  }
  useEffect(() => {
    dispatch(savePaymentMethodsAction(paymentMethod))
    dispatch(saveShippingAddressAction({ name, phone, address }))
  }, [ dispatch, paymentMethod, name, phone, address ])

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [navigate, dispatch, success, order])
  
  return (
    <>
      <DefaultNavbar back='/cart' title='填写订单' />
      <StyledOrderContainer>
        {cartItems.map(item => (
          <StyledProductCard image={item.image} key={item.product}>
            <Grid columns={3}>
              <Grid.Item span={1}>
                <div className='image-container'>
                  <div className="image"></div>
                </div>
              </Grid.Item>
              <Grid.Item span={2}>
                <div className="card-content">
                  <p className="card-title">
                    {item.name}
                  </p>
                  <div className="card-price">
                    <div>
                      $<span className="price">{item.price}</span>
                    </div>
                    <div>
                      <Stepper
                        defaultValue={item.qty}
                        onChange={value => handleAddToCart(item.product, value)}
                      />
                    </div>
                  </div>
                </div>
              </Grid.Item>
            </Grid>
          </StyledProductCard>))}
      </StyledOrderContainer>
      <StyledPaymentContainer>
        <h1>支付方式</h1>
        <Tag 
          className={clsx('', { active: paymentMethod === '货到付款' })}
          round 
          color='#eee' 
          style={{ 
            '--text-color': '#aaa', 
            fontWeight: 'bold', 
            padding: '6px 10px',
            margin: '0 8px' 
          }}
          onClick={() => setPaymentMethod('货到付款')}
        >
        货到付款
        </Tag>
        <Tag 
          className={clsx('', { active: paymentMethod === '在线支付' })}
          round 
          color='#eee'
          style={{ 
            '--text-color': '#aaa', 
            fontWeight: 'bold', 
            padding: '6px 10px',
            margin: '0 8px' 
          }}
          onClick={() => setPaymentMethod('在线支付')}
        >
        在线支付
        </Tag>
        <Tag 
          className={clsx('', { active: paymentMethod === '对公转账' })}
          round 
          color='#eee'
          style={{ 
            '--text-color': '#aaa', 
            fontWeight: 'bold', 
            padding: '6px 10px',
            margin: '0 8px' 
          }}
          onClick={() => setPaymentMethod('对公转账')}
        >
        对公转账
        </Tag>
      </StyledPaymentContainer>
      <StyledFormContainer>
        <div className='edit'>
          <EditSFill onClick={() => setEdit(true)} />
        </div>
        <h1>收货信息</h1>
        <form>
          <div className='form-item'>
            <label htmlFor="name">收货人</label>
            <span 
              className={clsx('', { inputBody: true, isEdit: edit })}
            >{shippingAddress.name}</span>
            <input 
              className={clsx('', { isEdit: edit })}
              ref={inputRef}
              id='name' type="text" 
              placeholder='请输入收货人' 
              defaultValue={shippingAddress.name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-item'>
            <label htmlFor="phone">手机号码</label>
            <span 
              className={clsx('', { inputBody: true, isEdit: edit })}
            >{shippingAddress.phone}</span>
            <input id='phone' type="text" 
              className={clsx('', { isEdit: edit })}
              ref={inputRef}
              placeholder='请输入收货人手机号码'
              defaultValue={shippingAddress.phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className='form-item'>
            <label htmlFor="address">收货地址</label>
            <span 
              className={clsx('', { inputBody: true, isEdit: edit })}
              >{shippingAddress.phone}</span>
            <input 
              className={clsx('', { isEdit: edit })}
              ref={inputRef}
              id='address' type="text" 
              placeholder='请输入收货地址'
              defaultValue={shippingAddress.address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </form>
      </StyledFormContainer>
      <StyledBottomTabBar>
        <div className="item quantity-container">
          <h1 className="price-container">
            ￥<span className="price">{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
          </h1>
          <div className="item cart-button">
            <button
              onClick={handleSubmitOrder}
            >提交订单</button>
          </div>
        </div>
      </StyledBottomTabBar>
    </>
  )
}

export default FillOrder

const StyledFormContainer = styled.div`
  position: relative;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 85px;
  padding: 10px;
  h1 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  .edit {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 16px;
    color: #666;
  }  
  .form-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  } 
  label {
    width: 60px;
    font-weight: bold;
    font-size: 12px;
  }
  .inputBody, input {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    flex: 1;
    padding: 0;
  }
  .inputBody.isEdit {
    display: none;
  }
  input.isEdit {
    display: block;
  }
  .inputBody {
    display: block;
  }
  input {
    display: none;
    border: 0;
    &:focus {
      outline: 0;
    }
  }
`

const StyledOrderContainer = styled.div`
  margin-top: 55px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
`
const StyledPaymentContainer = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  h1 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .active {
    border: 1px solid rgb(225, 37, 27);
    color: rgb(225, 37, 27);
    background: rgb(253, 231, 230);
  }
`
const StyledBottomTabBar = styled.div`
  border: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  padding: 0 20px 0 20px;
  border-radius: 20px 20px 0 0;
  .item {
    padding: 10px 0;
  }
  .adm-tab-bar-item {
    color: #666;
  }
  .price-container {
    color: rgb(225, 37, 27);
    font-weight: bold;
    font-size: 10px;
    .price {
      font-size: 20px;
    }
  }
  .quantity-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  .cart-button {
    display: flex;
    justify-content: center;
    button {
      border: 0;
      display: block;
      padding: 8px 20px;
      border-radius: 28px;
      background: rgb(225, 37, 27);
      color: #fff;
    }
  }
`
const StyledProductCard = styled.a`
  position: relative;
  overflow: hidden;
  display: block;
  background-color: #fff;
  margin: 0 10px 10px 10px;
  .image-container {
    width: 100%;
    position: relative;
  }
  .image-container:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${props => `url(${props.image})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .adm-button-fill-none {
    color: rgb(225, 37, 27);
  }
  .card-content {
    padding: 8px;
    .card-title {
      height: 40px;
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      color: #000;
      transition: color 0.2s ease 0s;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .card-price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
      font-size: 12px;
      margin-top: 28px;
      color: rgb(225, 37, 27);
      .price {
        font-size: 20px;
      }
      .current-sale {
        display: block;
        color: #aaaaaa;
        font-weight: 700;
        font-size: 10px;
        margin-top: 6px;
      }
    }
  }
`