import AuthContext from "@/components/Context/store/auth-context";
import BatchDetailHome from "@/components/Modules/batches/BatchDetailHome";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const index = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

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

  let batchName;
  if (router.query.batch_id) {
    batchName = router.query.batch_id;
  }

  return <>{batchName && <BatchDetailHome batchName={batchName} />}</>;
};

export default index;
