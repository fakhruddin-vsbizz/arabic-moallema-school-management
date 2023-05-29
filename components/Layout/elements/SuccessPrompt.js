import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SuccessPrompt = ({
  setSubmitted,
  setSubmitted2,
  title,
  paths,
  type,
}) => {
  const goToAdmin = (e) => {
    if ((type === "add" && type !== "delete") || (type === "edit")) {
      console.log("in");
      setSubmitted(false);
    }
    if (type === "delete") {
      setSubmitted2(false);
    } 
  };
  const [visible, setVisible] = useState(true)
   useEffect(() => {
     // message is empty (meaning no errors). Adjust as needed
     if(!title){
      setVisible(false)
      return
     }
     // error exists. Display the title and hide after 5 secs
     setVisible(true)
     const timer = setTimeout(() => {
       setVisible(false)
     }, 2500);
     return () => clearTimeout(timer);
   }, [title]) // executes every time `title` changes. Adjust as needed
   if(!visible) return null

  return (
    <>
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-4"
        role="alert"
      >
        <strong className="font-bold">Success!</strong>
        <span className="block sm:inline"> {title}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            onClick={goToAdmin}
            className="fill-current h-6 w-6 text-green-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title onClick={goToAdmin}>Close</title>
            <path
              onClick={goToAdmin}
              d="M14.348 5.652a.999.999 0 0 0-1.414 0L10 8.586 7.066 5.652a.999.999 0 1 0-1.414 1.414L8.586 10l-2.934 2.934a.999.999 0 1 0 1.414 1.414L10 11.414l2.934 2.934a.999.999 0 1 0 1.414-1.414L11.414 10l2.934-2.934a.999.999 0 0 0 0-1.414z"
            />
          </svg>
        </span>
      </div>
    </>
  );
};

export default SuccessPrompt;
