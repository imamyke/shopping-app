import { NavBar, Grid } from "antd-mobile"
import styled from "styled-components"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productDetailAction } from "../store/actions"
import { useEffect } from "react"
import { TabBar } from 'antd-mobile'
import { Loader } from '../components'


const AddButton = () => {
  return (
    <StyledAddButton>加入购物车</StyledAddButton>
  )
}

const StyledAddButton = styled.button`
  display: block;
  border: 0;
  padding: 6px 16px;
  border-radius: 14px;
  background: rgb(225, 37, 27);
  color: #fff;
`

const StyledBottomTabBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  .adm-tab-bar-item {
    color: #453C41;
  }
  .adm-tab-bar-item-active {
    color: #fb5d5a;
    font-weight: bold;
  }
`

const ProductDetail = () => {
  const tabs = [
    {
      key: 'cart',
      title: '购物车',
      icon: <i class="fa-solid fa-bag-shopping"></i>,
      handleClick: ''
    },
    {
      key: 'addCart',
      icon: <AddButton />,
      handleClick: () => navigate('/cart')
    },
  ]
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params
  const dispatch = useDispatch()
  const results = useSelector(state => state.productDetail)
  const { loading, product, error } = results
  useEffect(() => {
    dispatch(productDetailAction(id))
  }, [dispatch, id])

  return (
    <>
      <StyledNavbarContainer>
        <NavBar onBack={() => navigate('/')}>产品详情</NavBar>
      </StyledNavbarContainer>
      { loading && <Loader /> }
      <StyledProductCard
        image={`${product.image}`}
      >
        <div className='image-container'>
          <div className="image"></div>
        </div>
      </StyledProductCard>
      <StyledDetailContainer>
        <div className="product-price">
          ￥<span className="price">{product.price}</span>
        </div>
        <h1 className="product-name">{product.name}</h1>

        <h1>规格参数</h1>
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
      <StyledBottomTabBar>
        <TabBar style={{ background: '#fff' }}>
          {tabs.map(item => (
            <TabBar.Item 
              key={item.key} 
              icon={item.icon} 
              title={item.title}
              onClick={item.handleClick}
            />
          ))}
        </TabBar>
      </StyledBottomTabBar>
    </>
  )
}



export default ProductDetail

const StyledDetailContainer = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 10px 60px 10px;
  h1 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
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
      font-size: 14px;
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

const StyledNavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .adm-nav-bar-back-arrow {
    font-size: 14px;
  }
  .adm-nav-bar-title {
    font-size: 16px;
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