import styled from 'styled-components'
import bottomTab from '../constants/bottomTab'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BottomTabBar } from '../components'
import { NavBar, Stepper, Grid, NoticeBar } from 'antd-mobile'
import { MoreOutline } from 'antd-mobile-icons'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCartAction } from '../store/actions/cartAction'
import { SmileOutline } from 'antd-mobile-icons'

import avatar from '../assets/images/avatar.jpeg'

const Cart = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log(cartItems);
  const right = (
    <MoreOutline fontSize={20} />
  )
  const handleCheckout = () => {
    navigate(`/login?redirect=shipping`)
  }
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCartAction(id))
  }
  
  return (
    <div>
      <NavBar 
        back="购物车"
        right={right} 
        backArrow={false}
        style={{ background: '#fff' }}
      >
      </NavBar>
      <div style={{ padding: '10px' }}>
        <span style={{ color: '#fb5d5a', fontWeight: 'bold' }}>
          全部 {cartItems.reduce((acc, item) => acc + item.qty, 0)}
        </span>
      </div>
      { cartItems.length ? (
        cartItems.map(item => (
          <StyledProductCard image={item.image} key={item.product}>
            <StyledRemoveButton onClick={() => handleRemoveFromCart(item.product)}>
              <i class="fa-solid fa-xmark"></i>
            </StyledRemoveButton>
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
                        onChange={value => {
                          console.log(value)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Grid.Item>
            </Grid>
        </StyledProductCard>))
      ) : (
        <NoticeBar
          icon={<SmileOutline />}
          content={'挑点喜欢的装进购物车吧'}
          color='alert'
        />
      )}
      <StyledCheckout>
        <div className='checkout'>
          合计: ￥
          <span className='price'>
            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </span> 
        </div>
        <div>
          <StyledCheckoutButton onClick={handleCheckout}>
            去结算 ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
          </StyledCheckoutButton>
        </div>
      </StyledCheckout>
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={navigate}
      />
    </div>
  )
}

export default Cart

const StyledCheckout = styled.div`
  background: #fff;
  padding: 16px;
  margin: 10px 10px 60px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  .checkout {
    font-size: 14px;
    font-weight: bold;
  }
  .price {
    font-size: 18px;
  }
`
const StyledCheckoutButton = styled.button`
  display: block;
  background: #fb5d5a;
  border: 0;
  color: #fff;
  padding: 6px 10px;
  border-radius: 16px;
  font-size: 12px;
`
const StyledProductCard = styled.a`
  position: relative;
  border-radius: 10px;
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
      height: 48px;
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
      margin-top: 24px;
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
const StyledRemoveButton = styled.button`
  display: block;
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: 50%;
  background: #aaa;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  opacity: 0.8;
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #eee;
  }
`