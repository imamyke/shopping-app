import { Swiper } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { productTopRated } from '../store/actions/productAction'
import { useEffect } from 'react'
import { Loader } from '../components'


const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTop = useSelector(state => state.productTopRated)
  const { loading, products } = productTop

  useEffect(() => {
    dispatch(productTopRated())
  }, [dispatch])

  return loading ? <Loader /> : (
      <Swiper autoplay loop style={{ marginBottom: 10 }}>
        {products?.map(product => (
          <Swiper.Item key={product._id}>
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
    )
  
}

export default ProductCarousel
