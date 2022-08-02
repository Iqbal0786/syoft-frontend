import { AppBar, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ErroImage from './ErroImage';

export default function ProductList() {
   const [isAllowd,setIsAllowd]=useState(true)
   const navigate= useNavigate()
  useEffect(()=>{
     let userdata= JSON.parse(sessionStorage.getItem("user"));
      if(userdata){
        let isStaff= userdata.user.roles?.includes("staff");
        if(isStaff){
         setIsAllowd(false)
        }
      }
      else{
       navigate("/login")
      }
  },[])
  return (
   <>
   { 
   isAllowd==false?<ErroImage/>:<>
    <AppBar>
      <Toolbar>Welcome to Syoft.shop</Toolbar>
    </AppBar>
   </>
   }
   </>
  )
}
