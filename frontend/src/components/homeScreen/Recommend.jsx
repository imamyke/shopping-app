import ProductCard from "../ProductCard"
import { products } from "../../data/products"
import { Link } from "react-router-dom"

const Recommend = () => {
  return (
    <>
      {products.map(product => (
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