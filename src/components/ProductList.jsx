import { AppBar, Toolbar } from '@mui/material';
import React, { useEffect } from 'react'

export default function ProductList() {
  useEffect(()=>{
     let userdata= JSON.parse(sessionStorage.getItem("user"));
     console.log(userdata)
  },[])
  return (
   <>
    <AppBar>
      <Toolbar>Welcome to Syoft.shop</Toolbar>
    </AppBar>
   </>
  )
}
