import React, { useEffect } from 'react'
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";

import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

import axios from "axios"

export default function UpdateProduct() {
    
    const {id}= useParams();
    const [token,setToken]=useState({token:"",user_id:""})
    const [updateddata, setUpdatedData] = useState({
        name: "" ,
        price:0,
        description:"",
        count:0,

      });
  
      
      const navigate= useNavigate()
      const getformData = (e) => {
        let { id, value } = e.target;
        setUpdatedData({ ...updateddata, [id]: value });
      };
      const updateProductHandler=()=>{
        const stringPattern=/^[ a-zA-Z]/

        if(!stringPattern.test(updateddata.name)){
        toast.warn("Product Name must be alphabates")
        }
        else  if(updateddata.price<=0){
          toast.warn("Product Price must be a positive interger value")
          }
          else if(!stringPattern.test(updateddata.description)){
            toast.warn("Product Description must be alphabates")
            }
            else  if(updateddata.count<=0){
              toast.warn("Product Quantity must be a positive interger value")
              }
       else {
        axios.patch(`https://syoft-db.herokuapp.com/products/${id}` ,updateddata,{ headers: {"Authorization" : `Bearer ${token.token}`} }).then((res)=>{
          toast.success("Product Updated  Successfully!!",{
               position: 'top-center'
          })
          setTimeout(()=>{navigate("/")},3000)
          console.log(res)
      }).catch((error)=>{
          console.log(error)
           if(error.message){
              toast.warning("Warning!! You are not allowed for this operation",{
                  position: 'top-center'
              })
           }
      })
       }

    }


    useEffect(()=>{
        const sessionData= JSON.parse(sessionStorage.getItem("user"));
        const clickedData= JSON.parse(sessionStorage.getItem("clickedData"));
         setUpdatedData(clickedData);
        //  console.log(clickedData)
       if(sessionData){
        setToken({token:sessionData.token,user_id:sessionData.user._id});
       }
       else{
        navigate("/login")
       }


    },[])
console.log("updated data",updateddata)

  return (
   <>
   <AppBar>
    <Toolbar>
        Admin Page
    </Toolbar>
   </AppBar>
    <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 450,
            height: 430,
          },
          justifyContent: "center",
          marginTop: "15px",
          paddingTop:"65px"
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: "30px", display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "20px" }}
          >
           Update Product From Here
          </Typography>
          <TextField
            id="name"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            value={updateddata.name}
            onChange={getformData}
            
          />
          <TextField
            id="price"
            type="number"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            value={updateddata.price}
            onChange={getformData}
          
          />
          <TextField
            id="description"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            onChange={getformData}
            value={updateddata.description}
          />
          <TextField
            id="count"
            type="number"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            value={updateddata.count}
            onChange={getformData}
          
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#572afb", color: "white " }}
            onClick={updateProductHandler}
          >
           Update Product
          </Button>
    
        </Paper>
      </Box>
      <ToastContainer />
   </>
  )
}
