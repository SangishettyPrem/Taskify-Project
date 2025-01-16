import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login/Login'
import { Signup } from './Components/Signup/Signup'
import { Home } from './Components/Home/Home'
import RefershHandler from './Components/RefershHandler'

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const PrivateRouting = ({ element }) => {
    return isAuthenticated ? element : <Navigate to={'/login'} />
  }
  return (
    <div className='App'>
      <RefershHandler setisAuthenticated={setisAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRouting element={<Home />} />} />
      </Routes>
    </div>
  )
}

export default App