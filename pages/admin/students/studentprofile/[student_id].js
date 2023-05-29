import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import StudentProfile from "@/components/user/admin/Student/StudentProfile";
import AuthContext from "@/components/Context/store/auth-context";

const index = () => {
  const router = useRouter();

  let id;
  if (router.query.student_id) {
    id = router.query.student_id;
    console.log(id);
  }


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

  return <>{id && <StudentProfile email={id} />}</>;
};

export default index;
