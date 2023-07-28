import styled from 'styled-components'
import { Grid } from 'antd-mobile'

const ProductCard = ({ imageUrl, name, price, sale }) => {
  return (
    <StyledProductCard imageUrl={imageUrl}>
      <Grid columns={3}>
        <Grid.Item span={1}>
          <div className='image-container'>
            <div className="image"></div>
          </div>
        </Grid.Item>
        <Grid.Item span={2}>
          <div className="card-content">
            <p className="card-title">
              {name}
            </p>
            <div className="card-price">
              $<span className="price">{price}</span>
              <span className="current-sale">近日已售{sale}+件</span>
            </div>
          </div>
        </Grid.Item>
      </Grid>
    </StyledProductCard>
  )
}

const StyledProductCard = styled.a`
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

export default ProductCard

