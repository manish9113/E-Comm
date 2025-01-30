
import { Typography, TextField, Box, Paper, Button } from "@mui/material";
import { Link ,useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import { AuthenticateNewUserSignUp } from "../../services/api";
import {Datacontext} from '../../context/dataContext.js'


const signupInitialValues={
  FirstName:'',
  LastName:'',
  Email:'',
  Password:'',
  confirmPassword:''
}



const CreateAccount=()=>{
  
  const [signup,setSignup]=useState(signupInitialValues)
  const {setAccount}=useContext(Datacontext)
  const navigate=useNavigate()
  


  const setSignupValues=(e)=>{
      
      setSignup({...signup,[e.target.name]:e.target.value})
  }

  const validateSignup = async (signup) => {
    try {
      let response = await AuthenticateNewUserSignUp(signup);
      if (response.status === 200) {
        setAccount(signup.FirstName);
        return true;

      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  }


  const signupNewUser=async(e)=>{
       e.preventDefault()
   const isValid= await  validateSignup(signup)
   if (isValid) {
     setSignup(signupInitialValues)
       console.log(signup)
       navigate('/')

   }
       

  }

  



    return(
        <Box
      component="form"
      style={{ display: "flex", marginTop: 100, justifyContent: "center" }}
    >
      <Paper
        elevation={3}
        style={{ padding:5, display: "flex", width: "60vw" }}
      >
        <Paper elevation={8} style={{ margin: 10 ,padding:10,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'Center'}}>
        <Link to={"/"} style={{textDecoration:'none',color:'inherit'}}>
        <img
                src="/images/icon.png"
                alt="icon"
                style={{ width:100, height: 150, cursor: "pointer",marginBottom:10 }}
              />
        <Box style={{display:'flex',justifyContent:'center'}}>
        <Typography style={{fontWeight:600,fontSize:20,cursor:'pointer'}}>ShopWiz</Typography>

        </Box>
        </Link>
        </Paper>
        <Paper elevation={3} style={{ width: "50vw", padding: 10 }}>
          <Typography >Enter Your FirstName</Typography>
          <TextField
            id="standard-basic"
            label="FirstName"
            name='FirstName'
            variant="standard"
            fullWidth
            onChange={(e)=>setSignupValues(e)}
            
          />
          <Typography style={{marginTop:5}}>Enter Your LastName</Typography>
          <TextField
            id="standard-basic"
            label="LastName"
            name='LastName'
            variant="standard"
            fullWidth
            onChange={(e)=>setSignupValues(e)}
          />
          <Typography style={{marginTop:5}}>Enter Your Email Address</Typography>
          <TextField
            id="standard-basic"
            label="Email"
            name='Email'
            variant="standard"
            fullWidth
            onChange={(e)=>setSignupValues(e)}
          />
          <Typography style={{marginTop:5}}>Set Your password</Typography>
          <TextField
            id="standard-password-input"
            label="Password"
            name='Password'
            type="password"
            autoComplete="current-password"
            variant="standard"
            fullWidth
            onChange={(e)=>setSignupValues(e)}
          />
          <Typography style={{marginTop:5}}>Confirm Your password</Typography>
          <TextField
            id="standard-password-input"
            label="Password"
            name='confirmPassword'
            type="password"
            autoComplete="current-password"
            variant="standard"
            fullWidth
            onChange={(e)=>setSignupValues(e)}
          />
          <Box style={{ marginTop: 10 }}>
           <Button type="submit" variant="contained" color="primary" onClick={(e)=>signupNewUser(e)}>
              CreateAccount
            </Button>
           
          </Box>
          
          <Box style={{ marginTop: 10,display:'flex',justifyContent:'center' }}>
            <Link to={`/signin`}>
              <Typography>Already Have An Account? Sign-in Click Me</Typography>
              </Link>
          </Box>
        </Paper>
      </Paper>
    </Box>
    )
}

export default CreateAccount