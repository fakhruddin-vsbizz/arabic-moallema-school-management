import React, { useContext, useEffect, useState } from "react";
import grayBgImg from "@/components/src/img/grayBgImg.png";
import ClassList from "@/components/user/teacher/BatchList";
import Sidebar from "@/components/Layout/navigation/Sidebar";
import AuthContext from "@/components/Context/store/auth-context";
import { fetchTeacherBatches } from "@/backend/Batches/BatchesForTeachersStudentsDB";
import CardList from "../admin/CardList";
import { fetchTeachersIdBasedOnEmail } from "@/backend/Teachers/TeacherDB";
import WarningCard from "@/components/Layout/card/WarningCard";
// import InProgress from "@/components/Layout/screen/InProgress";
// import MiniCard from "@/components/Layout/card/MiniCard";

const TeacherHomeTeachersPage = ({ email }) => {
  const [teacherId, setTeacherId] = useState();
  const [warning, setWarning] = React.useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getTeacherId = async () => {
      const data = await fetchTeachersIdBasedOnEmail(email);
      if (data[0]) {
        setTeacherId(data[0].teacher_id);
      }
    };
    getTeacherId();
  }, [email]);

  useEffect(() => {
    const teacherBatches = async () => {
      if (teacherId) {
        const data = await fetchTeacherBatches(teacherId);
        authCtx.setBatchesData(data);
      }
    };
    teacherBatches();
  }, [teacherId]);

  console.log(authCtx.batchesList);

  useEffect(() => {
    if (authCtx.batchesList && authCtx.batchesList.length > 0) {
      setWarning(false);
    } else {
      setWarning(true);
    }
  }, [authCtx.batchesList]);

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
        <div className="flex-1 h-screen p-7  ">
          {warning && <WarningCard title="No Batches assign to the teacher" />}

          <div className="m-0 p-10 w-full h-fit">
            <div className="grid grid-cols-2 lg:grid-cols-3 w-full mx-auto my-10 gap-10">
              {authCtx.batchesList &&
                authCtx.batchesList.map((batch) => (
                  <CardList
                    subTitle={batch.book_name}
                    title={batch.batch_name}
                    id={batch.id}
                    link={`/teacher/batch-detail/${batch.batch_name}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHomeTeachersPage;
