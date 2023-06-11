import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import logo from "@/components/src/img/AMLogo.png";
import AuthContext from "@/components/Context/store/auth-context";
import { LoginUser } from "@/backend/Login/LoginDB";
import { useRouter } from "next/router";
import { resetPasswordFormValidation } from "@/backend/Login/PasswordReset";
import Alert from '@mui/material/Alert';


const ResetUserPassword = () => {

  const router = useRouter();
  const [serverError, setServerError] = React.useState(false);

  const [passwordSame, setPasswordSame ] = React.useState(null);
  const [confPass, setConfPass ] = React.useState("");

  const verifyPasswordSame = (e) => {
    if(e.target.value === confPass){
        setPasswordSame(true);
    }else{
        setPasswordSame(false);
    }
  }

  const updatePasswordValidate = () => {
    try{
        resetPasswordFormValidation(confPass);
        router.replace("/");
    }catch(error){
        console.log(error);
    }
  }


  return (
    
        <Sheet
          sx={{
            width: 425,
            mx: "auto", // margin left & right
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            border: 0,
            backgroundColor: 'transparent'
          }}
          variant="outlined"
        >
         <div className="bg-white border-2 rounded-md my-5 p-5">
         <div className="">
            <img
              className="mx-auto mt-5  w-3/6 p-5 "
              src={logo.src}
              alt="Logo"
            />
          </div>
          <br/>
          <hr style={{ borderColor:'#000' }}></hr>
          <br/>
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              // html input attribute
              name="new_password"
              type="password"
              placeholder="Enter password on your email or given by sysadmin"
              onChange={(e)=>setConfPass(e.target.value)}
            />
          </FormControl>
          <br/>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              // html input attribute
              name="confirm_password"
              type="password"
              placeholder="Enter password on your email or given by sysadmin"
              onChange={verifyPasswordSame}
            />
          </FormControl>
          
          
          {serverError && (
            <p className=" text-red-500 mt-2">Invalid email or password</p>
          )}

          <br/>

          {passwordSame ? <Alert severity="success">Both passwords are same.</Alert> : <Alert severity="info">Both passwords should be same.</Alert>}
          
          <br/>
          <Button
            className="bg-blue-500 text-center w-full "
            sx={{ mt: 1 }}
            onClick={updatePasswordValidate}
          >
            Reset Password
          </Button>

            <br/><br/>
            <hr style={{ borderColor:'#000' }}></hr>
            <br/>

            <center><Button variant="contained">Back to Login</Button></center>

          
         </div>
        </Sheet>
      
  )
}

export default ResetUserPassword