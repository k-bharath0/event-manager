import React from 'react'
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './Dashboard/User'
import Guest from './pages/Guest'
export default function App() {

  const renderList=()=>{
    if(localStorage.getItem('token') && localStorage.getItem('user')){
 
      return[
        
        <Route path='/' element={<User/>}/>,
        <Route path='*' element={<User/>}/>
        
      ]
    }
    else{return[
      <Route path='/' element={<Login/>}/>,
        <Route path='/Signup' element={<Register/>}/>,
        <Route path='/Guest' element={<Guest/>}/>,
        <Route path='*' element={<Login/>}/>
      ]
    }
   }
  return (
    <div>
      <BrowserRouter>
        <Routes>        
          {renderList()}
         </Routes>
           </BrowserRouter>
    </div>
  )
}

