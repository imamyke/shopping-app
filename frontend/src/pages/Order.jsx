import styled from 'styled-components'
import { DefaultNavbar } from '../components'
import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Grid, NoticeBar } from "antd-mobile"
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components'
import { 
  addToCartAction, 
  getOrderDetailAction,
} from "../store/actions"

const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const { id } = useParams()

  const redirect = search ? `/myorders` : '/cart'

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const orderDetail = useSelector(state => state.orderDetail)
  const { loading, order, error } = orderDetail
  console.log(redirect);
  const handleAddToCart = (id, qty) => {
    dispatch(addToCartAction(id, qty))
  }
  const phoneTransfer = (phone) => {
    return phone.split('').map((item, idx) => {
      if (idx > 2 && idx < 7) {
        return '*'
      } else {
        return item
      }
    }).join('')
  }
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(getOrderDetailAction(id))
  }, [dispatch, id, userInfo, navigate])
  
  return loading ? <Loader /> : (
    <>
      <DefaultNavbar back={redirect} title='订单详情' />
      <StyledBlock style={{ marginTop: '55px' }}>
        <h1>
          <i class="fa-regular fa-circle-user" style={{ marginRight: '4px' }}></i> 
          {order.shippingDetail.name}
          <span className='order-phone'>{phoneTransfer(order.shippingDetail.phone)}</span>
        </h1>
        <span className='order-address'>地址: {order.shippingDetail.address}</span>
      </StyledBlock>
      <StyledOrderContainer>
        {order.orderItems.map(item => (
          <StyledProductCard image={item.image} key={item.product}>
          <Grid columns={4}>
            <Grid.Item span={1}>
              <div className='image-container'>
                <div className="image"></div>
              </div>
            </Grid.Item>
            <Grid.Item span={3}>
              <div className="card-content">
                <p className="card-title">
                  {item.name}
                </p>
                <div className="card-price">
                  <div>
                  ￥<span className="price">{item.price}</span>
                  </div>
                  <div className='quantity'>{item.qty}件</div>
                </div>
              </div>
              <div style={{ paddingLeft: '10px' }}>
                <NoticeBar
                color='alert'
                content='无理由退货政策，7天价保，放心购'
                style={{ fontSize: '8px' }}
              />
              </div>
            </Grid.Item>
          </Grid>
        </StyledProductCard>
        ))}
        <div className='detail-table'>
          <table>
            <tr>
              <th>实付款</th>
              <td>合計 ￥<span>{addDecimals(order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0))}</span></td>
            </tr>
            <tr>
              <th>订单编号</th>
              <td>{order._id}</td>
            </tr>
            <tr>
              <th>支付方式</th>
              <td>{order.paymentMethod}</td>
            </tr>
            <tr>
              <th>下单时间</th>
              <td>{order.createdAt.substring(0, 10)}</td>
            </tr>
            
          </table>
        </div>
      </StyledOrderContainer>
      <StyledBottomTabBar>
        <span>更多</span>
        <div className="cart-button">
          <button className='secondary'>发票服务</button>
          <button className='secondary'>退换/售后</button>
          <button className='primary'>再次购买</button>
        </div>
      </StyledBottomTabBar>
    </>
  ) 
}

export default Order


const StyledOrderContainer = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 85px;
  .detail-table {
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  table {
    width: 100%;
    th, td {
      line-height: 24px;
      padding: 0 4px;
      font-size: 12px;
      font-weight: bold;
    }
    th {
      text-align: left;
      color: #888;
    }
    td {
      text-align: right;
      border-collapse: collapse;
    }
  }
}
`
const StyledBlock = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  h1 {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .order-address {
    color: #666;
  }
  .order-phone {
    margin-left: 4px;
    color: #666;
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
  padding: 20px;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cart-button {
    display: flex;
    justify-content: center;
    button {
      border: 0;
      display: block;
      margin-left: 8px;
      padding: 4px 10px;
      border-radius: 28px;
      &.primary {
        background: rgb(225, 37, 27);
        color: #fff;
      }
      &.secondary {
        border: 1px solid #aaa;
        color: #000;
        background: #fff;
      }
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
  .adm-notice-bar {
    height: 24px;
  }
  .card-content {
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
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
      font-weight: bold;
      font-size: 12px;
      color: #000;
      margin-left: 10px;
      .price {
        font-size: 16px;
      }
      .quantity {
        color: #888;
        margin-top: 4px;
        text-align: center;
        font-size: 8px;
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


  