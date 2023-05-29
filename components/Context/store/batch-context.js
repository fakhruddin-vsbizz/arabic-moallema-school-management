import React, { useState } from "react";

const BatchContext = React.createContext({
  setBatchDetail: (data) => {},
  batchDetailList: [],
  setAttendanceList: (data) => {},
  attendanceList: [],
  setSubmittedHandler: (bool) => {},
  submitted: true,
  setSubmittedDeleteHandler: (bool) => {},
  submittedDelete: false,
  setBatchNameHandler: (batchName) => {},
  batchName: "",
});

export const BatchContextProvider = (props) => {
  const [bacthDetailList, setBacthDetailList] = useState();
  const [batchName, setBatchName] = useState();
  const [attendanceList, setAttendanceList] = useState();
  const [myArray, setMyArray] = useState([]);
  const [submittedDelete, setDeletedUser] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const setBatchDetailHandler = (batchData) => {
    setBacthDetailList(batchData);
  };
  const setAttendanceHandler = (data) => {
    setAttendanceList(data);
  };
  const setSubmittedHandler = (bool) => {
    console.log("boll", bool);
    console.log(submitted);
    setSubmitted(bool);
  };

  const setSubmittedDeleteHandler = (bool) => {
    console.log("boll", bool);
    console.log(submitted);
    setDeletedUser(bool);
  };
  const setBatchNameHandler = (batchNameData) => {
    if (batchNameData) {
      localStorage.setItem("batchName", batchNameData);
      const batch = localStorage.getItem("batchName");
      setBatchName(batch);
    }
  };
  const ContextValue = {
    setBatchDetail: setBatchDetailHandler,
    setAttendanceList: setAttendanceHandler,
    setSubmittedHandler: setSubmittedHandler,
    submitted,
    bacthDetailList,
    attendanceList,
    setBatchNameHandler,
    batchName,
    setMyArray,
    myArray,
    setSubmittedDeleteHandler,
    submittedDelete,
  };

  return (
    <BatchContext.Provider value={ContextValue}>
      {props.children}
    </BatchContext.Provider>
  );
};
export default BatchContext;
