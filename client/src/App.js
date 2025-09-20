import React, {useState} from 'react'
import Register from './Register.js'
import Login from './Login.js'

const App = () => {
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <div>
      <h1>Skill Shop</h1>
      { user ? (
        <div>
          <p>Welcome {user.name}!</p>
          {/* App Content Here */}
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
