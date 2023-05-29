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



export default function App() {
  const router = useRouter();

  const [serverError, setServerError] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authCtx = React.useContext(AuthContext);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
   
    /**********************Validating form***************************** */
    const data = await LoginUser(email, password);
    if (!data) {
      setServerError(true);
      return;
    }
    if(data){
      setServerError(false);
    }

    const userType = data.user.user_metadata.type;
    const userEmail = data.session.user.email;

    if (userType === "admin") {
      router.replace("/admin");
    }
    //********************Adding user token to local stoarage************************ */

    const expirationTime = new Date(
      new Date().getTime() + +data.session.expires_in * 1000
    );
    authCtx.login(data.session.access_token, expirationTime.toISOString());

    //setting the user type using context
    authCtx.setUserRoleType(userType, userEmail);

    //********************Adding user token to local stoarage************************ */
  };

  return (
    <CssVarsProvider>
      <main>
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
              className="mx-auto mt-5  w-5/6 p-10"
              src={logo.src}
              alt="Logo"
            />
            <Typography
              level="h4"
              component="h1"
              className="text-center text-5xl mb-5"
            >
              <b>Welcome</b>
            </Typography>
            <Typography level="body2" className="text-center ">
              Sign in to continue.
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Typography
            endDecorator={
              <Link href="/work-in-progress">forget password?</Link>
            }
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          ></Typography>
          {serverError && (
            <p className=" text-red-500 mt-2">Invalid email or password</p>
          )}
          {/* <Button className='bg-blue-500 text-center text-whit w-full' sx={{ mt: 1  }}><Link href="/" className="w-full text-center text-white">Log in</Link></Button>  */}
          <Button
            onClick={handleLoginSubmit}
            className="bg-blue-500 text-center text-whit w-full"
            sx={{ mt: 1 }}
          >
            Log in
          </Button>

          <Typography
            endDecorator={<Link href="/work-in-progress">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Don&apos;t have an account?
          </Typography>
         </div>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
