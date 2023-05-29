import AuthContext from "@/components/Context/store/auth-context";
import ChapterDetailHome from "@/components/user/teacher/chapters/ChapterDetailHome";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const index = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  let chapterName;
  let batchName;
  if (router.query.chapter_id) {
    chapterName = router.query.chapter_id[0];
    batchName = router.query?.chapter_id[1];
  }
  console.log(chapterName);
  console.log("route: ", batchName);

    /**************Restricting Teachers Route************************* */
    const loggedIn = authCtx.isLoggedIn;
    const typeStudent = authCtx.userType === "student" ? true : false;
    if (!typeStudent && loggedIn) {
      router.replace("/");
    }
  
    useEffect(() => {
      console.log("in");
      if (typeStudent && loggedIn) {
        if (!typeStudent && !loggedIn) {
          console.log("second in");
          router.replace("/");
        }
      }
      const localType = localStorage.getItem("type");
      if (localType !== "student") {
        console.log("second in");
        router.replace("/");
      }
    }, [loggedIn, typeStudent]);
  
    /**************Restricting Teachers Route************************* */

  return (
    <>
      {chapterName && batchName && (
        <ChapterDetailHome chapterName={chapterName} batchName={batchName} user="student" />
      )}
    </>
  );
};

export default index;
