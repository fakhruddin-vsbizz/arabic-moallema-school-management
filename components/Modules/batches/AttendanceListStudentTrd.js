import React from "react";

import { fetchStudentAttendance } from "@/backend/Students/StudentAttendanceDB";
import WarningCard from "@/components/Layout/card/WarningCard";
import { fetchStudentsData } from "@/backend/Students/StudentDB";
import { fetchChapters } from "@/backend/Chapters/GetChaptersDB";

const AttendanceListStudentTrd = ({ batchId, studentsId }) => {
  const [attendaceList, setAttendanceList] = React.useState();
  const [allStudents, setAllStudents] = React.useState();
  const [allChapters, setAllChapters] = React.useState();

  const [id, setId] = React.useState();

  React.useEffect(() => {
    const fetchAttendance = async () => {
      if (batchId) {
        const data = await fetchStudentAttendance(batchId);
        setAttendanceList(data);
      }
    };
    fetchAttendance();
  }, [batchId]);

  React.useEffect(() => {
    const fetchChaptersData = async () => {
      if (batchId) {
        const data = await fetchChapters();
        setAllChapters(data);
      }
    };
    fetchChaptersData();
  }, []);
  console.log(allChapters);
  React.useEffect(() => {
    const fetchAttendanceStudent = async () => {
      const data = await fetchStudentsData();
      setAllStudents(data);
    };
    fetchAttendanceStudent();
  }, []);

  console.log(attendaceList);
  console.log(allStudents);
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md">
        {attendaceList && attendaceList.length > 0 && (
          <div className=" border-b-2 p-3   ">
            <h1 className="text-2xl pt-2">Students Attendance History</h1>
            <div className="flex justify-between mt-3  px-3 ">
                <th className="">
                  Students
                </th>
                <th className="">Date</th>
                <th className="pr-3 ">Attaendance</th>
              </div>
          </div>
          
        )}
        {attendaceList && attendaceList.length > 0 && (
          <div className="p-5 align-middle overflow-y-auto h-96">
            <div>
              {/* <div className="flex justify-between mb-3 pb-2 border-b-4 ">
                <td className="">
                  Students
                </td>
                <td className="">Date</td>
                <td className=" ">Attaendance</td>
              </div> */}
              <div className="">
              {attendaceList.map((attendance) => (
                  <div
                  key={attendance.chapter_id}
                  className="flex justify-between mb-2 pb-2 border-b-2 "
                >
                  <td className="">{attendance.chapter_id || "ok"}</td>
                  <td className=" ">
                    {attendance.starting_time.substring(0, 10)}
                  </td>
                  {allStudents &&
                  attendance.students_present.students.includes(id) ? (
                    <td className="whitespace-nowrap px-3   text-green-600 text-md">
                      Present
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-3   text-red-600 text-md">
                      Absent
                    </td>
                  )}
                </div>
              ))}
              {attendaceList.map((attendance) => (
                  <div
                  key={attendance.chapter_id}
                  className="flex justify-between mb-2 pb-2 border-b-2 "
                >
                  <td className="">{attendance.chapter_id || "ok"}</td>
                  <td className=" ">
                    {attendance.starting_time.substring(0, 10)}
                  </td>
                  {allStudents &&
                  attendance.students_present.students.includes(id) ? (
                    <td className="whitespace-nowrap px-3   text-green-600 text-md">
                      Present
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-3   text-red-600 text-md">
                      Absent
                    </td>
                  )}
                </div>
              ))}
              {attendaceList.map((attendance) => (
                  <div
                  key={attendance.chapter_id}
                  className="flex justify-between mb-2 pb-2 border-b-2 "
                >
                  <td className="">{attendance.chapter_id || "ok"}</td>
                  <td className=" ">
                    {attendance.starting_time.substring(0, 10)}
                  </td>
                  {allStudents &&
                  attendance.students_present.students.includes(id) ? (
                    <td className="whitespace-nowrap px-3   text-green-600 text-md">
                      Present
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-3   text-red-600 text-md">
                      Absent
                    </td>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>
        )}
        {attendaceList && attendaceList.length === 0 && (
          <WarningCard title={`No Session Attendance For The Student`} />
        )}
      </div>
    </div>
  );
};

export default AttendanceListStudentTrd;
