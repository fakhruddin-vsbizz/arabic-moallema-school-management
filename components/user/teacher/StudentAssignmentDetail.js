import React, { useState } from "react";
import grayBgImg from "@/components/src/img/grayBgImg.png";
import Sidebar from "@/components/Layout/navigation/Sidebar";
import CreateBatch from "@/components/user/admin/CreateBatch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BackButton from "@/components/Layout/elements/BackButton";
import Button from "@mui/material/Button";
import AssignmentDetailsCard from "@/components/Modules/assignments/AssignmentDetails";
import Link from "next/link";
import MarkRemarkSec from "@/components/Layout/elements/MarkRemarkSec";
import CardLayout from "@/components/Layout/card/CardLayout";
import { useRouter } from "next/router";

const StudentAssignmentDetail = () => {
  const router = useRouter();

  let studentId;
  let subModule;

  if (router.query.assignment_details) {
    studentId = router.query.assignment_details[0];
    subModule = router.query.assignment_details[1];
  }

  return (
    <div
      style={{
        backgroundImage: `url(${grayBgImg.src})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center top",
        backgroundSize: "100%",
        widows: "100vw",
        minHeight: "100vh",
      }}
    >
      <div className="flex min-h-screen h-full">
        <Sidebar nav_index={1} />
        <div className="flex-1  p-7  ">
          <div className="m-0 p-10 w-full h-fit">
            <div className="grid grid-cols-4 w-full mx-auto my-5 gap-10">
              <div className="col-span-2">
                <h1 className=" my-auto text-2xl mt-3 ">
                  <BackButton /> Assignmets Details for assingnment 1
                </h1>
              </div>
              <div className="col-span-2">
                <div className="px-2 w-full ">
                  {/* <SelectDropdown value="class" lable="Select Batch" /> */}
                </div>
              </div>
            </div>
            <Divider variant="middle" />
          </div>
          {subModule && studentId && (
            <div className="m-0 p-10 w-full h-fit">
              <AssignmentDetailsCard
                studentId={studentId}
                subModule={subModule}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentDetail;
