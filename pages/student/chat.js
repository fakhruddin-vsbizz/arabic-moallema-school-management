import AuthContext from "@/components/Context/store/auth-context";
import ChatUI from "@/components/Modules/Chat/chatUI";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";

const chat = () => {
  const authCtx = useContext(AuthContext);

  const router = useRouter();
  const type = authCtx.userType;

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

  return (
    <div>
      <ChatUI user="student" />
    </div>
  );
};

export default chat;
