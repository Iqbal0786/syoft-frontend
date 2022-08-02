import React, { useEffect } from 'react'

export default function ProductList() {
  useEffect(()=>{
     let userdata= JSON.parse(sessionStorage.getItem("user"));
     console.log(userdata)
  },[])
  return (
    <div>ProductList</div>
  )
}
