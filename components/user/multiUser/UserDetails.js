import React from "react";
import AttendanceListStudent from "@/components/Modules/batches/AttendanceListStudent";
import AttendanceListTeacher from "@/components/Modules/batches/AttendanceListTeacher";
import AddStudent from "@/components/user/admin/AddStudent";
import AddTeacher from "@/components/user/admin/AddTeacher";
import SelectDropdown from "@/components/Layout/elements/SelectDropdown";
import { fetchBatchDataBasedOnBatchId } from "@/backend/Batches/BatchesDB";
import ValidationCard from "@/components/Layout/card/ValidationCard";

const LiveBatchDetails = ({
  user,
  isStudent,
  userType,
  profileData,
  batchId,
  batchDataTeacher,
  studentId,
  teacherId,
  setErrorProfile,
  errorProfile,
}) => {
  const [batchName, setBatchName] = React.useState();
  const [batchesData, setBatchData] = React.useState();

  //get student batch data
  React.useEffect(() => {
    const batchData = async () => {
      if (batchId) {
        const data = await fetchBatchDataBasedOnBatchId(batchId);
        setBatchData(data);
        if (data[0]) {
          setBatchName(data[0].batch_name);
        }
      }
    };
    batchData();
  }, [batchId]);

  return (
    <div>
      <div>
        {isStudent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="col-span-1">
              {errorProfile && (
                <ValidationCard
                  message="Please write correct details"
                  title="Warning"
                />
              )}
              {batchId && batchName && (
                <AddStudent
                  errorProfile={errorProfile}
                  setErrorProfile={setErrorProfile}
                  batchName={batchName}
                  batchesData={batchesData}
                  profileData={profileData}
                  userType={userType}
                  link="/admin/students"
                  user={user}
                  isStusent={isStudent}
                />
              )}
            </div>
            <div className="col-span-1">
              {batchId && (
                <AttendanceListStudent
                  // studentEmail={studentEmail}
                  studentsId={studentId}
                  batchId={batchId}
                  chapter="Huruf"
                  date="21/02/2023"
                  lastCol="Attended"
                />
              )}
            </div>
          </div>
        )}
        {!isStudent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="col-span-1">
              {errorProfile && (
                <ValidationCard
                  message="Please write correct details"
                  title="Warning"
                />
              )}
              {batchDataTeacher && profileData && (
                <AddTeacher
                  errorProfile={errorProfile}
                  setErrorProfile={setErrorProfile}
                  batchesData={batchDataTeacher}
                  profileData={profileData}
                  userType={userType}
                  link="/admin/students"
                  user={user}
                  action="edit"
                  isStusent={isStudent}
                />
              )}
            </div>
            <div className="col-span-1">
              <AttendanceListTeacher
                teacherId={teacherId}
                batchDataTeacher={batchDataTeacher}
                chapter="Huruf"
                date="21/02/2023"
                lastCol="Attended"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveBatchDetails;
