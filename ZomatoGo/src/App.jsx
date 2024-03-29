import { useState } from 'react'
import Home from './screens/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Signup from './screens/Signup'
import { CartProvider } from './componants/ContextReducer'
import Cart from './screens/Cart'
function App() {


  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
