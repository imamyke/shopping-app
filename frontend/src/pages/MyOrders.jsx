import styled from 'styled-components'
import { DefaultNavbar, Loader } from "../components"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Grid, NoticeBar } from "antd-mobile"
import { myOrderListAction } from '../store/actions'


const MyOrders = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const orderMyList = useSelector(state => state.orderMyList)
  const { loading, orders, error } = orderMyList
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      dispatch(myOrderListAction())
    }
  }, [navigate, userInfo, dispatch])

let orderItems = []
if (orders) {
  const orderDetail = orders.map(order => {
    return order
  })
  const orderItemsInList = orderDetail.map(item => {
    return [item.orderItems, item._id, item.isDelivered]
  })
  for (let item of orderItemsInList) {
    orderItems.push(item)
  }
}
  return (
    <>
      <DefaultNavbar back="/about" title="我的订单" />
      { loading 
        ? <Loader /> 
        : (
        <StyledOrderContainer>
          {orderItems.map(order => 
            order[0].map((item, idx)=> 
              <>
                <StyledProductCard 
                  image={item.image} 
                  key={idx}
                  onClick={() => navigate(`/order/${order[1]}?redirect=myorders`)}
                >
                  <Grid columns={4}>
                    <Grid.Item span={1}>
                      <div className='image-container'>
                        <div className="image"></div>
                      </div>
                    </Grid.Item>
                    <Grid.Item span={3}>
                      <div className="card-content">
                        <div>
                          <p className='shipping-status'>{order[2] ? '完成' : '运送中'}</p>
                          <p className="card-title">
                            {item.name}
                          </p>
                        </div>
                        <div className="card-price">
                          <div>
                          ￥<span className="price">{item.price}</span>
                          </div>
                          <div className='quantity'>{item.qty}件</div>
                        </div>
                      </div>
                    </Grid.Item>
                  </Grid>
                  <StyledAction>
                  <span>更多</span>
                  <div className="cart-button">
                    <button className='secondary'>查看发票</button>
                    <button className='secondary'>退换/售后</button>
                    <button className='primary'>再次购买</button>
                  </div>
                  </StyledAction>
                </StyledProductCard>
              </>
            )
          )}
        </StyledOrderContainer>
        )}
    </>
  )
}

export default MyOrders

const StyledAction = styled.div`
  padding-top: 10px;
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
        border: 1px solid rgb(225, 37, 27);
        color: rgb(225, 37, 27);
        background: #fff;
      }
      &.secondary {
        border: 1px solid #aaa;
        color: #000;
        background: #fff;
      }
    }
  }
`

const StyledOrderContainer = styled.div`
  border-radius: 10px;
  margin-top: 55px;
  margin-bottom: 85px;
  .detail-table {
    background: #fff;
    padding: 10px;
    border-radius: 10px;
  }
`
const StyledProductCard = styled.div`
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: block;
  background-color: #fff;
  margin: 0 10px 10px 10px;
  padding: 10px;
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
    .shipping-status{
      color: #aaaaaa;
      margin-bottom: 4px;
    }
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
      align-self: flex-end;
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
        line-height: 20px;
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