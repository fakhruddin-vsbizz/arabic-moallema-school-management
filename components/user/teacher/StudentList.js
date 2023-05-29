import * as React from "react";
import Link from "next/link";
import CardLayout from "@/components/Layout/card/CardLayout";
import SelectDropdown from "@/components/Layout/elements/SelectDropdown";
import MUISlider from "@/components/Layout/slider/MUISlider";
import MUIMiniCard from "@/components/Layout/card/MUIMiniCard";
import { Chip, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import LoadingSpinner from "@/components/Layout/spinner/LoadingSpinner";
import {
  fetchBatcheIdBasedOnBatchName,
  fetchEnrolledStudentsInBatch,
} from "@/backend/Batches/BatchesDB";

import BatchContext from "@/components/Context/store/batch-context";
import SuccessPrompt from "@/components/Layout/elements/SuccessPrompt";
import WarningCard from "@/components/Layout/card/WarningCard";
import { fetchStudentsData } from "@/backend/Students/StudentDB";

const ClassDetais = () => {
  const [loading, setLoading] = React.useState(false);
  const [allAssignments, setAllAssignments] = React.useState([]);
  const [enrolledStudent, setEnrollStudents] = React.useState();
  const [error, setError] = React.useState();
  const [selectedStudent, setSelectedStudent] = React.useState();
  const [batchId, setBatchId] = React.useState();
  const [allStudentsInBatchData, setAllStudentsInBatchData] = React.useState(
    []
  );

  const [filteredAssignment, setFilteredAssignment] = React.useState([]);

  const batchCtx = React.useContext(BatchContext);

  //getting the batch id
  React.useEffect(() => {
    const setBatchIdData = async () => {
      const batch = localStorage.getItem("batchName");
      const idData = await fetchBatcheIdBasedOnBatchName(batch);
      if (idData[0]) {
        setBatchId(idData[0].batch_id);
      }
    };
    setBatchIdData();
  }, []);
  console.log(batchId);

  //getting the student for the selected batch
  React.useEffect(() => {
    const studentBatch = async () => {
      if (batchId) {
        const data = await fetchEnrolledStudentsInBatch(batchId);
        setEnrollStudents(data);
      }
    };
    studentBatch();
  }, [batchId]);

  //get all students email for the current batch based on their id's
  React.useEffect(() => {
    const getAllStudents = async () => {
      const data = await fetchStudentsData();

      if (enrolledStudent) {
        let getStudentsDetail = data
          .filter((item1) =>
            enrolledStudent.some(
              (item2) => item1.student_id === item2.student_id
            )
          )
          .map((item) => item.email);

        setAllStudentsInBatchData(getStudentsDetail);
      }
    };
    getAllStudents();
  }, [batchId, enrolledStudent]);

  console.log(allStudentsInBatchData);

  //getting the student assignment for the selected batch
  React.useEffect(() => {
    const allAssignments = async () => {
      if (batchId) {
        const data = await fetchSubmittedAssignment(batchId);
        if (data[0]) {
          setSelectedStudent(data[0].student_id);
        }

        setAllAssignments(data);
      }
    };
    allAssignments();
  }, [batchId]);

  const handleSelectedItem = async (studentId) => {
    const data1 = await fetchStudentsData();
    if (data1[0]) {
      let studentIdForEmail = data1
        .filter((item) => item.email === studentId)
        .map((item1) => item1.student_id);
      setSelectedStudent(studentIdForEmail[0]);

      const fetchStudentBatch = async () => {
        if (batchId) {
          const data = await fetchSubmittedAssignmentBasedOnStudent(
            studentIdForEmail[0],
            batchId
          );
          let selectedAssignments = allAssignments.filter((obj1) =>
            data.some((obj2) => obj1.student_id === obj2.student_id)
          );
          if (studentId) {
            selectedAssignments.length === 0 ? setError(true) : setError(false);
          }
          setFilteredAssignment(selectedAssignments);
        }
      };
      fetchStudentBatch();
    }
  };

  console.log("student: ", selectedStudent);
  console.log("batch: ", batchId);

  const dataToDisplay =
    filteredAssignment.length > 0 ? filteredAssignment : allAssignments;

  return (
    <div className="">
      <div className="px-3 lg:px-8  ">
        {batchCtx.submitted && (
          <SuccessPrompt
            type="edit"
            title="Student graded successfully"
            setSubmitted={batchCtx.setSubmittedHandler}
          />
        )}

        <div className="">
          <CardLayout
            firstComp=<div>
              <h1 className="text-2xl lg:text-3xl text-dark-purple">
                Fakhruddin Ezzey
              </h1>
            </div>
            secondComp=<div>
              <h1 className="mb-3">Batches attended 3/5</h1>
              <h1>Assignment completed 4/5</h1>
            </div>
          />
        </div>
        <div className="col-span-3 lg:col-span-1 mt-10 w-96 flex float-right">
          {allStudentsInBatchData && (
            <div className="px-2 w-full ">
              <SelectDropdown
                handleSelectedItem={handleSelectedItem}
                allItems={allStudentsInBatchData}
                value="class"
                type="studentList"
                lable="Select Student"
              />
            </div>
          )}
        </div>
        <h1 className="text-lg  mt-20">Completed Assignments</h1>
        {error && (
          <WarningCard title={` No Assignment for the selected Student`} />
        )}
        {dataToDisplay && (
          <div>
            <MUISlider
              card={
                !error &&
                dataToDisplay &&
                dataToDisplay.map((assignment) => (
                  <div className="px-2">
                    <MUIMiniCard
                      title={assignment.sub_module}
                      disc="15/02/23"
                      isBtn={true}
                      btnText="View"
                      link={`/teacher/student/${selectedStudent}/${assignment.sub_module}`}
                    />
                  </div>
                ))
              }
            />
          </div>
        )}

        {dataToDisplay && dataToDisplay.length === 0 && (
          <WarningCard title={`No Assignment submitted in this batch`} />
        )}
      </div>
    </div>
  );
};

export default ClassDetais;
