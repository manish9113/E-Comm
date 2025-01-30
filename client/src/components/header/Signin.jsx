import { Typography, TextField, Box, Paper, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthenticateSignin } from "../../services/api.js";
import { Datacontext } from "../../context/dataContext.js";

const signinInitialValues = {
  Email: "",
  Password: "",
};

const Signin = () => {
  const [signin, setSignin] = useState(signinInitialValues);
  const { setAccount } = useContext(Datacontext);
  const navigate = useNavigate();

  const setSigninValues = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };

  const validateSignin = async (signin) => {
    try {
      const response = await AuthenticateSignin(signin);
      if (response.status === 200) {
        setAccount(response.data.FirstName);
        return true;
      } else {
        console.error("Signin failed with status:", response.status);
      }
    } catch (error) {
      console.error("Signin failed", error);
    }
  };

  const signinUser = async (e) => {
    e.preventDefault();
    const isValid = await validateSignin(signin);
    if (isValid) {
      setSignin(signinInitialValues); // Reset the form to initial values

      navigate("/");
    }
  };

  return (
    <Box
      component="form"
      style={{ display: "flex", marginTop: 200, justifyContent: "center" }}
    >
      <Paper
        elevation={3}
        style={{ padding: 5, display: "flex", width: "60vw" }}
      >
        <Paper elevation={8} style={{ margin: 10, padding: 10 }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src="/images/icon.png"
              alt="icon"
              style={{
                width: 100,
                height: 150,
                cursor: "pointer",
                marginBottom: 10,
              }}
            />
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                style={{ fontWeight: 600, fontSize: 20, cursor: "pointer" }}
              >
                ShopWiz
              </Typography>
            </Box>
          </Link>
        </Paper>
        <Paper elevation={3} style={{ width: "50vw", padding: 10 }}>
          <Typography>Enter Your Email Address</Typography>
          <TextField
            id="standard-basic"
            label="Email"
            name="Email"
            variant="standard"
            fullWidth
            onChange={(e) => setSigninValues(e)}
          />
          <Typography style={{ marginTop: 5 }}>Enter Your password</Typography>
          <TextField
            id="standard-password-input"
            label="Password"
            name="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            fullWidth
            onChange={(e) => setSigninValues(e)}
          />
          <Box style={{ marginTop: 10 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => signinUser(e)}
            >
              Sign In
            </Button>
          </Box>
          <Box
            style={{ marginTop: 10, display: "flex", justifyContent: "center" }}
          >
            <Link to={`/createaccount`}>
              <Typography> New Here? Create An Account Click Me</Typography>
            </Link>
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Signin;
