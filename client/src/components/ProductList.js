import React, {useState, useEffect} from 'react'
import axios from 'axios'


const ProductList = ({refresh}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
        .then(res => {
            setProducts(res.data)
            setLoading(false)
        })
        .catch(() => {
            setProducts([])
            setLoading(false)
        })
    }, [refresh])

    if (loading) return <p>Loading Products...</p>

  return (
    <div>
      <h2>Available SkillShop Products</h2>
      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <strong>{product.title}</strong> <br />
              <span>{product.description}</span> <br />
              <span>Price: ${product.price}</span> <br />
              <span>By: {product.creator?.name || 'Unknown'}</span>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductList
