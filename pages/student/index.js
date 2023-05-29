import AuthContext from "@/components/Context/store/auth-context";
import StudentHomePage from "@/components/user/student/StudentHomePage";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const classDetails = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const loggedIn = authCtx.isLoggedIn;

  const typeStudent = authCtx.userType === "student" ? true : false;
  if (!typeStudent && loggedIn) {
    router.replace("/");
  }

  useEffect(() => {
    if (!typeStudent && !loggedIn) {
      router.replace("/");
    }
  }, [loggedIn, typeStudent]);

  return (
    <>
      <StudentHomePage />
    </>
  );
};

export default classDetails;
