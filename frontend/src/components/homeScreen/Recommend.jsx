import ProductCard from "../ProductCard"
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { productListAction } from "../../store/actions"
import { useEffect } from "react"
import { Loader, ProductCarousel } from '../../components'
import { useParams } from "react-router-dom"

const Recommend = () => {
  const dispatch = useDispatch()
  const results = useSelector(state => state.productList)
  const { loading, productList } = results
  const { keyword } = useParams()

  useEffect(() => {
    dispatch(productListAction(keyword))
  },[dispatch, keyword])

  return (
    <StyledContainer>
      { loading && <Loader /> }
      { !keyword && <ProductCarousel />}
      {productList.map(product => (
        <ProductCard
          href={`/product/${product._id}`}
          key={product.name}
          image={product.image}
          name={product.name} 
          price={product.price}
          sale={product.sale}
          url={`/product/${product._id}`}
        />
      ))}
    </StyledContainer>
  )
}

export default Recommend

const StyledContainer = styled.div`
  margin-bottom: 65px;
`