import AuthContext from "@/components/Context/store/auth-context";
import TeacherHome from "@/components/user/admin/Teachers/TeacherHome";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const teachers = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  /**************Restricting Admin Route************************* */
  const loggedIn = authCtx.isLoggedIn;
  const typeAdmin = authCtx.userType === "admin" ? true : false;

  if (!typeAdmin && loggedIn) {
    router.replace("/");
  }

  useEffect(() => {
    console.log("in");
    if (typeAdmin && loggedIn) {
      if (!typeAdmin && !loggedIn) {
        console.log("second in");
        router.replace("/");
      }
    }
    const localType = localStorage.getItem("type");
    if (localType !== "admin") {
      console.log("second in");
      router.replace("/");
    }
  }, [loggedIn, typeAdmin]);

  /**************Restricting Admin Route************************* */
  return (
    <>
      <TeacherHome />
    </>
  );
};

export default teachers;
