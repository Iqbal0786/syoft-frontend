import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel, FormGroup,  Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link  ,useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
    const navigate=useNavigate()
  const [data, setData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    roles:[]
  });

  const getformData = (e) => {
    let { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const RegisterHandler = () => {
     // validation for email ,name and password
     const namepattern = /[a-zA-Z0-9]/;
     const numberpattern= /^\d{10}$/
     const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     const passwordPattern =
       /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
 
     if (!namepattern.test(data.username)) {
       toast.warn("User Name must contain  only alphabates", {
         position: "top-center",
       });
     } else if (!numberpattern.test(data.phone)) {
       toast.warn("Phone number  must contain  only 10 digits", {
         position: "top-center",
       });
     } else if (!emailpattern.test(data.email)) {
       toast.warn("There must be a valid email address", {
         position: "top-center",
       });
     } else if (!passwordPattern.test(data.password)) {
       toast.warn(
         "Password must be in Alphanumeric format and min length of 8",
         {
           position: "top-center",
         }
       );
     }
     else if(data.roles.length==0){
      toast.warn(
        "Please select atleast one role ",
        {
          position: "top-center",
        }
      );
     }
     
    else{
      axios.post("https://syoft-db.herokuapp.com/register" , data).then((res)=>{
        console.log(res.data)
        toast.success("Registered Successfully !!",{position:"top-center"})
        setTimeout(() => {
            navigate("/login")
        }, 3000);
    }).catch((error)=>{
      if(error.message){
        toast.error("Please Try another email or password",{position:"top-center"})
        console.log(error)
      }
       
    })
    }

  };
  const handleCheckbox=(e)=>{
       const {value,checked} = e.target;
       if(checked){
        let selectedRole= data.roles;
        selectedRole.push(value)
        setData({...data,roles:[...selectedRole]})
       }
       else{
        
         setData({...data,roles:[...data.roles.filter((item)=>item!==value)]})
       }
  }

//    useEffect(()=>{
//    RegisterHandler();
//    },[])
  return (
    <>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 450,
            height: 550,
          },
          justifyContent: "center",
          marginTop: "20px",
          paddingTop:"65px"
        }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Paper
          elevation={3}
          sx={{ padding: "30px", display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "20px" }}
          >
            Create your account
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              id="username"
              label="Enter Username"
              variant="outlined"
              sx={{ marginBottom: "25px" }}
              onChange={getformData}
            />
            <TextField
              id="phone"
              label="Enter Phone Number"
              variant="outlined"
              sx={{ marginBottom: "25px" }}
              onChange={getformData}
            />
          </Box>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            onChange={getformData}
          />
          <TextField
            id="password"
            label="Password (8 character minimum)"
            type="password"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            onChange={getformData}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
         <FormGroup>
      <Typography>Select Role given below</Typography>
      <FormControlLabel control={<Checkbox  onChange={handleCheckbox} />} label="Admin" value={"admin"}/>
      <FormControlLabel  control={<Checkbox onChange={handleCheckbox} />} label="Manager" value={"manager"} />
      <FormControlLabel  control={<Checkbox onChange={handleCheckbox}/>} label="Staff" value={"staff"} />
    </FormGroup>
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#572afb", color: "white " }}
            onClick={RegisterHandler}
          >
            Create your account
          </Button>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "10px",
            }}
          >
            Have an account? <Link to={"/Login"}>Sign in</Link>
          </Typography>
        </Paper>
      </Box>

      <ToastContainer />
    </>
  );
};