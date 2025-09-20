import React, {useState} from 'react'
import axios from 'axios'

function Register() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/api/register", {
                name, email, password
            })
            setMessage(res.data.message) // backend response
            
        } catch (err) {
            console.log('Error', err.message)
            setMessage(err.response?.data?.message || JSON.stringify(err.response?.data) || 'Registration failed. Try again.')
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label> Name:
                <input type='text' placeholder='George' value={name} onChange={e => setName(e.target.value)}/>
                </label>

                <label> Email:
                <input type='email' placeholder='george@example.com' value={email} onChange={e => setEmail(e.target.value)}/>
                </label>

                <label> Password:
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <button type='submit'>
                    Register
                </button>
            </form>
            <p>{message}</p>
        </div>
    )
}


export default Register