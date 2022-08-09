import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateProduct from '../components/CreateProduct'
import ProductList from '../components/ProductList'
import { SignIn } from '../components/Signin'
import { SignUp } from '../components/Signup'
import UpdateProduct from '../components/UpdateProduct'

export default function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/product' element={<CreateProduct/>}/>
        <Route path='/product/:id' element={<UpdateProduct/>}/>
    </Routes>
    </>
  )
}
