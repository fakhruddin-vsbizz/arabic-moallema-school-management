import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/components/Context/store/auth-context";
import ClassForStudent from "@/components/user/student/ClassForStudent";
import {
  fetchBatchNameBasedOnBatchId,
  fetchBatchNameForStudent,
  fetchstudentBatcheIdBasedOnStudentId,
} from "@/backend/Batches/BatchesForTeachersStudentsDB";
import { useRouter } from "next/router";
import { fetchStudentIdBasedOnEmail } from "@/backend/Students/StudentDB";

const index = () => {
  const [batchName, setBatchName] = useState();
  const [studentId, setStudentId] = useState();
  const [batchId, setBatchId] = useState();

  const authCtx = useContext(AuthContext);
  const email = authCtx.userEmail;

  const router = useRouter();
  const type = authCtx.userType;

  const loggedIn = authCtx.isLoggedIn;

  const typeStudent = authCtx.userType === "student" ? true : false;

  if (!typeStudent && loggedIn) {
    router.replace("/");
  }

  useEffect(() => {
    console.log("in");
    if (typeStudent && loggedIn) {
      if (!typeStudent && !loggedIn) {
        console.log("second in");
        router.replace("/");
      }
    }

    const localType = localStorage.getItem("type");

    if (localType !== "student") {
      console.log("second in");
      router.replace("/");
    }
  }, [loggedIn, typeStudent]);

  useEffect(() => {
    const fetchId = async () => {
      const data = await fetchStudentIdBasedOnEmail(email);
      if (data[0]) {
        setStudentId(data[0].student_id);
      }
    };
    fetchId();
  }, [email]);
  console.log(studentId);

  useEffect(() => {
    const fetchBatchId = async () => {
      if (studentId) {
        const data = await fetchstudentBatcheIdBasedOnStudentId(studentId);
        if (data[0]) {
          setBatchId(data[0].batch_id);
        }
      }
    };
    fetchBatchId();
  }, [studentId]);

  useEffect(() => {
    const fetchBatchName = async () => {
      if (batchId) {
        const data = await fetchBatchNameBasedOnBatchId(batchId);
        if (data[0]) {
          setBatchName(data[0].batch_name);
        }
      }
    };
    fetchBatchName();
  }, [batchId]);

  console.log("batch: ", batchName);
  return <>{batchName && <ClassForStudent batchName={batchName} />}</>;
};

export default index;
