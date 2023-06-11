import React, { useEffect, useState } from "react";
import grayBgImg from "@/components/src/img/grayBgImg.png";

import Sidebar from "@/components/Layout/navigation/Sidebar";
import BatchHistory from "@/components/Modules/batches/BatchHistory";
import BackButton from "@/components/Layout/elements/BackButton";
import { Divider } from "@mui/material";
import AttandanceList from "@/components/user/teacher/AttandanceList";
import { fetchEnrolledStudentsInBatch } from "@/backend/Batches/BatchesDB";
import { fetchSessionDataForClass } from "@/backend/Session/SessionDB";
import { fetchSessionAttendance } from "@/backend/Session/SessionDB";
import VerifiedIcon from '@mui/icons-material/Verified';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import { fetchStudentsData } from "@/backend/Students/StudentDB";

const ChapterDetailHome = ({ sessionId, batchId, user }) => {
  const [presentStudent, setPresentStudent] = useState();

  const [allStudentsInBatch, setAllStudentsInBatch] = useState([]);
  const [allStudentsInBatchData, setAllStudentsInBatchData] = useState([]);

  const [chapterDetail, setchapterDetail] = useState();
  const [presentStudentsArray, setpresentStudentsArray] = useState();
  const [absentStudents, setabsentStudents] = useState([]);

  //get all students for the batch
  useEffect(() => {
    const getStudents = async () => {
      if (batchId) {
        const data = await fetchEnrolledStudentsInBatch(batchId);
        setAllStudentsInBatch(data);
      }
    };
    getStudents();
  }, [batchId]);

  //present students
  useEffect(() => {
    let arr;
    if (presentStudent) {
      arr = JSON.parse(presentStudent);
      setpresentStudentsArray(arr[0].students_present.students);
    }
  }, [presentStudent]);

  //get abasent students
  useEffect(() => {
    let absent;
    if (allStudentsInBatchData && presentStudentsArray) {
      absent = allStudentsInBatchData.filter(
        (allStudent) => !presentStudentsArray.includes(allStudent)
      );
      setabsentStudents(absent);
    }
  }, [presentStudentsArray, presentStudent]);

  //get all students for the batch
  useEffect(() => {
    const getAllStudents = async () => {
      const data = await fetchStudentsData();

      if (allStudentsInBatch) {
        let getStudentsDetail = data
          .filter((item1) =>
            allStudentsInBatch.some(
              (item2) => item1.student_id === item2.student_id
            )
          )
          .map((item) => item.email);

        setAllStudentsInBatchData(getStudentsDetail);
      }
    };
    getAllStudents();
  }, [batchId, allStudentsInBatch, presentStudent]);

  useEffect(() => {
    const fetchSession = async () => {
      if (batchId && sessionId) {
        const data = await fetchSessionDataForClass(batchId, sessionId);
        setchapterDetail(data);
      }
    };
    fetchSession();
  }, [batchId, sessionId]);

  const getAttandanceSelectedSession = async (value) => {
    const sessionId = value;
    if (batchId && sessionId) {
      const data = await fetchSessionAttendance(batchId, sessionId);
      setPresentStudent(JSON.stringify(data, null, 2));
    }
  };

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
      <div className="flex min-h-screen w-full h-full">
        <Sidebar nav_index={1} />
        <div className="flex-1  px-5">
          <div className="m-0 p-5  w-full h-fit">
            {/* <MUIBreadcrumbs /> */}
            <div className="grid grid-cols-1 w-full mx-auto my-10 gap-10">
              <div className="col-span-1">
                <h1 className=" my-auto text-2xl mt-3 ">
                  <BackButton /> Details for Session{sessionId}
                </h1>
              </div>

              <Divider variant="middle" />
              <div className="col-span-1" style={{ padding:'3%' }}>
                {chapterDetail && (
                  <BatchHistory
                    user={user}
                    title="Class History"
                    action="btn"
                    type="chapterDetail"
                    batchHistory={chapterDetail}
                    getAttandanceSelectedSession={getAttandanceSelectedSession}
                    // getRecordedVideo={getRecordedVideo}
                  />
                )}

                <br/><br/>

                {user !== "student" && (
                  <center>
                    <div className="col-span-1" style={{ width:'100%', textAlign:'left' }}>
                      <div className="bg-white rounded-lg  p-5 " style={{ borderRadius:'20px' }}>
                        <h1 className="py-2 border-b-2 " style={{ fontSize:'160%' }}>Attendance for Session{sessionId}</h1>
                        <div className=" flex  justify-around mt-10">
                          <div className="w-full px-2">
                            <h1 className="py-2 border-b-2 text-lime-700 text-[120%]"><VerifiedIcon/>&nbsp;&nbsp;Present Students</h1>
                            {presentStudentsArray && (
                              
                                <AttandanceList
                                  presentStudentsArray={presentStudentsArray}
                                  value="Student"
                                  type="present"
                                />
                            
                              
                            )}
                          </div>
                          <div className="w-full px-2">
                            <h1 className="py-2 border-b-2 text-red-400	 text-[120%]"><CallMissedOutgoingIcon/>&nbsp;&nbsp;Absent Students</h1>
                            {absentStudents && (
                              <AttandanceList
                                absentStudents={absentStudents}
                                value="Student"
                                type="absent"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </center>
                  
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetailHome;
