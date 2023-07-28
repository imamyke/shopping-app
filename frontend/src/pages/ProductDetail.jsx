import { NavBar, Grid } from "antd-mobile"
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { products } from "../data/products"

const ProductParameter = ({ id, products }) => {
  const product = products.filter(product => product._id === id)
    product.map(item => (
      <Grid columns={2} key={item.name}>
        <Grid.Item style={{ border: '1px solid #000', height: '20px' }}>{item.name}</Grid.Item>
        <Grid.Item style={{ border: '1px solid #000' }}>{item.value}</Grid.Item>
      </Grid>
    )
  )
}

const ProductDetail = () => {
  const navigate = useNavigate()

  return (
    <>
      <StyledNavbarContainer>
        <NavBar onBack={() => navigate('/')}>产品详情</NavBar>
      </StyledNavbarContainer>
      <StyledProductCard
        imageUrl="https://gw.alicdn.com/bao/uploaded/i1/2206356409838/O1CN01Tkt7j22MXrIlnIxXc_!!2206356409838.jpg_300x300q90.jpg_.webp"
      >
        <div className='image-container'>
          <div className="image"></div>
        </div>
      </StyledProductCard>
      <StyledDetailContainer>
        <h1>规格参数</h1>
        {/* <ProductParameter id products /> */}
        
      </StyledDetailContainer>
    </>
  )
}

export default ProductDetail

const StyledDetailContainer = styled.ul`
  padding: 16px;
  h1 {
    font-size: 16px;
  }
`

const StyledNavbarContainer = styled.div`
  .adm-nav-bar-back-arrow {
    font-size: 14px;
  }
  .adm-nav-bar-title {
    font-size: 16px;
  }
`
const StyledProductCard = styled.div`
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
    background-image: ${props => `url(${props.imageUrl})`};
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