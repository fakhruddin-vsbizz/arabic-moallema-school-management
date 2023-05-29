import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
const CardLayout = ({
  title,
  firstComp,
  secondComp,
  fullComp,
  isFull,
  disc,
  isBtn,
  btn,
  path,
  sheduleData,
}) => {
  const [isDisabled, setIsDisabled] = React.useState(false);

  const btnIs = isBtn || false;
  const fullIs = isFull || false;

  React.useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDayName = daysOfWeek[currentDate.getDay()]; // Returns the name of the day (e.g. "Monday")

    if (sheduleData) {
      let isTrue = sheduleData[0].schedule.days.includes(currentDayName);
      console.log(isTrue);

      const currTime = currentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      if (currTime > sheduleData[0].schedule.time && isTrue) {
        console.log("in");
        setIsDisabled(true);
      }
    }
  }, [sheduleData]);

  return (
    <div>
      {fullIs && (
        <div className="w-full grid grid-cols-4 rounded-lg overflow-hidden shadow-lg  items-center justify-center bg-slate-50 ">
          <div className="flex m-10  col-span-4">{fullComp}</div>
        </div>
      )}

      {!fullIs && (
        <div className="w-full grid grid-cols-4 rounded-lg overflow-hidden shadow-lg  items-center justify-center bg-slate-50 ">
          <div className="flex m-10 items-center justify-start col-span-2">
            {firstComp}
            <div className="font-bold text-xl ">{title}</div>
            <p className=" text-base text-gray-400">{disc}</p>
          </div>
          <div className=" mx-10 my-5 col-span-2">
            {secondComp}
            <div className="flex items-center justify-end ">
              {btnIs && (
                <div>
                  <Link href={path} target="_blank" className="w-full">
                  {isDisabled && (
                    <Button
                      variant="contained"
                      className=" w-full bg-dark-purple "
                      onClick={() => {
                        history.back();
                      }}
                    >
                      {btn}
                    </Button>
                  )}
                  </Link>
                  <div className=" w-96">
                    {!isDisabled && <span className="">Days - </span>}
                    {!isDisabled && sheduleData &&
                      sheduleData[0].schedule.days.map((day) => (
                        <span
                          name="role"
                          className=" text-red-600 focus:outline-none border-x-1"
                        >
                          {day},
                        </span>
                      ))}
                    {!isDisabled && sheduleData && (
                      <span className="block mt-2 ">
                        Timing -
                        <span className=" text-red-600">
                          {sheduleData[0].schedule.time}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardLayout;
