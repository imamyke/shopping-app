import ProductCard from "../ProductCard"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { productListAction } from "../../store/actions"
import { useEffect } from "react"


const Recommend = () => {
  const dispatch = useDispatch()
  const results = useSelector(state => state.productList)
  const { loading, productList, error } = results

  useEffect(() => {
    dispatch(productListAction())
  },[dispatch])

  return (
    <>
      {productList.map(product => (
        <ProductCard
          href={`/product/${product._id}`}
          key={product.name}
          imageUrl={product.image}
          name={product.name} 
          price={product.price}
          sale={product.sale}
        />
      ))}
    </>
  )
}

export default Recommend