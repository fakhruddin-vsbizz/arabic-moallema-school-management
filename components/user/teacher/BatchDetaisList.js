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
  Alert
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ClassIcon from '@mui/icons-material/Class';
import GroupIcon from '@mui/icons-material/Group';

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
          <center>
            <div style={{ width:'90%', borderRadius:'15px', backgroundColor:'#00aa6c',fontSize:'160%', fontFamily:'Segoe UI', padding:'1.5%', fontWeight:'500', textAlign:'left', color:'white' }}>
              Batch Details
            </div>

            <br/>

            
              <div className="bg-white" style={{ borderRadius:'15px', padding:'3%', fontSize:'110%', textAlign:'left', width:'90%' }}>
                <div className="grid grid-cols-2 gap-2">
                  <div><label>Name</label><br/><label className="text-md mr-10"><b><ClassIcon/>&nbsp;&nbsp;{detail[0].batch_name}</b></label></div>
                  <div><label>Batch Type</label><br/><label className="text-md mr-10"><b><GroupIcon/>&nbsp;&nbsp;{detail[0].type}</b></label></div>
                </div>
                <br/>
                
                <hr></hr>
                <br/>

                <div><label>Days on which this batch is actively studying</label><br/><br/>
                  <label className="text-md mr-10">
                  {sheduleData &&
                    sheduleData[0].schedule.days.map((day) => (
                      <span
                        className="transition-all ease-out hover:ease-in hover:scale-105 rounded-3xl px-5 py-1 border-2 m-1 text-center border-sky-600	"
                        color="success"
                      >
                        <b>{day}</b>
                      </span>
                    ))}
                  </label>
                </div>
                
              </div>
              <br/><br/>
              <div className="bg-white" style={{ borderRadius:'15px', padding:'3%', fontSize:'110%', textAlign:'left', width:'90%'  }}>
                <div className="grid grid-cols-2 gap-2">
                  <div><label>Batch started since</label><br/><label className="text-md mr-10"><b><CalendarMonthIcon/>&nbsp;&nbsp;{sheduleData[0].schedule.startDate}</b></label></div>
                  <div><label>Everyday starting time:</label><br/><label className="text-md mr-10"><b><AccessAlarmIcon/>&nbsp;&nbsp;{sheduleData[0].schedule.time}</b></label></div>
                </div>
                <br/>
                
                <hr></hr>
                <br/>

                <div><label>You can edit the class meet link below:</label><br/><br/>
                  <label className="text-md mr-10">
                  <input
                    type="text"
                    className=" m-4 rounded-lg w-96"
                    defaultValue={detail[0].g_meet}
                    onChange={(e) => setFinalLinkGmeet(e.target.value)}
                  />
                  <Button
                    variant='contained'
                    onClick={updateBatchGmeet}
                    className="text-black p-2 rounded-lg shadow-lg"
                    style={{ textTransform:'none' }}
                  >
                    Edit Link
                  </Button>
                  </label>
                  {isDisabled ? (
                        <Link
                        href={detail[0].g_meet}
                        target="_blank"
                        className="w-full"
                      >
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "rgb(101 163 13)" }}
                          className=" w-80 transition-all duration-150 hover:scale-105"
                          onClick={startingLiveClass}
                        >
                          Join Class
                        </Button>
                        </Link>
                      ) : (
                        <div
     
                        className="w-full">
                          <Alert severity="info">No class sessions today.</Alert>
                        
                        </div>
                      )}
                </div>
                
              </div>
            

          </center>
          

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
