import ProductCard from "../ProductCard"
import { products } from "../../data/products"

const Recommend = () => {
  return (
    <>
      {products.map(product => (
          <ProductCard
          key={product.title}
          imageUrl={product.image}
          title={product.title} 
          price={product.price}
          sale={product.sale}
        />
      ))}
    </>
  )
}

export default Recommend