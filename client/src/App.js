import React, {useState, useEffect} from 'react'
import Register from './Register.js'
import Login from './Login.js'
import axios from 'axios'

const App = () => {
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // On first load, check for stored JWT
    const token = localStorage.getItem('token');
    if (token) {
      // Attempt to fetch protected user info
      axios.get('http://localhost:5000/api/protected', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        // If response is good, restore session using the token info
        setUser({ id: res.data.userId, name: "Placeholder"});
      })
      .catch(() => {
        // Token invalid or expired, so remove it and force login
        localStorage.removeItem('token');
        setUser(null);
      });
    }
  }, []);

  return (
    <div>
      <h1>Skill Shop</h1>
      { user ? (
        <div>
          <p>Welcome {user.name}!</p>
          <button onClick={() => {
            localStorage.removeItem('token')
            setUser(null)
          }}>Logout</button>
        </div>
      ): 
      (<>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowLogin(false)}>Register</button>
          {showLogin
            ? <Login onLogin={setUser} />
            : <Register />}
        </>)}
    </div>
  )
}

export default App
