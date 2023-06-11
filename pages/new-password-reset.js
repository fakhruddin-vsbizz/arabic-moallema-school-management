import Head from "next/head";
import blueBgImg from "@/components/src/img/colorBgImg.png";
import Login from "@/components/user/multiUser/Login";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "@/components/Context/store/auth-context";
import AdminHomePage from "@/components/user/admin/AdminHomePage";
import ResetUserPassword from "@/components/user/multiUser/ResetUserPassword";
import UpdatePasswordForm from "@/components/user/multiUser/UpdatePasswordForm";

const ResetPassword = () => {

    const authCtx = useContext(AuthContext);
    const router = useRouter();

    const loggedIn = authCtx.isLoggedIn;
    const typeAdmin = authCtx.userType === "admin" ? true : false;
    const typeTeacher = authCtx.userType === "instructor" ? true : false;
    const typeStudent = authCtx.userType === "student" ? true : false;

    if (typeTeacher && loggedIn) {
        router.replace("/teacher");
    }

    if (typeStudent && loggedIn) {
        router.replace("/student");
    }

    console.log("Email: ", authCtx.userEmail);
    console.log("Type: ", authCtx.userType);
    console.log("admin; ", typeAdmin);

  return (
    <div
          className=""
          style={{
            backgroundImage: `url(${blueBgImg.src})`,
            backgroundAttachment: "fixed",
            backgroundSize: "100%",
            backgroundPosition: "center top",
            widows: "100vw",
            height: "100vh",
          }}
        >
        <UpdatePasswordForm/>
    </div>
  )
}

export default ResetPassword