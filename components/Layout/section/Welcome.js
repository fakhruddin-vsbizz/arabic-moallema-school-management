import React from "react";
import MiniCard from "../card/MiniCard";

const Welcome = () => {
  return (
    <div className="m-0 p-5 w-screen h-fit">
      
      <div className="grid grid-cols-3 w-fit mx-auto my-5 gap-10">
        <div className="col-span-1">
          <MiniCard
            disc=""
            title="Admin"
            isBtn="true"
            btnText="Go to Admin"
            link="/admin"
          />
        </div>
        <div className="col-span-1">
          <MiniCard
            disc=""
            title="Teacher"
            isBtn="true"
            btnText="Go to Teacher"
            link="/teacher"
          />
        </div>
        <div className="col-span-1">
          <MiniCard
            disc=""
            title="Student"
            isBtn="true"
            btnText="Go to Student"
            link="/student"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
