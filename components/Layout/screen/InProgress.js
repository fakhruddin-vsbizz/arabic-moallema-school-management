import Link from "next/link";
import React, { useEffect } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from "@mui/material";

const InProgress = () => {
  return (
    <div className="justify-center m-0 text-center align-middle">
      <h1 className="p-5">work-in-progress</h1>
      <img
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjA2ZWUyMGYxNWMwODZlZTJiYWE3YTk5MTUxMWQwMzRmM2U4NGU2MyZjdD1z/Qhg5vbmLB0iszYoktc/giphy.gif"
        alt=""
        className="mx-auto my-5 w-80 h-fit"
      />
      {/* <Link href="/"  className='p-2 mt-5 text-white bg-blue-500 rounded-md' > <HomeIcon className="mb-2" /> Go Home</Link> */}
      <Button
        variant="contained"
        className="bg-dark-purple"
        onClick={()=>{history.back()}}
        startIcon={<KeyboardBackspaceIcon />}
      >
        Go Back
      </Button>
    </div>
  );
};

export default InProgress;
