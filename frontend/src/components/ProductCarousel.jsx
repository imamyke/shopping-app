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
      <Swiper autoplay>
        {products?.map(product => (
          <Swiper.Item key={product._id}>
            {product.name}
          </Swiper.Item>
        ))}
      </Swiper>
    )
  
}

export default ProductCarousel
