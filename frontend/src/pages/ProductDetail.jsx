import styled from "styled-components"
import { Stepper, Toast } from "antd-mobile"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productDetailAction, addToCartAction } from "../store/actions"
import { useEffect, useState } from "react"
import { Loader, DefaultNavbar } from '../components'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params
  const [quantity, setQuantity] = useState(1)
  const results = useSelector(state => state.productDetail)
  const { loading, product } = results
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  // 導入產品資訊
  useEffect(() => {
    dispatch(productDetailAction(id))
  }, [dispatch, id])

  const handleAddToCart = (id, qty) => {
    dispatch(addToCartAction(id, qty))
    Toast.show({
      content: '已加入购物车',
    })
  }

  return (
    <>
      <DefaultNavbar back="/" title="产品详情" />
      { loading ? <Loader /> : (
        <>
          <StyledProductCard image={`${product.image}`}>
            <div className='image-container'>
              <div className="image"></div>
            </div>
          </StyledProductCard>
          <StyledDetailContainer>
            <div className="product-price">
              ￥<span className="price">{product.price}</span>
            </div>
            <h1 className="product-name">{product.name}</h1>

            <h2>规格参数</h2>
              <table>
                { product.brand && (
                  <tr>
                    <th>品牌</th>
                    <td>{product.brand}</td>
                  </tr>
                ) }
                { product.typeNum && (
                  <tr>
                    <th>型号</th>
                    <td>{product.typeNum}</td>
                  </tr>
                ) }
                { product.scale && (
                  <tr>
                    <th>规格</th>
                    <td>{product.scale}</td>
                  </tr>
                ) }
                { product.color && (
                  <tr>
                    <th>颜色样式</th>
                    <td>{product.color}</td>
                  </tr>
                ) }
                { product.style && (
                  <tr>
                    <th>款式</th>
                    <td>{product.style}</td>
                  </tr>
                ) }
                { product.materiel && (
                  <tr>
                    <th>材质</th>
                    <td>{product.materiel}</td>
                  </tr>
                ) }
              </table>
          
          </StyledDetailContainer>
        </>
      )}
      <StyledBottomTabBar>
        <div className="item quantity-container">
          <h1 className="title">
          数量
          </h1>
          <div className="stepper">
            <Stepper
            defaultValue={1}
            onChange={value => setQuantity(value)}
          />
          </div>
        </div>
        <div className="item cart-button">
          <button
            onClick={() => handleAddToCart(id, quantity)}
          >加入购物车</button>
        </div>
      </StyledBottomTabBar>
    </>
  )
}

export default ProductDetail

const StyledDetailContainer = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 10px 110px 10px;
  h1, h2 {
    font-weight: bold;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 16px;
  }
  h2 {
    font-size: 14px;
  }
  .product-name {
    line-height: 20px;
  }
  .product-price {
    margin-bottom: 10px;
    font-weight: bold;
    color: rgb(225, 37, 27);
    .price {
      font-size: 24px;
    }
  }
  table {
    width: 100%;
    border: 1px solid #aaa;
    th, td {
      border: 1px solid #aaa;
      line-height: 20px;
      padding: 0 4px;
      font-size: 12px;
    }
    th {
      font-weight: bold;
      color: #aaa;
    }
    td {
      border-collapse: collapse;
    }
  }
`
const StyledProductCard = styled.div`
  margin-top: 45px;
  overflow: hidden;
  background-color: #fff;
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
      display: block;
      font-weight: bold;
      font-size: 12px;
      margin-top: 12px;
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
  .adm-button-fill-none {
    color: rgb(225, 37, 27);
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
      padding: 8px 50px;
      border-radius: 28px;
      background: rgb(225, 37, 27);
      color: #fff;
    }
  }
`
