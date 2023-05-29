import AuthContext from "@/components/Context/store/auth-context";
import ChatAdmin from "@/components/Modules/Chat/chatAdmin";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const chat = () => {
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

  return (
    <div>
      <ChatAdmin user="admin" />
    </div>
  );
};

export default chat;
