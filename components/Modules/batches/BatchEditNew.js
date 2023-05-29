import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "@/components/Context/store/auth-context";
import { fetchTeachersData } from "@/backend/Teachers/TeacherDB";
import {
  fetchBatchesSchedule,
  postCreateBatch,
} from "@/backend/Batches/BatchesDB";
import BatchContext from "@/components/Context/store/batch-context";
import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";
import {
  updateBatch,
  updateLiveClassBatchName,
  updateStudentAssignmentBatchName,
  updateStudentBatchName,
  updateTeacherActivityLog,
} from "@/backend/Batches/UpdateBatchTeacher";
import { useRouter } from "next/router";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BatchEditNew = ({ actionBtn, link, setOpen, batchName, batchId }) => {
  const [error, setError] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const batchCtx = useContext(BatchContext);
  const [update, setUpdate] = React.useState(false);

  const [batchDetail, setBatchDetail] = React.useState([]);
  const [scheduleDetail, setScheduleDetail] = React.useState();

  //getting the data of batches
  React.useEffect(() => {
    const fetchBatches = async () => {
      const data = await fetchBatchesData();
      setBatchDetail(data);
    };
    fetchBatches();
  }, [update]);

  //getting batches schedule
  React.useEffect(() => {
    const batchSchedule = async () => {
      const data = await fetchBatchesSchedule();
      setScheduleDetail(JSON.stringify(data, null, 2));
    };
    batchSchedule();
  }, [update]);

  //filtering the bathches data
  const detail = batchDetail.filter((batch) => batch.batch_name === batchName);

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

  //********************Create Batch ***********/ */
  //convert time formate
  function convertTimeTo12HourFormat(time) {
    let [hours, minutes] = time.split(":");
    let hours12 = (hours % 12 || 12).toString();
    hours12 = hours12.padStart(2, "0");
    minutes = minutes.padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    return `${hours12}:${minutes} ${ampm}`;
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  //inputFields
  const [nameData, setBatchName] = React.useState("");

  if (sheduleData) {
    console.log(sheduleData);
  }

  //handle selected days
  const handleChange = (event) => {
    const day = event.target.value;
    if (event.target.checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    }
  };

  //handle input fields data
  const nameRef = useRef();
  const typeRef = useRef();
  const timeRef = useRef();
  const dateRef = useRef();
  const gmeetLink = useRef();

  const authCtx = useContext(AuthContext);
  let options = authCtx.teachersList;

  useEffect(() => {
    if (sheduleData) {
      console.log("inside");
      setSelectedDays(sheduleData[0].schedule.days);
    }
  }, [scheduleDetail, detail[0]]);

  //getting the teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await fetchTeachersData();
      authCtx.setTeachersData(data);
    };
    fetchTeachers();
  }, []);

  console.log(selectedDays);
  const onBatchEditHandler = async (e) => {
    e.preventDefault();
    setUpdate((prev) => !prev);

    //getting the values
    const enteredBatchName = nameRef.current.value;
    const enteredType = typeRef.current.value;
    const time = timeRef.current.value;
    const date = dateRef.current.value;
    const glink = gmeetLink.current.value;

    let batchNameData;
    if (detail[0]) {
      batchNameData = detail[0].batch_name;
    }
    let daysForSchedule;
    let timeForSchedule;
    let dateForSchedule;
    if (sheduleData[0]) {
      daysForSchedule = sheduleData[0].schedule.days;
      timeForSchedule = sheduleData[0].schedule.time;
      dateForSchedule = sheduleData[0].schedule.startDate;
    }

    const obj = {
      days: selectedDays.length > 0 ? selectedDays : daysForSchedule,
      time: time !== undefined ? time : timeForSchedule,
      startDate: date ? date : dateForSchedule,
      batchName: enteredBatchName ? enteredBatchName : detail[0].batch_name,
    };

    if (enteredBatchName || enteredType || glink) {
      console.log("changed");
      console.log(enteredBatchName);
      console.log(enteredType);
      console.log(glink);
      console.log(batchNameData);

      console.log(obj);

      if (batchId) {
        console.log("in");

        const data1 = await updateBatch(
          enteredBatchName,
          enteredType,
          obj,
          glink,
          batchId
        );

        if (data1) {
          console.log("in");
          if (enteredBatchName !== detail[0].batch_name) {
            window.location.href = `/admin/batches/batches-detail/${enteredBatchName}`;
          } else {
            window.location.href = `/admin/batches/batches-detail/${detail[0].batch_name}`;
          }
          batchCtx.setSubmittedHandler(true);
        } else {
          console.log("else");
          setError(true);
        }
      }
    }
  };

  return (
    <>
      {
        <form onSubmit={onBatchEditHandler}>
          <div className="overflow-hidden ">
            <div className="">
              <h1 className="text-2xl mt-0 text-dark-purple text-center pb-5">
                {actionBtn}
              </h1>
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6 ">
                  <div className="col-span-6">
                    <div className="grid grid-cols-9 gap-3">
                      <div className="col-span-8 sm:col-span-4">
                        <label
                          htmlFor="batch-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Batch name
                        </label>
                        {detail[0] && (
                          <input
                            defaultValue={
                              actionBtn === "Edit Batch"
                                ? detail[0].batch_name
                                : ""
                            }
                            type="text"
                            name="batch-name"
                            id="first-name"
                            ref={nameRef}
                            autoComplete="given-name"
                            required
                            className="block w-96 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        )}
                        {error && (
                          <p className=" text-red-500 mt-2">
                            Batch already exists
                          </p>
                        )}
                      </div>
                      <div className="col-span-9 sm:col-span-3">
                        <label
                          htmlFor="Teacher"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Select Type
                        </label>

                        <select
                          // value={detail[0].teacher_email}
                          id="Teacher"
                          name="Teacher"
                          ref={typeRef}
                          autoComplete="teacher-name"
                          required
                          className="block w-96 px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>Adult</option>
                          <option>Kid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="grid grid-cols-9 gap-3">
                      <div className="col-span-9 sm:col-span-3 ml-0">
                        <label
                          htmlFor="gmeet"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Add Google Meet
                        </label>
                        {detail[0] && (
                          <input
                            defaultValue={detail[0].g_meet}
                            ref={gmeetLink}
                            type="text"
                            name="gmeet"
                            placeholder="G Meet Link"
                            className="block w-96  px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 daily-on">
                    <h4 className="my-2">Weekly on.</h4>
                    <div className="grid grid-cols-8 gap-3 sm:grid-cols-7 lg:gap-5">
                      {sheduleData &&
                        days.map((day) => (
                          <div className="col-span-2 pb-3 pl-1 border-2 border-gray-300 rounded-md shadow-sm appearance-none cursor-pointer sm:col-span-1">
                            <input
                              type="checkbox"
                              id={day}
                              value={day}
                              name={day}
                              onChange={handleChange}
                              checked={
                                sheduleData[0].schedule.days &&
                                selectedDays.length === 0
                                  ? sheduleData[0].schedule.days.includes(day)
                                  : selectedDays.includes(day)
                              }
                              className="block mt-1 border-solid rounded-full appearance-none day-card focus:outline-none after:border-none focus:border-none sm:text-sm"
                            />
                            <label
                              htmlFor={day}
                              className="block text-sm font-medium text-center text-gray-700 cursor-pointer"
                            >
                              {day}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="grid grid-cols-8 gap-3">
                      <div className="col-span-8 sm:col-span-4">
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium text-gray-700"
                        >
                          At what time of day?
                        </label>
                        {sheduleData && (
                          <input
                            defaultValue={sheduleData[0].schedule.time}
                            type="time"
                            ref={timeRef}
                            min="07:00"
                            max="20:00"
                            name="time"
                            id="time"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        )}
                      </div>
                      <div className="col-span-8 sm:col-span-4">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Starting Date
                        </label>
                        {sheduleData && (
                          <input
                            defaultValue={sheduleData[0].schedule.startDate}
                            type="date"
                            name="date"
                            id="date"
                            // min={getCurrentDate()}
                            ref={dateRef}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {error && <p className="text-red-400">{error}</p>}
            </div>
          </div>

          <div className="items-center  py-3 text-right mt-5">
            <button
              variant="contained"
              className=" w-full bg-dark-purple text-white p-2 "
            >
              {actionBtn}
            </button>
          </div>
        </form>
      }
    </>
  );
};

export default BatchEditNew;
