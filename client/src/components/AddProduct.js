import React, {useState, useEffect} from 'react'
import axios from 'axios'

// Button on Homepage to add Product
const AddProduct = ({onProductAdded}) => { 
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('')
            }, 3000) // 3 seconds

            // Cleanup function to clear timer if component unmounts or message changes
            return () => clearTimeout(timer)
        }
    }, [message])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        if (!token) {
            setMessage("Login to Add a Product")
            return
        }
        try {
            const res = await axios.post("http://localhost:5000/api/products", {
                title, description, price: parseFloat(price)
            },
            { headers: {
                Authorization: `Bearer ${token}`
            }}
        )
        setMessage("Product Added")
        setTitle('')
        setDescription('')
        setPrice('')
        onProductAdded && onProductAdded(res.data)

        } catch(err) {
            setMessage( err.response?.data?.message || 'Failed to add product.')
        }
    }


  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /><br/>
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        /><br/>
        <input
          type="number"
          placeholder="Price"
          min="0"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        /><br/>
        <button type="submit">Add Product</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default AddProduct
