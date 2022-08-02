import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../components/ProductList'
import { SignIn } from '../components/Signin'
import { SignUp } from '../components/Signup'

export default function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/login' element={<SignIn/>}/>
    </Routes>
    </>
  )
}
