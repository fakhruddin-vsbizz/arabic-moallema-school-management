import AuthContext from "@/components/Context/store/auth-context";
import ChatUI from "@/components/Modules/Chat/chatUI";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";

const chat = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

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

  return (
    <div>
      <ChatUI user="teacher" />
    </div>
  );
};

export default chat;
