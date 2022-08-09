import { AppBar, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ErroImage from './ErroImage';
import ProductTable from './ProductTable';

export default function ProductList() {
   const [isAllowd,setIsAllowd]=useState(true)
   const navigate= useNavigate();
   const [productData,setProductData]=useState([])
  useEffect(()=>{
     let userdata= JSON.parse(sessionStorage.getItem("user"));
      if(userdata){
        let isStaff= userdata.user.roles?.includes("staff");
        if(isStaff){
         setIsAllowd(false)
        }
        else{
          axios.get("https://syoft-db.herokuapp.com/products" ,{ headers: {"Authorization" : `Bearer ${userdata.token}`} }).then((res)=>{
        setProductData([...res.data])
   }).catch((err)=>{
     console.log(err.message)
   })
        }
      }
      else{
       navigate("/login")
      }
  },[])

  console.log(productData)
  return (
   <>
   { 
   isAllowd==false?<ErroImage/>:<>
    <AppBar>
      <Toolbar sx={{display:"flex" , justifyContent:"space-between" , margin:"10px"}}>
        <Typography>Welcome to Syoft.shop</Typography>
      <Link to="/product" style={{textDecoration:"none" , color:"white" , fontSize:"19px"}}>
        Add Product
      </Link>
      <Typography sx={{cursor:"pointer"}} onClick={()=>{
         sessionStorage.clear()
         navigate("/login")
      }}>Log Out</Typography>
      </Toolbar>
    </AppBar>

    <Typography sx={{textAlign:"center" , color:"black", marginTop:"150px",fontFamily:"sans-serif" , fontSize:"20px"}}>List of products</Typography>
    <ProductTable data={productData}/>
   </>
   }
   </>
  )
}
