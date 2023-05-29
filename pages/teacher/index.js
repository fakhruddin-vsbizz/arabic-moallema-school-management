import React, { useContext, useEffect } from "react";
import AuthContext from "@/components/Context/store/auth-context";

import TeacherHomeTeachersPage from "@/components/user/teacher/TeacherHomeTeachersPage";
import { useRouter } from "next/router";

const index = () => {
  const authCtx = useContext(AuthContext);
  const email = authCtx.userEmail;
  const router = useRouter();
  const loggedIn = authCtx.isLoggedIn;

  const typeTeacher = authCtx.userType === "instructor" ? true : false;

  if (!typeTeacher && loggedIn) {
    router.replace("/");
  }

  useEffect(() => {
    if (!typeTeacher && !loggedIn) {
      router.replace("/");
    }
  }, [loggedIn, typeTeacher]);

  return <>{email && <TeacherHomeTeachersPage email={email} />}</>;
};

export default index;
