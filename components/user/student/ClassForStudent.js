import React from "react";
import grayBgImg from "@/components/src/img/grayBgImg.png";

import Sidebar from "@/components/Layout/navigation/Sidebar";
import BackButton from "@/components/Layout/elements/BackButton";
import { Divider } from "@mui/material";
import BatchDetaisList from "@/components/user/teacher/BatchDetaisList";
// import InProgress from "@/components/Layout/screen/InProgr

const ClassForStudent = ({ batchName }) => {
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url(${grayBgImg.src})`,
          backgroundAttachment: "fixed",
          backgroundSize: "100%",
          backgroundPosition: "center top",
          widows: "100vw",
          minHeight: "100vh",
        }}
      >
        <div className="flex min-h-screen w-full h-full">
          <Sidebar nav_index={2} />
          <div className="flex-1  px-5">
            <div className="m-0 p-5  w-full h-fit">
              {/* <MUIBreadcrumbs /> */}
              <div className="grid grid-cols-1 w-full mx-auto my-10 gap-10">
                <div className="col-span-1">
                  <h1 className=" my-auto text-2xl mt-3 ">
                    <BackButton /> Class
                  </h1>
                </div>

                <Divider variant="middle" />
                <div className="col-span-1">
                  {/* <BatchDetaisList comp2=<JoinClass user='student' /> /> */}
                  <BatchDetaisList user="student" batchName={batchName} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassForStudent;
