import AuthContext from "@/components/Context/store/auth-context";
import AdminHomePage from "@/components/user/admin/AdminHomePage";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const index = () => {
  const authCtx = useContext(AuthContext);
  console.log("LoggedIn: ", authCtx.isLoggedIn);

  const router = useRouter();

  const loggedIn = authCtx.isLoggedIn;

  const typeAdmin = authCtx.userType === "admin" ? true : false;

  if (!typeAdmin && loggedIn) {
    router.replace("/");
  }

  useEffect(() => {
    if (!typeAdmin && !loggedIn) {
      router.replace("/");
    }
  }, [loggedIn, typeAdmin]);

  return (
    <>
      <AdminHomePage />
    </>
  );
};

export default index;
