import React, { useEffect } from 'react'
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import {
  Alert,
  AlertTitle,
  AppBar,
  Checkbox,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function CreateProduct() {
    const [data, setData] = useState({
        name: "",
        price: 0,
        description:"",
        count:0,
        user_id:""

      });
      const [token,setToken]=useState("")
      
      const navigate= useNavigate()
      const getformData = (e) => {
        let { id, value } = e.target;
        setData({ ...data, [id]: value });
      };
      const addProduct=()=>{
        axios.post("http://localhost:7777/product" , data, {
            headers: {
            'Authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }}).then((res)=>{
            alert("Product Added Successfully!!")
            console.log(res)
        }).catch((error)=>{
             if(error.message){
                alert("Warning!! You are not allowed for this operation")
             }
        })

    }


    useEffect(()=>{
        const sessionData= JSON.parse(sessionStorage.getItem("user"));
        console.log(sessionData.token)
        setToken(sessionData.token)

    },[])


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
           Add Product From Here
          </Typography>
          <TextField
            id="name"
            label="Product Name"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            onChange={getformData}
          />
          <TextField
            id="price"
            label="Product Price"
            type="number"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            onChange={getformData}
          />
          <TextField
            id="description"
            label="Product Description"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            onChange={getformData}
          />
          <TextField
            id="count"
            label="Product Count/Quantity"
            type="number"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            onChange={getformData}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#572afb", color: "white " }}
            onClick={addProduct}
          >
           Add Product
          </Button>
    
        </Paper>
      </Box>
      <ToastContainer />
   </>
  )
}
