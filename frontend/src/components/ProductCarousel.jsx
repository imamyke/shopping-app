import { Swiper } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { productTopRated } from '../store/actions/productAction'
import { useEffect } from 'react'
import { Loader } from '../components'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'


const ProductCarousel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productTop = useSelector(state => state.productTopRated)
  const { loading, products } = productTop

  useEffect(() => {
    dispatch(productTopRated())
  }, [dispatch])

  return loading ? <Loader /> : (
    <StyledSwiperContainer>
      <Swiper autoplay loop style={{ marginBottom: 10 }}>
        {products?.map(product => (
          <Swiper.Item key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
            <div style={{ margin: '0 10px', borderRadius: 10, overflow: 'hidden' }}>
              <img 
                src={product.image} 
                width="100%" 
                height={150}
                alt={product.name} 
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
    </StyledSwiperContainer>
    )
  
}

export default ProductCarousel


const StyledSwiperContainer = styled.div`
  .adm-page-indicator-dot-active {
    background: #fff;
  }
`
