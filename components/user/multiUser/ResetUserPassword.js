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
import { initiatePasswordResetEmail } from "@/backend/Login/PasswordReset";
import { useRouter } from "next/router";
import Alert from '@mui/material/Alert';



const ResetUserPassword = () => {

  // router specific controls
  const router = useRouter();
  const [status, setStatus] = React.useState(null);
  const [serverError, setServerError] = React.useState(false);

  const [email, setEmail] = React.useState("");

  const changePasscode = () => {
    try{
      setStatus(initiatePasswordResetEmail(email));
      
    }catch(error){
      setStatus(false);
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
              className="mx-auto mt-5  w-3/6 p-10 "
              src={logo.src}
              alt="Logo"
            />

            <h3>Enter the email that you registered with</h3>
            
            
          </div>
          <FormControl>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="Eg. johndoe@gmail.com, etc..."
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </FormControl>
          
          {/* <Typography
            endDecorator={
              <Link href="/work-in-progress">forget password?</Link>
            }
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          ></Typography> */}
          {serverError && (
            <p className=" text-red-500 mt-2">Invalid email or password</p>
          )}

          <br/>

            {status ? <Alert severity="success">Email has been sent. Click on reset link and reset the password.</Alert> : ""}

          {/* <Button className='bg-blue-500 text-center text-whit w-full' sx={{ mt: 1  }}><Link href="/" className="w-full text-center text-white">Log in</Link></Button>  */}
          <Button
            className="bg-blue-500 text-center text-whit w-full "
            sx={{ mt: 1 }}
            onClick={changePasscode}
          >
            Send Reset Link
          </Button>

            <br/><br/>
            <hr style={{ borderColor:'#000' }}></hr>
            <br/>

            <center><Button variant="contained">Back to Login</Button></center>

          {/* <Typography
            endDecorator={<Link href="/work-in-progress">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Don&apos;t have an account?
          </Typography> */}
         </div>
        </Sheet>
      
  )
}

export default ResetUserPassword