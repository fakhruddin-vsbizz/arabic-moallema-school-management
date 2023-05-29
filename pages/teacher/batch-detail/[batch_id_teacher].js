import AuthContext from "@/components/Context/store/auth-context";
import BatchDetailTeacher from "@/components/user/teacher/batchesTeacher/BatchDetailTeacher";

import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const index = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  let batchName;
  if (router.query.batch_id_teacher) {
    batchName = router.query.batch_id_teacher;
  }
  console.log(batchName);

  /**************Restricting Teachers Route************************* */
  const loggedIn = authCtx.isLoggedIn;
  const typeTeacher = authCtx.userType === "instructor" ? true : false;
  if (!typeTeacher && loggedIn) {
    router.replace("/");
  }

  useEffect(() => {
    console.log("in");
    if (typeTeacher && loggedIn) {
      if (!typeTeacher && !loggedIn) {
        console.log("second in");
        router.replace("/");
      }
    }
    const localType = localStorage.getItem("type");
    if (localType !== "instructor") {
      console.log("second in");
      router.replace("/");
    }
  }, [loggedIn, typeTeacher]);

  /**************Restricting Teachers Route************************* */

  return <div>{batchName && <BatchDetailTeacher batchName={batchName} />}</div>;
};

export default index;
