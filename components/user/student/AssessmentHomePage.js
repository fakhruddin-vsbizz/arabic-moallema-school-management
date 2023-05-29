import React, { useContext, useEffect, useState } from "react";
import grayBgImg from "@/components/src/img/grayBgImg.png";
import Sidebar from "@/components/Layout/navigation/Sidebar";

import Divider from "@mui/material/Divider";
import BackButton from "@/components/Layout/elements/BackButton";

import MUIMiniCard from "@/components/Layout/card/MUIMiniCard";
import AuthContext from "@/components/Context/store/auth-context";
import { fetchSubmittedAssignmentBasedOnStudent } from "@/backend/Assignment/FetchAssignmentDB";
import { fetchStudentIdBasedOnEmail } from "@/backend/Students/StudentDB";
import { fetchBatcheIdBasedOnBatchName } from "@/backend/Batches/BatchesDB";
import WarningCard from "@/components/Layout/card/WarningCard";

const AssessmentHomePage = () => {
  const [allAssignments, setAllAssignments] = useState([]);
  const [uniqueAssignments, setUniqueAssignments] = useState([]);

  const [studentIdNew, setStudntIdNew] = useState();
  const [batchId, setBatchId] = useState();
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);
  const studentId = authCtx.userEmail;

  useEffect(() => {
    const fetchStudentBatch = async () => {
      if (studentIdNew && batchId) {
        const data = await fetchSubmittedAssignmentBasedOnStudent(
          studentIdNew,
          batchId
        );
        if (studentId) {
          data.length === 0 ? setError(true) : setError(false);
        }
        setAllAssignments(data);
      }
    };
    fetchStudentBatch();
  }, [studentIdNew, batchId]);

  console.log(error);
  useEffect(() => {
    if (allAssignments) {
      const uniqueArray = allAssignments.filter((obj, index, self) => {
        return (
          index === self.findIndex((t) => t.module_name === obj.module_name)
        );
      });

      setUniqueAssignments(uniqueArray);
    }
  }, [allAssignments]);

  console.log(allAssignments);
  console.log(uniqueAssignments);
  useEffect(() => {
    const getId = async () => {
      if (studentId) {
        const data = await fetchStudentIdBasedOnEmail(studentId);
        if (data[0]) {
          setStudntIdNew(data[0].student_id);
        }
      }
    };
    getId();
  }, [studentId]);

  useEffect(() => {
    const getId = async () => {
      const batch = localStorage.getItem("batchName");
      const data = await fetchBatcheIdBasedOnBatchName(batch);
      if (data[0]) {
        setBatchId(data[0].batch_id);
      }
    };
    getId();
  }, []);

  return (
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
      <div className="flex min-h-screen h-full">
        <Sidebar nav_index={2} />
        <div className="flex-1  p-7  ">
          <div className="m-0 p-10 w-full h-fit">
            <div className="grid grid-cols-5 w-full mx-auto my-5 gap-10">
              <div className="col-span-1">
                <h1 className=" my-auto text-2xl mt-3 ">
                  <BackButton /> Assignmets
                </h1>
              </div>

              <div className="col-span-2 ml-auto">
                <div className="px-2 w-full"></div>
              </div>
            </div>
            <Divider variant="middle" />
          </div>
          {error && (
            <WarningCard
              title="No Assignment Submitted"
              message="Please check assignments in the assignment section"
            />
          )}
          <div className="m-0 p-10 w-full h-fit">
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {uniqueAssignments &&
                uniqueAssignments.map((item) => (
                  <div className=" w-full m-4 p-4">
                    <MUIMiniCard
                      minTitle="Assigment for "
                      title={item.module_name}
                      isBtn="true"
                      btnText="View"
                      link={`/student/assessment/module/${item.module_name}`}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHomePage;
