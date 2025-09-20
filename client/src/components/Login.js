import React, {useState} from 'react'
import axios from "axios"

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:5000/api/login", {
                email, password
            })
            localStorage.setItem('token', res.data.token)
            setMessage("Login Successful")
            onLogin(res.data.user)

        } catch(err) {
            setMessage("Invalid Credentials. Please Try Again")
        }
    }


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
            Email:
            <input type='email' name='email' placeholder='george@example.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
            Password: 
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button type='submit'>Login</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Login
