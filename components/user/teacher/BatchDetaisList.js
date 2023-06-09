import * as React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import InputWithLable from "@/components/Layout/elements/InputWithLable";
import AttandanceListStudent from "@/components/user/teacher/AttandanceList";
import { LinkOff } from "@mui/icons-material";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";
import {
  fetchBatcheIdBasedOnBatchName,
  fetchBatchesSchedule,
  fetchEnrolledStudentsInBatch,
  fetchIndividualBatch,
} from "@/backend/Batches/BatchesDB";

import { postSessionData } from "@/backend/Session/SessionDB";
import BatchContext from "@/components/Context/store/batch-context";
import { useRouter } from "next/router";
import { fetchStudentsData } from "@/backend/Students/StudentDB";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { updateBatchLink } from "@/backend/Batches/UpdateBatchTeacher";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 560,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ClassDetais = ({ batchName, user }) => {
  const [open, setOpen] = React.useState(false);

  const [batchDetail, setBatchDetail] = React.useState([]);
  const [enrollStudentsId, setEnrollStudentsId] = React.useState([]);
  const [allStudents, setAllStudents] = React.useState([]);

  const [scheduleDetail, setScheduleDetail] = React.useState();

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [batchId, setBatchId] = React.useState();
  const [finalLinkGmeet, setFinalLinkGmeet] = React.useState();

  const batchCtx = React.useContext(BatchContext);
  const attendanceList = batchCtx.attendanceList;
  let newAttendance;
  if (attendanceList) {
    newAttendance = attendanceList.map((obj) => obj.student_id);
  }

  //getting the data of batches
  React.useEffect(() => {
    const fetchBatches = async () => {
      const data = await fetchBatchesData();
      setBatchDetail(data);
    };
    fetchBatches();
  }, []);

  //getting batches schedule
  React.useEffect(() => {
    const batchSchedule = async () => {
      const data = await fetchBatchesSchedule();
      setScheduleDetail(JSON.stringify(data, null, 2));
    };
    batchSchedule();
  }, []);

  //getting the batch id
  React.useEffect(() => {
    const setBatchIdData = async () => {
      const idData = await fetchBatcheIdBasedOnBatchName(batchName);
      if (idData && idData[0]) {
        setBatchId(idData[0].batch_id);
        console.log(idData[0].batch_id);
      }
    };
    setBatchIdData();
  }, [batchName]);
  console.log(batchId);

  //getting the students ids
  React.useEffect(() => {
    const enrollStudents = async () => {
      if (batchId) {
        const data = await fetchEnrolledStudentsInBatch(batchId);
        setEnrollStudentsId(data);
      }
    };
    enrollStudents();
  }, [batchId]);

  //getting the students email
  React.useEffect(() => {
    const allStudents = async () => {
      const data = await fetchStudentsData();
      setAllStudents(data);
    };
    allStudents();
  }, [batchId]);

  console.log(allStudents);

  let enrollStudents;

  if (allStudents && enrollStudentsId) {
    enrollStudents = allStudents
      .filter((item1) =>
        enrollStudentsId.some((item2) => item1.student_id === item2.student_id)
      )
      .map((item) => item.email);
  }

  console.log(enrollStudents);
  //filtering the bathches data
  const detail = batchDetail.filter((batch) => batch.batch_name === batchName);

  console.log("==== B Details======", detail);

  let arr;
  if (scheduleDetail) {
    arr = JSON.parse(scheduleDetail);
  }
  // filtering the batches schedule and getting the schedule
  let sheduleData;
  if (detail[0] && arr) {
    sheduleData = arr.filter(
      (sch) => sch.schedule.batchName === detail[0].batch_name
    );
  }

  //*************************handle time************************************ */

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
        setIsDisabled(true);
      }
    }
  }, [sheduleData]);

  /////////////////////Session handling/////////////////////////////////

  const startSession = async () => {
    if (batchId) {
      let currentTime = new Date();
      let currTime = currentTime.toLocaleString();
      // let moduleName = detail[0].book_name;
      // let batchId = detail[0].batch_name;
      let teacherId = detail[0].teacher_id;

      const data = await postSessionData(
        currTime,
        // moduleName,
        attendanceList,
        batchId,
        teacherId
      );

      setOpen(false);
    }
  };

  const startingLiveClass = () => {
    let routes = {};
    if (user !== "student" && batchId) {
      setOpen(true);
    } else {
      // navigate("/student/module/alphabets");
    }
  };

  const updateBatchGmeet = async () => {
    console.log("data", finalLinkGmeet);

    if (finalLinkGmeet === "") {
      console.log("empty", finalLinkGmeet);
      return;
    }

    if (finalLinkGmeet !== "") {
      await updateBatchLink(batchId, finalLinkGmeet);
      window.location.reload();
    }
  };

  console.log(finalLinkGmeet);

  return (
    <>
      {detail[0] && sheduleData && (
        <div style={{ height: "65vh" }} className="overflow-y-scroll">
          <div className="px-20 w-full grid grid-cols-2 gap-5  ">
            <div className="col-span-3 bg-gray-500 rounded-xl border-b-4 text-gray-50 border-lime-500 animate-popupSlide">
              <h1 className="p-5 text-xl font-bold border-b-2 animate-popupSlide  border-lime-600">
                Batch Details
              </h1>
              <div className="px-5 w-full grid grid-cols-3 gap-5 animate-popupSlide">
                <div className="col-span-1 p-3">
                  <span className="text-lg font-bold mr-10">Name </span>
                  <span className="">{detail[0].batch_name}</span>
                </div>
                <div className="col-span-1 p-3 ">
                  <span className="text-lg font-bold mr-10">Batch Type</span>
                  <span className="">{detail[0].type}</span>
                </div>
                <div className="col-span-1 p-3">
                  <span className="text-lg font-bold mr-10">Start Date </span>
                  <span className="">{sheduleData[0].schedule.startDate} </span>
                </div>
                <div className="col-span-2 p-3">
                  <span className="flex flex-row">
                    <span className="text-lg font-bold mr-10">Days </span>
                    {sheduleData &&
                      sheduleData[0].schedule.days.map((day) => (
                        <span
                          className="transition-all ease-out hover:ease-in hover:scale-105 rounded-3xl px-5 py-1 border-2 m-1 text-center border-lime-500"
                          color="success"
                        >
                          {day}
                        </span>
                      ))}
                  </span>
                </div>
                <div className="col-span-1 p-3">
                  <span className="text-lg font-bold mr-10">Start Time </span>
                  <span className="">{sheduleData[0].schedule.time}</span>
                </div>
              </div>
              <div className="w-full grid grid-cols-5 gap-20 rounded-lg overflow-hidden shadow-lg  items-center justify-center border-t-2   border-lime-600 ">
                <div className=" m-10 w-full  col-span-3">
                  <label className="text-lg font-bold">Class Link</label>
                  <span class="ml-10 inline-flex items-center justify-center px-4 py-2 text-base font-medium text-gray-200  rounded-lg  animate-popupSlide">
                    {/* {detail[0].g_meet} */}
                    {user !== "student" && (
                      <div>
                        <input
                          type="text"
                          className=" m-4 rounded-lg w-96"
                          defaultValue={detail[0].g_meet}
                          onChange={(e) => setFinalLinkGmeet(e.target.value)}
                        />
                        <button
                          onClick={updateBatchGmeet}
                          className=" bg-slate-400 text-black p-2 rounded-lg shadow-lg"
                        >
                          Edit Link
                        </button>
                      </div>
                    )}
                  </span>
                </div>

                <div className="col-span-1">
                  <div className="flex items-center justify-end animate-popupSlide w-full">
                    
                      {isDisabled ? (
                        <Link
                        href={detail[0].g_meet}
                        target="_blank"
                        className="w-full"
                      >
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "rgb(101 163 13)" }}
                          className=" w-80 transition-all duration-150 hover:scale-105  "
                          onClick={startingLiveClass}
                        >
                          Join Class
                        </Button>
                        </Link>
                      ) : (
                        <div
     
                        className="w-full">
                        <Button
                          variant="contained"
                          disabled
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)", color: 'lightgray' }}
                          className=" w-80 cursor-wait "
                        >
                          Wait for the Class time to Start
                        </Button>
                        </div>
                      )}
                    

                    {/* <div className=" w-96 animate-popupSlide">
                      {!isDisabled && <span className="">Days - </span>}
                      {!isDisabled &&
                        sheduleData[0].schedule.days.map((day) => (
                          <span
                            name="role"
                            className=" text-red-600 focus:outline-none border-x-1"
                          >
                            {day},
                          </span>
                        ))}
                      {!isDisabled && (
                        <span className="block mt-2 ">
                          Timing -
                          <span className=" text-red-600">
                            {sheduleData[0].schedule.time}
                          </span>
                        </span>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            
            {user !== "student" && (
              <div className="col-span-3 bg-white rounded-md">
                <h1 className="p-5 border-b-2">Students List</h1>
                <List sx={{ width: "200%", maxWidth: 360 }}>
                  {enrollStudents &&
                    enrollStudents.map((student, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={student} />
                      </ListItem>
                    ))}
                </List>
              </div>
            )}
            {user !== "student" && (
              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={style}
                  className="bg-white rounded-md"
                  style={{ width: "720px" }}
                >
                  <div className="my-2 grid grid-cols-4">
                    <div className="text-start col-span-2">
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Attendance for class{" "}
                      </Typography>
                    </div>
                  </div>
                  {enrollStudents && (
                    <div className="my-5">
                      <AttandanceListStudent
                        type="markAttendance"
                        enrollStudents={enrollStudents}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-10">
                    <div className="col-span-1">
                      <Button
                        className="mt-5 w-full bg-yellow-600"
                        variant="contained"
                        color="error"
                        onClick={startSession}
                        endIcon={<RotateLeftIcon />}
                      >
                        End Class
                      </Button>
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ClassDetais;

// <div className="  my-5 col-span-2">
// <div className="flex items-center justify-end animate-popupSlide ">
//   <Link
//     href={detail[0].g_meet}
//     target="_blank"
//     className="w-full"
//   >
//     {isDisabled && (
//       <Button
//         variant="contained"
//         style={{backgroundColor: 'rgb(101 163 13)'}}
//         className=" w-full transition-all duration-150 hover:scale-105 animate-wiggle "
//         onClick={startingLiveClass}
//       >
//         Join Class
//       </Button>
//     )}
//   </Link>
