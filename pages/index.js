import Head from "next/head";
import blueBgImg from "@/components/src/img/colorBgImg.png";
import Login from "@/components/user/multiUser/Login";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "@/components/Context/store/auth-context";
import AdminHomePage from "@/components/user/admin/AdminHomePage";

export default function Home() {
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
    <>
      <Head>
        <title>Quran E-Learning</title>
        <meta name="description" content="Quran E-Learning App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300&family=Ubuntu+Mono&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main>
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
          {!loggedIn && <Login />}
          {loggedIn && typeAdmin && <AdminHomePage />}
        </div>
      </main>
    </>
  );
}
