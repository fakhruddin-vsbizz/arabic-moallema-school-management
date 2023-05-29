import React, { useContext } from "react";
import grayBgImg from "@/components/src/img/grayBgImg.png";
import Sidebar from "@/components/Layout/navigation/Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import BatchEdit from "@/components/Modules/batches/BatchEdit";
import RemoveUser from "@/components/Modules/batches/RemoveUser";
import BatchHistory from "@/components/Modules/batches/BatchHistory";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import BackButton from "@/components/Layout/elements/BackButton";
import { Button } from "@mui/material";
import {
  fetchBatcheIdBasedOnBatchName,
  fetchEnrolledStudentsInBatch,
} from "@/backend/Batches/BatchesDB";
import UserList from "@/components/Modules/batches/UserList";
import { fetchSessionDataForBatch } from "@/backend/Session/SessionDB";
import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";
import BatchContext from "@/components/Context/store/batch-context";
import SuccessPrompt from "@/components/Layout/elements/SuccessPrompt";
import WarningCard from "@/components/Layout/card/WarningCard";
import BatchEditNew from "./BatchEditNew";
import {
  fetchTeacherBasedonId,
  fetchTeacherEmailBasedonId,
  fetchTeachersBasedonEmail,
} from "@/backend/UserProfile/StudentTeacherProfileDB";
import { fetchStudentsData } from "@/backend/Students/StudentDB";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BatchDetailHome = ({ batchName }) => {
  const [open, setOpen] = React.useState(false);
  const [enrollStudents, setEnrollStudents] = React.useState([]);
  const [batchHistory, setBatchHistory] = React.useState([]);
  const [batchDetail, setBatchDetail] = React.useState([]);
  const [batchId, setBatchId] = React.useState();
  const [teacherId, setTeacherId] = React.useState();
  const [teacherEmail, setTeacherEmail] = React.useState();
  const [allStudentsInBatchData, setAllStudentsInBatchData] = React.useState(
    []
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const batchCtx = useContext(BatchContext);

  //getting the bacthId
  React.useEffect(() => {
    const fetchTeacherId = async () => {
      const data = await fetchBatcheIdBasedOnBatchName(batchName);
      if (data[0]) {
        setBatchId(data[0].batch_id);
        setTeacherId(data[0].teacher_id);
        console.log(data[0].teacher_id);
      }
    };
    fetchTeacherId();
  }, [batchName]);

  console.log(batchId);
  console.log(teacherEmail);
  console.log(teacherId);

  //getting the teacher email
  React.useEffect(() => {
    const fetchTeacherEmail = async () => {
      const data = await fetchTeacherEmailBasedonId(teacherId);
      if (data) {
        setTeacherEmail(data[0].email);
      }
    };
    fetchTeacherEmail();
  }, [teacherId, open]);

  //getting the bacth details
  React.useEffect(() => {
    const fetchBatches = async () => {
      const data = await fetchBatchesData();
      setBatchDetail(data);
    };
    fetchBatches();
  }, [open]);

  //filtering the bathches data
  const detail = batchDetail.filter((batch) => batch.batch_id === +batchId);
  if (detail) {
    console.log(detail);
  }

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

  console.log(enrollStudents);

  //getting the batch history for the selected batch
  React.useEffect(() => {
    const studentBatch = async () => {
      if (batchId) {
        const data = await fetchSessionDataForBatch(batchId);
        setBatchHistory(data);
      }
    };
    studentBatch();
  }, [batchId]);

  //get all students email for the current batch based on their id's
  React.useEffect(() => {
    const getAllStudents = async () => {
      const data = await fetchStudentsData();

      if (enrollStudents) {
        let getStudentsDetail = data
          .filter((item1) =>
            enrollStudents.some(
              (item2) => item1.student_id === item2.student_id
            )
          )
          .map((item) => item.email);

        setAllStudentsInBatchData(getStudentsDetail);
      }
    };
    getAllStudents();
  }, [batchId, enrollStudents]);

  console.log(allStudentsInBatchData);
  console.log(batchHistory);

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
        <Sidebar nav_index={0} />
        <div className="flex-1  p-5  ">
          <div className="m-0 p-5 w-full ">
            <div className="flex justify-between w-full mx-auto my-10 gap-10 ">
              <div className="">
                <h1 className=" my-auto text-2xl mt-3 ">
                  <BackButton /> Batch Details.
                </h1>
              </div>

              <div className="">
                <div className=" w-full  ">
                  <Button
                    variant="contained"
                    className="bg-dark-purple"
                    onClick={handleOpen}
                    startIcon={<EditIcon />}
                  >
                    Change Teacher
                  </Button>
                </div>
              </div>
            </div>
            <Divider variant="middle" />
          </div>
          {batchCtx.submitted && (
            <SuccessPrompt
              type="edit"
              title="Batch Teacher Changed Successfully"
              setSubmitted={batchCtx.setSubmittedHandler}
            />
          )}
          <div className="m-0 p-10 w-full bg-white h-fit border-4 border-white rounded-xl">
            {batchId && (
              <BatchEditNew
                batchId={batchId}
                batchName={batchName}
                actionBtn="Edit Batch"
                link=""
              />
            )}
          </div>
          <div className="bg-white p-0 my-5 h-fit">
            {batchHistory && batchHistory.length > 0 ? (
              <BatchHistory batchHistory={batchHistory} />
            ) : (
              <WarningCard title="No Session Data" />
            )}
          </div>
          <div className=" mt-10">
            {allStudentsInBatchData && allStudentsInBatchData.length > 0 ? (
              <UserList
                batchName={batchName}
                enrollStudents={allStudentsInBatchData}
              />
            ) : (
              <WarningCard
                title={`No Student Enrolled in ${batchName} batch`}
              />
            )}
          </div>
          {detail[0] && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <RemoveUser
                  userName={teacherEmail}
                  batchId={batchId}
                  operation="changeTeacher"
                  user="Teacher 1"
                  isReplace={true}
                  type="Teacher"
                  setOpen={setOpen}
                  action="Change"
                  batchName={batchName}
                />
              </Box>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchDetailHome;
