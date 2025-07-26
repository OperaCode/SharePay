import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing';
import Home from './pages/Home';
import CreateBill from './pages/CreateBill';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/create' element={<CreateBill/>}/>
      </Routes>
    </>
  )
}

export default App
